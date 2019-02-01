import { StyleSheet, Dimensions } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#072a29',
    flexDirection: 'column',
    position: 'relative',
  },
  signUpWith: {
    fontSize: 14,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  termsAndPolicy: {
    fontSize: 16,
  },
  wrapperSectionSignup: {
    marginTop: 15,
  },
  registerWithFacebook: {
    backgroundColor: '#3b5998',
    borderTopColor: '#3b5998',
    borderBottomColor: '#3b5998',
  },
  textRegisterWithFacebook: {
    letterSpacing: 4,
    fontSize: 16,
  },
  viewOr: {
    marginTop: 15,
    marginBottom: 15,
  },
  textOr: {
    textAlign: 'center',
    color: 'white',
  },
  formRegister: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 40,
    paddingVertical: 35,
  },
  secondStyle: {
    paddingVertical: 15,
  },
  labelForm: {
    letterSpacing: 2,
    opacity: 0.5,
    fontSize: 12,
    color: 'white',
  },
  inputCreate: {
    marginBottom: 10,
  },
  stepByStep: {
    position: 'absolute',
    bottom: -25,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#479b93',
  },
  stepText: {
    fontSize: 18,
    letterSpacing: 5,
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
  dots: {
    width: 8,
    height: 8,
    backgroundColor: 'rgba(255,255,255, 0.4)',
    borderRadius: 50,
    margin: 5,
  },
  activeDots: {
    backgroundColor: '#fff',
  },
  titleStep: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  pickerInput: {
    color: 'gray',
    padding: 0,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.ricePaper,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    bottom: -5,
  },
  wrapperPoster: {
    flex: 1,
    margin: 8,
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  poster: {
    resizeMode: 'stretch',
    height: 359 / 1.7,
    width: '100%',
  },
  hidePoster: {
    backgroundColor: 'gray',
    opacity: 0.6,
  },
  comingSoon: {
    position: 'absolute',
    color: '#fff'
  },
})
