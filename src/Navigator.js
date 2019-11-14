import React, { Component } from "react";
import Home from './home'
import App from './../App'
import Loading from './Loading'
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
const TabNavigator = createBottomTabNavigator({

    Home: { screen: Home },
    App: { screen: App },
})

const AppNavigator = createStackNavigator({
    Loading: { screen: Loading },
    App: { screen: App },
    Home: { screen: TabNavigator },
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