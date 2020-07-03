import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Card from '../components/Card'
import Entypo from 'react-native-vector-icons/Entypo';
import { BackHandler , StackActions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';



class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const results = props.results;
    const socket = props.socket;
    const navigation = props.navigation;
    var index = props.index;
    this.socket = socket;
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

///backhandler is for the back on android
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
      //potential options once the nav prop is passed correctly:
            //this.props.navigation.dispatch(StackActions.popToTop());
            //this.props.navigation.navigate('Start');
            //this.props.navigation.pop(3);
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'Start' }],
            // });
        return true;
        }

    onSwipeRight() {
        //should be same as in handle button
    }

  render() {
    //console.log("length: "+this.props.results.length);

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (

      ///Gesture recognizer is to potnentially controll the iphone back swipe
      // <GestureRecognizer
      // // onSwipe={(direction, state) => this.onSwipe(direction, state)}
      // // onSwipeUp={(state) => this.onSwipeUp(state)}
      // // onSwipeDown={(state) => this.onSwipeDown(state)}
      // // onSwipeLeft={(state) => this.onSwipeLeft(state)}
      // onSwipeRight={() => this.onSwipeRight()}
      // config={config}
      // style={{
      //   flex: 1,
      //   backgroundColor: 'transparent'
      // }}
      // >
      <SafeAreaView style={styles.container}>
        <Swiper
          cards={this.props.results}
          //line is confusing, but it seems to be defining a function for how to render each card. Passes in the card to the Card class as an argument
          //TODO: when users swipe through all cards, it crashes at this line
          renderCard={card => <Card card={card} />}
          cardIndex = {global.index}
          infinite = {false}
          backgroundColor="white"
          cardHorizontalMargin={0}
          stackSize={3}
          animateCardOpacity
          animateOverlayLabelsOpacity
          showSecondCard
          disableTopSwipe = {true}
          disableBottomSwipe = {true}
          onSwipedLeft = {(index) => {this.socket.emit('swipe', this.props.results[index].id, 1); global.index = index + 1;}}
          onSwipedRight = {(index) => {this.socket.emit('swipe', this.props.results[index].id, 2); global.index = index + 1;}}
          cardStyle={{justifyContent: 'center', alignItems: 'center'}}
          overlayLabels= {{
            left: {
            element: <Entypo name="thumbs-down" color= 'red' size={65} />,
            title: 'DISLIKE',
              style: {
                label: {
                  backgroundColor:'red',
                  borderColor: 'red',
                  color: 'red',
                  borderWidth: 1,
                  fontsize: 14,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  paddingRight: 20,
                  padding: 10
                }
              }
            },
            right: {
            element: <Entypo name="thumbs-up" color='green' size={65} />,
            title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'green',
                  borderColor: 'green',
                  color: 'white',
                  borderWidth: 1,
                  fontsize: 14,

                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  paddingLeft: 20,
                  padding: 10
                }
              }
            }
          }}
          OverlayLabelStyle= {{
            fontSize: 45,
            fontWeight: 'bold',
            borderRadius: 10,
            padding: 10,
            overflow: 'hidden',
            color: 'green'
          }}
          useViewOverflow={Platform.OS === 'ios'}
        />
      </SafeAreaView>
      // </GestureRecognizer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 10
  },
});

export default HomeScreen
