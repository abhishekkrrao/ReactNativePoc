import { StyleSheet } from 'react-native';
export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#ccc',
    width: '100%',
    height: 45,
    color: '#000000',
    padding: 10,

  },
  textInput: {
    height: 45,
    fontSize: 15,
    width: '90%',
    marginTop: 8,
    marginVertical: 15,
    fontFamily: "Montserrat-Medium",
    borderColor: '#9b9b9b',
    borderRadius: 5,
    borderWidth: 2,
    padding: 15
  },
  text_View: {
    flex: 1, flexDirection: 'row', width: "90%", margin: 10, height: 55, padding: 5, borderColor: '#9b9b9b',
    borderRadius: 5,
    borderWidth: 2
  },
  t1: {
    flex: 1, padding: 5, height: 50, fontStyle: "900", fontFamily: "Montserrat-Medium",
  },
  touch_v1: { flex: 1, width: 50, height: 50, borderRadius: 50, alignContent: 'flex-end', justifyContent: 'flex-end' },
  image_v1: { flex: 1, padding: 5, width: 50, height: 50, borderRadius: 50, alignSelf: 'flex-end', alignContent: 'flex-end' , justifyContent: 'flex-end'},
  image_v2: { backgroundColor: '#000', borderRadius: 0, padding: 5, alignSelf: 'center' },
  button_v1: { fontFamily: "Montserrat-Medium", backgroundColor: '#000', alignSelf: 'flex-end' }
}