import { StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get('window').width ;

export default StyleSheet.create({
  filterBar: {
    width,
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowColor: '#000',
    alignItems:'center',
    flexDirection: "row",
    height: Math.round(width / 6),
    backgroundColor: 'rgba(12, 12,12, 0.7)',
    shadowOffset: { width: 0, height: 2 },
  },
  container: {
    backgroundColor: '#072a29'
  },
  textInput: {
    flex: 1/4,
    height: 50,
    marginLeft: 6,
    color: '#FFFFFF',
    alignItems:'center',
    backgroundColor: '#000000',
  },
  pickerInput: {
    flex: 1/4,
    marginLeft: 6,
    color: "#FFFFFF",
    alignItems:'center',
    backgroundColor: '#000000',
  },
  more: {
    flex: 1/4,
    alignItems:'center'
  },
  textMore: {
    color: '#FFFFFF',
  },
  listPlayerContainer: {
    paddingTop: 12
  },
  listPlayer: {
    paddingLeft: 12,
    paddingRight: 12,
    alignItems:'center',
  },
  divider: {
    width,
    height: 1,
    opacity: 0.3,
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  }
});
