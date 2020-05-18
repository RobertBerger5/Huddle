import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text, Tile } from 'react-native-elements'
import { SafeAreaView } from 'react-navigation'
import { TopPicksScreenPics } from '../constants/Restaurants'
import openMap from 'react-native-open-maps';

class TopPicksScreen extends React.Component {
  constructor(props) {
    super(props);
    const result = props.result;
    const socket = props.socket;
    var index = props.index;

    this.socket = socket;
    this.result = result;

    console.log(this.result.results);

    this.state = {
      top_results: [],
    };
    //example results console.log();
    //onsole.log(result);
  }

  componentDidMount() {
    this.socket.on('top_results', (top_results) => {
      this.setState({ top_results });
      console.log("Logging top picks");
      console.log(this.state.top_results);
    });

    this.socket.emit('request_top_results');
  }

  componentWillUnmount() {
    this.socket.off('top_results');
  }

  /*tileOnPress(lat, lng) {
    openMap({ latitude: lat, longitude: lng, zoom: 18 });
  }
  ()) => this.tileOnPress(lat, lng)
  */

  tileOnPress(address) {
    openMap({ end: address });
  }

  render() {
    var tiles = [];
    let i = 0;
    while(this.state.top_results[i]){
      let lat = this.result.results[ this.state.top_results[i][0] ].lat;
      let lng = this.result.results[ this.state.top_results[i][0] ].lng;
      let address = this.result.results[ this.state.top_results[i][0] ].address;
      tiles.push(
        <Tile
        imageSrc={{uri:this.result.results[ this.state.top_results[i][0] ].photo}}
        activeOpacity={0.9}
        title={this.result.results[ this.state.top_results[i][0] ].name}
        titleStyle={styles.title}
        caption={this.result.results[ this.state.top_results[i][0] ].price_level}
        captionStyle={styles.caption}
        featured
        onPress = {() => this.tileOnPress(address)}
      />
      )
      i++;

    }

    return (
      <SafeAreaView>
        <ScrollView>
          <Text h2 h2Style={styles.h2Style}>
            Top Picks
          </Text>
          <Text h4 h4Style={styles.h4Style}>
            The restaurants you and your friends like the most
          </Text>
          <View style={styles.grid}>

            {tiles}

          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  h2Style: {
    fontWeight: 'bold',
    textAlign: 'center',
   // color: '#000000',
    color: '#e18a7a',
  },
  h4Style: {
    textAlign: 'center',
    //color: '#757575',
    color: '#a78d8a',
  },
  grid: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    position: 'absolute',
    left: 10,
    bottom: 50,
    backgroundColor: 'black',
    marginBottom: -2,
    padding: 10,
  },
  caption: {
    position: 'absolute',
    left: 10,
    bottom: 0,
    backgroundColor: 'black',
    marginTop: 10,
    padding: 10,
  },
})

export default TopPicksScreen