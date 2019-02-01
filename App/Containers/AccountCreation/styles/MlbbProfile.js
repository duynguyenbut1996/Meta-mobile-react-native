import { StyleSheet } from 'react-native'

const calculater = number => Math.floor(number / 1.7)

export default StyleSheet.create({
  container: {
    height: '100%',
  },
  controlLayout: {
    paddingHorizontal: 20,
  },
  wrapperLogoGame: {
    alignItems: 'center',
    paddingVertical: calculater(46),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: calculater(60),
    paddingVertical: calculater(77),
    marginBottom: 100
  },
  textTeamLogo: {
    opacity: 0.5,
    fontSize: calculater(20),
    color: '#fff',
  },
  buttonUpload: {
    width: '50%',
    marginTop: calculater(26),
  },
  commonSection: {
    flexDirection: 'row',
  },
  flex1: {
    flexGrow: 1,
    paddingRight: 10,
  },
  formInvite: {
    marginVertical: calculater(60),
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  stepTitle: {
    paddingHorizontal: calculater(60),
    paddingVertical: calculater(43),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInvite: {
    fontSize: calculater(30),
    color: '#fff',
    fontWeight: 'bold',
  },
  inviteContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: calculater(65),
    paddingVertical: calculater(37),
  },
  labelContent: {
    fontSize: calculater(20),
    opacity: 0.5,
    color: '#fff',
    marginTop: calculater(35)
  },
  code: {
    marginTop: 5,
    fontSize: calculater(24),
    color: '#fff',
    marginBottom: calculater(20),
  },
  metaConnection: {},
  inviteItem: {
    marginVertical: calculater(36),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: calculater(28),
    color: '#fff',
    fontWeight: 'bold',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: { width: 40, height: 40, marginRight: calculater(50) },
  solid: {
    backgroundColor: '#fff',
    height: 1,
    marginHorizontal: 10,
    opacity: 0.2,
  },
  reviewImage: {
    width: 50,
    height: 50,
    marginVertical: 10,
  }
});