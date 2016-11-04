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

  list_header: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#f3f3f3',
    borderColor:'#dddddd',
    borderTopWidth:1,
    borderBottomWidth:1,
    padding: 10,
    justifyContent:'space-between',
  },

  list_headerTitle: {
    color: '#666666',
    fontSize:13,
    letterSpacing: 3,
    fontWeight:'bold',
  },

  modal_list_header: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#f3f3f3',
    borderColor:'#dddddd',
    borderTopWidth:1,
    borderBottomWidth:1,
    padding: 5,
    paddingLeft:20,
    paddingRight:20,
    marginRight:-10,
    marginLeft:-10,
    height:30
  },

  icon: {
    width:16,
    height:16,
    marginRight:5,
  },

  icon_sm: {
    width:16,
    height:16,
    marginRight:3,
  },
  icon_ef: {
    width:16,
    height:16,
    marginTop:5,
    marginRight:2
  },
  icon_mon: {
    width:30,
    height:30,
  }

});

module.exports = layout