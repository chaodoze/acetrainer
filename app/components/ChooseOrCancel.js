import React, { Component } from 'react';
import {Modal, StyleSheet, TouchableHighlight, View} from 'react-native'
import {Button, Text} from 'native-base'

export default class ChooseOrCancel extends Component {
  chosen(cancelled) {
    const {onChosen} = this.props
    if (onChosen) {onChosen(cancelled)}
  }
  render() {
    const {children} = this.props
    return (
      <Modal
          animationType={"slide"}
          transparent={true} >
        <View style={styles.modal_outer}>
          <Button onPress={()=>this.chosen(true)}>Cancel</Button>
          <Button onPress={()=>this.chosen(false)}>Choose</Button>
          {children}
        </View>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({

  modal_outer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1, justifyContent: 'center',padding: 20,
  },
  modal_inner: {
    backgroundColor: '#fff', padding: 10, borderRadius: 10,
  },

  choice_title: {
    textAlign:'center'
  },

  choice: {
  textAlign:'center', color:'#2182f7'
  },

  cancel_box: {
    backgroundColor: '#fff', padding: 10, borderRadius: 10,alignItems: 'center', marginTop:5,
  },

  cancel_text: {
    color:'#666666',
  },

});
