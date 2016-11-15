import React, { Component } from 'react';
import { AppRegistry, Alert } from 'react-native';
import AppIntro from 'react-native-app-intro';


class Splash extends Component {
  onSkipBtnHandle = (index) => {
    Alert.alert('Skip');
    console.log(index);
  }
  doneBtnHandle = () => {
    Alert.alert('Done');
  }
  nextBtnHandle = (index) => {
    Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }
  render() {
    const pageArray = [{
      title: 'Take Screenshots',
      description: 'While in Pokémon Go, take screenshots of the Pokémon you want to find out more about.',
      img: require('./images/splash/one.png'),
      imgStyle: {
        height: 106 * 2.5,
        width: 130 * 2.5,
      },
      backgroundColor: '#eb8c40',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Lauch App',
      description: 'Screenshots will be imported automatically. See the stats such as IV and attack/defense grade instantly.',
      img: require('./images/splash/two.png'),
      imgStyle: {
        height: 110 * 2.5,
        width: 135 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Find out more than IV',
      description: 'Click on each mon and find out if it has good movesets and what it\'s strong against.',
      img: require('./images/splash/three.png'),
      imgStyle: {
        height: 110 * 2.5,
        width: 135 * 2.5,
      },
      backgroundColor: '#49AEC0',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Know how much it costs to power up',
      description: 'Even with high IV, spending thousands of Stardust might not be worth to power up. Easily find out from the chart.',
      img: require('./images/splash/four.png'),
      imgStyle: {
        height: 110 * 2.5,
        width: 135 * 2.5,
      },
      backgroundColor: '#DD577A',
      fontColor: '#fff',
      level: 10,
    },



    ];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}

module.exports = Splash;
