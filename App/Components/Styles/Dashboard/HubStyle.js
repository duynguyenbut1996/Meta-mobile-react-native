import { StyleSheet, Dimensions } from 'react-native'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const mainRatio = width/750;

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingTop: 10,
    height: '100%',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  main: {
    flexDirection: 'column',
    flex: 1,
  },
  mainTop: {
    flex: 2,
    padding: Math.floor(30 * mainRatio),
  },
  mainWrapper: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#b80000',
    fontSize: Math.floor(30*mainRatio),
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 6,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 6,
  },
  carousel: {
    marginTop: Math.floor(30*mainRatio),
  },
  dashboard: {
    marginTop: Math.floor(10*mainRatio* 1.5),
    marginBottom: 15,
    alignItems: 'center',
  },
  textDashboard: {
    fontSize: Math.floor(50*mainRatio),
    marginBottom: Math.floor(10*mainRatio* 1.5),
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: Math.floor(20*mainRatio),
    marginHorizontal: 10,
  },
  game: {
    height: Math.floor(80*mainRatio),
    resizeMode: 'contain',
  },
  listGame: {
    flexDirection: 'row',
  },
  mainBottom: {
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  contentLeft: {
    alignItems: 'center',
    padding: 10,
    flex: 1,
  },
  contentRight: {
    flex: 1,
    padding: 10,
  },
  buttonCreateTeam: {
    marginBottom: 10,
    marginTop: 10,
  },
  header: {
    textAlign: 'center',
    color: '#fff',
    marginTop: 5,
  },
  logo: {
    width: (width * 36) / 100,
    height: (width * 36) / 100,
    resizeMode: 'contain',
  },
  buttonHub: {
    backgroundColor: '#479b93',
    height: (height * 7) / 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
