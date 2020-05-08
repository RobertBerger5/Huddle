//the page to set preferences
//the page to join a session and enter a code
//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import Icon from 'react-native-vector-icons/FontAwesome';
//import { Icon } from 'react-native-elements'
//import Icon from 'react-native-ionicons'

import io from "socket.io-client";
import socketIO from 'socket.io-client';

const socket = socketIO('http://192.168.0.44:3000', {
transports: ['websocket'], jsonp: false });

class FilterScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props)
      this.state = {text: ''};
      socket.on('created',(id)=>{
        console.log('created room '+id);
        this.props.navigation.navigate('HostWait', {roomCode: id});
      });
    }

//   joinFunc = () => {
//     alert("yooo");
// }
// setSelectedValue = (item) => {
//   alert("item set");
// }


//Our main render
render() {

  let data = [{
    value: 'Restaurants',
  }, {
    value: 'Bars',
  }, {
    value: 'Cafes',
  }];

  let range = [{
    value: '5 Miles',
  }, {
    value: '15 Miles',
  }, {
    value: '25 Miles',
  }];

  let rate = [{
    value: '*',
    },{
    value: '**',
  }, {
    value: '***',
  }, {
    value: '****',
  },{
    value: '*****',
  }];

  let price = [{
    value: '$',
  }, {
    value: '$$',
  }, {
    value: '$$$',
  }];

    return (
// FFE5CC
//'#87bdd8'
//#667292
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center'}}>
        <View style={{marginTop: 50, marginBottom: 50, marginRight: 50, marginLeft: 50}}>
        {/* <View style={{ flex: 1, justifyContent: 'center'}}> */}
        {/* <Text style={[styles.appName, {marginTop: 50}]}>Type of place you want to go:</Text> */}
        <Text style={styles.appName}>Place Type:</Text>

        <Dropdown
        style={styles.drop}
        label='Place Type'
        data={data}
        />
        {/* </View> */}
        {/* <View style={{ flex: 1, justifyContent: 'center'}}> */}
        <Text style={styles.appName}>Max distance from you:</Text>
        <Dropdown
        style={styles.drop}
        label='Distance'
        data={range}
        />
        {/* </View> */}
        {/* <View style={{ flex: 1, justifyContent: 'center'}}> */}
        <Text style={styles.appName}>Minimum rating:</Text>
        <Dropdown
        style={styles.drop}
        label='Rating'
        data={rate}
        />
        {/* </View> */}
        {/* <View style={{ flex: 1, justifyContent: 'center'}}> */}
        <Text style={styles.appName}>Price Range:</Text>
        <Dropdown
        style={styles.drop}
        label='Price'
        data={price}
        />
        {/* </View> */}
        {/* <View style={{ flex: 1, justifyContent: 'center'}}> */}
        <TouchableOpacity
          style={styles.btn}
          //onPress =  {() => this.props.navigation.navigate('HostWait')}>
          onPress = {() => {socket.emit('create', 'restaurant');}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>Next</Text>
        </TouchableOpacity>

        {/* </View> */}
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
   // fontFamily: "Chalkduster",
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    color: '#a78d8a',
    //: #8d9db6
    //#f1e3dd
    padding: 5,
    paddingTop: 15,
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
  drop: {
    //fontSize: 80,
    // paddingRight: 40,
    // paddingLeft: 40,
    // paddingBottom: 10,
  }
});

export default FilterScreen
