// import React, { Component } from 'react';
// import { StyleSheet, Modal, Text, TouchableHighlight, View, Alert, FlatList, Image } from 'react-native';
// import { Icon } from 'react-native-elements'
// import Loading from './Loading'
// import firebase from 'react-native-firebase'

// export default class Modals extends Component {

//   state = {
//     modalVisible: false,
//     isLoading: true

//   };
//   componentDidMount() {
//     this.fetchMovies()

//   }
//   setModalVisible(visible) {
//     this.setState({ modalVisible: visible });
//   }
//   closeApp(){
//     firebase.auth().signOut();
//   }

//   profileView(){
//     return (
//       <View style={styles.MainContainer}>



//       </View>

//     );
//   }

//   render() {
//     return (
//       <View style={{ marginTop: 25 }}>
//         <Modal
//           animationType="slide"
//           transparent={false}
//           visible={this.state.modalVisible}
//           onRequestClose={() => {
//             // Alert.alert('Modal has been closed.');
//             this.setModalVisible(false);
//           }}>

//           {this.state.isLoading ? <Loading /> :

//             <View style={{ marginTop: 55 }}>
//               <View>
//                 <TouchableHighlight
//                   onPress={() => {
//                     this.setModalVisible(!this.state.modalVisible);
//                   }}>
//                   <Icon
//                     raised
//                     name='close'
//                     color='#000000'
//                     onPress={() => this.setModalVisible(!this.state.modalVisible)} />
//                 </TouchableHighlight>

//                 <TouchableHighlight
//                   onPress={() => {
//                     this.setModalVisible(!this.state.modalVisible);
//                   }}>
//                   <Icon
//                     raised
//                     name='close'
//                     color='#000000'
//                     onPress={() => this.closeApp()} />
//                 </TouchableHighlight>
//                 <View style={{ marginTop: 15 }}>
//                   <FlatList
//                     data={this.state.dataSource}
//                     ItemSeparatorComponent={this.FlatListItemSeparator}
//                     renderItem={({ item, index }) => {
//                       return (
//                         <View style={{ flex: 1, flexDirection: 'row' }}>
//                           <Image source={{ uri: item.sources }} style={styles.imageView} />
//                           <Text style={styles.textView} >{item.title}</Text>
//                         </View>
//                       )
//                     }
//                     }
//                     keyExtractor={(item, index) => index.toString()}
//                   />
//                 </View>
//               </View>
//             </View>}
//         </Modal>
//         <FlatList
//           data={this.state.dataSource}
//           ItemSeparatorComponent={this.FlatListItemSeparator}
//           renderItem={({ item, index }) => {
//             return (
//               <View style={{ flex: 1, flexDirection: 'row' }}>
//                 <TouchableHighlight
//                   onPress={() => {
//                     this.setModalVisible(true);
//                   }} style={{ width:"50%" }}>
//                   <Image source={{ uri: item.sources }} style={styles.imageViewnew} />
//                 </TouchableHighlight>
//                 <Text style={styles.textView} >{item.title}</Text>
//               </View>
//             )
//           }
//           }
//           keyExtractor={(item, index) => index.toString()}
//         />
//       </View>
//     );
//   }

//   fetchMovies() {
//     var mediaJSON = {
//       "categories": [{
//         "name": "Movies",
//         "videos": [
//           {
//             "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
//             "subtitle": "By Blender Foundation",
//             "thumb": "images/BigBuckBunny.jpg",
//             "title": "Big Buck Bunny"
//           },
//           {
//             "description": "The first Blender Open Movie from 2006",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
//             "subtitle": "By Blender Foundation",
//             "thumb": "images/ElephantsDream.jpg",
//             "title": "Elephant Dream"
//           },
//           {
//             "description": "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
//             "subtitle": "By Google",
//             "thumb": "images/ForBiggerBlazes.jpg",
//             "title": "For Bigger Blazes"
//           },
//           {
//             "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
//             "subtitle": "By Google",
//             "thumb": "images/ForBiggerEscapes.jpg",
//             "title": "For Bigger Escape"
//           },
//           {
//             "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
//             "subtitle": "By Google",
//             "thumb": "images/ForBiggerFun.jpg",
//             "title": "For Bigger Fun"
//           },
//           {
//             "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
//             "subtitle": "By Google",
//             "thumb": "images/ForBiggerJoyrides.jpg",
//             "title": "For Bigger Joyrides"
//           },
//           {
//             "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
//             "subtitle": "By Google",
//             "thumb": "images/ForBiggerMeltdowns.jpg",
//             "title": "For Bigger Meltdowns"
//           },
//           {
//             "description": "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
//             "sources": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
//             "subtitle": "By Blender Foundation",
//             "thumb": "images/Sintel.jpg",
//             "title": "Sintel"
//           },
//           {
//             "description": "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
//             "subtitle": "By Garage419",
//             "thumb": "images/SubaruOutbackOnStreetAndDirt.jpg",
//             "title": "Subaru Outback On Street And Dirt"
//           },
//           {
//             "description": "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
//             "sources": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
//             "subtitle": "By Blender Foundation",
//             "thumb": "images/TearsOfSteel.jpg",
//             "title": "Tears of Steel"
//           },
//           {
//             "description": "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
//             "subtitle": "By Garage419",
//             "thumb": "images/VolkswagenGTIReview.jpg",
//             "title": "Volkswagen GTI Review"
//           },
//           {
//             "description": "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
//             "subtitle": "By Garage419",
//             "thumb": "images/WeAreGoingOnBullrun.jpg",
//             "title": "We Are Going On Bullrun"
//           },
//           {
//             "description": "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
//             "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
//             "subtitle": "By Garage419",
//             "thumb": "images/WhatCarCanYouGetForAGrand.jpg",
//             "title": "What care can you get for a grand?"
//           }
//         ]
//       }]
//     };
//     return fetch('https://facebook.github.io/react-native/movies.json')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           isLoading: false,
//           dataSource: mediaJSON.categories[0].videos,
//         }, function () {
//         });
//       }).catch((error) => {
//         console.error(error);
//       });
//   }
// }
// const styles = StyleSheet.create({
//   MainContainer: {
//     justifyContent: 'center',
//     flex: 1,
//     margin: 5,
//     marginTop: (Platform.OS === 'ios') ? 20 : 0,
//   },
//   imageView: {
//     width: '50%',
//     height: 100,
//     margin: 7,
//     borderRadius: 7

//   },
//   imageViewnew: {
//     width: '100%',
//     height: 100,
//     margin: 7,
//     borderRadius: 7

//   },
//   textView: {
//     width: '50%',
//     textAlignVertical: 'center',
//     padding: 10,
//     color: '#000'
//   },
//   textViews: {
//     width: '50%',
//     textAlignVertical: 'center',
//     padding: 10,
//     color: '#000',
//     fontSize: 12
//   }
// });

import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
export default class Modals extends Component {
  state = {
    email: ''
  }
  componentDidMount() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    let user = firebase.auth().currentUser;
    console.log('useruser>> ', user.email);
    this.setState({
      email: user.email
    });
  }
    closeApp(){
    firebase.auth().signOut();
  }
  render() {
    var data = this.state.email;
    var name = data.substring(0, data.lastIndexOf("@"));
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

            <Text style={styles.name}>{name} </Text>
            <Text style={styles.userInfo}>{data} </Text>
            <Text style={styles.userInfo}>India </Text>
          </View>
        </View>

        <View style={styles.body}>

          {/* <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/home/win8/50' }} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Log Out</Text>
            </View>
          </View> */}

          <View style={styles.item}>
            <View style={styles.iconContent}>
              <TouchableHighlight>
                <Icon
                  raised
                  name='close'
                  color='#000000'
                  onPress={() => this.closeApp()} />
              </TouchableHighlight>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Log Out</Text>
            </View>
          </View>

          {/* <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/news/win8/50' }} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>News</Text>
            </View>
          </View> */}

          {/* <View style={styles.item}>
            <View style={styles.iconContent}>
              <Image style={styles.icon} source={{ uri: 'https://png.icons8.com/shopping-basket/ios11/50' }} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Shop</Text>
            </View>
          </View> */}

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    justifyContent: 'center'
  },
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    fontFamily: "Montserrat-Medium"
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
    fontFamily: "Montserrat-Medium"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
    fontFamily: "Montserrat-Medium"
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: 'center',
    fontFamily: "Montserrat-Medium"
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    fontFamily: "Montserrat-Medium"
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
    fontFamily: "Montserrat-Medium"
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  }
});


