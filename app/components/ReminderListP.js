import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, View, TextInput, StyleSheet } from 'react-native'
import * as _ from 'lodash-es'

const ReminderListP = ({reminders, onReminderChanged}) => {
  _.map(reminders, (r)=>console.log('rlp',r.val()))
  return (
    <View style={styles.container}>
      <ScrollView keyboardDismissMode='interactive' flex={1} contentContainerStyle={styles.contentContainerStyle}>
        {reminders.map(reminder =>
          <View key={reminder.key} style={styles.inputcontainer}>
            <ReminderInput style={styles.input}
              value={reminder.val().text}
              onDoneEditing={(text)=>onReminderChanged(reminder,text)}
            />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

class ReminderInput extends Component {
  constructor(props) {
    super(props)
    this.state = {text:props.value}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.state.text) {this.setState({text:nextProps.value})}
    console.log('componentWillReceiveProps', nextProps.value)
  }
  render() {
    console.log('ri1', this.props, this.state.text)
    return (
      <TextInput {...this.props} value={this.state.text}
        onChangeText={(text)=>this.setState({text})}
        onEndEditing={()=>this.props.onDoneEditing(this.state.text)}
        onSubmitEditing={()=>console.log('onSubmitEditing')}
      />
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F92E5',
    alignItems: 'stretch',
    paddingTop: 100,
  },
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
	},
  inputcontainer: {
    flex: .5,
    backgroundColor: '#216DAB',
    alignItems: 'center',
    marginBottom: 3,
  },
  message: {
    flex: .25,
    alignItems: 'center',
    paddingTop: 10,
  },
  msgheader: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    width: 200,
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 20,
    color: '#185788',
  },
});

export default ReminderListP;
