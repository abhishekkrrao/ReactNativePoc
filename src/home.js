import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableHighlight } from "react-native";
import firebase from 'react-native-firebase'
import Loading from './Loading'
import Headers from './header/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
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

  parseIntoArray(value,snapshot) {
    const br = `\n`;
    const arrayList = [];
    let data = value;
    let keys = Object.keys(data);
   // keys.forEach((key) => { console.log('key ',key); });
    snapshot.forEach((olcab) => { 
     
     // olcab.userid = olcab.key;
      //console.log('olcab ',olcab.key);
      console.log('olcab ',olcab); 
    
     

      // Object.values(olcab).map(o1 => {
      //   console.log('o100  ',o1); 

      // });

    });
    return new Promise((resolve) => {
      Object.values(value).map(o1 => {
      
       // console.log('>>>>>>>>  ', o1.keyExtractor());
        Object.values(o1).map(o2 => {
        //  console.log('>>>>>>>>  ', snapshot.key);
         // o2.userid = key;
         // console.log('>>>>>>>>>o2    ', o2);
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
        this.parseIntoArray(snapshot.val(),snapshot).then((list) => {
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

  likeIt(item) {
    console.log('item>>>>>>>> ', item);
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
                      <Icon onPress={() => this.likeIt(item)} name="heart-o" size={24} color="#D84315" />
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
  gotoCommentPage() {

  }
}