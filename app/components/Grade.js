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
  const styles = small ? styleSmall : styleBig

  return (
    <View style={[styles[styleGrade], styles.grade_badge]}>
      <Text style={styles.grade_text}>{grade}</Text>
    </View>
  )
}

Grade.propTypes = {
  grade: React.PropTypes.string,
}

const styleBig = StyleSheet.create({

  grade_a: { backgroundColor:'#00a700'},
  grade_b: { backgroundColor:'#98d000'},
  grade_c: { backgroundColor:'#ded100'},
  grade_d: { backgroundColor:'#dea300'},
  
  grade_badge: {
  padding:7,
  paddingTop:1,
  paddingBottom:1,
  borderRadius:2,
  marginLeft:5
  },

  grade_text: { color:'#ffffff'},
  
});

const styleSmall = StyleSheet.create({
  grade_badge: {
    backgroundColor:'transparent',
  },

  grade_text: {
    fontSize:12,
    color:'#888888',
    fontFamily: 'Roboto-Regular',
  },
});
