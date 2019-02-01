import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  pickerBox: {
    marginBottom: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomColor: '#999999',
    backgroundColor: 'transparent',
  },
  picker: {
    width: 70,
    height: 40,
    color: 'white', 
    paddingLeft: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  }
});

export default styles;