import React, { Component } from "react";
import { View } from "react-native";
import Loading from '../../loader/Loading'
import commentcss from './Style'
import Headers from '../../header/header'
export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = { isLoading: false }
    }
    componentWillMount() {

    }
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
                </View>

            );
        }
    }
}