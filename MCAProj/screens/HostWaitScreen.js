//the page where the person who started the session has the code and can see what users have joined and start the game


//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import io from "socket.io-client";
import socketIO from 'socket.io-client';

class HostWaitScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);
      const { roomCode } = this.props.route.params;
      const { socket } = this.props.route.params;

      var results;

      this.state = {names: 1, code: roomCode};
      this.socket = socket;

      this.socket.on('other_joined',(n)=>{
        this.setNum(n);
      });

      this.socket.on('results', (r) => {
        results = r;
      });

      this.socket.on('started',()=>{
        console.log('started');
        this.props.navigation.navigate('Swipe', {result: results, socket: socket});
      });

    }

    //set the number of people
    setNum = (n) => {
      this.setState({names: n});
    }

  startFunc = () => {
    alert("Started Game!");
  }
//Our main render
render() {

    return (
// FFE5CC
//'#87bdd8'
//#667292
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center',}}>
        <View style={{marginVertical: 10, marginHorizontal: 40, justifyContent: 'space-between'}}>
        <View style={[styles.box, {justifyContent: 'center', marginTop: 5}]}>
        <Text style={{color: '#a78d8a', fontSize: RFPercentage(6), textAlign: 'center', fontWeight: 'bold', padding: 20}}>Room Code: {this.state.code}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.socket.emit('start')}>
          <Text style={{fontWeight: 'bold',  fontSize: 20, textAlign:'center'}}>Start</Text>
        </TouchableOpacity>
        {/*<Text style={{fontSize:12,textAlign:'center'}}>(Make sure your friends are all in before starting)</Text>*/}
        <Text style={styles.appName}>Total People in Room:</Text>
        <Text style={styles.appName}>{this.state.names}</Text>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('Start')}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>Back</Text>
        </TouchableOpacity> */}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
    //fontFamily: "Chalkduster",
    fontSize: RFPercentage(4),
    // fontSize: 35,
    fontWeight: 'bold',
    color: '#a78d8a',
    textAlign: 'center',
    //: #8d9db6
    //#f1e3dd
    // padding: 20,
  },
  btn: {
    // #daebe8
    backgroundColor: '#e18a7a',
    borderColor: 'grey',
    borderWidth: 0,
    borderRadius: 12,
    color: 'black',
    overflow: 'hidden',
    padding: 20,
    textAlign:'center',
    margin: 20,
  },
  box: {
    backgroundColor: '#c0d8e3',
    borderRadius: 12,
    paddingVertical: 50,
  }
});

export default HostWaitScreen
