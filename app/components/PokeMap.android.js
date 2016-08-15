import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native';

import MapDetail from './MapDetail'

var styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
 
class PokeMap extends Component {
render() {
  const routes = [
    {title: 'First Scene', index: 0},
    {title: 'Second Scene', index: 1},
  ];
  return (
    <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) =>
        <TouchableHighlight onPress={() => {
          if (route.index === 0) {
            navigator.push(routes[1]);
          } else {
            navigator.pop();
          }
        }}>
        <Text>Hello {route.title}!</Text>
        </TouchableHighlight>
      }
        navigationBar={
     <Navigator.NavigationBar
       routeMapper={{
         LeftButton: (route, navigator, index, navState) =>
          { return (<Text style={{padding:5, paddingTop:10, fontWeight:"bold", color:"#ffffff"}}>Cancel</Text>); },
         RightButton: (route, navigator, index, navState) =>
           { return (<Text style={{padding:5,paddingTop:10}}>Done</Text>); },
         Title: (route, navigator, index, navState) =>
           { return (<Text style={{padding:5,paddingTop:10}}>Awesome Nav Bar</Text>); },
       }}
       style={{backgroundColor: '#50a4ff', padding:20, borderBottomColor: '#48209A',
      borderBottomWidth: 1}}
     />
  }
      style={{padding: 100}}
    />
  );
}
}
 
module.exports = PokeMap;