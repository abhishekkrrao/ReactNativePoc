
import { AsyncStorage } from 'react-native';
export const getData = ({ key }) => {
    try{
        AsyncStorage.getItem(key).then((value)=>{ console.log('vvv>>>> ',value);}).catch(()=>{});
    }catch(exception){ console.log('exception ',exception ) }
}
export const saveData = ({ obj, key }) => {
    try {
        AsyncStorage.setItem(key,obj).then((result)=>{console.log('saved',result)}).catch((error)=>{console.log('not saved',error)});
    } catch (exception) { console.log('exception ',exception ) }
}
