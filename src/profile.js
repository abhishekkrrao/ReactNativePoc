import React, { Component } from "react";
import { StyleSheet, Button, View, Text, FlatList, Alert, Image, TouchableHighlight, TextInput, AsyncStorage } from "react-native";
import firebase from 'react-native-firebase'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },

});
export default class profile extends Component {

    state = {
        email: 'abhishek@gmail.com',
    }
    componentDidMount() {
        this.readUserData();
    }
    readUserData() {
        firebase.database().ref('Users/').once('value', function (snapshot) {
            console.log(snapshot.val().email)
            
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ flex: 1 }} >{this.state.email}</Text>
            </View>
        )
    }
}
