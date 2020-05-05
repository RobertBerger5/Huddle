import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import io from "socket.io-client";

import socketIO from 'socket.io-client'

const socket = socketIO('http://173.28.80.230:3000', {
transports: ['websocket'], jsonp: false });

var results;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //192.168.0.44
    //173.28.80.230
    //this.socket = io("173.28.80.230:3000");
    //this.socket.emit('create','restaurant');

    socket.connect();
    socket.on('connect', () => {
      console.log('connected to socket server');
    });
    socket.on('disconnect', () => {
      console.log('connection to server lost');
    });
    socket.on('results',(results)=>{
			console.log(results);
			for(let i=0;i<results.candidates.length;i++){
			     let loc=results.candidates[i];
			}
		});



  }

  render() {
    return (
    <View>
      <Button
          title="Create room"
          onPress={() => socket.emit('create','test')}
        />
      <Button
          title="Create room"
          onPress={() => socket.emit('join','test')}
        />
        <Image source={{uri: 'https://lh3.googleusercontent.com/p/AF1QipMuySbl5fYeoVvrvXzprK_Mh0yEN961I4nwt_8b=s1600-w400'}} style = {{height: 200, resizeMode : 'stretch', margin: 5 }} />
    </View>
  );
}
}
