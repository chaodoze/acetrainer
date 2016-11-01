
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  NativeAppEventEmitter,
  TouchableHighlight, TouchableOpacity
} from 'react-native';
import {Button} from 'native-base'
import MonImage from './MonImage'

var styles = StyleSheet.create({
  container: {
      backgroundColor: '#fafcf8',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      flexWrap:'wrap',
      paddingTop:30,
  },

  scroll: {
      marginTop: 64, marginBottom: 49,
  },

  mon: {
    width:120,
    height:120,
    alignItems: 'center',
    marginBottom:10,
  },

  mon_icon: {
    width:70,
    height:70,
  },

  cp: {
    flex:1,
    flexDirection: 'row',
    alignItems:'flex-end',
  },

  mon_cp: {
    fontSize:11,
    marginRight:2,
    color:'#999999',
    fontFamily: 'Roboto',

  },

  mon_cp_value: {
    fontSize:18,
    fontWeight:'bold',
    color:'#1d484d',    fontFamily: 'Roboto',

  },


  mon_label: {
    fontSize:14,
    margin:5,
    fontWeight:'bold',
    color:'#1d484d',
    fontFamily: 'Roboto-Regular',

  },

  row: {
    flex: 1,
    padding: 10,
  },

  row2: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  header: {
    flex:1,
    backgroundColor: '#50a4ff',
    padding: 10,
  },
  headerTitle: {
    color: '#fff',
  },


  separator: {
       height: 1,
       backgroundColor: '#dddddd'
   },
  listView: {
    backgroundColor: '#F5FCFF'
  }
});

export const MonList = ({mons, onMonClick})=> (
  <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      {mons.map(mon=><Mon mon={mon} key={mon.url} onPress={()=>onMonClick(mon)}/>)}
      <View style={ styles.mon }></View>
      <View style={ styles.mon }></View>
    </View>
  </ScrollView>
)

const Mon = ({mon, onPress})=> (
  <TouchableHighlight  key={mon.url} onPress={onPress} underlayColor='#ffffff'>
    <View style={ styles.mon }>
      <View style={styles.cp}>
        <Text style={ styles.mon_cp }>cp</Text>
        <Text style={ styles.mon_cp_value }>{mon.CP}</Text>
        <Text style={ styles.mon_cp }>IV</Text>
        <Text style={ styles.mon_cp_value }>{`${mon.avgIVPercent()}%`}</Text>
      </View>
      <MonImage mon={mon} style={ styles.mon_icon } resizeMode='cover' />
      <Text style={ styles.mon_label }>{mon.Name}</Text>
    </View>
  </TouchableHighlight>
)
