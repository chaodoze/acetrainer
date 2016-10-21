import React, { Component } from 'react';
import {Modal, Picker, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import * as _ from 'lodash-es'
import Collapsible from 'react-native-collapsible'

export default class TrainerLevel extends Component {
  constructor(props) {
    super(props)
    const {level} = this.props
    this.state = {collapsed:true, selectedValue:level}
    this.onValueChange = this.onValueChange.bind(this)
  }

  onValueChange(newVal) {
    this.setState({selectedValue:newVal})
  }

  render() {
    const {level} = this.props
    return (
      <View>
        <View style={styles.header}>
          <View><Text style={styles.headerTitle}>STATS</Text></View>
          <TouchableHighlight>
            <View><Text onPress={()=>this.setState({collapsed:!this.state.collapsed})} style={styles.level}>Trainer Level {this.state.selectedValue}</Text></View>
           </TouchableHighlight>
        </View>
        <Collapsible collapsed={this.state.collapsed}>
          <Picker selectedValue={this.state.selectedValue} onValueChange={this.onValueChange}>
            {_.range((Math.max(1,level-3)),41).map((lvl)=><Picker.Item key={lvl} label={''+lvl} value={lvl} />)}
          </Picker>
        </Collapsible>
      </View>
    )
  }
}

var styles = StyleSheet.create({
 
  header: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#f3f3f3',
    borderColor:'#dddddd',
    borderTopWidth:1,
    borderBottomWidth:1,
    padding: 10,
    justifyContent:'space-between',
  },

  headerTitle: {
    color: '#666666',
    fontSize:13,
    letterSpacing: 3,
    fontWeight:'bold',
  },

 level: { color:'#1780fb', fontSize:13 },
});
