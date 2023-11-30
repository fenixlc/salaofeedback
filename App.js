import React from 'react';
import { StatusBar, StyleSheet } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';


export default function App() {
  return (
    <NavigationContainer style={Styles.container}>
      <StatusBar backgroundColor="#FFc0cb" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}

const Styles = StyleSheet.create({
  container:{
    flex:1
  }
})


