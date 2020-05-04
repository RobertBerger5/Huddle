//this is the main page
import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

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
      <View style={{ flex: 1, backgroundColor: '#667292', justifyContent: 'center',
      alignItems: 'center',}}>
        <View style={{ flex: 2.5, justifyContent: 'flex-end'}}>
        <Text style={styles.appName}>Convenir</Text>
        </View>

        <View style={{ flex: 3.5, justifyContent: 'flex-start'}}>
        {/* Start Game button */}
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('HostWait')}>
          <Text style={{fontWeight: 'bold',  fontSize: 20}}>Start Game</Text>
        </TouchableOpacity>

        {/* Join game button */}
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() =>  this.props.navigation.navigate('Join')}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Join Game</Text>
        </TouchableOpacity>

        {/* <GoToButton navigation screenName="Join" title="Join Game"/> */}
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontFamily: "Chalkduster", 
    fontSize: 75, 
    fontWeight: 'bold',
    color: '#bccad6', 
    padding: 40, 
  },
  btn: {
    // #daebe8
    backgroundColor: '#f1e3dd',
    borderColor: 'grey',
    borderWidth: 0,
    borderRadius: 12,
    color: 'black',
    overflow: 'hidden',
    padding: 20,
    textAlign:'center',
    margin: 20,
  }
});

export default StartScreen