import React, { Component } from "react";
import { StyleSheet, Text, Button, View, ActivityIndicator } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
 
});
export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}
