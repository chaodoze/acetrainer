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
            return val && attrs['klass'].find(val)
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

  strongAgainst() {
    const typeIds = this.attack_scalar.reduce((accum, val, index)=>{
      if (val > 1) {
        accum.push(index)
      }
      return accum
    }, [])
    return typeIds.map(id=>PokemonType.find(id+1)) // + 1 because type array if zero-based, but types start from 1
  }

  resistantTo() {
    const index = this.id - 1
    return _.reduce(PokemonType.cache, (accum, type)=>{
      if (type.attack_scalar[index] < 1) {
        accum.push(type)
      }
      return accum
    },[])
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
    this.displayName = this.displayName.trim()
  }
  hasStab(specie) {
    return _.includes(specie.types(), this.type())
  }
}

class PokemonSpecie extends BaseRecord {
  static cache = {}
  static relationships = {
    quickMoves: {field:'quick_moves', klass:PokemonMove},
    chargeMoves: {field:'cinematic_moves', klass:PokemonMove},
    types: {field:'type_ids', klass:PokemonType},
    parent: {field:'parent_pokemon_id', klass:PokemonSpecie},
    family: {field:'family_id', klass:PokemonSpecie},
  }
  static findByFuzzyName(fuzzyName) {
    return _.find(this.cache, specie=>fuzzyName.toLowerCase().indexOf(specie.displayName.toLowerCase()) >= 0) || null
  }

  static suggestByName(partialName) {
    return _.filter(this.cache, specie=>specie.displayName.toLowerCase().indexOf(partialName.toLowerCase()) >= 0)
  }

  constructor(rawData) {
    super(rawData)
    this.id = this.pokemon_id
    this.type_ids = _.compact([this.type, this.type_2])
    this.baseStamina = this.stats.base_stamina
    this.baseAttack = this.stats.base_attack
    this.baseDefense = this.stats.base_defense
  }

  iconUrl() {
    return `pokemon_cc/${this.id}.png`
  }
  canEvolve() {
    return this.evolution_ids.length > 0
  }

  attackMovesets() {
    return AttackMoveRank.find(this.id)
  }

  defenseMovesets() {
    return DefensiveMoveRank.find(this.id)
  }

  strongAgainst() {
    return _.uniq(_.flatten(this.types().map(t=>t.strongAgainst())))
  }

  resistantTo() {
    return _.uniq(_.flatten(this.types().map(t=>t.resistantTo())))
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

PokemonType.relationships = { //must be defined after PokemonSpecie is defined
  topTier: {field:'top_tier', klass:PokemonSpecie}
}

PokemonType.populateCache(pogoJSON.templates.type_effective)
PokemonMove.populateCache(pogoJSON.templates.move_settings)
PokemonSpecie.populateCache(pogoJSON.templates.pokemon_settings)
AttackMoveRank.populateCache(pogoJSON.attackers)
DefensiveMoveRank.populateCache(pogoJSON.defenders)

export {PokemonSpecie, PokemonType, PokemonMove, BaseRecord}
