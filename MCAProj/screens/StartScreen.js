//this is the main/starting page when opening our app
import React from 'react';
import { StyleSheet, TouchableOpacity, Button, Text, View, Dimensions, Image, Animated, PanResponder, Platform } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Dropdown } from 'react-native-material-dropdown';
import socketIO from 'socket.io-client';
import Icon from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import CheckBox from 'react-native-check-box';
import { AdMobBanner, AdMobInterstitial } from 'expo-ads-admob';

//Our IP's
//'http://65.128.45.107:3000'
//'http://192.168.0.17:3000'
//'http://173.28.80.230:3000'
//official server: 'http://161.35.54.15:3000'

const serverip = 'http://161.35.54.15:3000';

var { height, width } = Dimensions.get('window');

var inDevelopment=true;
var bannerAdUnitID = null;
var intAdUnitID = null;

async function showAd() {
  //TODO: cancel from componentWillUnmount() somehow?
  await AdMobInterstitial.setAdUnitID(intAdUnitID); // Test ID, Replace with your-admob-unit-id
  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
  await AdMobInterstitial.showAdAsync();
}

class StartScreen extends React.Component {
  //Default constructor
  constructor(props) {
    super(props);

    global.socket.connect();

    global.socket.on('connect', () => {
      console.log('connected to socket server');
    });

    global.socket.on('disconnect', () => {
      console.log('connection to server lost');
      alert("Lost connection to server");
    });

    global.socket.on('user_err', (msg) => {
      alert(msg);
    })

    this.state = {
      isModalVisible: false,
      isChecked: false,
      cardnum: '50',
      firstOpened: true,
      adShowing: false,
    }

    global.index = 0;

    if (inDevelopment) {
      //test ads, always use unless we're in production
      bannerAdUnitID = "ca-app-pub-3940256099942544/6300978111";
      intAdUnitID = "ca-app-pub-3940256099942544/1033173712"; //video ad: "ca-app-pub-3940256099942544/8691691433"
    } else if (Platform.OS === 'android') {
      //TODO: carefully test if android ads load
      bannerAdUnitID = "ca-app-pub-3420284063429373/7355123212";
      intAdUnitID = "ca-app-pub-3420284063429373/6965569969";
    } else if (Platform.OS === 'ios') {
      //TODO: carefully test if ios ads load
      bannerAdUnitID = "ca-app-pub-3420284063429373/3409468336";
      intAdUnitID = "ca-app-pub-3420284063429373/7157141655";
    }
  }

  componentDidMount() {
    this.props.navigation.addListener('blur',()=>{
      //user navigated away, meaning we should give them an ad when they come back to this page
      this.setState({firstOpened: false});
    });
    this.props.navigation.addListener('focus',()=>{
      if(!this.state.firstOpened){
        global.socket.emit('leave'); //try leaving (whether or not they were actually in a room or not)
        this.setState({adShowing:true});
      }
    })

    //after requestAdAsync
    AdMobInterstitial.addEventListener("interstitialDidLoad", () => {
      //console.log("interstitialDidLoad")
    });
    //after requestAdAsync
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () => {
      //console.log("interstitialDidFailToLoad")
      console.log("Video Ad Error");
      this.setState({ adShowing: false });
    });
    //after showAdAsync
    AdMobInterstitial.addEventListener("interstitialDidOpen", () => {
      //console.log("interstitialDidOpen")
    });
    //user closed the ad
    AdMobInterstitial.addEventListener("interstitialDidClose", () => {
      //console.log("interstitialDidClose")
      this.setState({ adShowing: false });
    });

    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () => {
      //console.log("interstitialWillLeaveApplication")
    });
  }
  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  toggleModal = () => {
    var bool = this.state.isModalVisible;
    this.setState({ isModalVisible: !bool });
  };

  bannerError() {
    console.log("Banner Error");
    return;
  }



  renderMainContent() {
    return (
      <View style={{
        flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
        alignItems: 'center',
      }}>

        <View style={{ flex: 1, marginTop: height * 0.08, paddingLeft: width * 0.80, marginRight: 5 }}>
          {/* Create the icon and modal pannel for the settings */}
          <Icon
            name="cog"
            color='#a78d8a'
            size={35}
            onPress={this.toggleModal}></Icon>
          <Modal
            isVisible={this.state.isModalVisible}
            deviceWidth={width}
            deviceHeight={height}
            color='white'
          >
            {/* View to define the settings modal */}
            <View style={{ flex: 1, margin: 20, justifyContent: 'center' }}>
              <View style={{ backgroundColor: '#fdf6f2', borderRadius: 12, padding: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#a78d8a', fontSize: RFPercentage(3) }}>Wheelchair Accessible</Text>
                  <CheckBox
                    style={{ flex: 1, padding: 10, margin: 10 }}
                    onClick={() => { this.setState({ isChecked: !this.state.isChecked }) }}
                    isChecked={this.state.isChecked}
                  />
                </View>
                <Dropdown
                  style={{ marginBottom: 20 }}
                  label='Max Restaurants Shown'
                  data={[{
                    value: '10',
                  }, {
                    value: '20',
                  }, {
                    value: '30',
                  }, {
                    value: '40',
                  }, {
                    value: '50',
                  }]}
                  defaultValue='10'
                  onChangeText={cardnum => this.setState({ cardnum })}
                />
                <Button title="Close" onPress={this.toggleModal} color='#e18a7a' />
              </View>
            </View>
          </Modal>

        </View>
        <View style={{ flex: 1.5, justifyContent: 'flex-end' }}>
          <Text style={styles.appName}>Huddle</Text>
        </View>

        <View style={{ flex: 3.5, justifyContent: 'flex-start' }}>
          {/* Start Game button */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Filter', { cardnum: this.state.cardnum, access: this.state.isChecked })}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Create Room</Text>
          </TouchableOpacity>

          {/* Join game button */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('Join')}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Join Room</Text>
          </TouchableOpacity>

        </View>

        {/*<View style={{flex:2,justifyContent:'flex-end'}}>
          <Button
          title="(ad test)"
          onPress={showAd}
          />
        </View>*/}

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <AdMobBanner
            style={{ width: "100%" }}
            adUnitID={bannerAdUnitID}
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={this.bannerError} />
        </View>

      </View>

    );
  }

  render() {
    //TODO: only show when page is navigated to, and not every time it renders
    if (this.state.adShowing) {
      showAd(); //this.state.adShowing should turn to false either when the user closes the ad, of if the ad fails to load at all
      return (
        <View style={{
          flex: 1, backgroundColor: '#fdf6f2', justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text  style={{ fontWeight: 'bold', fontSize: 20 }}>Loading Advertisement...</Text>
        </View>
      )
    } else {
      return this.renderMainContent();
    }
  }
}

const styles = StyleSheet.create({
  appName: {
    fontSize: RFPercentage(9.5),
    fontWeight: 'bold',
    color: '#a78d8a',
    padding: 20,
  },
  btn: {
    backgroundColor: '#e18a7a',
    borderRadius: 12,
    color: '#a78d8a',
    overflow: 'hidden',
    padding: 20,
    textAlign: 'center',
    margin: 20,
  }
});

export default StartScreen;
