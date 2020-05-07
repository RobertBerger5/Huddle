//this is the main page
import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from 'react-native-material-dropdown';

class StartScreen extends React.Component {
    //Default constructor
    constructor() {
      super()
    }

    startFunc = () => {
      alert("yooo");
  }

  joinFunc = () => {
   // alert("you joined!");
   navigation.navigate('Join')
  }

//Our main render
render() {
    return (
// FFE5CC
//'#87bdd8'
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center',}}>
        <View style={{ flex: 2.5, justifyContent: 'flex-end'}}>
        <Text style={styles.appName}>Convenir</Text>
        </View>

        <View style={{ flex: 3.5, justifyContent: 'flex-start'}}>
        {/* Start Game button */}
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('Filter')}>
          <Text style={{fontWeight: 'bold',  fontSize: 20}}>Start Game</Text>
        </TouchableOpacity>

        {/* Join game button */}
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() =>  this.props.navigation.navigate('Join')}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Join Game</Text>
        </TouchableOpacity>
        
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
    //fontFamily: 'Chalkduster',
    //fontSize: 75,
    fontSize: RFPercentage(9.5),
    fontWeight: 'bold',
    color: '#a78d8a', 
    padding: 40, 
  },
  btn: {
    // #daebe8
    backgroundColor: '#e18a7a',
    //borderColor: 'grey',
    //borderWidth: 0,
    borderRadius: 12,
    color: '#a78d8a',
    overflow: 'hidden',
    padding: 20,
    textAlign:'center',
    margin: 20,
  }
});

export default StartScreen