import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReminderListP from './ReminderListP'
import * as _ from 'lodash-es'
import * as db from '../db'

let ReminderList = ({reminders})=>(
  <ReminderListP reminders={reminders} onReminderChanged={db.updateReminder} />
)
const mapStateToProps = ({reminders}) => {
  reminders = _.map(reminders)
  return {
    reminders
  }
}

ReminderList = connect(mapStateToProps)(ReminderList)

export default ReminderList
