import firebase from 'firebase'

const subscribeToReminders = (dispatch)=> {
  const ref = firebase.database().ref('/reminders')
  console.log('subscribing to reminders')
  ref.on('child_added', (reminder)=> {
    console.log('child_added', reminder.val())
    dispatch({
      type: 'REMINDER_ADDED',
      val:reminder.val(),
      reminder,
    })
  })
  ref.on('child_changed', (reminder)=>{
    dispatch({
      type:'REMINDER_CHANGED',
      val:reminder.val(),
      reminder
    })
  })
  ref.on('child_removed', (reminder)=>{
    dispatch({
      type:'REMINDER_REMOVED',
      val:reminder.val(),
      reminder
    })
  })
}

export const init = (dispatch) => {
  console.log('db init')
  const config = {
    apiKey: "AIzaSyBWvVTIVhdCARWTPEAipe5TjkWCguDZjvg",
    authDomain: "acetrainer-ce9c9.firebaseapp.com",
    databaseURL: "https://acetrainer-ce9c9.firebaseio.com",
    storageBucket: "acetrainer-ce9c9.appspot.com",
  }
  firebase.initializeApp(config)
  subscribeToReminders(dispatch)
}

export const addReminder = (reminder)=> {
  const ref = firebase.database().ref('/reminders')
  ref.push(reminder)
}

export const updateReminder = (reminder, newText)=> {
  console.log('updateReminder', newText,{[reminder.key]:Object.assign(reminder.val(), {newText})})
  const ref = firebase.database().ref('/reminders')
  ref.update({[reminder.key]:Object.assign(reminder.val(), {text:newText})})
}
