import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { ListItem, Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
        fontFamily: "Montserrat-Medium"
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
                    name: 'Test',
                    avatar_url: 'https://bootdey.com/img/Content/avatar/avatar6.png'
                });
                resolve(hList);
            });
        });

    }
    renderRow({ item }) {
        return (
            <ListItem
                style={{ fontFamily: 'Montserrat-Medium' }}
                roundAvatar
                title={item.name}
                subtitle={item.email}
                leftAvatar={{ source: { uri: item.avatar_url } }}
                bottomDivider
                chevron
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <Header
                    ViewComponent={LinearGradient} // Don't forget this!
                    centerComponent={{ text: 'User List', style: { color: '#fff', fontFamily: "Montserrat-Medium" } }}
                    // leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
                    linearGradientProps={{
                        colors: ['#E64A19', '#D84315'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                />
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
