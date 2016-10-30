import React, { Component } from 'react';
import {Picker} from 'react-native'

export default class LevelPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {selectLevel:this.props.initialLevel}
    this.onValueChange = this.onValueChange.bind(this)
  }
  onValueChange(lvl) {
    const {onValueChange} = this.props
    this.setState({selectLevel:lvl})
    if (onValueChange) {onValueChange(lvl)}
  }
  render() {
    let {initialLevel, startLevel} = this.props
    const {selectLevel} = this.state
    if (!startLevel) {startLevel = Math.max(1, initialLevel-3)}
    return (
      <Picker selectedValue={selectLevel} onValueChange={this.onValueChange}>
        {_.range(startLevel,41).map((lvl)=><Picker.Item key={lvl} label={''+lvl} value={lvl} />)}
      </Picker>
    )
  }
}

LevelPicker.propTypes = {
  initialLevel: React.PropTypes.number.isRequired,
  startLevel: React.PropTypes.number,
  onValueChange: React.PropTypes.func,
}
