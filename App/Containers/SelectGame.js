import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import PropTypes from 'prop-types'

import NextStep from '../Components/NextStep'
import { SELECT_GAME } from '../utils/game'

import styles from './Styles/CreateAccountStyles'

const game = [
  { src: require('../Images/game/game-mlbb.png'), hide: false, game: 'mlbb' },
  {
    src: require('../Images/game/dota2-poster.png'),
    hide: false,
    game: 'dota2',
  },
  { src: '', hide: true },
  { src: '', hide: true },
]

class SelectGame extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
  })
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { onClickNext } = this.props

    return (
      <View style={styles.container}>
        <ScrollView>
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
                onPress={() => onClickNext({ game: item.game, action: SELECT_GAME })}
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
          {/* <View>
            <NextStep
              counStep={[1, 2, 3]}
              backDisplay={false}
              onClickNext={this.props.onClickNext}
            />
          </View> */}
        </ScrollView>
      </View>
    )
  }
}

SelectGame.propTypes = {
  onClickNext: PropTypes.func,
}

export default connect()(SelectGame)
