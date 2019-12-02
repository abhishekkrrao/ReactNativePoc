import React, { Component } from "react";
import { StyleSheet, Text, Button, View, ActivityIndicator } from "react-native";
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
    state = { email: '' }
    componentDidMount() {
        this.readUserData();
    }
    readUserData() {
        firebase.database().ref('Users/').once('value', function (snapshot) {
            console.log(snapshot.val())
            this.setState({
                dataSource: snapshot.val(),
            }, function () {
            });
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>

                </Text>
            </View>
        );
    }
}
