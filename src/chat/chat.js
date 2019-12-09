import React, { Component } from "react";
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Button } from "react-native";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import chatstyle from './chatstyle'
import firebase from 'react-native-firebase'
import { GiftedChat } from 'react-native-gifted-chat'
export default class Chats extends Component {
  state = { message: '', recieverUid: '' }

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
  // renderRow(item) {
  //   console.log('item ', item);
  //   return (
  //     <View style={{
  //       flex: 1, flexDirection: 'row',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       padding: 5,
  //       backgroundColor: '#ccc',
  //       marginTop: 5,
  //       borderRadius: 5,
  //       width: '95%',
  //       marginLeft: '2.5%'
  //     }}>
  //       <View style={{ flex: 1 }}>
  //         <Text style={{ fontFamily: "Montserrat-Medium" }}>
  //           {item.name}
  //         </Text>
  //         <Text style={{ fontFamily: "Montserrat-Medium" }}>
  //           {item.email}
  //         </Text>
  //       </View>
  //     </View>
  //   )
  // }
  componentDidMount() {
    const receivedValue = this.props.navigation.getParam('item', () => { });
    console.log('receivedValue ', receivedValue.uid);
    this.setState({
      recieverUid: receivedValue.uid
    });
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
        {/* <FlatList
          data={this.state.list}
          renderItem={({ item, i }) => {
            console.log(item['item'], '   iiii ', i);
            return this.renderRow(item)
          }}
          keyExtractor={({ item, index }) => index + 'llll'}
        /> */}
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