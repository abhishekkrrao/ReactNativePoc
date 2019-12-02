import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
import { tsThisType } from "@babel/types";
export default class signUp extends Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
        // this.props.navigation.navigate('Home')
        const emailError = this.validateEmail(this.state.email)
        const passwordError = this.state.password
        if (!emailError && !passwordError) {
            alert('Details are not valid!')
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    this.writeUserData(this.state.email)
                    this.props.navigation.navigate('Home')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }

    }


    writeUserData(email) {
        firebase.database().ref('Users/').push({email}).then((data) => {
            //success callback
            console.log('data ', data)
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }
    componentDidMount() {
  
    }
    

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#e93766', fontSize: 40 }}>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red' }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <Button title="Sign Up" color="#e93766" onPress={this.handleSignUp} />
                <View>
                    <Text> Already have an account? <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#e93766', fontSize: 18 }}> Login </Text></Text>
                </View>
            </View>
        )
    }
}