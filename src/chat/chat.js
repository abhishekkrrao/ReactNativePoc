import React, { Component } from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import chatstyle from './chatstyle'
import firebase from 'react-native-firebase'
import { GiftedChat } from 'react-native-gifted-chat'
export default class Chats extends Component {
  state = { message: '', recieverUid: '', currentUID: '', arrayList: [] }

  closeApp() {
    console.log('close App');
    this.props.navigation.goBack();
  }
  static navigationOptions = {
    title: 'Chats'
  };
  onSend(messages) {
    console.log('messagemessage ', messages)
    this.writeUserData(messages);
  }

  writeUserData(messages) {
    if (this.state.recieverUid != undefined) {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          currentUID: user.uid
        })
        firebase.database().ref('chat/' + user.uid + this.state.recieverUid).push({ message: messages[0].text, senderUid: user.uid, createdAt: messages[0].createdAt, recieverUid: this.state.recieverUid }).then((data) => {
          //success callback
          console.log('data ', data)
        }).catch((error) => {
          //error callback
          console.log('error ', error)
        })
      })
    }
  }


  getCurrentUserUid() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          currentUID: user.uid
        })
        resolve(user.uid);
      })
    })
  }
  getUpcomingInfo() {
    return new Promise((resolve, reject) => {
      const receivedValue = this.props.navigation.getParam('item', () => { });
      this.setState({
        recieverUid: receivedValue.uid
      });
      resolve(receivedValue.uid);
    });
  }
  componentDidMount() {
    this.getCurrentUserUid().then((currentUID) => {
      this.getUpcomingInfo().then((recieverUid) => {
        this.getList(currentUID, recieverUid).then((list) => {
          console.log('list>>> ', list)
          this.setState({
            arrayList: list
          });
        });
      })
    })
  }
  getList(currentUID, recieverUid) {
    // console.log('currentUID_recieverUid ', + currentUID + ' '+recieverUid);
    return new Promise((resolve, reject) => {
      const arrayList = [];
      const senderRef = firebase.database().ref('chat/' + this.state.currentUID + this.state.recieverUid);
      const recieverRef = firebase.database().ref('chat/' + this.state.recieverUid + this.state.currentUID);
      console.log('path1>>> ', 'chat/' + this.state.recieverUid + this.state.currentUID)
      senderRef.orderByChild('createdAt').on('child_added', function (snapshot) {
        console.log('snapshot.val() ', snapshot.val().createdAt);
        arrayList.push({
          createdAt: snapshot.val().createdAt,
          message: snapshot.val().message,
          recieverUid: snapshot.val().recieverUid,
          senderUid: snapshot.val().senderUid
        });
      });
      recieverRef.orderByChild('createdAt').on('child_added', function (snapshot) {
        // console.log('snapshot.val() ', snapshot.val().createdAt);
        arrayList.push({
          createdAt: snapshot.val().createdAt,
          message: snapshot.val().message,
          recieverUid: snapshot.val().recieverUid,
          senderUid: snapshot.val().senderUid
        });
        resolve(arrayList)
      });
    });
  }

  right_left_Message(item) {
    if (item.senderUid == this.state.currentUID) {
      return (
        <View style={chatstyle.left}>
          <Text style={chatstyle.leftMessage}>
            {item.message}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={chatstyle.right}>
          <Text style={chatstyle.rightMessage}>
            {item.message}
          </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={chatstyle.container}>
        <Header
          containerStyle={{ height: 75 }}
          ViewComponent={LinearGradient} // Don't forget this!
          centerComponent={{ text: 'Chat', style: { color: '#fff', fontFamily: "Montserrat-Medium" } }}
          leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
          linearGradientProps={{
            colors: ['#E64A19', '#D84315'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />
        <FlatList
          data={this.state.arrayList}
          renderItem={({ item, i }) => {
            console.log(item['item'], '   iiii ', i);
            return this.right_left_Message(item)
          }}
          keyExtractor={({ item, index }) => index + 'llll'}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}