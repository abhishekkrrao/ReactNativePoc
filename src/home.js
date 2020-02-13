import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableHighlight } from "react-native";
import firebase from 'react-native-firebase'
import Loading from './Loading'
import Headers from './header/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import PushNotification from "react-native-push-notification";
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    margin: 0
  },
  imageView: {
    width: 'auto',
    height: 'auto',
    flex: 1
  },
  imageViews: {
    width: '100%',
    height: 350,
    flex: 1,
    padding: 0,
    margin: 0
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
  },
  custom_view: { flex: 1, backgroundColor: '#ffffff', margin: 5, padding: 0, borderRadius: 7, }
});
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  initPushNotification() {
    let self = this;
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
      },
      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // process the notification
        self._addDataToList(notification);
        // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: "1030315320618",
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    });
  }
  _addDataToList(data) {
    console.log('push notification data ', data);
  }
  parseIntoArray(value) {
    const br = `\n`;
    const arrayList = [];

    return new Promise((resolve) => {
      Object.values(value).map(o1 => {
        let a = Object.keys(o1);
        Object.values(o1).map((o2, index) => {
          o2.key = a[index];
          arrayList.push(o2)
        });
      });
      resolve(arrayList);
    });
  }

  getList() {
    return new Promise((resolve, reject) => {
      var recentPostsRef = firebase.database().ref('addProduct/');
      recentPostsRef.once('value').then(snapshot => {
        this.parseIntoArray(snapshot.val()).then((list) => {
          resolve(Array.from(new Set([...list])));
        }).catch((error) => {
          console.log('error ', error);
          reject(error);
        });
      }).catch((error) => {
        console.log('error ', error);
        reject(error);
      });
    });
  }

  componentWillMount() {
    this.getList().then((list) => {
      // console.log('list', list)
      this.setState({
        isLoading: false,
        dataSource: list
      });
    });
    this.initPushNotification();
    this.loadData();
  }
  _refresh() {
    console.log('i am called on bottom load more button ...');
    this.state.isLoading = false;
    this.getList().then((list) => {
      // console.log('list', list)
      this.setState({
        isLoading: false,
        dataSource: list
      });
    });
  }

  shareApp(url) {
    let options = {
      title: 'Hi',
      url: url,
      message: 'This is only for testing the app.',
      filename: url,
      saveToFiles: true,
      urls: [url]
    }
    Share.open(options)
      .then((res) => { console.log(res) })
      .catch((err) => { err && console.log(err); });
  }

  closeApp() {
    this.props.navigation.goBack();
  }
  loadData() {
    firebase.database().ref("addProduct/")
      .orderByChild("uid").limitToLast(5)
      .once("child_added").then((snapshot) => {
        console.log('snapshot.key ', snapshot.key)
        console.log('snapshot.key ', snapshot.val());
      });
  }

  likeIt(item) {
    let path = 'addProduct/' + item.uid + '/' + item.key + '/likes/' + firebase.auth().currentUser.uid;
    console.log('path>>>>>>>> ', path);

    console.log('item.isLike ', item.likes);
    let a = Object.values(item.likes);
    console.log('item.aaa ', a[0]);
    let obj = a[0];

    let updates;
    if (obj.isLike) {
      updates = {
        uid: firebase.auth().currentUser.uid,
        isLike: false
      }
    } else {
      updates = {
        uid: firebase.auth().currentUser.uid,
        isLike: true
      }
    }
    firebase.database().ref(path).update(updates).then((response) => {
      console.log('isLiked ', response);
    });

  }
  render() {
    const br = `\n`;

    if (this.state.isLoading == true) {
      return (
        <View style={styles.MainContainer}>
          <Headers title="Home"></Headers>
          <Loading></Loading>
        </View>
      )
    } else {
      return (
        <View style={styles.MainContainer}>
          <Headers title="Home"></Headers>
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            onRefresh={() => this._refresh()}
            refreshing={this.state.isLoading}
            onEndReachedThreshold={5}
            onEndReached={() => {
              this._refresh();
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.custom_view}>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('Details', { item: item })} style={styles.imageView} >
                    <Image source={{ uri: item.productPic }} style={styles.imageViews} />
                  </TouchableHighlight>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.textView} > {item.productName} {br} {br} {item.productPrice} {'₹'} </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.textView} >{item.productDesc}</Text>
                  </View>
                  <View style={{ flex: 2, flexDirection: 'row' }}>
                    <View style={{ padding: 10 }}>
                      <Icon onPress={() => this.props.navigation.navigate('Comment')} name="comment-o" size={24} color="#D84315" />
                    </View>
                    <View style={{ padding: 10 }}>
                      <Icon onPress={() => this.shareApp(item.productPic)} name="mail-reply" size={24} color="#D84315" />
                    </View>
                    <View style={{ padding: 10 }}>
                      <Icon name="bookmark-o" size={24} color="#D84315" />
                    </View>
                    <View style={{ padding: 10 }}>
                      {this.displayIcon(item)}
                      {/* <Icon onPress={() => this.likeIt(item)} name="heart-o" size={24} color="#D84315" /> */}
                    </View>
                  </View>
                </View>
              )
            }}
            keyExtractor={(item, index) => index.toString() + '1456iug'}
          />
        </View>
      );
    }
  }
  displayIcon(item) {
    //console.log('item.isLike ', item.likes);
    let a = Object.values(item.likes);
   // console.log('item.aaa ', a[0]);
    let obj = a[0];
    if (obj.isLike && item.uid == obj.uid) {
      return <Icon onPress={() => this.likeIt(item)} name="heart" size={24} color="#D84315" />
    } else {
      return <Icon onPress={() => this.likeIt(item)} name="heart-o" size={24} color="#D84315" />;
    }
  }
  gotoCommentPage() {

  }
}