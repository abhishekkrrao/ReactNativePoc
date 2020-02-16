import { StyleSheet } from 'react-native';
export default {
  containers: {
    flex: 1,
    width:"100%"
  },
  headerContainer: {
    backgroundColor: "#ccc",
},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    height: 345,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 2,
    marginLeft:"2.5%",
    marginTop:"2.5%"
  },
  image: {
    marginTop: 10,
    height: 280,
    width: '92%'
  },
  photoDescriptionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft:5
  },
  icon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animatedIcon: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderRadius: 160,
    opacity: 0
  },
  text: {
    textAlign: 'center',
    fontSize: 13,
    backgroundColor: "transparent",
    color: "#515151"
  },
  textPhotographer: {
    fontWeight: 'bold',
    textAlign: 'center',
    width:"90%"
  },
  polaroidTextContainer: {
    flexDirection: 'row',
    textAlign: 'left',
    paddingTop: 0
  }
}