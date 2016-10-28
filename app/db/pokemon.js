import * as _ from 'lodash-es'
import * as db from '../db'
const pokemonDB = require('../../data/pokemon.json')
import {PokemonSpecie, BaseRecord, PokemonMove} from '../db/pogo'
const cpMultiplier = [0.0939999967813492, 0.135137432089339, 0.166397869586945, 0.192650913155325, 0.215732470154762,
                             0.236572651424822, 0.255720049142838, 0.273530372106572, 0.290249884128571, 0.306057381389863,
                             0.321087598800659, 0.335445031996451, 0.349212676286697, 0.362457736609939, 0.375235587358475,
                             0.387592407713878, 0.399567276239395, 0.4111935532161, 0.422500014305115, 0.432926420512509,
                             0.443107545375824, 0.453059948165049, 0.46279838681221, 0.472336085311278, 0.481684952974319,
                             0.490855807179549, 0.499858438968658, 0.5087017489616, 0.517393946647644, 0.525942516110322,
                             0.534354329109192, 0.542635753803599, 0.550792694091797, 0.558830584490385, 0.566754519939423,
                             0.57456912814537, 0.582278907299042, 0.589887907888945, 0.597400009632111, 0.604823648665171,
                             0.61215728521347, 0.619404107958234, 0.626567125320435, 0.633649178748576, 0.6406529545784,
                             0.647580971386554, 0.654435634613037, 0.661219265805859, 0.667934000492096, 0.674581885647492,
                             0.681164920330048, 0.687684901255373, 0.694143652915955, 0.700542901033063, 0.706884205341339,
                             0.713169074873823, 0.719399094581604, 0.725575586915154, 0.731700003147125, 0.734741038550429,
                             0.737769484519958, 0.740785579737136, 0.743789434432983, 0.746781197247765, 0.749761044979095,
                             0.752729099732281, 0.75568550825119, 0.758630370209851, 0.761563837528229, 0.76448604959218,
                             0.767397165298462, 0.770297293677362, 0.773186504840851, 0.776064947064992, 0.778932750225067,
                             0.781790050767666, 0.784636974334717, 0.787473608513275, 0.790300011634827]

const cleanup = {
  CP: cp=>{
    const match = cp.match(/(\d+)/)
    return match && match[1] || cp
  },
  Name: name=>{
    name = name.trim()
    if (_.endsWith(name,'/')) {
      name = _.trimEnd(name,'/')
    }
    return name
  },
  HP: hp=>{
    let match = hp.match(/.*\d+\s*\/\s*(\d+)\s*HP/)
    let result = match && match[1]
    if (!result) {
      match = hp.match(/HP.*\d+\s*\/\s*(\d+)/)
      result = match && match[1]
    }
    return result || hp
  },
  'Stardust Needed': sd=>sd.trim(),
  'Quick Move': qm=>qm.trim(),
  'Charge Move': cm=>cm.trim(),
  shotAt: unixTime=>new Date(unixTime*1000),
}

function getEditDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i-1) == a.charAt(j-1)) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

export default class Pokemon extends BaseRecord {
  static relationships = {
    quickMove: {field:'quick_move_id', klass:PokemonMove},
    chargeMove: {field:'charge_move_id', klass:PokemonMove}
  }

  static cleanupStats(stats) {
    _.map(cleanup, (cleanupFunc, field)=>{
      stats[field] = cleanupFunc(stats[field])
    })
  }
  static addFromScan(stats) {
    this.cleanupStats(stats)
    mon = new Pokemon(stats)
    mon.calcIVPossibilities()
    console.log('iv candidates', mon.Name, mon.ivCandidates)
    mon.setMatchingMoves()
    db.addMon(mon)

  }

  key() {
    return this.url.replace(/\//g,'')
  }

  update(stats) {
    Pokemon.cleanupStats(stats)
    _.forEach(stats, (val,key)=>{this[key] = val})
    delete this.ivCandidates
    this.calcIVPossibilities()
    db.updateMon(this)
  }

  specie() {
    if (this.pokemon_number) {
      return PokemonSpecie.find(this.pokemon_number)
    }
    else {
      const specie = PokemonSpecie.findByFuzzyName(this.Name)
      this.pokemon_number = specie && specie.id
    }
    return PokemonSpecie.findByFuzzyName(this.Name)
  }

  moveFor(type) {
    return this[`${type}Move`]()
  }

  setMoveFor(type, move) {
    this[`${type}_move_id`] = move.id
  }

  gradeFor(type) {
    if (type != 'attack' && type != 'defense') {return null}
    const [quickMove, chargeMove, specie] = [this.quickMove(), this.chargeMove(), this.specie()]
    if (!(quickMove && chargeMove && specie)) {return null}
    const movesets = specie[`${type}Movesets`]()
    console.log('grade', movesets, quickMove, chargeMove)
    const matchingMoveset = movesets.find(moveset=>{
      return quickMove.displayName == moveset.quick && chargeMove.displayName == moveset.charge
    })
    // console.assert(matchingMoveset, 'moveset not found!')
    const rank = matchingMoveset.rank/movesets[0].rank
    if (rank > 0.95) {
      return 'A'
    }
    else if (rank > 0.8) {
      return 'B'
    }
    else if (rank > 0.6) {
      return 'C'
    }
    else {
      return 'F'
    }
  }

  attackGrade() {
    return this.gradeFor('attack')
  }

  defenseGrade() {
    return this.gradeFor('defense')
  }

  matchingMoveFor(type, ocrString) {
    const moves = this.specie()[`${type}Moves`]()
    let current = [Number.MAX_SAFE_INTEGER, null]
    for (let move of moves) {
      const dist = getEditDistance(move.displayName, ocrString)
      if (dist < current[0]) {
        current = [dist, move]
      }
    }
    return current[1]
  }
  setMatchingMoves() {
    if (this.specie() && !this.specie().canEvolve()) {
      this.setMoveFor('quick', this.matchingMoveFor('quick', this['Quick Move']))
      this.setMoveFor('charge', this.matchingMoveFor('charge', this['Charge Move']))
      console.log('setMatchingMoves', this.moveFor('quick').displayName, this.moveFor('charge').displayName)
    }
  }

  calcIVPossibilities() {
    if (this.ivCandidates) {return}
    const specie = PokemonSpecie.findByFuzzyName(this.Name)
    console.log('iv possibilities', specie, this.Name)
    let possibilities = []
    this.ivCandidates = possibilities
    if (specie) {
      const level = (this['level']-1)*2
      const cpM = cpMultiplier[level]
      const cpMSquaredTenth = Math.pow(cpM, 2)*0.1
      const reportedHP = this['HP']
      const reportedCP = this['CP']
      console.log('looking for', specie.displayName, reportedHP, reportedCP)
      let minStaminaIV = Math.floor(reportedHP/cpM - specie.baseStamina)
      if (minStaminaIV == -1) {minStaminaIV = 0} // e.g. -0.85's floor is -1 but we really want 0
      if (minStaminaIV < 0 || minStaminaIV > 15) {
        console.log('impossible minStaminIV', minStaminaIV)
        return possibilities
      }
      _.range(minStaminaIV, 16).find( staminaIV=>{
        const stamina = specie.baseStamina + staminaIV
        let hp = Math.max(Math.floor((stamina) * cpM), 10);
        if (hp == reportedHP) {
          console.log('considering stamina', staminaIV, hp, reportedHP, specie.baseStamina, cpM, level)
          _.range(0,16).forEach(attackIV=>{
            _.range(0,16).forEach(defenseIV=>{
              const cp = Math.floor((specie.baseAttack+attackIV)*Math.sqrt(specie.baseDefense+defenseIV)*Math.sqrt(stamina)*cpMSquaredTenth)
              // console.log('candidate CP', cp, attackIV, defenseIV, specie.baseAttack, specie.baseDefense, cpMSquaredTenth, level)
              if (cp == reportedCP) {
                console.log('found combo', attackIV, defenseIV, staminaIV)
                possibilities.push([attackIV, defenseIV, staminaIV])
              }
            })
          })
        }
        else {
          return hp > reportedHP //stop iterating when hp is greater than reportedHP
        }
      })
    }
    // this.ivCandidates = possibilities
  }

  averageIV() {
    this.calcIVPossibilities()
    if (this.ivCandidates.length == 0) {
      return 0
    }
    const total = this.ivCandidates.reduce((accum, candidate)=>accum+candidate[0]+candidate[1]+candidate[2],0)
    return total/(this.ivCandidates.length*45)
  }

  avgIVPercent() {
    return Math.round(this.averageIV()*100)
  }

  ivRange() {
    this.calcIVPossibilities()
    if (this.ivCandidates.length == 0) {
      return {min:0, max:0}
    }
    range = this.ivCandidates.reduce((accum,candidate)=>{
      const candidateTotal = candidate.reduce((prev,curr)=>prev+curr)
      if (candidateTotal < accum.min) {
        accum.min = candidateTotal
      }
      else if (candidateTotal > accum.max) {
        accum.max = candidateTotal
      }
      return accum
    }, {min:45, max:0})
    if (range.max == 0) {range.max = range.min}
    range.min = Math.round(range.min/45*100)
    range.max = Math.round(range.max/45*100)
    return range
  }

  ivRangeStr() {
    const range = this.ivRange()
    if (range.min == range.max) {
      return `${range.min}%`
    }
    else {
      return `${range.min}%-${range.max}%`
    }
  }

  static appraisalAverageRanges = {
    best: [0.822,1],
    strong: [2/3,0.8],
    ok: [0.5,0.644],
    bad: [0, 0.489]
  }
  static appraisalBestRanges = {
    best:[15,15.1],
    strong:[13,14.1],
    ok: [8,12.1],
    bad: [0,7.1],
  }
  filterIVPossibilities(appraisals) {
    this.calcIVPossibilities()
    if (this.ivCandidates.length == 0) {
      return null
    }
    const filterCandidates = (candidates, range, criteria)=> {
      return _.filter(candidates, candidate=>_.inRange(criteria(candidate),range[0],range[1]))
    }
    let candidates = filterCandidates(this.ivCandidates, Pokemon.appraisalAverageRanges[appraisals.average],
      candidate=>(candidate[0]+candidate[1]+candidate[2])/(3*15))
    candidates = filterCandidates(candidates, Pokemon.appraisalBestRanges[appraisals.best],
      candidate=>candidate.reduce((accum,curr)=>accum > curr ? accum : curr))
    this.filteredCandidates = candidates
  }

}
Pokemon.addRelationships()
