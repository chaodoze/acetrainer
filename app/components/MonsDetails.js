
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight, TouchableOpacity

} from 'react-native';


var styles = StyleSheet.create({
  container: {
      backgroundColor: '#fafcf8',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-around',
      flexWrap:'wrap',
      paddingTop:10,
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

class MonsDetails extends Component {

  gotoNext() {
   this.props.navigator.push({
      component: OptionOne,
      passProps: {
        id: 'MY ID',
      },
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableHighlight  onPress={ () => this.gotoNext() }>
            <View style={ styles.mon }>
              <View style={styles.cp}>
                <Text style={ styles.mon_cp }>cp</Text>
                <Text style={ styles.mon_cp_value }>1307</Text>
                <Text style={ styles.mon_cp }>IP</Text>
                <Text style={ styles.mon_cp_value }>98%</Text>
              </View>
              <Image style={ styles.mon_icon } source={require('./images/Pokemon/134LfOzBxH.png')} resizeMode='cover' />
              <Text style={ styles.mon_label }>Vaporeon</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  onPress={ () => this.gotoNext() }>
            <View style={ styles.mon }>
              <View style={styles.cp}>
                <Text style={ styles.mon_cp }>cp</Text>
                <Text style={ styles.mon_cp_value }>1207</Text>
                <Text style={ styles.mon_cp }>IP</Text>
                <Text style={ styles.mon_cp_value }>96%</Text>
              </View>
              <Image style={ styles.mon_icon } source={require('./images/Pokemon/002DCaYciP.png')} resizeMode='contain' />
              <Text style={ styles.mon_label }>Ivysaur</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  onPress={ () => this.gotoNext() }>
            <View style={ styles.mon }>
              <View style={styles.cp}>
                <Text style={ styles.mon_cp }>cp</Text>
                <Text style={ styles.mon_cp_value }>1307</Text>
              </View>
              <Image style={ styles.mon_icon } source={require('./images/Pokemon/004MNzvfqa.png')} resizeMode='contain' />
              <Text style={ styles.mon_label }>Charzard</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  onPress={ () => this.gotoNext() }>
            <View style={ styles.mon }>
              <View style={styles.cp}>
                <Text style={ styles.mon_cp }>cp</Text>
                <Text style={ styles.mon_cp_value }>1307</Text>
              </View>
              <Image style={ styles.mon_icon } source={require('./images/Pokemon/001ymJUN7U.png')} resizeMode='contain' />
              <Text style={ styles.mon_label }>Balbasaur</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  onPress={ () => this.gotoNext() }>
            <View style={ styles.mon }>
              <View style={styles.cp}>
                <Text style={ styles.mon_cp }>cp</Text>
                <Text style={ styles.mon_cp_value }>1307</Text>
              </View>
              <Image style={ styles.mon_icon } source={require('./images/Pokemon/002DCaYciP.png')} resizeMode='contain' />
              <Text style={ styles.mon_label }>Ivysaur</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  onPress={ () => this.gotoNext() }>
            <View style={ styles.mon }>
              <View style={styles.cp}>
                <Text style={ styles.mon_cp }>cp</Text>
                <Text style={ styles.mon_cp_value }>1307</Text>
              </View>
              <Image style={ styles.mon_icon } source={require('./images/Pokemon/004MNzvfqa.png')} resizeMode='contain' />
              <Text style={ styles.mon_label }>Charzard</Text>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}
 
module.exports = MonsDetails;

