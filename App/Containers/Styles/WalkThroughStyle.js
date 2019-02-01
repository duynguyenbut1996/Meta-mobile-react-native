import { StyleSheet, Dimensions } from 'react-native'
import { Fonts, Metrics, Colors } from '../../Themes/'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const mainRatio = 750 / width

export default StyleSheet.create({
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#479b93',
  },
  skipText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 4,
    fontSize: Math.floor(26 / mainRatio),
  },
  textTitle: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 2,
    fontSize: Math.floor(50 / mainRatio),
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: Math.floor(30 / mainRatio),
    color: '#fff',
    opacity: 0.7,
    paddingVertical: 10,
    marginHorizontal: 90 / mainRatio,
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
})
