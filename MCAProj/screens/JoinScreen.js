//the page to join a session and enter a code
//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import io from "socket.io-client";
import socketIO from 'socket.io-client';

class JoinScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);

      this.state = {text: ''};
      global.socket.on('join_ack', () => {
  			console.log('joined');
        this.props.navigation.navigate('Wait');
      });
    }

render() {
  console.log("rendering");

    return (
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center',}}>
         <View style={{marginTop: 50, marginBottom: 50, marginRight: 20, marginLeft: 20}}>
        <Text style={styles.appName}>Enter Room Code:</Text>
        <TextInput
          style={{height: Platform.OS == 'android' ? 80 : 40, paddingLeft: 15, paddingRight: 15, textAlign: 'center'}}
          placeholder="code"
          //fontSize = '30px' //for some reason this line breaks the android version, I'll just comment it out for now
          onChangeText = {(text) => this.setState({text})}
          value={this.state.text}
          />
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => global.socket.emit('join', this.state.text) }>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Join</Text>
        </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: RFPercentage(5),
    fontWeight: 'bold',
    color: '#a78d8a',
    padding: 40,
  },
  btn: {
    backgroundColor: '#e18a7a',
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

export default JoinScreen
