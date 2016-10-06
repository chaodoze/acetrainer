const pogoJSON = require('../../data/pogo.json')
import _ from 'lodash'
import Realm from 'realm'

const findById = (klass,id)=> realm.objects(klass).filtered(`id= ${id}`)[0]

class PokemonSpecie extends Realm.Object {
  static schema = {
    name: 'PokemonSpecie',
    primaryKey: 'id',
    properties: {
      id: 'int',
      types: {type: 'list', objectType: 'PokemonType'},
      quickMoves: {type:'list', objectType:'PokemonMove'},
      chargedMoves: {type:'list', objectType:'PokemonMove'},
      evolutions: {type: 'list', objectType:'PokemonSpecie'},
      rarity: 'int',
      parent: 'PokemonSpecie',
      family: 'PokemonSpecie',
      candyToEvolve: 'int',
      kmBuddyDistance: 'int',
      displayName: 'string'
    }
  }
}

class PokemonType extends Realm.Object {
  static schema = {
    name:'PokemonType',
    primaryKey: 'id',
    properties: {
      id: 'int',
      displayName: 'string',
      weakAgainst: {type:'list', objectType:'PokemonType'},
      strongAgainst: {type:'list', objectType:'PokemonType'},
    }
  }

  static find(id) {
    return findById('PokemonType', id)
  }

  static createFromJSON(rawData) {
    let newType = new PokemonType()
    newType.id = rawData.attack_type
    newType.displayName = rawData.displayName
    newType.attackScalar = rawData.attack_scalar
    newType.strongAgainst = newType.weakAgainst = []
    return newType
  }

  initStrengthWeakness() {
    let [strong, weak] = [[],[]]
    this.weakAgainst = []
    this.strongAgainst = []
    this.attackScalar.forEach((val,id)=>{
      if (val != 1) {
        let pType = PokemonType.find(id+1)
        if (val > 1) {
          this.strongAgainst.push(realm.create('PokemonType',pType,true))
        }
        else if (val < 1) {
          console.log(this.displayName,pType.displayName,val)
          this.weakAgainst.push(realm.create('PokemonType',pType,true))
        }
      }
    })
    console.log(this.displayName, this.weakAgainst)
    // this.strongAgainst = strong
    // this.weakAgainst = weak
  }
}

class PokemonMove extends Realm.Object {
  static schema = {
    name: 'PokemonMove',
    primaryKey: 'id',
    properties: {
      id: 'int',
      type: 'PokemonType',
      power: 'int',
      displayName: 'string',
    }
  }

  static createFromJSON(rawData) {
    this.id = rawData.movement_id
    this.type = PokemonType.find(this.pokemon_type)
    this.power = rawData.power
    this.displayName = rawData.displayName
  }
}

const realm = new Realm({schema:[PokemonType]})
const popuplateTypes = ()=> {
  realm.write(()=>{
    const pTypes = pogoJSON.templates.type_effective.map(pType=> {
      let pt = PokemonType.createFromJSON(pType)
      realm.create('PokemonType', pt, true)
      return pt
    })
    pTypes.forEach(pType=>pType.initStrengthWeakness())
    console.log('pTypes', pTypes)
  })
}
export {PokemonType, popuplateTypes, realm}
