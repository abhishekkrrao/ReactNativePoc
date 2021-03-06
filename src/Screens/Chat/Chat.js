import React, { Component } from "react";
import { StyleSheet, View, FlatList, TouchableHighlight, Text, Image } from "react-native";
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import Loading from '../../loader/Loading'
import Headers from '../../header/header'
import styles from './style'
export default class Chat extends Component {
    state = { currentUSERUID: '', isLoading: true }
    // navigation;
    constructor(props) {
        super(props)
        //  navigation = this.props.navigation;
    }
    static navigationOptions = {
        title: 'User List'
    };
    componentDidMount() {
        let user = firebase.auth().currentUser;
        this.setState({
            currentUSERUID: user.uid
        });
        this.getList().then((list) => {
            this.setState({
                list: list,
                isLoading: false
            });
        });
    }

    async getList() {
        const arrayList = [];
        var ref = firebase.database().ref('Users/');
        ref.orderByChild('email').on('child_added', function (snapshot) {
             arrayList.push({
                email: snapshot.val().email,
                name: snapshot.val().email.substring(0, snapshot.val().email.lastIndexOf("@")),
                avatar_url: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                uid: snapshot.val().uid
            });
           // resolve(arrayList);
        });
        await arrayList;
    }
    renderRow(item) {
        if (this.state.currentUSERUID != item.uid) {
            return (
                <View style={{
                    flex: 1, flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    backgroundColor: '#ccc',
                    marginTop: 5,
                    borderRadius: 5,
                    width: '95%',
                    marginLeft: '2.5%'
                }}>
                    <View style={{ width: 70 }}>
                        <TouchableHighlight style={{ padding: 5 }} >
                            <Image source={{ uri: item.avatar_url }} style={{ width: 50, height: 50, borderRadius: 30 }} />
                        </TouchableHighlight>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontFamily: "Montserrat-Medium" }}>
                            {item.name}
                        </Text>
                        <Text style={{ fontFamily: "Montserrat-Medium" }}>
                            {item.email}
                        </Text>
                    </View>
                    <View style={{ width: 50, textAlign: 'right' }}>
                        <Icon
                            name='arrow-forward'
                            color='#f50'
                            onPress={() => this.props.navigation.navigate("Chats", { item: item })} />
                    </View>
                </View>
            );
        }
    }
    render() {
        // console.log('this.props.navigation ',this.props.navigation)
        if (this.state.isLoading == true) {
            return (
                <View style={styles.container}>
                    <Headers title="User List"></Headers>
                    <Loading></Loading>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Headers title="User List"></Headers>
                    <FlatList
                        data={this.state.list}
                        renderItem={({ item }) => {
                            return this.renderRow(item)
                        }}
                        keyExtractor={({ index }) => index + 'llll'}
                    />
                </View>
            );
        }
    }
}
