import * as _ from 'lodash-es'
import * as db from '../db'

const cleanup = {
  CP: cp=>{
    const match = cp.match(/CP(\d+)/)
    return match && match[1] || cp
  },
  Name: name=>name.trim(),
  HP: hp=>{
    match = hp.match(/HP.*\d+\s*\/\s*(\d+)/)
    return match && match[1] || hp
  },
  'Stardust Needed': sd=>sd.trim(),
}
export default class Pokemon {
  static addFromScan(stats) {
    _.map(cleanup, (cleanupFunc, field)=>{
      stats[field] = cleanupFunc(stats[field])
    })
    mon = new Pokemon(stats)
    db.addMon(mon)
  }

  constructor(rawData) {
    _.assign(this, rawData)
  }
}
