import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import styles from './style'
import firebase from 'react-native-firebase'
export default class signUp extends Component {
    state = { email: '', password: '', errorMessage: null }
    handleSignUp = () => {
        //this.props.navigation.navigate('Home')
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('Home'))
            .catch(error => this.setState({ errorMessage: error.message }))
    }
    componentDidMount() {
        this.initFirebaseApp();
    }
    initFirebaseApp(){
        firebase.initializeApp({
            apiKey: "AIzaSyCfthKhLV1RCYYXRmCp-5OYVPfUahWAOlg",
            authDomain: "pschedoproject.firebaseapp.com",
            databaseURL: "https://pschedoproject.firebaseio.com",
            projectId: "pschedoproject",
            storageBucket: "pschedoproject.appspot.com",
            messagingSenderId: "1030315320618",
            appId: "1:1030315320618:web:9a0f537b4125a0f819aa53",
            measurementId: "G-ESXJTMWFNX"
        });

        // const iosConfig = {
        //     clientId: 'x',
        //     appId: '1:1030315320618:ios:a5046d75075c029a19aa53',
        //     apiKey: 'AIzaSyCfthKhLV1RCYYXRmCp-5OYVPfUahWAOlg',
        //     databaseURL: 'https://pschedoproject.firebaseio.com/',
        //     storageBucket: 'gs://pschedoproject.appspot.com',
        //     messagingSenderId: '1030315320618',
        //     projectId: 'pschedoproject',
        //     persistence: true,
        //   };
        //   const androidConfig = {
        //     clientId: 'x',
        //     appId: '1:1030315320618:ios:a5046d75075c029a19aa53',
        //     apiKey: 'AIzaSyCfthKhLV1RCYYXRmCp-5OYVPfUahWAOlg',
        //     databaseURL: 'https://pschedoproject.firebaseio.com/',
        //     storageBucket: 'gs://pschedoproject.appspot.com',
        //     messagingSenderId: '1030315320618',
        //     projectId: 'pschedoproject',
        //     persistence: true,
        //   };
        //   const pschedoProject = firebase.initializeApp(
        //     Platform.OS === 'ios' ? iosConfig : androidConfig
        //   );
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