export const selectMon = mon=>
  ({
    type: 'SELECT_MON',
    mon
  })
export const setTrainerLevel = level=>({
  type: 'SET_TRAINER_LEVEL',
  level,
})
export const monLevelRaised = level=>({
  type: 'MON_LEVEL_RAISED',
  level
})
