import { StyleSheet } from 'react-native';
export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
    bottom: 0,
    height: 40
  },
  input: {
    backgroundColor: '#ccc',
    width: '100%',
    height: 45,
    color: '#000000',
    padding: 10,

  },
  button: {
    width: 50,
    height: 45,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    margin: 3
  },
  right: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 3,
    justifyContent: 'flex-end',
  },
  leftMessage: {
    fontFamily: "Montserrat-Medium", textAlign: 'left', backgroundColor: '#ccc', padding: 10, borderRadius: 30
  },
  rightMessage: {
    fontFamily: "Montserrat-Medium", textAlign: 'right', backgroundColor: '#ccc', padding: 10, borderRadius: 30
  },
}