import React, { Component } from 'react';
import {Image} from 'react-native'
import Pokemon from '../db/pokemon.js'

export default MonImage = ({mon, useScreenshot=false, children, ...rest})=>{
  const specie = mon.specie()
  let uri = specie && !useScreenshot ? specie.iconUrl() : mon.url
  return (
    <Image source={{uri}} {...rest}>
      {children}
    </Image>
  )
}

MonImage.propTypes = {
  mon: React.PropTypes.instanceOf(Pokemon).isRequired
}
