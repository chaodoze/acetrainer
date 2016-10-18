import React, { Component } from 'react';
import {Modal, StyleSheet, TouchableHighlight, TextInput, View} from 'react-native'
import {Badge, List, ListItem, Text} from 'native-base'
import { Col, Row, Grid } from "react-native-easy-grid";
import ChoiceModal from './ChoiceModal'
import layout from './Styles';


export default class Move extends Component {
  constructor(props) {
    super(props);
    this.state = {askForMove: false};
    this.onChosenx = this.onChosenx.bind(this)
  }

  setAskMove(visible) {
    this.setState({askForMove: visible});
  }
  onChosenx(choice) {
    this.setAskMove(false)
    if (choice) {
      console.log('move chosen', choice)
      const {mon, type} = this.props
      mon.setMoveFor(type, choice)
    }
  }
  render() {
    const {mon, type} = this.props
    const moveType = `${type}Moves`
    const choices = mon.specie()[moveType]()
    const move = mon.moveFor(type)

    const dialogCode = this.state.askForMove && <ChoiceModal choices={choices} onChosen={this.onChosenx}/>
    return (
      <Grid style={layout.alignCenter}>
        <Col style={layout.alignLeft}><Text style={ styles.move_label_text }>{type.toUpperCase()} MOVE</Text></Col>
        <Col>
          <TouchableHighlight onPress={() => {
              this.setAskMove(true)
            }}>
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
        <Col style={layout.alignRight}><Badge style={styles.t_unknown}>?</Badge></Col>

      </Grid>
    )
  }
}

var styles = StyleSheet.create({

  t_unknown: { backgroundColor:'#cccccc'},
  move_label_text: {
    fontSize:14,
    fontWeight:'bold',
    color:'#1d484d',
  },
});
