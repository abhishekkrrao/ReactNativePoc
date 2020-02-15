import React from 'react'
import { Text, TextInput, View, Button, TouchableHighlight ,Keyboard} from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
// import auth from '../../Api/authentication'
export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = { email: '', password: '', errorMessage: null, isLoading: false }
  }

  // saveData(key,obj){
  //   auth.saveData(key,obj);
  // }

  handleLogin = () => {
    // TODO: Firebase stuff...
    Keyboard.dismiss()
    this.setState({
      isLoading: true
    })
    const { email, password } = this.state;
    const emailError = this.validateEmail(this.state.email)
    const passwordError = this.state.password
    if (!emailError && !passwordError) {
      this.setState({ errorMessage: 'Details are not valid!' });
      this.setState({
        isLoading: false
      })
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate('Home');
         // this.saveData('userdata',email);
          this.setState({
            isLoading: false
          })
        })
        .catch(error => {
          this.setState({ errorMessage: error.message })
          this.setState({
            isLoading: false
          })
        }
      )
    }
  }


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

  loader() {
    if (this.state.isLoading == true) {
      return (
        <Loading></Loading>
      )
    }
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
          blurOnSubmit={false}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />



        <TextInput
          ref={(input) => { this.Password = input; }}
          mode='outlined'
          secureTextEntry
          maxLength={8}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.onPasswordChange(password)}
          value={this.state.password}
        />
        {this.loader()}

        <TouchableHighlight style={{ backgroundColor: '#000', width: 150, borderRadius: 15, padding: 5, alignSelf: 'center' }}>
          <Button style={{ fontFamily: "Montserrat-Medium", backgroundColor: '#000', alignSelf: 'flex-end' }} color='#000' title="Login" onPress={() => this.handleLogin()} />
        </TouchableHighlight>

        <View style={{ marginTop: 25 }}>
          <Text style={{ fontFamily: "Montserrat-Medium" }}> Don't have an account? <Text onPress={() => this.goSignUpPage()} style={{ color: '#FF7538', fontSize: 18, fontFamily: "Montserrat-Medium" }}> Sign Up </Text></Text>
        </View>
      </View>

    )
  }
  onPasswordChange(password) {
    this.setState({ password })
  }
}