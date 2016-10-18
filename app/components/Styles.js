import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';


const layout = StyleSheet.create({
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
});

module.exports = layout