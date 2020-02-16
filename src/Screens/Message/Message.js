import React, { Component } from "react";
import { StyleSheet, View, FlatList, TouchableHighlight, Text, Image } from "react-native";
import Loading from '../../loader/Loading'
import Headers from '../../header/header'
import styles from './style'
export default class Message extends Component {
    state = { isLoading:false,list:[] }
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    renderRow(item){
        return (
            <View>

            </View>
        );
    }
    render(){
        if (this.state.isLoading == true) {
            return (
                <View style={styles.mainContainer}>
                    <Headers title="Message"></Headers>
                    <Loading></Loading>
                </View>
            );
        } else {
            return (
                <View style={styles.mainContainer}>
                    <Headers title="Message"></Headers>
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