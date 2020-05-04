//the page to join a session and enter a code
//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';

class JoinScreen extends React.Component {
    //Default constructor
    constructor() {
      super()
      this.state = {text: ''};
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
      <View style={{ flex: 1, backgroundColor: '#667292', justifyContent: 'center',
      alignItems: 'center',}}>
        <Text style={styles.appName}>Enter Game Code:</Text>
        
        <View>
        <TextInput 
          style={{height: 40}}
          placeholder="code"
          fontSize = '30px'
          onChangeText = {(text) => this.setState({text})}
          value={this.state.text}
          />
          </View>

        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('Wait')}>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>Join Game</Text>
        </TouchableOpacity>
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

export default JoinScreen