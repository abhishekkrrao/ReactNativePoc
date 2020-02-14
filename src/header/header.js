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
                centerComponent={{
                    text: this.props.title, style:
                        { color: '#fff', fontFamily: "boldme", paddingBottom: 25, fontSize: 28, fontWeight: "900" }
                }
                }
                // leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
                linearGradientProps={{
                    colors: ['#898989', '#898989'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
            />
        );
    }
}