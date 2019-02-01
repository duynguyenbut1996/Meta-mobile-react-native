import { StyleSheet, Dimensions } from "react-native";
import { Metrics, ApplicationStyles } from "../../Themes/";

const width = Dimensions.get('window').width
const mainRatio = 750/width;

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Math.floor(111/mainRatio),
    width: Math.floor(301/mainRatio),
    height: Math.floor(310/mainRatio),
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  }
});
