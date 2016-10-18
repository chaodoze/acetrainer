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
                  <Text style={{textAlign:'center'}}>Charge Move</Text>
                </ListItem>
                {choices.map(choice=>(
                  <ListItem  key={choice} onPress={()=>{console.log('bye');if (onChosen) {onChosen(choice)}}}>
                     <Text style={{textAlign:'center', color:'#2182f7'}}>{choice.displayName}</Text>
                  </ListItem>
                ))}
              </List>
            </View>
          </View>

          <TouchableHighlight onPress={() => {
              if (onChosen) {onChosen()}
            }}>
            <View style={{backgroundColor: '#fff', padding: 10, borderRadius: 10,alignItems: 'center', marginTop:5}}>
              <View><Text style={{color:'#666666'}}>Cancel</Text></View>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
    )
  }
}

var styles = StyleSheet.create({

 img_container: {
    flex: 1,
    width: undefined,
    height: undefined,
    top:-60,
  },
  overlay_box: {
    backgroundColor:'rgba(0, 0, 0, 0.6)',
    position:'absolute',
    top:0,
    left:0,
    right:0,
    left:0,
    height:250,
  },

  overlay_box_text: {
    position:'absolute',
    top:150,
    left:0,
    right:0,
    left:0,
    height:250,
  },

  mon_data_box: {
    marginTop:250,
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

  grade_badge: {
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

  modal_outer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1, justifyContent: 'center',padding: 20,
  },
  modal_inner: {
    backgroundColor: '#fff', padding: 10, borderRadius: 10,
  },
  move_label_text: {
    fontSize:14,
    fontWeight:'bold',
    color:'#1d484d',
  },

  alignRight: {
    flexWrap: 'wrap',  justifyContent: 'flex-end', alignItems: 'flex-end',flexDirection:'row',
  },
  alignLeft: {
    flexWrap: 'wrap',  justifyContent: 'flex-start', alignItems: 'flex-start',flexDirection:'row',
  },

  alignCenter: {
    flexWrap: 'wrap',  justifyContent: 'center', alignItems: 'center',flexDirection:'row',
  },

  alignCenterCol: {
    flexWrap: 'wrap',  justifyContent: 'center', alignItems: 'center', flexDirection:'column'
  },

  type: { marginRight:2},
  t_normal: { backgroundColor:'#a8a878'},
  t_fighting: { backgroundColor:'#c02038'},
  t_flying: { backgroundColor:'#a28ae7'},
  t_poison: { backgroundColor:'#a040a0'},
  t_ground: { backgroundColor:'#e0c068'},
  t_rock: { backgroundColor:'#b8a038'},
  t_bug: { backgroundColor:'#a8b820'},
  t_ghost: { backgroundColor:'#705898'},
  t_steel: { backgroundColor:'#b8b8d0'},
  t_fire: { backgroundColor:'#f08030'},
  t_water: { backgroundColor:'#6890f0'},
  t_grass: { backgroundColor:'#78c850'},
  t_electric: { backgroundColor:'#f8d030'},
  t_psychic: { backgroundColor:'#f85888'},
  t_ice: { backgroundColor:'#5bc0de'},
  t_dragon: { backgroundColor:'#7038f8'},
  t_dark: { backgroundColor:'#705848'},
  t_fairy: { backgroundColor:'#ee99ac'},
  t_unknown: { backgroundColor:'#cccccc'}

});
