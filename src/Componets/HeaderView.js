import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'
import assets from '../assets/assets.js'
import { styles as commonStyles, dimensions, colors } from '../Res'

const Header = ({ title, navigation, style, rightButtonComponent }) => (
    <View style={[styles.headerView, style]}>
        <TouchableOpacity style={styles.backButtonView} onPress={() => navigation.goBack()}>
            <Image source={assets.banners.back} resizeMode='contain' style={styles.backIcon} />
        </TouchableOpacity>

        {rightButtonComponent && <View style={styles.rightButtonView}>{rightButtonComponent}</View>}
        <Text style={styles.headerTitleText}>{title}</Text>
    </View>
)

const styles = StyleSheet.create({
    headerView: {
        height: dimensions.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.jpBlueDark,
        ...commonStyles.shadowBottom,
        zIndex: 1
    },
    headerTitleText: {
        fontSize: 21,
        fontWeight: '600',
        alignSelf: 'center'
    },
    backButtonView: {
        position: 'absolute',
        left: 0,
        padding: 20
    },
    rightButtonView: {
        position: 'absolute',
        right: 0
    },
    backIcon: {
        width: 25,
        height: 25
    }
})

export default withNavigation(Header)
