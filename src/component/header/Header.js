import { View, Text, StyleSheet,Dimensions } from 'react-native'
import React from 'react'
const {width,height}= Dimensions.get('screen');

const Header = () => {
  return (
    <View style={{width:width * 1.0,backgroundColor:'#000000'}}>
      <Text style={styles.header}>Github Repo+</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
      fontSize: width * 0.05 ,
      fontWeight: 'bold',
      alignSelf:'flex-start',
      paddingVertical:12,
      paddingLeft:15,
      color:'#ffffff',
      
    }
  });

export default Header