//this is the main page
import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from 'react-native-material-dropdown';
import io from "socket.io-client";
import socketIO from 'socket.io-client';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-check-box'

//'http://65.128.45.107:3000'
//'http://192.168.0.44:3000'

const serverip = 'http://65.128.45.107:3000';

var {height, width} = Dimensions.get('window');


class StartScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);
     // this.state = {isModalVisible: false};
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

      this.state ={
        isModalVisible: false,
        isChecked: false
      }
  
    }

  joinFunc = () => {
   // alert("you joined!");
   navigation.navigate('Join')
  }

toggleModal = () => {
  var bool = this.state.isModalVisible;
  this.setState({isModalVisible: !bool});
  };



//Our main render
render() {

 // var isModalVisible = false;
    return (
// FFE5CC
//'#87bdd8'
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center',}}>

      <View style={{ flex: 1, marginTop: height * 0.08, paddingLeft: width * 0.80, marginRight: 5}}>
          <Icon
          name="cog"
          color='#a78d8a'
          size={35}
         onPress={this.toggleModal}></Icon>
        {/* onPress={() => this.setState({isModalVisible: true})}></Icon> */}
        
        <Modal 
        isVisible={this.state.isModalVisible}
        deviceWidth={width}
        deviceHeight={height}
        color = 'white'
        >
          <View style={{flex: 1, margin: 20, justifyContent: 'center'}}>
            <View style={{backgroundColor: '#fdf6f2', borderRadius: 12, padding: 20}}>
            <View style={{ flexDirection: 'row', justifyContent: 'center',  alignItems: 'center'}}>
            <Text style={{color: '#a78d8a', fontSize: RFPercentage(3)}}>Wheelchair Accessible</Text>
            <CheckBox
              style={{flex: 1, padding: 10, margin: 10, color:'#a78d8a' }}
              onClick={()=>{this.setState({isChecked:!this.state.isChecked})}}
              isChecked={this.state.isChecked}
              />
              </View>
            <Button title="Close" onPress={this.toggleModal} color='#e18a7a' />
            </View>
          </View>
        </Modal>



      </View>
      <View style={{ flex: 1.5, justifyContent: 'flex-end'}}>
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
    padding: 20,
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

export default StartScreen;
