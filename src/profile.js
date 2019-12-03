import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { ListItem } from 'react-native-elements'
import firebase from 'react-native-firebase'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
        padding: 25
    }
});
export default class profile extends Component {

    state = {}
    componentDidMount() {

        this.readUserData();
    }
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }
    readUserData() {
        // var recentPostsRef = firebase.database().ref('/Users');
        // recentPostsRef.once('value').then(snapshot => {
        //     console.log('snapshot.val() ', snapshot.val().email);
        //     this.setState({ dataSource: snapshot.val().email })
        // })
        this.getList().then((list) => {
            this.setState({
                list: list
            });
        });
    }

    getList() {
        return new Promise((resolve, reject) => {
            const hList = [];
            const ref = firebase.database().ref('Users')
            ref.orderByChild('email').on('child_added', function (snapshot) {
                hList.push({
                    email: snapshot.val().email,
                    name:'Test',
                    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
                });
                resolve(hList);
            });
        });

    }
    renderRow({ item }) {
        return (
            <ListItem
                roundAvatar
                title={item.name}
                subtitle={item.email}
                avatar={{ uri: item.avatar_url }}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
               <FlatList
                        data={this.state.list}
                        renderItem={this.renderRow}
                        keyExtractor={item => item}
                    />
            </View>

            // <List containerStyle={{ marginBottom: 20 }}>
            //     {
            //         this.state.list.map((l) => (
            //             <ListItem
            //                 roundAvatar
            //                 avatar={{ uri: l.avatar_url }}
            //                 title={l.email}
            //             />
            //         ))
            //     }
            // </List>
            // <View style={styles.container}>
            //     {
            //         <FlatList
            //             data={this.state.list}
            //             ItemSeparatorComponent={this.FlatListItemSeparator}
            //             renderItem={({ item, index }) => {
            //                 return (
            //                     <View style={styles.container}>
            //                         <Text style={{ flex: 1 }} >{item.email}</Text>
            //                     </View>
            //                 )
            //             }}
            //             keyExtractor={(item, index) => index.toString()}
            //         />}
            // </View>
        )
    }
}
