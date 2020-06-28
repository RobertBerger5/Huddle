//the page where the person who started the session
//has the code and can see what users have joined and start the game
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

class HostWaitScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);
      const { roomCode } = this.props.route.params;

      var results;

      this.state = {names: 1, code: roomCode};

      global.socket.on('other_joined',(n)=>{
        this.setNum(n);
      });

      global.socket.on('results', (r) => {
        console.log(r);
        //shuffle
        results = r.sort((a,b)=>{
          if(Math.random()>.5){
            return 1;
          }else{
            return -1;
          }
        });
        console.log("-----------------------------------");
        console.log(results);
      });

      global.socket.on('started',()=>{
        console.log('started');
        this.props.navigation.navigate('Swipe', {results: results});
      });

    }

    //set the number of people
    setNum = (n) => {
      this.setState({names: n});
    }

render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center',}}>
        <View style={{marginVertical: 10, marginHorizontal: 40, justifyContent: 'space-between'}}>
        {/* View that creates the box for the code */}
        <View style={[styles.box, {justifyContent: 'center', marginTop: 5}]}>
        <Text style={{color: '#a78d8a', fontSize: RFPercentage(6), textAlign: 'center', fontWeight: 'bold', padding: 20}}>Room Code: {this.state.code}</Text>
        </View>
        {/* Button to start the game */}
        <TouchableOpacity
          style={styles.btn}
          onPress =  {() => global.socket.emit('start')}>
          <Text style={{fontWeight: 'bold',  fontSize: 20, textAlign:'center'}}>Start</Text>
        </TouchableOpacity>
        <Text style={styles.appName}>Total People in Room:</Text>
        <Text style={styles.appName}>{this.state.names}</Text>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    color: '#a78d8a',
    textAlign: 'center',
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
