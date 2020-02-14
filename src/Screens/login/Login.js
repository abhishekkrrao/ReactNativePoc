import React from 'react'
import { Text, TextInput, View, Button, TouchableHighlight } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = { email: '', password: '', errorMessage: null }
  }

  handleLogin = () => {
    // TODO: Firebase stuff...
    const { email, password } = this.state;
    const emailError = this.validateEmail(this.state.email)
    const passwordError = this.state.password
    if (!emailError && !passwordError) {
      this.setState({ errorMessage: 'Details are not valid!' });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  }


  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (

      <View style={styles.container}>
        <Text style={{ color: '#FF7538', fontSize: 40, fontFamily: "Montserrat-Medium" }}>Log In</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red', fontFamily: "Montserrat-Medium" }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          returnKeyType={"next"}
          onSubmitEditing={() => { this.Password.focus(); }}
          blurOnSubmit={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          ref={(input) => { this.Password = input; }}
          mode='outlined'
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />


        <TouchableHighlight style={{ backgroundColor: '#000', width: 150, borderRadius: 15, padding: 5, alignSelf: 'center' }}>
          <Button style={{ fontFamily: "Montserrat-Medium", backgroundColor: '#000', alignSelf: 'flex-end' }} color='#000' title="Login" onPress={() => this.handleLogin()} />
        </TouchableHighlight>

        <View style={{ marginTop: 25 }}>
          <Text style={{ fontFamily: "Montserrat-Medium" }}> Don't have an account? <Text onPress={() => this.props.navigation.navigate('signUp')} style={{ color: '#FF7538', fontSize: 18, fontFamily: "Montserrat-Medium" }}> Sign Up </Text></Text>
        </View>
      </View>

    )
  }
}