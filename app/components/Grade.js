import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'native-base';

const rankToGrade = rank=>{
  if (rank > 0.95) {
    return 'A'
  }
  else if (rank > 0.8) {
    return 'B'
  }
  else if (rank > 0.6) {
    return 'C'
  }
  else {
    return 'F'
  }
}

export default Grade = ({rank, small}) => {
  if (!rank) {
    return <Text>?</Text>
  }
  const grade = rankToGrade(rank)
  const styleGrade = `grade_${grade.toLowerCase()}`
  return (
    <View style={[styles.grade_badge, styles[styleGrade]]}>
      <Text style={styles.grade_text}>{grade}</Text>
    </View>
  )
}

Grade.propTypes = {
  grade: React.PropTypes.string,
}

var styles = StyleSheet.create({

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
  
  grade_text_no_badge: {
    fontSize:12,
    color:'#888888',
    fontFamily: 'Roboto-Regular',
  },

  defence: { opacity:0.3, marginLeft:30},

  many_types: { flexWrap:'wrap', flexDirection:'row', marginLeft:-3, }

});
