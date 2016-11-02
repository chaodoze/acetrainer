
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  NativeAppEventEmitter,
  TouchableHighlight, TouchableOpacity
} from 'react-native';
import {
  Container, Content, List, ListItem, Text, InputGroup,
  Input, Icon, Badge, Button } from 'native-base';
import PercentageCircle from 'react-native-percentage-circle';
import myTheme from './Themes/myTheme';
import MonImage from './MonImage'

var styles = StyleSheet.create({

  outerContainer: {
    backgroundColor: '#fafcf8',
    marginTop: 34,
  },

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexWrap:'wrap',
    paddingTop:40,
    marginLeft:10,
    marginRight:10,
  },

  mon: {
    width:110,
    height:120,
    alignItems: 'center',
    marginBottom:25,
    borderColor:'#ffffff',
    borderWidth:1,
    justifyContent:'flex-start',

  },

  unknownMon: {
    marginTop:0,
    width:90,
    height:90,
  },

  mon_icon: {
    width:70,
    height:70,
    marginTop:-5,
    marginBottom:-8,
  },

  unknown_icon: {
    width:68,
    height:100,
    marginBottom:10,
  },

  cp: {
    flexDirection:'row', 
    alignItems:'center'
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
    color:'#1d484d',    
    fontFamily: 'Roboto',
  },

  mon_label: {
    fontSize:14,
    margin:5,
    marginTop:0,
    fontWeight:'bold',
    color:'#1d484d',
    fontFamily: 'Roboto-Regular',
  },

  stats: {
    marginTop:-5, 
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center',
  },

  icon: {
    width:10,
    height:10,
    opacity:0.6,
    marginLeft:3,
    marginRight:2,
  },

  statsText: {
    fontSize:12,
    color:'#888888',
    fontFamily: 'Roboto-Regular',
  },

  linkcolor: {
    color:'#1d8696',
  },

  alert: {
    backgroundColor: '#fcf8e3', 
    borderColor: '#faebcc', 
    padding:5,
    margin:10, 
    marginTop:40, 
    marginBottom:-30, 
    borderColor:'#faebcc', 
    borderWidth:1, 
    borderRadius:5
  },
  alertHeader: {
    color: '#8a6d3b', fontSize:14, textAlign:'center'
  },
  errorThumbs: {
    flexDirection:'row', 
    marginTop:10, 
    marginBottom:10, 
    flexWrap:'wrap', 
    alignItems:'flex-start',
  }
});

export const MonList = ({mons, onMonClick})=> (
  <Container style={styles.outerContainer}>
    <Content theme={myTheme}>
      <View style={styles.alert}>
        <Text style={styles.alertHeader}>Sorry, we couldn't read these screenshots correctly. Can you help us fix it?</Text>
        <View style={styles.errorThumbs}>
          <TouchableHighlight>
            <Image style={ styles.unknown_icon } source={require('./images/Thumbs/thumb10.png')} resizeMode='contain' />
          </TouchableHighlight>
          <TouchableHighlight>
            <Image style={ styles.unknown_icon } source={require('./images/Thumbs/thumb3.png')} resizeMode='contain' />
          </TouchableHighlight>
          <TouchableHighlight>
            <Image style={ styles.unknown_icon } source={require('./images/Thumbs/thumb4.png')} resizeMode='contain' />
          </TouchableHighlight>
          <TouchableHighlight>
            <Image style={ styles.unknown_icon } source={require('./images/Thumbs/thumb5.png')} resizeMode='contain' />
          </TouchableHighlight>
          <TouchableHighlight>
            <Image style={ styles.unknown_icon } source={require('./images/Thumbs/thumb6.png')} resizeMode='contain' />
          </TouchableHighlight>
        </View>
        <Button small disabled>Or delete all</Button>
      </View>
      <View style={styles.container}>
        {mons.map(mon=><Mon mon={mon} key={mon.url} onPress={()=>onMonClick(mon)}/>)}
        <View style={ styles.mon }></View>
        <View style={ styles.mon }></View>
      </View>
    </Content>
  </Container>
)

const Mon = ({mon, onPress})=> (
  <TouchableHighlight  key={mon.url} onPress={onPress} underlayColor='#ffffff'>
    <View style={ styles.mon }>
      <View style={styles.cp}>
        <Text style={ styles.mon_cp }>cp</Text>
        <Text style={ styles.mon_cp_value }>{mon.CP}</Text>
      </View>
      <MonImage mon={mon} style={ styles.mon_icon } resizeMode='cover' />
      <Text style={ styles.mon_label }>{mon.Name}</Text>
      <View style={styles.stats}>
        <Image source={require('./images/icons/sword.png')} style={styles.icon} />
        <Text style={styles.statsText}>A</Text>
        <Image source={require('./images/icons/shield.png')} style={styles.icon} />
        <Text style={styles.statsText}>B</Text>
        <View style={{width:20, height:20, marginLeft:5}}>
          <PercentageCircle radius={10} percent={mon.avgIVPercent()} color={"#3498db"} textStyle={{fontSize: 7}}></PercentageCircle>  
        </View>              
      </View> 
    </View>
  </TouchableHighlight>


)
