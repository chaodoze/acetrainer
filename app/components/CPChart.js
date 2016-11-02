import * as _ from 'lodash-es'
import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native'
import {Text, ListItem } from 'native-base'
import {Col, Row, Grid} from "react-native-easy-grid";
import Pokemon from '../db/pokemon.js'

const CandiesRequired = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,6,6,6,6,8,8,8,8,10,10,10,10,12,12,12,12,15,15,15]
const StardustRequired = [200,200,200,200,400,400,400,400,600,600,600,600,800,800,800,800,1000,1000,1000,1000,1300,1300,1300,1300,1600,1600,1600,1600,1900,1900,1900,1900,2200,2200,2200,2200,2500,2500,2500,2500,3000,3000,3000,3000,3500,3500,3500,3500,4000,4000,4000,4000,4500,4500,4500,4500,5000,5000,5000,5000,6000,6000,6000,6000,7000,7000,7000,7000,8000,8000,8000,8000,9000,9000,9000,9000,10000,10000,10000]

export default class CPChart extends Component {
  renderLevels() {
    const {mon, trainerLevel} = this.props
    const monLevel = parseInt(mon.level,10)
    const monDoubleLevel = (monLevel-1)*2
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
    const {mon} = this.props
    if (mon.ivCandidates.length == 0) {
      return <Text>?</Text>
    }
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

CPChart.propTypes = {
  mon: React.PropTypes.instanceOf(Pokemon).isRequired,
  trainerLevel: React.PropTypes.number.isRequired,
}
var styles = StyleSheet.create({

  header4: {
    fontSize:12,
    fontWeight:'bold',
    color:'#1d484d',
    marginBottom:2,
  },

  cell: {
    fontSize:14,
  },

});
