
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
import {Actions} from 'react-native-router-flux'

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

export const MonList = ({mons})=> (
  <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      {mons.map(mon=><Mon stats={mon} key={mon.url} />)}
      <Button rounded info onPress={Actions.mondetails}>Monster Details</Button>
    </View>
  </ScrollView>
)

const Mon = ({stats})=> (
  <TouchableHighlight  key={stats.url}>
    <View style={ styles.mon }>
      <View style={styles.cp}>
        <Text style={ styles.mon_cp }>cp</Text>
        <Text style={ styles.mon_cp_value }>{stats.CP.trim()}</Text>
        <Text style={ styles.mon_cp }>IV</Text>
        <Text style={ styles.mon_cp_value }>98%</Text>
      </View>
      <Image style={ styles.mon_icon } source={{uri:stats.url}} resizeMode='cover' />
      <Text style={ styles.mon_label }>{stats.Name.trim()}</Text>
    </View>
  </TouchableHighlight>
)
