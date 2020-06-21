//the page when waiting for users to join and host to start
//this is the main page
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import shuffleArray from "../utils/shuffleArray.js";

class WaitScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);
      const { socket } = this.props.route.params;
      this.socket = socket;

      this.state = {names: 0};

      this.socket.on('other_joined',(n)=>{
        this.setNum(n);
      });

      this.socket.on('results', (r) => {
        //shuffle
        /*results = r.sort((a,b)=>{
          if(Math.random()>.5){
            return 1;
          }else{
            return -1;
          }
        });*/
        results=shuffleArray(r);
      });

      this.socket.on('started',()=>{
        console.log('started');
        this.props.navigation.navigate('Swipe', {results: results, socket: socket});
      });

    }

    //set the number of people
    setNum = (n) => {
      this.setState({names: n});
    }


render() {

    return (
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{marginVertical:50, marginHorizontal:20, justifyContent: 'center'}}>
          {/* The view that creates the box */}
        <View style={[styles.box, {flex:1.5, justifyContent: 'center', marginTop: 60}]}>
        <Text style={{color: 'white', fontSize: RFPercentage(5), textAlign: 'center', paddingBottom: 30, paddingHorizontal: 10}}>Waiting for host
        to start the session...</Text>
        </View>
        <View style={{flex:3.5, /*(FOR SOME REASON THIS BREAKS ON ANDROID (Pixel 3) justifyContent: 'flex-top',*/ marginVertical:50}}>
        <Text style={[styles.appName, {paddingBottom: 30}]}>Total People in Room:</Text>
        <Text style={styles.appName}>{this.state.names}</Text>
        </View>
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
    textAlign: 'center',
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
  },
  box: {
    backgroundColor: '#c0d8e3',
    borderRadius: 12,
    paddingVertical: 50,
  }
});

export default WaitScreen
