import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Picker,
  FlatList,
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from '../../Containers/Styles/CreateAccountStyles'
import InputScrollView from 'react-native-input-scroll-view'
import UserActions from '../../Redux/UserRedux'
import { UserSelectors } from '../../Redux/User/Selectors'

const game = [
  {
    src: require('../../Images/game/game-mlbb.png'),
    hide: false,
    game: 'mlbb',
  },
  {
    src: require('../../Images/game/dota2-poster.png'),
    hide: false,
    game: 'dota2',
  },
  { src: '', hide: true },
  { src: '', hide: true },
]

class CreateAccount extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
  })
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      metaName: '',
      gameType: '',
    }
    this._eventNavigate = this._eventNavigate.bind(this)
  }

  _eventNavigate() {
    this.props.updateInputCreation({
      game_type: this.state.gameType,
    })
    this.props.createAccount(this.props.getInputCreation)
  }

  onSelectGame = game => {
    const { navigation, updateCurrentGame } = this.props
    if (game === 'mlbb') {
      navigation.navigate('MlbbProfile')
    } else if (game === 'dota2') {
      navigation.navigate('Dota2Profile')
    }
    updateCurrentGame(game)
  }

  render() {
    return (
      <View style={styles.container}>
        <InputScrollView keyboardOffset={60}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.titleStep}>Select Your Game</Text>
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Select your game and complete your gaming profile to be added to
              the Find a Player search
            </Text>
          </View>
          <FlatList
            data={game}
            keyExtractor={(item, index) => index}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.wrapperPoster}
                onPress={() => this.onSelectGame(item.game)}
              >
                <Image
                  style={[styles.poster, item.hide ? styles.hidePoster : null]}
                  source={item.src}
                />
                {item.hide && (
                  <Text style={styles.comingSoon}>COMING SOON</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </InputScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    getInputCreation: UserSelectors.getInputCreation(state),
  }),
  dispatch => bindActionCreators(UserActions, dispatch)
)(CreateAccount)
