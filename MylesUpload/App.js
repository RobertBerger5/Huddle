import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

//Dynamically accomodate for different sized devices
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

//Load in our information for each place
var Photos = [
  { id: "1", uri: require('./assets/1.jpg'), name: "test1" },
  { id: "2", uri: require('./assets/2.jpg'), name: "test2" },
  { id: "3", uri: require('./assets/3.jpg'), name: "test3" },
  { id: "4", uri: require('./assets/4.jpg'), name: "test4" },
  { id: "5", uri: require('./assets/5.jpg'), name: "test5" },
]

//Set fetch
const fetch = require("node-fetch");

const apiKey = "";
//var lat = "44.888054";
//var long = "-93.328479";
const radius = "5000";


export default class App extends React.Component {
  //Default constructor
  constructor() {
    super()

    //Create a new animated position
    this.position = new Animated.ValueXY()

    //Set us to the first card index
    this.state = {
      currentIndex: 0,
      isLoading: false,
      error: null,
      Places: []
    }

    //Rotate value -- make it so we turn the further we move from center
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH /2 ,0, SCREEN_WIDTH /2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    //Note on this --- "..." is the "spread" operator
    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    //Fade out as it moves further away
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })

    //Fade out as it moves further away
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    //Fade the next card in
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })

    //Make the next card larger
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

    //Allows dragging ability
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 125, y: gestureState.dy },
            restSpeedThreshold: 5,
            restDisplacementThreshold: 35
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 125, y: gestureState.dy },
            restSpeedThreshold: 5,
            restDisplacementThreshold: 35
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })

  }

  findCoordinates() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchPlaces(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Geolocation'
        });
      }
    );
  };

  fetchPlaces(lat, lon) {
    let reqURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&radius=" + radius + "&type=restaurant&key=" + apiKey;
    fetch(reqURL)
      .then(res => res.json())
      .then(json => {
        let i = 0;
        let tempPlaces = [];
        while(json.results[i]) {
          //let imgURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=" + SCREEN_WIDTH + "&photoreference=" + json.results[i].photos[0].photo_reference + "&key=" + apiKey;
          tempPlaces.push({id: String(i), name: json.results[i].name, uri: Photos[i%5].uri});
          i++;
        }
        this.setState({
          Places: tempPlaces,
          isLoading: true
        });
      });
  }

  componentDidMount() {
    this.findCoordinates();
  }

  //Renders the returned places
  renderPlaces = () => {
    return this.state.Places.map((item, i) => {
      //Don't draw if we've passed this index already
      if (i < this.state.currentIndex) {
        return null
      }
      //Draw our current card
      else if (i == this.state.currentIndex) {
        return (
          <Animated.View

            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute' }]}>

            <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>YEAH</Text>
            </Animated.View>

            <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>

            {/*Our actual page that's rendered*/}
            <View style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20, backgroundColor: '#d3d3d3', borderWidth: 2, borderColor: '#d3d3d3' }}>
              <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={item.uri} />
              <View style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20, backgroundColor: 'white' }}>
                <Text style={{fontSize: 32, textAlign: 'center'}}>{item.name}</Text>
              </View>
            </View>

          </Animated.View>
        )
      }
      //Draw the next card
      else if (i == this.state.currentIndex + 1){
        //Prepare the next card
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH, padding: 10, position: 'absolute'
            }]}>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'green', color: 'green', fontSize: 32, fontWeight: '800', padding: 10 }}>LIKE</Text>
            </Animated.View>

            <Animated.View style={{ opacity: 0, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
              <Text style={{ borderWidth: 1, borderColor: 'red', color: 'red', fontSize: 32, fontWeight: '800', padding: 10 }}>NOPE</Text>
            </Animated.View>

            {/*Next card rendered*/}
            <View style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20, backgroundColor: '#d3d3d3', borderWidth: 2, borderColor: '#d3d3d3' }}>
              <Image
                style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20 }}
                source={item.uri} />
              <View style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 20, backgroundColor: 'white' }}>
                <Text style={{fontSize: 32, textAlign: 'center'}}>{item.name}</Text>
              </View>
            </View>

          </Animated.View>
        )
      }
      //Don't draw future cards yet
      else {return null}
    }).reverse()
  }

  //Our main render
  render() {
    const { isLoading } = this.state;
    return (

      <View style={{ flex: 1, backgroundColor: 'white' }}>

        {/*Top offset*/}
        <View style={{ height: 60 }}></View>

        {/*Main render*/}
        <View style={{ flex: 1 }}>
          {isLoading ? this.renderPlaces() : (<Text>Loading</Text>)}
        </View>

        {/*Top offset*/}
        <View style={{ height: 60 }}></View>

      </View>

    );
  }
}
