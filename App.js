import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

// Imported Screens
import homeScreen from './app/screens/homeScreen.js'

const RootStack = createBottomTabNavigator({
  Home: {
    screen: homeScreen
  }
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  })

const App = createAppContainer(RootStack)

export default App