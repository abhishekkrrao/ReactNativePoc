import firebase from 'react-native-firebase'
import { AsyncStorage } from 'react-native';
import React, { Component } from "react";
export default class authentication extends React {
    constructor(props) {
        super(props);
    }
    handleLogin = (email, password) => {
        const emailError = this.validateEmail(email)
        const passwordError = password
        if (!emailError && !passwordError) {
            alert('Details are not valid!')
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
    saveData = (obj, key) => {
        try {
            AsyncStorage.setItem(key, obj).then((result) => { console.log('saved', result) }).catch((error) => { console.log('not saved', error) })
            // localStorage.setItem(key, obj);
        } catch (exception) { console.log('exception ', exception) }
    }
    getData = (key) => {
        return new Promise((resolve, reject) => {
            try {
                AsyncStorage.getItem(key).then((result) => { resolve(result); console.log('saved', result) }).catch((error) => { reject(error); console.log('not saved', error) })
            } catch (exception) { console.log('exception ', exception) }
        })
    }
}