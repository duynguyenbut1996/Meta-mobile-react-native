import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const mainRatio = width / 750


export default StyleSheet.create({
    BoxStyle: {
        paddingHorizontal: mainRatio*85,
        flex: 0.7,
    },
    BoxButton: {
        flex: 0.3,
        flexDirection: 'column'
    },  
    sendEmail: {
        flex: 1,
        backgroundColor: '#479b93',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goBack: {
        flex: 2,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
