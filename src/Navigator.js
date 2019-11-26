import React, { Component } from "react";
import Home from './home'
import App from './../App'
import Modals from './modal'
import Loading from './Loading'
import { Image } from "react-native";
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { from } from "rxjs";
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
        }
    },
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Home') {
                    return (
                        <Image
                            source={require('./assets/home.png')}
                            style={{ width: 20, height: 20 }} />
                    );
                } else {
                    return (
                        <Image
                            source={require('./assets/settings.png')}
                            style={{ width: 20, height: 20 }} />
                    );
                }
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
    Home: { screen: TabNavigator },
    Modals: { screen: TabNavigator },
});

const AppContainer = createAppContainer(AppNavigator);
export default class Navigator extends Component {
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
                initialRouteName = 'App'
            }
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: initialRouteName })],
            })
            this.navigation.dispatch(resetAction)

        }, 3000)
    }
} 