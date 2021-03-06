import React from 'react';
import {StyleSheet} from 'react-native'
import {Badge, Icon} from 'native-base'
import myTheme from './Themes/myTheme';

export default MonTypeBadge = ({pokemonType, stab}) => {
  if (pokemonType) {
    const showStab = stab && <Icon name='star' style={styles.grade_icon} />

    const style = `t_${pokemonType.displayName.toLowerCase()}`
    return (
        <Badge theme={myTheme} style={[styles[style], styles.type]}>
          {pokemonType.displayName} {showStab}
        </Badge>
    )
  }
  else {
    return <Badge style={styles.t_unknown}>?</Badge>
  }
}

var styles = StyleSheet.create({

  grade_icon: {
    fontSize: 12, color:'#ffffff',
  },

  type: { marginRight:2, marginBottom:2,},
  t_normal: { backgroundColor:'#a8a878'},
  t_fighting: { backgroundColor:'#c02038'},
  t_flying: { backgroundColor:'#a28ae7'},
  t_poison: { backgroundColor:'#a040a0'},
  t_ground: { backgroundColor:'#e0c068'},
  t_rock: { backgroundColor:'#b8a038'},
  t_bug: { backgroundColor:'#a8b820'},
  t_ghost: { backgroundColor:'#705898'},
  t_steel: { backgroundColor:'#b8b8d0'},
  t_fire: { backgroundColor:'#f08030'},
  t_water: { backgroundColor:'#6890f0'},
  t_grass: { backgroundColor:'#78c850'},
  t_electric: { backgroundColor:'#f8d030'},
  t_psychic: { backgroundColor:'#f85888'},
  t_ice: { backgroundColor:'#5bc0de'},
  t_dragon: { backgroundColor:'#7038f8'},
  t_dark: { backgroundColor:'#705848'},
  t_fairy: { backgroundColor:'#ee99ac'},
  t_unknown: { backgroundColor:'#cccccc'},

});
