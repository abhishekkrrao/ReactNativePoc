import React, { Component } from "react";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
export default class Headers extends Component {

    closeApp() {
        console.log('close App');
        this.props.navigation.goBack();
    }
    render() {

        return (
            <Header
                containerStyle={{ height: 55 }}
                ViewComponent={LinearGradient} // Don't forget this!
                centerComponent={{ text: this.props.title, style: { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 25 } }}
                // leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
                linearGradientProps={{
                    colors: ['#E64A19', '#D84315'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
            />
        );
    }
}