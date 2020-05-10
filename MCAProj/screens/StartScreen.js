//this is the main page
import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from 'react-native-material-dropdown';
import io from "socket.io-client";
import socketIO from 'socket.io-client';


//'http://65.128.45.107:3000'

const serverip = 'http://192.168.0.44:3000';

class StartScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);
      this.socket = socketIO(serverip, {
      transports: ['websocket'], jsonp: false });

      this.socket.connect();
      console.log('connect!');

      this.socket.on('connect', () => {
        console.log('connected to socket server');
      });

      this.socket.on('disconnect', () => {
        console.log('connection to server lost');
      });
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
          onPress =  {() => this.props.navigation.navigate('Filter', {socket: this.socket})}>
          <Text style={{fontWeight: 'bold',  fontSize: 20}}>Create Room</Text>
        </TouchableOpacity>

        {/* Join game button */}
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() =>  this.props.navigation.navigate('Join', {socket: this.socket})}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Join Room</Text>
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
