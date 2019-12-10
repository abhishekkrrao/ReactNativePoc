import React, { Component } from "react";
import { StyleSheet, View, FlatList, TouchableHighlight, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { Header } from 'react-native-elements';
import Loading from './Loading'
import LinearGradient from 'react-native-linear-gradient';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF",
        fontFamily: "Montserrat-Medium"
    }
});

export default class profile extends Component {
    state = {currentUSERUID:'',isLoading:true}
    // navigation;
    constructor(props) {
        super(props)
        //  navigation = this.props.navigation;
    }
    static navigationOptions = {
        title: 'User List'
    };
    componentDidMount() {
        this.readUserData();
    }
    readUserData() {
        return new Promise((resolve,reject)=>{
            firebase.auth().onAuthStateChanged(user => {
                this.getList(user.uid).then((list) => {
                    this.setState({
                        currentUSERUID:user.uid,
                        list: list,
                        isLoading:false
                    });
                });
            });
        });
    }

    getList(uid) {
        return new Promise((resolve, reject) => {
            const arrayList = [];
            // var recentPostsRef = firebase.database().ref('Users/');
            // recentPostsRef.once('value').then(snapshot => {
            //     console.log('snapshot.val() ', snapshot.val().email);
            //     arrayList.push({
            //         email: snapshot.val().email,
            //         name: snapshot.val().email.substring(0, snapshot.val().email.lastIndexOf("@")),
            //         avatar_url: 'https://bootdey.com/img/Content/avatar/avatar6.png',
            //         uid: snapshot.val().uid
            //     });
            //     resolve(arrayList);
            // })
            var ref = firebase.database().ref('Users/');
            ref.orderByChild('email').on('child_added', function (snapshot) {
                arrayList.push({
                    email: snapshot.val().email,
                    name: snapshot.val().email.substring(0, snapshot.val().email.lastIndexOf("@")),
                    avatar_url: 'https://bootdey.com/img/Content/avatar/avatar6.png',
                    uid: snapshot.val().uid
                });
                resolve(arrayList);

                
            });
        });
    }
    renderRow(item) {
        if(this.state.currentUSERUID != item.uid){
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
            )
        }
        
    }
    render() {
        // console.log('this.props.navigation ',this.props.navigation)
        if(this.state.isLoading == true){
            return (
                <Loading></Loading> 
             ) 
        }else{
             return (
                <View style={styles.container}>
                    <Header
                        containerStyle={{ height: 75 }}
                        ViewComponent={LinearGradient}
                        centerComponent={{ text: 'User List', style: { color: '#fff', fontFamily: "Montserrat-Medium" , paddingBottom: 10 } }}
                        // leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
                        linearGradientProps={{
                            colors: ['#E64A19', '#D84315'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                    />
                    <FlatList
                        data={this.state.list}
                        renderItem={({ item, i }) => {
                            return this.renderRow(item)
                        }}
                        keyExtractor={({ item, index }) => index + 'llll'}
                    />
                </View>
            )
        }
       
    }
}
