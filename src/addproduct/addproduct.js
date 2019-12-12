import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, ImageBackground, Image } from 'react-native'
import addproductcss from './addproductcss'
import firebase from 'react-native-firebase'
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
export default class addproduct extends React.Component {
    state = { isLoading: false, productName: '', productDesc: '', productPic: 'https://bootdey.com/img/Content/avatar/avatar6.png', productPrice: '', productType: '', productSubType: '', isPicUpload: false }
    addProduct() {
        console.log('state ', this.state.productPrice);
        this.saveProduct(this.state);
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
        const userId = firebase.auth().currentUser.uid;
        if (this.state.isPicUpload) {
            firebase.database().ref('addProduct/' + userId).push(this.state).then((result) => { console.log('result', result); this.updateState(); }).catch((error) => { console.log('error', error) });
        } else {
            alert('Please add a picture')
        }
    }
    uploadProductPic() {
        return new Promise((resolve, reject) => {
            this.pickImage().then(() => {
                let uploadUri = decodeURI(this.state.productPic)
                console.log('uploadUri>>> ', uploadUri);
                const userId = firebase.auth().currentUser.uid;
                console.log('userId>>> ', userId);
                const ref = firebase.storage().ref(`images/${userId}`).child(userId);
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
            <View style={addproductcss.container}>

                <Header
                    containerStyle={{ height: 75 }}
                    ViewComponent={LinearGradient} // Don't forget this!
                    centerComponent={{ text: 'Add Product', style: { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 15 } }}
                    // leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
                    linearGradientProps={{
                        colors: ['#E64A19', '#D84315'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                />
                <TextInput
                    style={addproductcss.textInput}
                    autoCapitalize="none"
                    placeholder="Product Name"
                    onChangeText={productName => this.setState({ productName })}
                    value={this.state.productName}
                />
                <TextInput
                    style={addproductcss.textInput}
                    autoCapitalize="none"
                    placeholder="Product Desc"
                    onChangeText={productDesc => this.setState({ productDesc })}
                    value={this.state.productDesc}
                />
                <TextInput
                    style={addproductcss.textInput}
                    autoCapitalize="none"
                    placeholder="Product Price"
                    autoCompleteType='tel'
                    onChangeText={productPrice => this.setState({ productPrice })}
                    value={this.state.productPrice}
                />
                <TextInput
                    style={addproductcss.textInput}
                    autoCapitalize="none"
                    placeholder="Product Type"
                    onChangeText={productType => this.setState({ productType })}
                    value={this.state.productType}
                />
                <TextInput
                    style={addproductcss.textInput}
                    autoCapitalize="none"
                    placeholder="Product Sub-Type"
                    onChangeText={productSubType => this.setState({ productSubType })}
                    value={this.state.productSubType}
                />
                <View style={{ flex: 1, flexDirection: 'row', width: "90%", margin: 0, height: 55, padding: 0 }}>
                    <Text style={{ flex: 1, padding: 5, height: 50 }}>
                        Add Product Pic
                    </Text>
                    <TouchableHighlight style={{ flex: 1, width: 50, height: 50, alignContent: 'flex-end', justifyContent: 'flex-end' }} onPress={() => this.uploadProductPic()}>
                        <Image style={{ flex: 1, padding: 5, width: 50, height: 50, alignContent: 'flex-end',alignSelf:'flex-end' }} source={{ uri: this.state.productPic }} />
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 1, margin: 0, height: 55, padding: 0, alignSelf: 'flex-end', marginEnd: 15 }}>
                    <TouchableHighlight style={{ backgroundColor: '#f57538', borderRadius: 15, padding: 5, alignSelf: 'flex-end' }}>
                        <Button style={{ fontFamily: "Montserrat-Medium", backgroundColor: '#f57538', alignSelf: 'flex-end' }} color='#fff' title="Add Product" onPress={() => this.saveProduct()} />
                    </TouchableHighlight>
                </View>

            </View>
        )
    }
}