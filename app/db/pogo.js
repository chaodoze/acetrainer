const pogoJSON = require('../../data/pogo.json')
import _ from 'lodash'

class BaseRecord {
  static addToCache(obj) {
    this.cache[obj.id] = obj
    return obj
  }
  static find(id) {
    return this.cache[id]
  }
  static populateCache(objs) {
    this.addRelationships()
    objs.forEach(obj=>{
      let instance = new this(obj)
      this.addToCache(instance)
    })
    return objs
  }
  static addRelationships() {
    if (this.relationships) {
      _.forEach(this.relationships, (attrs, key)=> {
        this.prototype[key] = function() {
          const val = this[attrs['field']]
          if (val instanceof Array) {
            return val.map(id=>attrs['klass'].find(id))
          }
          else {
            return attrs['klass'].find(id)
          }
        }
      })
    }
  }
  constructor(rawData) {
    _.extend(this, rawData)

  }
}
class PokemonType extends BaseRecord {
  static cache = {}
  constructor(rawData) {
    super(rawData)
    this.id = this.attack_type
  }
}

class PokemonMove extends BaseRecord {
  static cache = {}
  static relationships = {
    type: {field:'pokemon_type', klass:PokemonType}
  }
  constructor(rawData) {
    super(rawData)
    this.id = this.movement_id
  }
}

class PokemonSpecie extends BaseRecord {
  static cache = {}
  static relationships = {
    quickMoves: {field:'quick_moves', klass:PokemonMove},
    chargedMoves: {field:'cinematic_moves', klass:PokemonMove},
    types: {field:'type_ids', klass:PokemonType},
    parent: {field:'parent_pokemon_id', klass:PokemonSpecie},
    family: {field:'family_id', klass:PokemonSpecie},
  }
  constructor(rawData) {
    super(rawData)
    this.id = this.pokemon_id
    this.type_ids = _.compact([this.type, this.type_2])
  }

  attackMovesets() {
    return AttackMoveRank.find(this.id)
  }

  defensiveMovesets() {
    return DefensiveMoveRank.find(this.id)
  }
}

class MovesetRank extends BaseRecord {
  static addToCache(obj) {
    if (!this.cache[obj.id]) {this.cache[obj.id] = []}
    this.cache[obj.id].push(obj)
    return obj
  }

  constructor(rawData) {
    super(rawData)
    this.id = this.pokemon_id
  }
}

class AttackMoveRank extends MovesetRank {
  static cache = {}
}

class DefensiveMoveRank extends MovesetRank {
  static cache = {}
}

PokemonType.populateCache(pogoJSON.templates.type_effective)
PokemonMove.populateCache(pogoJSON.templates.move_settings)
PokemonSpecie.populateCache(pogoJSON.templates.pokemon_settings)
AttackMoveRank.populateCache(pogoJSON.attackers)
DefensiveMoveRank.populateCache(pogoJSON.defenders)

export {PokemonSpecie, PokemonType, PokemonMove}
