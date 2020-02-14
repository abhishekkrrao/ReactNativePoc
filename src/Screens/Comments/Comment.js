import React, { Component } from "react";
import { View, Text, Button, TouchableHighlight } from "react-native";
import Loading from '../../loader/Loading'
import styles from './Style'
import Headers from '../../header/header'
import firebase from 'react-native-firebase'
export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: false, receivedValue: {} }
    }
    componentWillMount() {
        const receivedValue = this.props.navigation.getParam('item', () => { });
        console.log('receivedValue ', receivedValue);
        this.setState({
            receivedValue: receivedValue
        });
    }

    doComment(item, message) {
        let path = "addProduct/" + item.uid + "/" + item.key + "/comment";

        console.log('item.path ', path);
        let user = firebase.auth().currentUser;
        let obj = {
            message: message,
            uid: user.uid,
            email: user.email,
            pic: user.profilePic,
            timestamp: new Date()
        }
        if (item.uid != null && item.uid != undefined && item.key != null && item.key != undefined) {
            firebase.database().ref(path).push(obj).then((saveMessage) => {
                console.log('saveMessage ', saveMessage);
            }).catch((error) => {
                console.log('error ', error);
            });
        } else {
            console.log('item.uid ', item.uid);
            console.log('item.key ', item.key);
        }
    }
    render() {
        setTimeout(() => { this.state.isLoading = false }, 5000);
        if (this.state.isLoading == true) {
            return (
                <Loading></Loading>
            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <Headers title="Comments"></Headers>
                    <View style={styles.sub_main_container}>
                        <Text style={styles.text_c_view}>
                            Hi this is dummy page .i am still working on it .
                        </Text>

                        <TouchableHighlight style={ styles.touch_v }>
                            <Button color="#000" title="Comment" onClick={this.doComment(this.state.receivedValue, "dfgdsf")} ></Button>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
    }
}