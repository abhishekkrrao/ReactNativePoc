import React, { Component } from "react";
import { View, Text } from "react-native";
import Loading from '../../loader/Loading'
import commentcss from './Style'
import Headers from '../../header/header'
import { addComment, olacab } from '../../Api/ApiHandler.js'

console.log(addComment, "----111111");

console.log(olacab, "----olacab");
export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: false, receivedValue: {} }
    }
    componentWillMount() {
        // const receivedValue = this.props.navigation.getParam('item', () => { });
        // console.log('receivedValue ', receivedValue);
        // this.setState({
        //     receivedValue:receivedValue
        // });
        console.log('------2222222')
        debugger;

    }

    // addComment(item,message){
    //     let path = "addProduct/"+item.uid+"/"+item.key+"comment";
    //     let user = firebase.auth().currentUser;
    //     let obj = {
    //         message:message,
    //         uid:user.uid,
    //         email:user.email,
    //         pic:user.profilePic,
    //         timestamp:new Date()
    //     }
    //     firebase.database().ref(path).push(obj).then((saveMessage) => {
    //         console.log('saveMessage ', saveMessage);
    //     }).catch((error)=>{
    //         console.log('error ', error);
    //     });
    // }
    render() {
        setTimeout(() => { this.state.isLoading = false }, 5000);
        if (this.state.isLoading == true) {
            return (
                <Loading></Loading>
            )
        } else {
            return (
                <View style={commentcss.MainContainer}>
                    <Headers title="Comments"></Headers>
                    <View>
                        <Text>
                            {this.state.receivedValue.productPic}
                        </Text>
                    </View>
                </View>
            );
        }
    }
}