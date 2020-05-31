//Our App.js that creates the navigation and tabs for our app
import React from 'react'
// import { AppLoading, Asset, Font, Icon } from 'expo'
// import { StatusBar, StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from './node_modules/@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar, StyleSheet, View,} from 'react-native';
import HomeScreen from './screens/HomeScreen.js';
import TopPicksScreen from './screens/TopPicksScreen';
import FinalTopScreen from './screens/FinalTopScreen.js';
import StartScreen from './screens/StartScreen.js';
import WaitScreen from './screens/WaitScreen.js';
import HostWaitScreen from './screens/HostWaitScreen.js';
import { createStackNavigator } from '@react-navigation/stack';
import JoinScreen from './screens/JoinScreen.js';
import FilterScreen from './screens/FilterScreen.js';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

console.disableYellowBox = true;

function MyTabs(props) {

  //passed props for results and socket information
  const results = props.results;
  const socket = props.socket;
  const index = 0;

  return (
    <Tab.Navigator tabBarOptions={{
      //activeTintColor: '#e91e63',
      activeTintColor: '#e18a7a',
    }}>
      <Tab.Screen name="Home" component={ () => <HomeScreen results = {results} socket = {socket} index = {index}/>}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                  //color='#e18a7a'
                ),
              }}

      />

      <Tab.Screen name="Top Picks" component={ () => <TopPicksScreen results = {results} socket = {socket} index = {index}/>}
              options={{
                tabBarLabel: 'Top Picks',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
      />
       {/* <Tab.Screen name="Back" component={StartScreen}
              options={{
                tabBarLabel: 'Back',
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="account" color={color} size={size} />
                ),
              }}
      /> */}
    </Tab.Navigator>
  );
}

function Swipe(props){
  const { results } = props.route.params;
  const { socket } = props.route.params;
  return(
      <View style={styles.container}>
          <StatusBar hidden />
       <MyTabs results = {results} socket = {socket}/>
      </View>
  )
}

//Navigation set up for all of the main pages
function MyStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Top Picks" component={TopPicksScreen} />
      <Stack.Screen name="Final" component={FinalTopScreen} />
      <Stack.Screen name="Swipe" component={Swipe} />
      <Stack.Screen name="Join" component={JoinScreen} />
      <Stack.Screen name="Wait" component={WaitScreen} />
      <Stack.Screen name="HostWait" component={HostWaitScreen} />
      <Stack.Screen name="Filter" component={FilterScreen} />
    </Stack.Navigator>
  );
}


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    isLoadingComplete: false,
  }

  render() {
    return(
      <NavigationContainer>
        <MyStack />
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
    backgroundColor: '#fdf6f2',
  },
})
