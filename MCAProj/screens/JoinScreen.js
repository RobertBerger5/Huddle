//the page to join a session and enter a code
//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

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
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center',}}>
         <View style={{marginTop: 50, marginBottom: 50, marginRight: 20, marginLeft: 20}}>
        <Text style={styles.appName}>Enter Game Code:</Text>
        
        {/* <View> */}
        <TextInput 
          style={{height: 40, paddingLeft: 15, paddingRight: 15, textAlign: 'center'}}
          placeholder="code"
          fontSize = '30px'
          onChangeText = {(text) => this.setState({text})}
          value={this.state.text}
          />
         {/* </View> */}

        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('Wait')}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Join Game</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.btn}
          onPress =  {() => this.props.navigation.navigate('Start')}>
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
    //: #8d9db6
    //#f1e3dd
    padding: 40, 
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
  }
});

export default JoinScreen