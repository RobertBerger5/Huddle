//the page when waiting for users to join and host to start
//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import io from "socket.io-client";
import socketIO from 'socket.io-client';

const socket = socketIO('http://192.168.0.44:3000', {
transports: ['websocket'], jsonp: false });

class WaitScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);
      this.state = {names: 0};
      socket.on('other_joined',(n)=>{
  			this.setState({names: n});
  		});
    }

  joinFunc = () => {
    alert("yooo");
}
//Our main render
render() {

    return (
// FFE5CC
//'#87bdd8'
//#667292
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{marginVertical:50, marginHorizontal:20, justifyContent: 'center'}}>
        <View style={[styles.box, {flex:1.5, justifyContent: 'center', marginTop: 60}]}>
        <Text style={{color: 'white', fontSize: RFPercentage(5), textAlign: 'center', paddingBottom: 30, paddingHorizontal: 10}}>Waiting for host to start the session...</Text>
        </View>
        <View style={{flex:3.5, justifyContent: 'flex-top', marginVertical:50}}>
        <Text style={[styles.appName, {paddingBottom: 30}]}>Total People in Room:</Text>
        <Text style={styles.appName}>{this.state.names}</Text>
        </View>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('Join')}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>Back</Text>
        </TouchableOpacity> */}
        </View>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
    //fontFamily: "Chalkduster",
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
    color: '#a78d8a',
    textAlign: 'center',
    //: #8d9db6d
    //#f1e3dd
    //padding: 40,
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

export default WaitScreen
