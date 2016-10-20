import React from 'react';
import multipleStyles from 'react-native-multiple-styles';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';

export default Grade = ({grade}) => {
  if (!grade) {
    return <Text>?</Text>
  }
  const styleGrade = `grade_${grade.toLowerCase()}`
  console.log('grade tag', grade, styleGrade)
  return (
    <View style={multipleStyles(styles.grade_badge, styles[styleGrade])}>
      <Text style={styles.grade_text}>{grade}</Text>
    </View>)
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

  many_types: { flexWrap:'wrap', flexDirection:'row', marginLeft:-3, }

});
