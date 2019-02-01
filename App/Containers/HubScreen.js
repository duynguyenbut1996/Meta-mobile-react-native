import React, { Component } from 'react'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native'

import { Images } from '../Themes'
import styles from '../Components/Styles/Dashboard/HubStyle'
import Carousel from '../Components/Carousel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ResourcesActions from '../Redux/ResourcesRedux'
import { ResourceSelectors } from '../Redux/Resources/Selectors'
import UserActions from '../Redux/UserRedux'

const width = Dimensions.get('window').width;
const mainRatio = width/750;

export class HubScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: 'Hub Page',
      games: [
        { game: Images.dota2, name: 'dota2' },
        { game: Images.mlbb, name: 'mlbb' },
      ],
      carousels: null,
    }
  }

  routeGame = game => {
    this.props.updateCurrentGame(game)
    this.props.navigation.navigate('ProfileStack')
  }

  listGame() {
    const { games } = this.state

    return games.map((item, index) => (
      <TouchableOpacity
        style={styles.gameWrapper}
        key={index}
        onPress={() => this.routeGame(item.name)}
      >
        <View>
          <Image style={styles.game} source={item.game} />
        </View>
      </TouchableOpacity>
    ))
  }

  componentWillMount() {
    this.props.getCarouselHub()
  }

  render() {
    const { navigation, listCarousel, user } = this.props
    return (
      <ImageBackground
        style={styles.background}
        source={Images.background}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <ScrollView>
          <View style={styles.main}>
            <View style={styles.mainTop}>
              <View>
                <TouchableOpacity>
                  <Text style={styles.mainWrapper}>REGISTER FOR IEL</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.carousel}>
                {listCarousel && <Carousel entries={listCarousel} />}
              </View>
            </View>
            <View style={{ flex: 2, flexDirection: 'column' }}>
              <View
                style={{
                  paddingHorizontal: 10,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <View style={styles.dashboard}>
                  <Text style={styles.textDashboard}>Your Dashboards</Text>
                </View>
                <View style={styles.listGame}>{this.listGame()}</View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.mainBottom}>
          <View style={styles.contentLeft}>
            <Image style={styles.logo} source={Images.hub} />
          </View>
          <View style={styles.contentRight}>
            <View style={styles.buttonCreateTeam}>
              <TouchableOpacity
                style={[styles.buttonHub]}
                onPress={() => {
                  navigation.push('TeamCreation')
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: Math.floor(26*mainRatio),
                    letterSpacing: 2,
                  }}
                >
                  CREATE A TEAM
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={[styles.buttonHub]}
                onPress={() => navigation.push('FindTeamStackNavigation')}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: Math.floor(26*mainRatio),
                    letterSpacing: 2,
                  }}
                >
                  FIND A TEAM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

export default connect(
  state => ({
    listCarousel: ResourceSelectors.listCarousel(state),
  }),
  dispatch =>
    bindActionCreators(
      Object.assign({}, ResourcesActions, UserActions),
      dispatch
    )
)(HubScreen)
