import React, { Component } from "react";
import { Header } from 'react-native-elements';
export default class Headers extends Component {
    render() {
        return (
            <Header
                containerStyle={{ height: 75 }}
                ViewComponent={LinearGradient} // Don't forget this!
                centerComponent={{ text: 'Profile', style: { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 50 } }}
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