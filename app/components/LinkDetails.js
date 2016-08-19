import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class LinkDetails extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.btnClickContain}
          underlayColor='#042417'>
          <View
            style={styles.btnContainer}>
            <Icon
              name='google'
              size={20}
              color='#ffffff'
              style={styles.btnIcon}/>
            <Text style={styles.buttonText}>Login with Google</Text>
          </View>
        </TouchableHighlight>
        <View style={styles.orContainer}>
          <Text style={styles.orText}>- or -</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder='Name'/>
        <TextInput
          style={styles.searchInput}
          placeholder='Password'/>
        <TouchableHighlight style={styles.btnPTCClickContain}
        underlayColor='#99d9f4'
        >
          <Text style={styles.buttonText}>Login with Pokemon Trainer Club</Text>
        </TouchableHighlight>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',

  },

  inputContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    
    marginTop: 5,
    marginBottom: 5,
  },

  searchInput: {
    height: 36,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    color: '#666666',
    marginBottom:8,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Arial', 
    justifyContent: 'center',
    fontWeight:'bold',
  },



  ptcInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },

  btnClickContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#d34836',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  btnPTCClickContain: {
    backgroundColor:'#30a7d7',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  btnIcon: {
    height: 20,
    width: 20,
    marginRight:3,
  },

  orContainer:{
    margin:30,
  },

  orText: {
    fontSize:14, 
    color:'#333',
  }
});

module.exports = LinkDetails;