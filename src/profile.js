import React, { Component } from "react";
import { StyleSheet, Button, View, Text, FlatList, Alert, Image, TouchableHighlight, TextInput, AsyncStorage } from "react-native";
import firebase from 'react-native-firebase'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: 15
    },

});
export default class profile extends Component {

    state = { email: '' }
    componentDidMount() {
        this.readUserData();
    }
    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      }
    readUserData() {
        // var recentPostsRef = firebase.database().ref('/Users');
        // recentPostsRef.once('value').then(snapshot => {
        //     console.log('snapshot.val() ', snapshot.val().email);
        //     this.setState({ dataSource: snapshot.val().email })
        // })

        const hList = [];
        const ref = firebase.database().ref('Users')
        ref.orderByChild('email').on('child_added', function (snapshot) {
            console.log('snapshot.val().email ', snapshot.val().email);
            hList.push({
                email: snapshot.val().email
            });
        });

        this.setState({
            list: hList
        })

    }
    render() {
        return (
            <View style={styles.container}>
                {
                    <FlatList
                        data={this.state.list}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.container}>
                                    <Text style={{ flex: 1,color:'red',fontSize:21 }} >{item.email}</Text>
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />}
            </View>
        )
    }
}
