import React, { Component } from 'react';
import {Modal, StyleSheet, TouchableHighlight, TextInput, View} from 'react-native'
import {updateMon} from '../db/index'
import {Badge, List, ListItem, Text} from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import ChoiceModal from './ChoiceModal'
import layout from './Styles';
import multipleStyles from 'react-native-multiple-styles';


export default class Move extends Component {
  constructor(props) {
    super(props);
    this.state = {askForMove: false};
    this.onChosen = this.onChosen.bind(this)
  }

  setAskMove(visible) {
    this.setState({askForMove: visible});
  }
  onChosen(choice) {
    this.setAskMove(false)
    if (choice) {
      const {mon, type, onChange} = this.props
      mon.setMoveFor(type, choice)
      updateMon(mon)
      if (onChange) {onChange(choice, type)}
    }
  }
  render() {
    const {mon, type} = this.props
    const moveType = `${type}Moves`
    const choices = mon.specie()[moveType]()
    const move = mon.moveFor(type)

    const dialogCode = this.state.askForMove && <ChoiceModal choices={choices} onChosen={this.onChosen}/>
    return (
      <Grid style={layout.alignCenter}>
        <Col style={layout.alignLeft}><Text style={ styles.move_label_text }>{type.toUpperCase()} MOVE</Text></Col>
        <Col>
          <TouchableHighlight onPress={() => {
              this.setAskMove(true)
            }} underlayColor='#ffffff'>
            <View>
              <TextInput
                style={{borderWidth:0, borderColor:'transparent', height:35}}
                editable={false}
                placeholder="Select..."
                value={move && move.displayName}
                />
              {dialogCode}
            </View>
          </TouchableHighlight>
        </Col>
        <Col style={layout.alignRight}><MonTypeBadge pokemonType={move && move.type()} />
        </Col>

      </Grid>
    )
  }
}

var styles = StyleSheet.create({

  move_label_text: {
    fontSize:12,
    fontWeight:'bold',
    color:'#1d484d',
  },
});
