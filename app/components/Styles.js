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

  modal_outer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1, justifyContent: 'center',padding: 20,
  },
  modal_inner: {
    backgroundColor: '#fff', padding: 10, borderRadius: 10,
  },

  choice_title: {
    flexWrap: 'wrap',  
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection:'row', 
    padding:10, 
    borderBottomWidth:1, 
    borderColor:'#cccccc',
    borderTopWidth:0, 
    borderLeftWidth:0, 
    borderRightWidth:0, 
    padding: 10,
    marginLeft:-10,
    marginRight:-10
  },

  choice_title_text: {
    color: '#666666',
    fontSize:13,
    letterSpacing: 3,
    fontWeight:'bold',
  },

  choice: {
  textAlign:'center', color:'#2182f7'
  },

  cancel_box: {
    backgroundColor: '#fff', padding: 10, borderRadius: 10,alignItems: 'center', marginTop:5,
  },

  cancel_text: {
    color:'#666666',
  },

  smallText: {
    fontSize:12,
    textAlign:'center',
    paddingRight:12,
    paddingLeft:12,
    paddingTop:10,
  },

  fixedClose: {
    position: 'absolute',
    top: 0,
    right: 5,
  },


});

module.exports = layout