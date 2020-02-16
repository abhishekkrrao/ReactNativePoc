import React, { Component } from "react";
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import firebase from 'react-native-firebase'
export default class Headers extends Component {
    constructor(props){
        super(props)
    }
    goBack() {
        this.props.navigation.navigation('Home');
    }
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };
    hideMenu = () => {
        this._menu.hide();
    };
    showMenu = () => {
        this._menu.show();
    };
    closeApp() {
        firebase.auth().signOut();
    }
    renderMenu() {
        return (
            <View style={{ alignItems: "flex-end", alignSelf: "flex-end", marginEnd: 15, height: 75, width: 75, paddingTop: 5 }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<Icon onPress={() => this.showMenu()} type="material" name="more-vert" size={35} color="#fff" />}
                >
                    {/* <MenuItem onPress={() => console.log('')}>Log Out</MenuItem>
                    <MenuDivider /> */}
                    <MenuItem onPress={() => this.closeApp()}>Log Out</MenuItem>
                </Menu>
            </View>
        );
    }
    render() {
        if (this.props.profile == 'isprofile') {
            console.log('i am isprofile called  ', this.props.title)
            return (
                <Header
                    containerStyle={{ height: 55 }}
                    ViewComponent={LinearGradient} // Don't forget this!
                    centerComponent={{
                        text: this.props.title, style:
                            { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 25, fontSize: 16, fontWeight: "900" }
                    }}
                    rightComponent={this.renderMenu()}
                    linearGradientProps={{
                        colors: ['#898989', '#898989'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                />
            );
        } else if (this.props.title == 'A-shop') {
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
        } else if (this.props.title == 'Detail') {
            return (
                <Header
                    containerStyle={{ height: 55 }}
                    ViewComponent={LinearGradient} 
                    centerComponent={{
                        text: this.props.title, style:
                            { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 25, fontSize: 16, fontWeight: "900" }
                    }
                    }
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.goBack() }}
                    linearGradientProps={{
                        colors: ['#898989', '#898989'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                />
            );
        } else {
            return (
                <Header
                    containerStyle={{ height: 55 }}
                    ViewComponent={LinearGradient} // Don't forget this!
                    centerComponent={{
                        text: this.props.title, style:
                            { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 25, fontSize: 16, fontWeight: "900" }
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
}