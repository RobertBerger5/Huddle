//the page to set preferences
//the page to join a session and enter a code
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


class FilterScreen extends React.Component {
    //Default constructor
    constructor(props) {
      super(props);
      this.state = {
        type: 'Restaurants',
        long: null,
        lat: null,
        hasLocation: false,
        range: 'Any',
        rate: 'Any',
        price: 'Any'
      };

      //Get current location and set state
      navigator.geolocation.getCurrentPosition(p => {
        let lat = p.coords.latitude;
        let long = p.coords.longitude;
        this.setState({long: long, lat: lat, hasLocation: true});
        console.log("LOCATION GOOD");
      });

      //parameter for settings
      const { cardnum } = this.props.route.params;
      this.cardnum = cardnum;

      const { access } = this.props.route.params;
      this.access = access;

      //Listen for succesful creation
      global.socket.on('created',(id)=>{
        console.log('created room '+id);
        this.props.navigation.navigate('HostWait', {roomCode: id});
      });

    }

render() {

  //Data options for the drop down menus
  let data = [{
    value: 'Restaurants',
  }, {
    value: 'Bars',
  }, {
    value: 'Cafes',
  }];

  let range = [{
    value: 'Any'
  },{
    value: '1/2 Miles'
  },{
    value: '1 Mile',
  },{
    value: '5 Miles',
  }, {
    value: '15 Miles',
  }, {
    value: '25 Miles',
  }];

  let rate = [{
    value: 'Any',
  },{
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
    value: 'Any',
  },{
    value: '$',
  },{
    value: '$$',
  }, {
    value: '$$$',
  }];

    return (
      <View style={{ flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
      alignItems: 'center'}}>
        {/* View to keep everything in center of screen */}
        <View style={{marginTop: 50, marginBottom: 50, marginRight: 50, marginLeft: 50}}>
        <Text style={styles.appName}>Place Type:</Text>

        <Dropdown
        style={styles.drop}
        label='Place Type'
        data={data}
        defaultValue='Restaurants'
        onChangeText = {type => this.setState({type})}
        />
        <Text style={styles.appName}>Max distance from you:</Text>
        <Dropdown
        style={styles.drop}
        label='Distance'
        data={range}
        defaultValue='Any'
        onChangeText = {range => this.setState({range})}
        />
        <Text style={styles.appName}>Minimum rating:</Text>
        <Dropdown
        style={styles.drop}
        label='Rating'
        data={rate}
        defaultValue='Any'
        onChangeText = {rate => this.setState({rate})}
        />
        <Text style={styles.appName}>Price Range:</Text>
        <Dropdown
        style={styles.drop}
        label='Price'
        data={price}
        defaultValue='Any'
        onChangeText = {price => this.setState({price})}
        />
        <TouchableOpacity
          //if we haven't grabbed the location, make the button grey and don't allow the user to click it
          style={[styles.btn, this.state.hasLocation?null:styles.btnDisabled]}
          disabled={this.state.hasLocation?false:true}
          //onPress =  {() => this.props.navigation.navigate('HostWait')}>
          onPress = {() => {
            console.log("hasLocation: "+this.state.hasLocation);
            global.socket.emit('create', {
              type: this.state.type,
              long: this.state.long,
              lat: this.state.lat,
              range: this.state.range,
              rate: this.state.rate,
              price: this.state.price,
              cardnum: this.cardnum,
              access: this.access
            });
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>Next</Text>
        </TouchableOpacity>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  //Styleheet for main text
  appName: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    color: '#a78d8a',
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
  btnDisabled:{
    backgroundColor: '#f6deda',
    color:'grey'
  },
  drop: {
  }
});

export default FilterScreen
