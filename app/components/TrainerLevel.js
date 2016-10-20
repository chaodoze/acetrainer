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

 img_container: {
    flex: 1,
    width: undefined,
    height: undefined,
    top:0,
  },
  overlay_box: {
    backgroundColor:'rgba(0, 0, 0, 0.6)',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    left:0,
    height:200,
  },

  overlay_box_text: {
    position:'absolute',
    top:70,
    left:0,
    right:0,
    left:0,
  },

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

  mon_data_box: {
    marginTop:200,
    backgroundColor:'#ffffff',
  },

  mon_name: {
    color:'#ffffff',
    fontSize:28,
    lineHeight:32,
    marginBottom:10,
    fontWeight:'bold',
    textAlign :'center',
  },

  mon_data: {
    opacity:0.7, padding:5, borderBottomWidth:0,
  },

  stats: { fontWeight:'bold'},
  level: { color:'#666', fontSize:13 },

  mon_analysis: {
    backgroundColor:'#ffffff',
  },
  move_grade: {
     paddingTop:15,
     paddingBottom:15,
     borderBottomWidth:0,
  },

  grade_icon: {
    fontSize: 18, marginRight:4
  },

  square_badge: {
    padding:7,
    paddingTop:1,
    paddingBottom:1,
    borderRadius:2,
    marginLeft:5
  },

  grade_a: { backgroundColor:'#00a700'},
  grade_b: { backgroundColor:'#98d000'},
  grade_c: { backgroundColor:'#ded100'},
  grade_d: { backgroundColor:'#dea300'},

  grade_text: { color:'#ffffff'},

  defence: { opacity:0.3, marginLeft:30},

  many_types: { flexWrap:'wrap', flexDirection:'row', marginLeft:-3, },

  floating_footer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'transparent',
    position:'absolute',
    bottom:0, left:0, right:0,
  },
  floating_btn: {
    backgroundColor:'#1d8696',
    borderColor: '#ffffff',
    borderWidth:1,
    alignSelf:'center',
    marginBottom:15,
    shadowColor: "#000000",
    shadowOpacity: 0.7,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 0
    }
  },

  header4: {
    fontSize:12,
    fontWeight:'bold',
    color:'#1d484d',
    marginBottom:2,
  },

});
