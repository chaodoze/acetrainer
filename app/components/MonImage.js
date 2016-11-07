import React, { Component } from 'react';
import {Image} from 'react-native'
import Pokemon from '../db/pokemon.js'

export default MonImage = ({mon, children, ...rest})=>{
  const specie = mon.specie()
  let uri = specie ? specie.iconUrl() : mon.url
  return (
    <Image source={{uri}} {...rest}>
      {children}
    </Image>
  )
}

MonImage.propTypes = {
  mon: React.PropTypes.instanceOf(Pokemon).isRequired
}
