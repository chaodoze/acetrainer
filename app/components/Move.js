import React, { Component } from 'react';
import {StyleSheet, TouchableHighlight, TextInput, View} from 'react-native'
import {updateMon} from '../db/index'
import {Badge, List, ListItem, Text} from 'native-base'
import MonTypeBadge from './MonTypeBadge'
import ChoiceModal from './ChoiceModal'
import layout from './Styles';
import Pokemon from '../db/pokemon'


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
    const hasStab = move && move.hasStab(mon.specie())

    const dialogCode = this.state.askForMove && <ChoiceModal choices={choices} onChosen={this.onChosen}/>
    return (
      <View style={layout.alignLeft}>
        <View style={{flex:2}}><Text style={ styles.move_label_text }>{type.toUpperCase()} MOVE</Text></View>
        <View style={{flex:3}}>
          <TouchableHighlight onPress={() => {
              this.setAskMove(true)
            }} underlayColor='#ffffff'>
            <View>
              <TextInput
                style={{borderWidth:0, borderColor:'transparent', height:35, fontSize:15}}
                editable={false}
                placeholder="Select..."
                value={move && move.displayName}
                />
              {dialogCode}
            </View>
          </TouchableHighlight>
        </View>
        <View style={[layout.alignRight, {flex:2}]}><MonTypeBadge pokemonType={move && move.type()} stab={hasStab} />
        </View>
      </View>
    )
  }
}

Move.propTypes = {
  mon: React.PropTypes.instanceOf(Pokemon).isRequired,
  type: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
}

var styles = StyleSheet.create({

  move_label_text: {
    fontSize:12,
    fontWeight:'bold',
    color:'#1d484d',
  },
});
