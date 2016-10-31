import * as _ from 'lodash-es'
import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native'
import {Text, ListItem } from 'native-base'
import {Col, Row, Grid} from "react-native-easy-grid";

const CandiesRequired = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,6,6,6,6,8,8,8,8,10,10,10,10,12,12,12,12,15,15,15]
const StardustRequired = [200,200,200,200,400,400,400,400,600,600,600,600,800,800,800,800,1000,1000,1000,1000,1300,1300,1300,1300,1600,1600,1600,1600,1900,1900,1900,1900,2200,2200,2200,2200,2500,2500,2500,2500,3000,3000,3000,3000,3500,3500,3500,3500,4000,4000,4000,4000,4500,4500,4500,4500,5000,5000,5000,5000,6000,6000,6000,6000,7000,7000,7000,7000,8000,8000,8000,8000,9000,9000,9000,9000,10000,10000,10000]

export default class CPChart extends Component {
  renderLevels() {
    const {mon} = this.props
    const monLevel = parseInt(mon.level,10)
    const monDoubleLevel = (monLevel-1)*2
    const trainerLevel = parseInt(this.props.trainerLevel,10)
    const accumReq = (level,array)=>{
      const doubleLevel = (level-1)*2
      return _.range(monDoubleLevel+1, doubleLevel).reduce((accum,lvl)=>accum+array[lvl], array[monDoubleLevel])
    }
    const levels = _.range(monLevel+0.5, Math.min(trainerLevel+3,40.5),0.5)
    levels.push(40)
    return levels.map((level,index)=>(
      <ListItem key={level}>
        <Grid>
          <Col size={2}><Text style={styles.cell}>{level}</Text></Col>
          <Col size={3}><Text style={styles.cell}>{(level-monLevel)/0.5}</Text></Col>
          <Col size={3}><Text style={styles.cell}>{accumReq(level,StardustRequired)}</Text></Col>
          <Col size={2}><Text style={styles.cell}>{accumReq(level,CandiesRequired)}</Text></Col>
          <Col size={1}><Text style={styles.cell}>{mon.cpForLevel(level)}</Text></Col>
        </Grid>
      </ListItem>
    ))
  }
  render() {
    return (
      <View>
        <ListItem>
          <Grid>
            <Col size={2}><Text style={styles.header4}>Level</Text></Col>
            <Col size={3}><Text style={styles.header4}># of Power Ups</Text></Col>
            <Col size={3}><Text style={styles.header4}>Stardusts</Text></Col>
            <Col size={2}><Text style={styles.header4}>Candies</Text></Col>
            <Col size={1}><Text style={styles.header4}>CP</Text></Col>
          </Grid>
        </ListItem>
        {this.renderLevels()}
      </View>
    )
  }
}

var styles = StyleSheet.create({

  parallelContainer: {
    flex: 1,
    backgroundColor: 'black'
  },

  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },

  sectionMonText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
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
    padding:5, borderBottomWidth:0,
  },

  mon_analysis: {
    backgroundColor:'#ffffff',
  },
  last_row: {
     paddingTop:15,
     paddingBottom:15,
     borderBottomWidth:0,
  },

  defence: { opacity:0.3, marginLeft:30},

  many_types: { flexWrap:'wrap', flexDirection:'row', marginLeft:-3, },

  header4: {
    fontSize:12,
    fontWeight:'bold',
    color:'#1d484d',
    marginBottom:2,
  },

  cell: {
    fontSize:13,
  },

  linkcolor: {
    color:'#1d8696',
  },

  mon_stat: {
    fontSize:12,
    marginRight:2,
    color:'#999999',
    fontFamily: 'Roboto',
  },

  mon_stat_value: {
    paddingRight:10,
    fontSize:16,
  },

});
