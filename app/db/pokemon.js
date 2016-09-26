import * as _ from 'lodash-es'
import * as db from '../db'
const pokemonDB = require('../../data/pokemon.json')
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
    match = hp.match(/HP.*\d+\s*\/\s*(\d+)/)
    return match && match[1] || hp
  },
  'Stardust Needed': sd=>sd.trim(),
}

const findBasePokemon = name=>{
  return _.find(pokemonDB, poke=>name.toLowerCase().indexOf(poke.Name.toLowerCase()) >= 0)
}

export default class Pokemon {
  static addFromScan(stats) {
    _.map(cleanup, (cleanupFunc, field)=>{
      stats[field] = cleanupFunc(stats[field])
    })
    mon = new Pokemon(stats)
    db.addMon(mon)
    mon.getIVPossibilities()
  }

  constructor(rawData) {
    _.assign(this, rawData)
  }

  getIVPossibilities() {
    const mon = findBasePokemon(this.Name)
    console.log('iv possibilities', mon, this.Name)
    let possibilities = []
    if (mon) {
      const level = (this['level']-1)*2
      const cpM = cpMultiplier[level]
      const cpMSquaredTenth = Math.pow(cpM, 2)*0.1
      const reportedHP = this['HP']
      const reportedCP = this['CP']
      console.log('looking for', mon.Name, reportedHP, reportedCP)
      let minStaminaIV = Math.floor(reportedHP/cpM - mon.baseStamina)
      _.range(minStaminaIV, 15).find( staminaIV=>{
        const stamina = mon.baseStamina + staminaIV
        let hp = Math.max(Math.floor((stamina) * cpM), 10);
        if (hp == reportedHP) {
          console.log('considering stamina', staminaIV, hp, reportedHP, mon.baseStamina, cpM, level)
          _.range(0,16).forEach(attackIV=>{
            _.range(0,16).forEach(defenseIV=>{
              const cp = Math.floor((mon.baseAttack+attackIV)*Math.sqrt(mon.baseDefense+defenseIV)*Math.sqrt(stamina)*cpMSquaredTenth)
              // console.log('candidate CP', cp, attackIV, defenseIV, mon.baseAttack, mon.baseDefense, cpMSquaredTenth, level)
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
    return possibilities
  }
}
