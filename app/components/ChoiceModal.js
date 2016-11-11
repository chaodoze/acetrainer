import React, { Component } from 'react';
import {Modal, StyleSheet, TouchableHighlight, View} from 'react-native'
import {List, ListItem, Text, Icon, Button} from 'native-base'
import myTheme from './Themes/myTheme';
import layout from './Styles';

export default class ChoiceModal extends Component {
  render() {
    const {choices, onChosen} = this.props
    return (
      <Modal
          animationType={"slide"}
          transparent={true} >
        <View style={layout.modal_outer}>
          <View style={layout.modal_inner}>
            <View>
              <View style={layout.choice_title}>
                <Text style={layout.choice_title_text}>SELECT MOVE</Text>
                <Button style={layout.fixedClose} theme={myTheme} transparent small onPress={() => { if (onChosen) {onChosen()} }}>
                  <Icon name='close' style={{color:'#333333'}}/>
                </Button>
              </View>
              <List>
                {choices.map(choice=>(
                  <ListItem  key={choice} onPress={()=>{if (onChosen) {onChosen(choice)}}}>
                     <Text style={layout.choice}>{choice.displayName}</Text>
                  </ListItem>
                ))}
              </List>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

ChoiceModal.propTypes = {
  choices: React.PropTypes.array.isRequired,
  onChosen: React.PropTypes.func,
}
