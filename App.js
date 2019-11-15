import React, { Component } from "react";
import { StyleSheet, Button, View, Text } from "react-native";
import t from 'tcomb-form-native';
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10
//   },
//   instructions: {
//     textAlign: "center",
//     color: "#333333",
//     marginBottom: 5
//   }
// });

handleSubmit = () => {
  const value = this._form.getValue(); // use that ref to get the form value
  console.log('value: ', value);
}

addReactiveForm = () => {
    return User;
}

const Form = t.form.Form;
const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  terms: t.Boolean
});
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
  }
  render() {
    return (
      // <Button
      //   title="Go to Details"
      //   onPress={() => this.props.navigation.navigate('Home')}
      // />
      // <KeyboardAvoidingView behavior="padding" style={styles.container}>
      //   <UserInput
      //     source={usernameImg}
      //     placeholder="Username"
      //     autoCapitalize={'none'}
      //     returnKeyType={'done'}
      //     autoCorrect={false}
      //   />
      //   <UserInput
      //     source={passwordImg}
      //     secureTextEntry={this.state.showPass}
      //     placeholder="Password"
      //     returnKeyType={'done'}
      //     autoCapitalize={'none'}
      //     autoCorrect={false}
      //   />
      //   <TouchableOpacity
      //     activeOpacity={0.7}
      //     style={styles.btnEye}
      //     onPress={this.showPass}>
      //     <Image source={eyeImg} style={styles.iconEye} />
      //   </TouchableOpacity>
      // </KeyboardAvoidingView>

      <View style={styles.container}>
        <Form
          ref={c => this._form = c} // assign a ref
          type={User}
        />
        <Button
          title="Sign Up!"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   btnEye: {
//     position: 'absolute',
//     top: 55,
//     right: 28,
//   },
//   iconEye: {
//     width: 25,
//     height: 25,
//     tintColor: 'rgba(0,0,0,0.2)',
//   },
// });