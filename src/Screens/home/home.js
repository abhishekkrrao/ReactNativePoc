import React, { Component } from "react";
import { View, Text, FlatList, Image, TouchableHighlight, Button } from "react-native";
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
import Headers from '../../header/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import PushNotification from "react-native-push-notification";
import styles from './style'
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }
  componentWillMount() {
    // console.log('auth  ', auth);
    // auth.getData('userdata').then((obj) => {
    //   console.log('userdata  ', obj);
    // });

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
  initPushNotification() {
    let self = this;
    PushNotification.configure({
      onRegister: function () {
      }, onNotification: function (notification) {
        self._addDataToList(notification);
      },
      senderID: "1030315320618",
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


    if (this.state.isLoading == true) {
      return (
        <View style={styles.MainContainer}>
          <Headers title="Depop"></Headers>
          <Loading></Loading>
        </View>
      )
    } else {
      return (
        <View style={styles.MainContainer}>
          <Headers title="Depop"></Headers>
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            onRefresh={() => this._refresh()}
            refreshing={this.state.isLoading}
            onEndReachedThreshold={5}
            onEndReached={() => {
              this._refresh();
            }}
            renderItem={({ item }) => this.addIcons(item)}
            keyExtractor={(item, index) => index.toString() + '1456iug'}
          />
        </View>
      );
    }
  }

  addIcons(item) {
    const br = `\n`;
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

        <View style={{ flex: 2, flexDirection: 'row', width: "100%" }}>

          <View style={{ flex: 1, flexDirection: 'row', width: "50%", alignSelf: "flex-start", alignContent: "flex-start", alignItems: "flex-start" }}>
            <View style={{ padding: 10 }}>
              <Icon onPress={() => this.gotoCommentPage(item)} name="comment-o" size={24} color="#D84315" />
            </View>
            <View style={{ padding: 10 }}>
              <Icon onPress={() => this.shareApp(item.productPic)} name="mail-reply" size={24} color="#D84315" />
            </View>
            <View style={{ padding: 10 }}>
              <Icon name="bookmark-o" size={24} color="#D84315" />
            </View>
            <View style={{ padding: 10 }}>
              {this.displayIcon(item)}
            </View>
          </View>

          <View style={{ alignSelf: "flex-end", alignContent: "flex-end", alignItems: "flex-end" }}>
            <TouchableHighlight style={ styles.cust_buy_b1 }>
              <Button color='#000' title="BUY" onPress={() => console.log('')} />
            </TouchableHighlight>
          </View>

        </View>

      </View>
    )
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
  gotoCommentPage(item) {
    this.props.navigation.navigate('Comment', { item: item })
  }
}