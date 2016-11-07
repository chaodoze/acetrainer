import React, { Component } from 'react';
import {Modal, Picker, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import * as _ from 'lodash-es'
import Collapsible from 'react-native-collapsible'
import ChooseOrCancel from './ChooseOrCancel'
import LevelPicker from './LevelPicker'

export default class TrainerLevel extends Component {
  constructor(props) {
    super(props)
    const {level} = this.props
    this.state = {collapsed:true, selectedValue:level}
    this.onChangeRequest = this.onChangeRequest.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onChosen = this.onChosen.bind(this)
  }

  onValueChange(newVal) {
    this.setState({selectedValue:newVal})
  }

  onChangeRequest() {
    this.setState({collapsed:!this.state.collapsed})
  }

  onChosen(cancelled) {
    const {onLevelChange, level} = this.props
    const {selectedValue} = this.state
    this.setState({collapsed:true})
    if (!cancelled && (selectedValue != level) && onLevelChange) {
      onLevelChange(selectedValue)
    }
  }

  modalStyle() {
    return (
      <ChooseOrCancel onChosen={this.onChosen}>
        <LevelPicker initialLevel={this.props.level} onValueChange={this.onValueChange} />
      </ChooseOrCancel>
    )
  }
  render() {
    const {level} = this.props
    return (
      <View>
          <TouchableHighlight>
            <View><Text onPress={this.onChangeRequest} style={this.props.style}>Trainer Level {this.state.selectedValue}</Text></View>
          </TouchableHighlight>
        {!this.state.collapsed && this.modalStyle()}
      </View>
    )
  }
}

TrainerLevel.propTypes = {
  level: React.PropTypes.number.isRequired,
  onLevelChange: React.PropTypes.func,
}
