//the page where the person who started the session has the code and can see what users have joined and start the game


//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';

class HostWaitScreen extends React.Component {
    //Default constructor
    constructor() {
      super()
      this.state = {names: 'Cory, Rob, Miles', code: 'ABC123'};
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
      <View style={{ flex: 1, backgroundColor: '#667292', justifyContent: 'center',
      alignItems: 'center',}}>
        <Text style={{color: '#f1e3dd', fontSize: 40, textAlign: 'center', fontWeight: 'bold', padding: 20}}>Game Code: {this.state.code}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('Swipe')}>
          <Text style={{fontWeight: 'bold',  fontSize: 20}}>Start Game</Text>
        </TouchableOpacity>
        <Text style={styles.appName}>Players Who are in:</Text>
        <Text style={styles.appName}>{this.state.names}</Text>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontFamily: "Chalkduster", 
    fontSize: 35, 
    fontWeight: 'bold',
    color: '#bccad6', 
    textAlign: 'center',
    //: #8d9db6
    //#f1e3dd
    padding: 20, 
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

export default HostWaitScreen