import React, { Component } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Header } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import ImagePicker from 'react-native-image-crop-picker';
import Dialog from "react-native-dialog";
import Loading from './Loading'
export default class Modals extends Component {
  state = {
    email: '',
    uid: '',
    avatarSource: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    isLoading: false
  }

  showLoading() {
    if (this.state.isLoading == true) {
      return (
        <Loading></Loading>
      )
    }
  }


  openAlert() {
    return (
      <Dialog.Container>
        <Dialog.Title>Select Image</Dialog.Title>
        {/* <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description> */}
        <Dialog.Button label="Camera" onPress={this.getImageFromCamera()} />
        <Dialog.Button label="Gallary" onPress={this.getImageFromGallery()} />
      </Dialog.Container>
    );
  }

  getImageFromCamera() {
    return new Promise((resolve) => {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: false
      }).then(image => {
        console.log(image);

        this.setState({
          avatarSource: image.path
        });
        resolve(image.path);
      }).catch((error) => {
        console.log(error);
      });

    });
  }
  getImageFromGallery() {
    return new Promise((resolve) => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false
      }).then(image => {

        this.setState({
          avatarSource: image.path
        });
        resolve(image.path);
      });
    });
  }

  pickImage() {
    return new Promise((resolve, reject) => {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: false
      }).then(image => {
        this.setState({
          avatarSource: image.path
        });
        resolve(image.path);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateSingleData(profilePic) {
    firebase.database().ref('Users/' + this.state.uid).update({
      profilePic,
    });
  }

  uploadProfilePic() {
    return new Promise(() => {
      this.pickImage().then(() => {
        let uploadUri = decodeURI(this.state.avatarSource)
        console.log('uploadUri>>> ', uploadUri);
        const userId = firebase.auth().currentUser.uid;
        console.log('userId>>> ', userId);
        const ref = firebase.storage().ref(`images/${userId}`).child(userId);
        console.log('ref>>> ', ref);
        ref.putFile(uploadUri).on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log('snapshot.downloadURL ', snapshot.downloadURL);
            this.updateSingleData(snapshot.downloadURL);
            this.setState({
              isLoading: false
            })
          }
        });
      });
    })
  }

  uploadImage() {
    try {
      this.setState({
        isLoading: true
      })
      this.uploadProfilePic().then((path) => {
        console.log(path);
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    let user = firebase.auth().currentUser;
    console.log('useruser>> ', user.email);
    this.setState({
      email: user.email,
      uid: user.uid,
      isLoading:true
    });

    var ref = firebase.database().ref('Users/' + user.uid);
    ref.once('value').then(snapshot => {
      console.log('snapshot.val() ', snapshot.val());
      this.setState({
        avatarSource: snapshot.val().profilePic,
        isLoading:false
      })
    })
  }
  closeApp() {
    firebase.auth().signOut();
  }
  render() {
    var data = this.state.email;
    var name = data.substring(0, data.lastIndexOf("@"));
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ height: 75 }}
          ViewComponent={LinearGradient} // Don't forget this!
          centerComponent={{ text: 'Profile', style: { color: '#fff', fontFamily: "Montserrat-Medium", paddingBottom: 10 } }}
          // leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.closeApp() }}
          linearGradientProps={{
            colors: ['#E64A19', '#D84315'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
        />

        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableHighlight onPress={() => this.uploadImage()} style={styles.avatar1} >
              <Image style={styles.avatar}
                source={{ uri: this.state.avatarSource }} />
            </TouchableHighlight>

            <Text style={styles.name}>{name} </Text>
            <Text style={styles.userInfo}>{data} </Text>
            <Text style={styles.userInfo}>India </Text>
          </View>
        </View>
        <View style={styles.body}>

          <View style={styles.item}>
            {this.showLoading()}
          </View>
          <View style={styles.item}>
            <View style={styles.iconContent}>
              <TouchableHighlight onPress={() => this.closeApp()}>
                <Icon
                  raised
                  name='./assets/logout.svg'
                  color='#000000'
                  onPress={() => this.closeApp()} />
              </TouchableHighlight>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.info}>Log Out</Text>
            </View>

          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar1: {
    width: 130,
    height: 130,
    borderRadius: 63,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    padding: 5
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
    fontFamily: "Montserrat-Medium"
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
    fontFamily: "Montserrat-Medium"
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: 'center',
    fontFamily: "Montserrat-Medium"
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5,
    fontFamily: "Montserrat-Medium"
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
    fontFamily: "Montserrat-Medium"
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  }
});


