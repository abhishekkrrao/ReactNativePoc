
import { AsyncStorage } from 'react-native';
export const getData = ({ key }) => {
    return new Promise((resolve, reject) => {
        try{
            // let obj = localStorage.getItem(key);
            // AsyncStorage.getItem(key).then((value)=>{
            //     resolve(value);
            // }).catch(()=>{});
        }catch(exception){ console.log('exception ',exception ) }
    });
}
export const saveData = ({ obj, key }) => {
    try {
        // AsyncStorage.setItem(key,obj).then((result)=>{console.log('saved',result)}).catch((error)=>{console.log('not saved',error)})
        // localStorage.setItem(key, obj);
    } catch (exception) { console.log('exception ',exception ) }
}
