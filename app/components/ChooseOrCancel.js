import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Modal,
  TouchableHighlight,
  View
} from 'react-native';

import { List, ListItem, Text, Button, Icon } from 'native-base';
import TrainerLevel from './TrainerLevel'
import { Col, Row, Grid } from "react-native-easy-grid";
import myTheme from './Themes/myTheme';
import layout from './Styles';


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
        <View style={layout.modal_outer}>
          <View style={layout.modal_inner}>
            <View>
              <View style={layout.choice_title}>
                <Text style={layout.choice_title_text}>EDIT TRAINER LEVEL</Text>
                <Button style={layout.fixedClose} theme={myTheme} transparent small onPress={()=>this.chosen(true)}>
                  <Icon name='close' style={{color:'#333333'}}/>
                </Button>
              </View>
              <List>
                <Text style={layout.smallText}>Your trainer level at the time the screenshot was taken</Text>
                <ListItem style={{borderColor:'#ffffff'}}>
                  {children}
                </ListItem>
                <ListItem style={{borderColor:'#ffffff'}}>
                  <Button block onPress={()=>this.chosen(false)}>Choose</Button>
                </ListItem>
              </List>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

ChooseOrCancel.propTypes = {
  children: React.PropTypes.element.isRequired,
  onChosen: React.PropTypes.func,
}
