import React, { Component } from "react";
import Home from './home'
import App from './../App'
import Modals from './modal'
import Loading from './Loading'
import signUp from './SignUp'
import Login from './Login'
import { Image, Alert } from "react-native";
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { from } from "rxjs";
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
    signUp: {
        screen: signUp,
        navigationOptions: {
            title: "signUp",
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
            title: "Contacts",
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
    signUp: { screen: signUp },
    Login: { screen: Login },
    Home: { screen: TabNavigator },
    Modals: { screen: TabNavigator },
},
    {
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

    componentDidMount() {

        setTimeout(() => {
            let initialRouteName = 'Loading'
            let isLoggedIn = false
            if (isLoggedIn) {
                initialRouteName = 'Home'
            } else {
                initialRouteName = 'signUp'
            }
           
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: initialRouteName
                })],
            })
            this.navigation.dispatch(resetAction)

        }, 3000)
    }
} 