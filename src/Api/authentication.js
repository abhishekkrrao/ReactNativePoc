import firebase from 'react-native-firebase'
export default class authentication extends React {
    handleLogin = (email, password) => {
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
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}