import React from 'react'
import { Text, TextInput, View, Button, TouchableHighlight, Image } from 'react-native'
import styles from './addproductcss'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker';
import Headers from '../header/header'
import Loading from '../loader/Loading'
export default class addproduct extends React.Component {
    state = { uid: firebase.auth().currentUser.uid, isLoading: false, productName: '', productDesc: '', productPic: 'https://bootdey.com/img/Content/avatar/avatar6.png', productPrice: '', productType: '', productSubType: '', isPicUpload: false }
    addProduct() {
        console.log('state ', this.state.productPrice);
        this.saveProduct(this.state);
    }
    showLoading() {
        if (this.state.isPicUpload) {
            return (
                <Loading></Loading>
            )
        }
    }
    updateState() {
        this.state.productDesc = ''
        this.state.productPic = 'https://bootdey.com/img/Content/avatar/avatar6.png'
        this.state.productPrice = ''
        this.state.productType = ''
        this.state.productSubType = ''
        this.state.isPicUpload = false
    }
    pickImage() {
        return new Promise((resolve, reject) => {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: false
            }).then(image => {
                this.setState({
                    productPic: image.path,
                    isLoading: false
                });
                resolve(image.path);
            }).catch((error) => {
                this.setState({
                    isLoading: false
                })
                console.log(error);
                reject(error);
            });
        });
    }
    saveProduct() {
        console.log('isPicUpload', this.state.isPicUpload)
        console.log('getTime', new Date().getTime());
        const userId = firebase.auth().currentUser.uid;
        if (this.state.isPicUpload) {
            // firebase.database().ref('addProduct/' + new Date().getTime()).set(this.state).then((result) => { this.props.navigation.navigate('Home');console.log('result', result); this.updateState(); }).catch((error) => { console.log('error', error) });
            firebase.database().ref('addProduct/' + userId).push(this.state).then((result) => {
                this.props.navigation.navigate('Home');
                console.log('result ', result);
                let olacab = `${result}`;
                let array = [];
                array = olacab.split('/');

                this.updateState();
            }).catch((error) => {
                console.log('error', error);
            });
        } else {
            //alert('Please add a picture')
        }
    }
    uploadProductPic() {
        return new Promise((resolve) => {
            this.pickImage().then(() => {
                let uploadUri = decodeURI(this.state.productPic)
                console.log('uploadUri>>> ', uploadUri);
                const userId = firebase.auth().currentUser.uid;
                console.log('userId>>> ', userId);
                const ref = firebase.storage().ref(`images/${new Date().getTime()}`).child(userId);
                console.log('ref>>> ', ref);
                ref.putFile(uploadUri).on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                    if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                        console.log('snapshot.downloadURL ', snapshot.downloadURL);
                        this.setState({
                            productPic: snapshot.downloadURL,
                            isPicUpload: true
                        })
                        this.setState({
                            isLoading: false
                        })
                        resolve(snapshot.downloadURL)
                    }
                });
            });
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Headers title="Add Product"></Headers>

                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Product Name"
                    onChangeText={productName => this.setState({ productName })}
                    value={this.state.productName}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { this.productDesc.focus(); }}
                />
                <TextInput
                    ref={(input) => { this.productDesc = input; }}
                    returnKeyType={"next"}
                    onSubmitEditing={() => { this.productPrice.focus(); }}
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Product Desc"
                    onChangeText={productDesc => this.setState({ productDesc })}
                    value={this.state.productDesc}
                />
                <TextInput
                    ref={(input) => { this.productPrice = input; }}
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Product Price"
                    autoCompleteType='tel'
                    onChangeText={productPrice => this.setState({ productPrice })}
                    value={this.state.productPrice}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Product Type"
                    onChangeText={productType => this.setState({ productType })}
                    value={this.state.productType}
                />
                {this.showLoading()}
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Product Sub-Type"
                    onChangeText={productSubType => this.setState({ productSubType })}
                    value={this.state.productSubType}
                />
                <View style={styles.text_View}>
                    <Text style={styles.t1}>
                        Add Product Pic
                    </Text>
                    <TouchableHighlight style={styles.touch_v1} onPress={() => this.uploadProductPic()}>
                        <Image style={styles.image_v1} source={{ uri: this.state.productPic }} />
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 1, margin: 0, height: 55, padding: 0, alignSelf: 'center', marginEnd: 15 }}>
                    <TouchableHighlight style={styles.image_v2}>
                        <Button style={styles.button_v1} color='#000' title="Add Product" onPress={() => this.saveProduct()} />
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
}