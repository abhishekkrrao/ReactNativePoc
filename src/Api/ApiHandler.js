import firebase from 'react-native-firebase'
export const addComment = ({ obj, path }) => {
    firebase.database().ref(path).push(obj).then((saveMessage) => {
        console.log('saveMessage ', saveMessage);
    }).catch((error) => {
        console.log('error ', error);
    });
    return true;
}
export const olacab = ({ obj, path }) => {
    firebase.database().ref(path).push(obj).then((saveMessage) => {
        console.log('saveMessage ', saveMessage);
    }).catch((error) => {
        console.log('error ', error);
    });
    return true;
}
