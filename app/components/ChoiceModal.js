import React, { Component } from 'react';
import {Modal, StyleSheet, TouchableHighlight, View} from 'react-native'
import {List, ListItem, Text} from 'native-base'

export default class ChoiceModal extends Component {
  render() {
    const {choices, header, onChosen} = this.props
    return (
      <Modal
          animationType={"slide"}
          transparent={true} >
        <View style={styles.modal_outer}>
          <View style={styles.modal_inner}>
            <View>
              <List>
                <ListItem>
                  <Text style={styles.choice_title}>Charge Move</Text>
                </ListItem>
                {choices.map(choice=>(
                  <ListItem  key={choice} onPress={()=>{console.log('bye');if (onChosen) {onChosen(choice)}}}>
                     <Text style={styles.choice}>{choice.displayName}</Text>
                  </ListItem>
                ))}
              </List>
            </View>
          </View>

          <TouchableHighlight onPress={() => {
              if (onChosen) {onChosen()}
            }}>
            <View style={styles.cancel_box}>
              <View><Text style={styles.cancel_text}>Cancel</Text></View>
            </View>
          </TouchableHighlight>
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
