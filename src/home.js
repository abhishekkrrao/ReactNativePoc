// import React, { Component } from "react";
// import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { StyleSheet, Button, View, Text, FlatList, Alert, Image, TouchableHighlight } from "react-native";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   }
// });
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 0
  },
  imageView: {
    width: 'auto',
    height: 'auto',
    margin: 7,
    borderRadius: 7,
    flex: 1
  },
  imageViews: {
    width: 'auto',
    height: 150,
    flex: 1
  },
  textView: {
    width: '100%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000',
    flex: 1,
    fontFamily: "Montserrat-Medium",
    fontWeight: '900',
    fontSize: 14
  },
  textViews: {
    width: '50%',
    textAlignVertical: 'center',
    padding: 10,
    color: '#000',
    fontSize: 9,
    fontFamily: "Montserrat-Medium",
    fontWeight: '500'
  }
});


export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }
  componentDidMount() {
    var mediaJSON = {
      "categories": [{
        "name": "Movies",
        "videos": [
          {
            "description": "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
            "subtitle": "By Blender Foundation",
            "thumb": "images/BigBuckBunny.jpg",
            "title": "Big Buck Bunny"
          },
          {
            "description": "The first Blender Open Movie from 2006",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
            "subtitle": "By Blender Foundation",
            "thumb": "images/ElephantsDream.jpg",
            "title": "Elephant Dream"
          },
          {
            "description": "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerBlazes.jpg",
            "title": "For Bigger Blazes"
          },
          {
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerEscapes.jpg",
            "title": "For Bigger Escape"
          },
          {
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV. For $35.  Find out more at google.com/chromecast.",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerFun.jpg",
            "title": "For Bigger Fun"
          },
          {
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for the times that call for bigger joyrides. For $35. Learn how to use Chromecast with YouTube and more at google.com/chromecast.",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerJoyrides.jpg",
            "title": "For Bigger Joyrides"
          },
          {
            "description": "Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when you want to make Buster's big meltdowns even bigger. For $35. Learn how to use Chromecast with Netflix and more at google.com/chromecast.",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
            "subtitle": "By Google",
            "thumb": "images/ForBiggerMeltdowns.jpg",
            "title": "For Bigger Meltdowns"
          },
          {
            "description": "Sintel is an independently produced short film, initiated by the Blender Foundation as a means to further improve and validate the free/open source 3D creation suite Blender. With initial funding provided by 1000s of donations via the internet community, it has again proven to be a viable development model for both open 3D technology as for independent animation film.\nThis 15 minute film has been realized in the studio of the Amsterdam Blender Institute, by an international team of artists and developers. In addition to that, several crucial technical and creative targets have been realized online, by developers and artists and teams all over the world.\nwww.sintel.org",
            "sources": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
            "subtitle": "By Blender Foundation",
            "thumb": "images/Sintel.jpg",
            "title": "Sintel"
          },
          {
            "description": "Smoking Tire takes the all-new Subaru Outback to the highest point we can find in hopes our customer-appreciation Balloon Launch will get some free T-shirts into the hands of our viewers.",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
            "subtitle": "By Garage419",
            "thumb": "images/SubaruOutbackOnStreetAndDirt.jpg",
            "title": "Subaru Outback On Street And Dirt"
          },
          {
            "description": "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Target was to improve and test a complete open and free pipeline for visual effects in film - and to make a compelling sci-fi film in Amsterdam, the Netherlands.  The film itself, and all raw material used for making it, have been released under the Creatieve Commons 3.0 Attribution license. Visit the tearsofsteel.org website to find out more about this, or to purchase the 4-DVD box with a lot of extras.  (CC) Blender Foundation - http://www.tearsofsteel.org",
            "sources": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
            "subtitle": "By Blender Foundation",
            "thumb": "images/TearsOfSteel.jpg",
            "title": "Tears of Steel"
          },
          {
            "description": "The Smoking Tire heads out to Adams Motorsports Park in Riverside, CA to test the most requested car of 2010, the Volkswagen GTI. Will it beat the Mazdaspeed3's standard-setting lap time? Watch and see...",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
            "subtitle": "By Garage419",
            "thumb": "images/VolkswagenGTIReview.jpg",
            "title": "Volkswagen GTI Review"
          },
          {
            "description": "The Smoking Tire is going on the 2010 Bullrun Live Rally in a 2011 Shelby GT500, and posting a video from the road every single day! The only place to watch them is by subscribing to The Smoking Tire or watching at BlackMagicShine.com",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
            "subtitle": "By Garage419",
            "thumb": "images/WeAreGoingOnBullrun.jpg",
            "title": "We Are Going On Bullrun"
          },
          {
            "description": "The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.The Smoking Tire meets up with Chris and Jorge from CarsForAGrand.com to see just how far $1,000 can go when looking for a car.",
            "sources": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
            "subtitle": "By Garage419",
            "thumb": "images/WhatCarCanYouGetForAGrand.jpg",
            "title": "What care can you get for a grand?"
          }
        ]
      }]
    };
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: mediaJSON.categories[0].videos,
        }, function () {
        });
      }).catch((error) => {
        console.error(error);
      });

  }

  closeApp() {
    console.log('close App');
    this.props.navigation.goBack();
  }

  render() {
    const br = `\n`;
    return (
      <View style={styles.MainContainer}>
        <Header
          containerStyle={{ height: 75 }}
          ViewComponent={LinearGradient} // Don't forget this!
          centerComponent={{ text: 'Home', style: { color: '#fff', fontFamily: "Montserrat-Medium" } }}
          linearGradientProps={{
            colors: ['#E64A19', '#D84315'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flex: 1 }}>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Details', { item: item })} style={styles.imageView} >
                  <Image source={{ uri: item.sources }} style={styles.imageViews} />
                </TouchableHighlight>
                <Text style={styles.textView} >{item.title}{br}{br}{item.description}</Text>

              </View>
            )
          }
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

// const SecondScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcome}>
//         THIS IS THE SECOND SCREEN!
//       </Text>
//     </View>
//   );
// };

// SecondScreen.navigationOptions = {
//   title: "Home"
// };

// export default SecondScreen;