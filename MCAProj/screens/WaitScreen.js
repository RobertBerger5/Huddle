//the page when waiting for users to join and host to start
//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';

class WaitScreen extends React.Component {
    //Default constructor
    constructor() {
      super()
      this.state = {names: 'Cory, Rob, Miles'};
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
      <View style={{ flex: 1, backgroundColor: '#87bdd8', justifyContent: 'center',
      alignItems: 'center',}}>
        <Text style={{color: '#667292', fontSize: 40, textAlign: 'center'}}>Waiting for host to start game...</Text>
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
    color: '#f1e3dd', 
    textAlign: 'center',
    //: #8d9db6
    //#f1e3dd
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

export default WaitScreen