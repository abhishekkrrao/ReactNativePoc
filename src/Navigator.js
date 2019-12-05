import React, { Component } from "react";
import Home from './home'
import App from './../App'
import Details from './details/details'
import Modals from './modal'
import Loading from './Loading'
import signUp from './SignUp'
import profile from './profile'
import Login from './Login'
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
    },
    profile: {
        screen: profile,
        navigationOptions: {
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
        }
    },
    App:
    {
        screen: App,
        navigationOptions: {
            title: "Settings",
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
    Modals:
    {
        screen: Modals,
        navigationOptions: {
            title: "Profile",
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
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                switch (routeName) {
                    case 'Home':
                        return (
                            <Image
                                source={require('./assets/home.png')}
                                style={{ width: 20, height: 20 }} />
                        );
                    case 'Modals':
                        return (
                            <Image
                                source={require('./assets/settings.png')}
                                style={{ width: 20, height: 20 }} />
                        );
                    case 'App':
                        return (
                            <Image
                                source={require('./assets/contacts.png')}
                                style={{ width: 20, height: 20 }} />
                        );
                    case 'profile':
                        return (
                            <Image
                                source={require('./assets/contacts.png')}
                                style={{ width: 20, height: 20 }} />
                        );
                }
                // if (routeName === 'Home') {
                //     return (
                //         <Image
                //             source={require('./assets/home.png')}
                //             style={{ width: 20, height: 20 }} />
                //     );
                // } else {
                //     return (
                //         <Image
                //             source={require('./assets/settings.png')}
                //             style={{ width: 20, height: 20 }} />
                //     );
                // }

            },
        }),
        tabBarOptions: {
            activeTintColor: '#FF6F00',
            inactiveTintColor: '#263238',
        },
    })

const AppNavigator = createStackNavigator({
    Loading: { screen: Loading },
    App: { screen: App },
    Details: { screen: Details },
    signUp: { screen: signUp },
    profile: { screen: profile },
    Login: { screen: Login },
    Home: { screen: TabNavigator },
    Modals: { screen: TabNavigator },
     },{
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
            storageBucket: 'gs://pschedoproject.appspot.com',
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

        firebase.initializeApp(
            Platform.OS === 'ios' ? iosConfig : androidConfig
        );
    }



    componentDidMount() {
        this.initFirebaseApp();
        let initialRouteName = 'Loading';
        // let initialRouteName = 'Loading'
        let isLoggedIn = false

        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                if (user == null) {
                    initialRouteName = 'signUp'
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: initialRouteName
                        })],
                    })
                    this.navigation.dispatch(resetAction)
                } else {
                    initialRouteName = 'Home'
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({
                            routeName: initialRouteName
                        })],
                    })
                    this.navigation.dispatch(resetAction)
                }
            })

        }, 3000)

        // if (isLoggedIn) {
        //     initialRouteName = 'Home'
        // } else {
        //     initialRouteName = 'signUp'
        // }


    }
} 