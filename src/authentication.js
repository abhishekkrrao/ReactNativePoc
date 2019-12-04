import firebase from 'react-native-firebase'

export default class authentication extends React {
    handleLogin = (email,password) => {
        const emailError = this.validateEmail(email)
        const passwordError = password
        if (!emailError && !passwordError) {
            alert('Details are not valid!')
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => this.props.navigation.navigate('Home'))
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }
}