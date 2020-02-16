import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from './style'
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/AntDesign'
import Headers from '../../header/header'
export default class Details extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liked: false
    }

    this.lastPress = 0
  }
  handleLargeAnimatedIconRef = (ref) => {
    this.largeAnimatedIcon = ref
  }
  handleSmallAnimatedIconRef = (ref) => {
    this.smallAnimatedIcon = ref
  }
  animateIcon = () => {
    const { liked } = this.state
    this.largeAnimatedIcon.stopAnimation();
    if (liked) {
      this.largeAnimatedIcon.bounceIn()
        .then(() => this.largeAnimatedIcon.bounceOut())
      this.smallAnimatedIcon.pulse(200)
    } else {
      this.largeAnimatedIcon.bounceIn()
        .then(() => {
          this.largeAnimatedIcon.bounceOut()
          this.smallAnimatedIcon.bounceIn()
        })
        .then(() => {
          if (!liked) {
            this.setState(prevState => ({ liked: !prevState.liked }))
          }
        })
    }
  }
  handleOnPress = () => {
    const time = new Date().getTime()
    const delta = time - this.lastPress
    const doublePressDelay = 400
    if (delta < doublePressDelay) {
      this.animateIcon()
    }
    this.lastPress = time
  }
  handleOnPressLike = () => {
    this.smallAnimatedIcon.bounceIn();
    this.setState(prevState => ({ liked: !prevState.liked }))
  }
  render() {
    const receivedValue = this.props.navigation.getParam('item', () => { });
    console.log('receivedValue ', receivedValue);
    const { liked } = this.state
    const AnimatedIcon = Animatable.createAnimatableComponent(Icon);
    const card = {
      photographer: 'Patrycja',
      photo: { uri: 'https://firebasestorage.googleapis.com/v0/b/pschedoproject.appspot.com/o/images%2F1576478786119%2FCEKSSw1iSYbitLg2JgDsjSMXbcf1?alt=media&token=265341f5-1931-4b5b-a1d9-305f1f7a9aa6' },
      key: 'pkarniej'
    }
    return (
      <View style={styles.containers}>
        <Headers title="Detail"></Headers>

        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={this.handleOnPress}
        >
          <AnimatedIcon
            ref={this.handleLargeAnimatedIconRef}
            name="heart"
            color="#fff"
            size={80}
            style={styles.animatedIcon}
            duration={500}
            delay={200}
          />
          <Image
            style={styles.image}
            source={{ uri: receivedValue.productPic }}
            resizeMode="cover"
          />
          <View style={styles.photoDescriptionContainer}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={this.handleOnPressLike}
            >
              <AnimatedIcon
                ref={this.handleSmallAnimatedIconRef}
                name={liked ? 'heart' : 'hearto'}
                color={liked ? "#e92f3c" : "#515151"}
                size={18}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.polaroidTextContainer}
            >
              <Text style={[styles.text, styles.textPhotographer]}>{receivedValue.productDesc}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}