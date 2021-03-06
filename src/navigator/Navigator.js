import React, { Component } from "react";
import Home from '../Screens/home/home'
import Details from '../Screens/DetailPage/Details'
import addproduct from '../addproduct/addproduct'
import Chats from '../chat/chat'
import UserProfille from '../Screens/UserProfile/UserProfille'
import Loading from '../loader/Loading'
import signUp from '../Screens/signup/SignUp'
import chat from '../Screens/Chat/Chat'
import Login from '../Screens/login/Login'
import Comment from '../Screens/Comments/Comment'
import { Image, Platform } from "react-native";
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import firebase from 'react-native-firebase'

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: "Home",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        }
    }, chat: {
        screen: chat,
        navigationOptions: ({ navigation }) => ({
            title: "User List",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        })
    }, addproduct: {
        screen: addproduct,
        navigationOptions: {
            title: "Add Product",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        }
    }, UserProfille: {
        screen: UserProfille,
        navigationOptions: {
            title: "chat",
            headerLeft: null,
            gesturesEnabled: false,
            header: {
                visible: false,
                left: null,
            },
            backButton: {
                visible: false,
            }
        }
    },
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            console.log(routeName)
            switch (routeName) {
                case 'Home':
                    return (
                        <Image
                            source={require('../assets/home.png')}
                            style={{ width: 20, height: 20 }} />
                    );
                case 'UserProfille':
                    return (
                        <Image
                            source={require('../assets/settings.png')}
                            style={{ width: 20, height: 20 }} />
                    );
                case 'addproduct':
                    return (
                        <Image
                            source={require('../assets/contacts.png')}
                            style={{ width: 20, height: 20 }} />
                    );
                case 'chat':
                    return (
                        <Image
                            source={require('../assets/contacts.png')}
                            style={{ width: 20, height: 20 }} />
                    );
            }
        },
    }), tabBarOptions: {
        activeTintColor: '#000',
        inactiveTintColor: '#000',
        activeBackgroundColor: '#ccc',
        labelStyle: { fontFamily: "Montserrat-Medium", fontWeight: "900", fontSize: 14 },
        tabStyle: { fontFamily: "Montserrat-Medium", fontWeight: "900", fontSize: 14 },
        style: { height: 60, fontFamily: "Montserrat-Medium", borderStyle: 'solid' }
    },
});
const AppNavigator = createStackNavigator({
    Loading: { screen: Loading },
    Details: { screen: Details },
    Chats: { screen: Chats },
    signUp: { screen: signUp },
    chat: { screen: chat },
    addproduct: { screen: addproduct },
    Login: { screen: Login },
    Home: { screen: Home },
    UserProfille: { screen: UserProfille },
    Tabs: { screen: TabNavigator },
    Comment: { screen: Comment }
}, {
    headerMode: 'none',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    }
});
const AppContainer = createAppContainer(AppNavigator);
export default class Navigator extends Component {
    state = { currentUser: '' }
    render() {
        return (
            <AppContainer ref={r => this.navigation = r._navigation} />
        )
    }
    initFirebaseApp() {
        const iosConfig = {
            apiKey: 'AIzaSyCfthKhLV1RCYYXRmCp-5OYVPfUahWAOlg',
            clientId: '1030315320618-upbact3r9qu7iccvqd1pl74rnp95ks64.apps.googleusercontent.com',
            appId: '1:1030315320618:ios:a5046d75075c029a19aa53',
            databaseURL: 'https://pschedoproject.firebaseio.com/',
            storageBucket: 'pschedoproject.appspot.com',
            messagingSenderId: '1030315320618',
            projectId: 'pschedoproject',
            persistence: true,
            authDomain: "pschedoproject.firebaseapp.com",
        }
        const androidConfig = {
            apiKey: "AIzaSyCfthKhLV1RCYYXRmCp-5OYVPfUahWAOlg",
            authDomain: "pschedoproject.firebaseapp.com",
            databaseURL: "https://pschedoproject.firebaseio.com",
            projectId: "pschedoproject",
            storageBucket: "pschedoproject.appspot.com",
            messagingSenderId: "1030315320618",
            appId: "1:1030315320618:web:9a0f537b4125a0f819aa53",
            measurementId: "G-ESXJTMWFNX"
        }
        // console.log('firebase.app.length ',  Platform.OS === 'ios' ? iosConfig : androidConfig);
        if (firebase.app.length > 0) {
            ;
            firebase.initializeApp(Platform.OS === 'ios' ? iosConfig : androidConfig);
        }
    }
    componentDidMount() {
        this.initFirebaseApp();
        let initialRouteName = 'Loading';
        firebase.auth().onAuthStateChanged(user => {
            if (user == null) {
                initialRouteName = 'signUp'
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                        routeName: initialRouteName
                    })],
                })
                this.navigation.dispatch(resetAction);
            } else {
                initialRouteName = 'Tabs'
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({
                        routeName: initialRouteName
                    })],
                });
                this.navigation.dispatch(resetAction);
            }
        });
    }
} 
