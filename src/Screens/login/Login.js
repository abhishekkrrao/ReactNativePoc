import React from 'react'
import { Text, TextInput, View, Button, TouchableHighlight } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
import { fromLeft, zoomIn, zoomOut, flipX } from 'react-navigation-transitions'
export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null, isLoading: false }
  handleLogin = () => {
    this.state.isLoading = true;
    const { email, password } = this.state;
    const emailError = this.validateEmail(this.state.email)
    const passwordError = this.state.password
    if (!emailError && !passwordError) {
      this.setState({ errorMessage: 'Details are not valid!', isLoading: false })
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({
            isLoading: false
          })
          this.props.navigation.navigate('Home');
        })
        .catch(error => this.setState({ errorMessage: error.message, isLoading: false }))
    }
  }
  static navigationOptions = () => {
    return {
      header: (
        <View
          style={{
            height: 45,
            marginTop: 20,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            This is Custom Header
          </Text>
        </View>
      ),
    };
  };

  showLoading() {
    if (this.state.isLoading) {
      return (
        <Loading></Loading>
      )
    }
  }
  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  render() {
    return (

      <View style={styles.container}>
        <Text style={{ color: '#000', fontSize: 40, fontFamily: "Montserrat-Medium" }}>Log In</Text>
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
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />



        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          ref={(input) => { this.Password = input; }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        {this.showLoading()}

        <TouchableHighlight style={{ backgroundColor: '#000', width: 200, borderRadius: 0, padding: 5, alignSelf: 'center' }}>
          <Button style={styles.buttonCss} color='#000' title="Login" onPress={() => this.handleLogin()} />
        </TouchableHighlight>

        <View style={{ marginTop: 25 }}>
          <Text style={{ fontFamily: "Montserrat-Medium" }}> Don't have an account? <Text onPress={() => this.goSignUpPage()} style={{ color: '#FF7538', fontSize: 18, fontFamily: "Montserrat-Medium" }}> Sign Up </Text></Text>
        </View>
      </View>

    )
  }
  goSignUpPage(){
    this.props.navigation.navigate('signUp');
    fromLeft(3000);
  }
}