import { AppLoading, Asset, Font, Icon } from 'expo'
import React from 'react'
import { StatusBar, StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from './node_modules/@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './screens/HomeScreen.js';
import TopPicksScreen from './screens/TopPicksScreen';



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: '#e91e63',
    }}>
      <Tab.Screen name="Home" component={HomeScreen} 
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
              }}
      
      />
      <Tab.Screen name="Top Picks" component={TopPicksScreen} 
              options={{
                tabBarLabel: 'Top Picks',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
      />
    </Tab.Navigator>
  );
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    return(
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar hidden />
       <MyTabs/>
      </View>
      </NavigationContainer>
    )

  }



  _handleLoadingError = error => {

    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})