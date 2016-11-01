import React, { Component } from 'react';
import {Image} from 'react-native'
import Pokemon from '../db/pokemon.js'

export default MonImage = ({mon, children, ...rest})=>{
  let uri = mon.specie() ? `pokemon_cc/${mon.specie().id}.png` : mon.url
  return (
    <Image source={{uri}} {...rest}>
      {children}
    </Image>
  )
}

MonImage.propTypes = {
  mon: React.PropTypes.instanceOf(Pokemon).isRequired
}
