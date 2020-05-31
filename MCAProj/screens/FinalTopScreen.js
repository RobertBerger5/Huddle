import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from 'react-native-material-dropdown';
import io from "socket.io-client";
import socketIO from 'socket.io-client';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-check-box';
import TopPicksScreen from './TopPicksScreen';

class FinalTopScreen extends React.Component {
  constructor(props) {
    super(props);
    const { socket } = this.props.route.params;
    const {results } = this.props.route.params;
    this.socket = socket;
  }

  render () {
    return (
      <TopPicksScreen results = {results} socket = {socket} index = {index}/>
    )
  }
}

export default FinalTopScreen;