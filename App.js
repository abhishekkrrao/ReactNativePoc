import React, { Component } from "react";
import { StyleSheet, Button, View, Text, FlatList } from "react-native";
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }
  componentWillMount() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function () {
        });
      }).catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      // <Button
      //   title="Go to Details"
      //   onPress={() => this.props.navigation.navigate('Home')}
      // />
      // <View style={styles.container}>
      //   {/* <Form
      //     ref={c => this._form = c} // assign a ref
      //     type={User}
      //   /> */}
      //   <Button
      //     title="Sign Up!"
      //     onPress={() => this.props.navigation.navigate('Home')}
      //   />
      //   <Button
      //     title="getMoviesFromApi"
      //     onPress={() => this.getMoviesFromApi()}
      //   />
      // </View>
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({ id }, index) => id}
        />
      </View>
    );
  }
}