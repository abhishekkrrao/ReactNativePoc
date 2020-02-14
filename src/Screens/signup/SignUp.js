import React, { Component } from "react";
import { Text, TextInput, View, Button, TouchableHighlight,Keyboard } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
import { fromLeft, zoomIn, zoomOut, flipX,flipY, fromRight } from 'react-navigation-transitions'

export default class signUp extends Component {
    state = { email: '', password: '', errorMessage: null, isLoading: false }
    handleSignUp = () => {
        Keyboard.dismiss();
        this.state.isLoading = true;
        console.log('isLoading ', this.state.isLoading);
        const emailError = this.validateEmail(this.state.email)
        const passwordError = this.state.password
        if (!emailError && !passwordError) {
            this.setState({ errorMessage: "Details are not valid !" })
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((res) => {
                    this.writeUserData(this.state.email)
                    this.props.navigation.navigate('Home')
                    this.setState({ isLoading: false })
                })
                .catch(error => this.setState({ errorMessage: error.message, isLoading: false }))
        }

    }

    writeUserData(email) {
        firebase.auth().onAuthStateChanged(user => {
            firebase.database().ref('Users/' + user.uid).set({ email: email, uid: user.uid, profilePic: 'https://bootdey.com/img/Content/avatar/avatar6.png' }).then((data) => {
                //success callback
                console.log('data ', data)
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })
        })
    }
    componentDidMount() {
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    showLoading() {
        console.log('isLoading ', this.state.isLoading);
        if (this.state.isLoading) {
            return (
                <View style={{ width: "100%" }}>
                    <Loading></Loading>
                </View>
            )
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#000', fontSize: 40, fontFamily: "Montserrat-Medium" }}>Sign Up</Text>
                {this.state.errorMessage &&
                    <Text style={{ color: 'red', fontFamily: "Montserrat-Medium", padding: 10 }}>
                        {this.state.errorMessage}
                    </Text>}
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    style={styles.textInput}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { this.Password.focus(); }}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { this.Password.focus(); }}
                    blurOnSubmit={false}
                />
                <TextInput
                    ref={(input) => { this.Password = input; }}
                    secureTextEntry
                    placeholder="Password"
                    autoCapitalize="none"
                    style={styles.textInput}
                    ref={(input) => { this.Password = input; }}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                {this.showLoading()}
                <TouchableHighlight style={styles.buttonCss}>
                    <Button style={{ fontFamily: "Montserrat-Medium" }} title="Sign Up" color='#000' onPress={this.handleSignUp} />
                </TouchableHighlight>

                <View style={{ marginTop: 25 }}>
                    <Text style={{ fontFamily: "Montserrat-Medium" }}> Already have an account? <Text onPress={() => this.goLoginPage()} style={{ color: '#FF7538', fontSize: 18, fontFamily: "Montserrat-Medium" }}> Log In </Text></Text>
                </View>
            </View>
        )
    }
    goLoginPage(){
        this.props.navigation.navigate('Login');
        fromRight(3000);
    }
}