import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, Image, TouchableHighlight } from "react-native";
import firebase from 'react-native-firebase'
import Loading from './Loading'
import Headers from './header/header'
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
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
    height: 300,
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
  }
});
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  parseIntoArray(value) {
    const arrayList = [];
    return new Promise((resolve) => {
      Object.values(value).map(o => Object.values(o).map(o => arrayList.push(o)));

      resolve(arrayList)
    });
  }

  getList() {
    return new Promise((resolve, reject) => {
      var recentPostsRef = firebase.database().ref('addProduct/');
      recentPostsRef.once('value').then(snapshot => {
        // console.log('snapshot.val() ', snapshot.val());
        // Object.values(snapshot.val()).map(o => Object.values(o).map(o => arrayList.push(o)))
        this.parseIntoArray(snapshot.val()).then((list) => {
          resolve(Array.from(new Set([...list])));
        }).catch(() => { })

      }).catch((error) => {
        console.log('error ', error);
        reject(error)
      });
    });
  }

  componentWillMount() {
    this.getList().then((list) => {
      console.log('list', list)
      this.setState({
        isLoading: false,
        dataSource: list
      });
    });
  }
  componentDidMount() {
    this.getList().then((list) => {
      console.log('list', list)
      this.setState({
        isLoading: false,
        dataSource: list
      });
    });
  }
  closeApp() {
    this.props.navigation.goBack();
  }
  render() {
    const br = `\n`;

    if (this.state.isLoading == true) {
      return (
        <Loading></Loading>
      )
    } else {
      return (
        <View style={styles.MainContainer}>

          <Headers title="Home"></Headers>
  
          <FlatList
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => {
              return (
                <View style={{ flex: 1, backgroundColor: '#ccc', margin: 5, padding: 0, borderRadius: 7, }}>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('Details', { item: item })} style={styles.imageView} >
                    <Image source={{ uri: item.productPic }} style={styles.imageViews} />
                  </TouchableHighlight>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Text style={styles.textView} > {item.productName} {br} {item.productPrice} {'₹'} </Text>
                    <Text style={styles.textView} >{item.productDesc}</Text>
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
}