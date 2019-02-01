import glamorous from 'glamorous-native'
import React, { Component } from 'react'
import { Image, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

import { all, any, path } from 'ramda'

import {
  BackgroundImage,
  Card,
  SmallButton,
  ScrollViewContainer,
  MainContainer,
  Text,
} from '../../Components'

import styles from '../../Containers/Styles/Users/UserDashboardStyles'

import { Colors, Images } from '../../Themes'
import { TeamsSelectors } from '../../Redux/Teams/Selectors'
import { UserSelectors } from '../../Redux/User/Selectors'
import { ResourceSelectors } from '../../Redux/Resources/Selectors'
import { DOTA2 } from '../../utils/game'

import TeamsActions from '../../Redux/TeamsRedux'
import UserActions from '../../Redux/UserRedux'
import ResourceActions from '../../Redux/ResourcesRedux'
import Header from '../../Components/Dashboard/Header'

const Row = glamorous.view(
  {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  props => props.justify && { justifyContent: props.justify }
)

const TabContainer = glamorous.view(
  {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    maxWidth: 200,
  },
  props => props.active && { backgroundColor: 'rgba(0,0,0,0)' }
)

const Tab = ({ label, onPress, active }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <TabContainer active={active}>
      <Text bold={active}>{handleTeamOverflow(label)}</Text>
    </TabContainer>
  </TouchableWithoutFeedback>
)

const handleTeamOverflow = teamName => {
  if (teamName.length > 12) {
    teamName.slice(0, 12)
    return `${teamName}...`
  }
  return teamName
}

const IconFA = ({ name }) => (
  <Icon
    name={name}
    size={15}
    color="#FFFFFF"
    style={{ paddingTop: 5, marginHorizontal: 5 }}
  />
)

export class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'User Dashboard',
      headerTitle: ({ children }) => <Header title={'User Dashboard'} />,
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      teamIdx: 0,
    }
  }

  UNSAFE_componentWillMount() {
    const { dota2, profile, user, mlbb, currentGame } = this.props
    if (!dota2) {
      this.props.dotaRequest()
    }
    if (!profile) {
      this.props.gameProfileRequest(
        currentGame,
        user.uuid,
        user[`${currentGame}_player_profile`]
      )
    }
    if (!mlbb) {
      this.props.mlbbRequest()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, currentGame } = this.props
    if (nextProps.currentGame !== currentGame) {
      this.props.gameProfileRequest(
        nextProps.currentGame,
        user.uuid,
        user[`${nextProps.currentGame}_player_profile`]
      )
    }
  }

  componentDidUpdate(prevProps) {
    const { profile: prevProfile } = prevProps
    const { profile, teams, user, currentGame } = this.props
    if (
      user[`${currentGame}_teams`] &&
      teams.length !== user[`${currentGame}_teams`].length
    ) {
      // TODO: Add requesting check to prevent multiple calls
      this.props.teamProfileMultiRequest(
        currentGame,
        user[`${currentGame}_teams`]
      )
    }
  }

  renderProfile() {
    const { user, dota2, profile, currentGame, mlbb = [] } = this.props
    return currentGame === DOTA2 ? (
      <View style={styles.userContainer}>
        <Row>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
        </Row>
        <Row>
          <Text h1 bold>
            {user.meta_name}
          </Text>
        </Row>
        <Row>
          <Text h4 bold>
            {user.first_name} {user.last_name}
          </Text>
          <Image
            source={Images.rankDota2[profile.rank_tier]}
            style={styles.userRankTier}
          />
        </Row>
        <Row>
          <IconFA name="globe" />
          <Text small vCenter>
            {user.country && user.country.name}
          </Text>
          <IconFA name="server" />
          <Text small vCenter>
            {profile.preferred_server}
          </Text>
          <IconFA name="language" />
          <Text small vCenter>
            {user.preferred_languages[0]}
          </Text>
          {!!user.organisation && (
            <Row>
              <IconFA name="graduation-cap" />
              <Text small vCenter>
                {user.organisation}
              </Text>
            </Row>
          )}
        </Row>
        <Row style={{ justifyContent: 'space-around' }}>
          {!!profile.preferred_positions && (
            <Row>
              <Text tiny vCenter>
                ROLE &nbsp;
              </Text>
              <Text small vCenter>
                {profile.preferred_positions[0]}
              </Text>
            </Row>
          )}
          <Row>
            <Text tiny vCenter style={styles.userElementCommon}>
              HEROES
            </Text>
            {profile.preferred_heroes.slice(0, 3).map(id => (
              <Image
                key={`hero-${id}`}
                source={{ uri: dota2[id] && dota2[id].image }}
                borderRadius={17}
                style={styles.userListHeroes}
              />
            ))}
          </Row>
        </Row>
      </View>
    ) : (
      <View style={styles.userContainer}>
        <Row>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
        </Row>
        <Row>
          <Text h1 bold>
            {user.meta_name}
          </Text>
        </Row>
        <Row>
          <Text h4 bold>
            {user.first_name} {user.last_name}
          </Text>
        </Row>
        <Row>
          <IconFA name="globe" />
          <Text small vCenter>
            {user.country && user.country.name}
          </Text>
          <IconFA name="language" />
          <Text small vCenter>
            {user.preferred_languages[0]}
          </Text>
          {!!user.organisation && (
            <Row>
              <IconFA name="graduation-cap" />
              <Text small vCenter>
                {user.organisation}
              </Text>
            </Row>
          )}
        </Row>
        <Row style={{ justifyContent: 'space-around' }}>
          <Row>
            <Text tiny vCenter style={styles.userElementCommon}>
              ROLE
            </Text>
            <Text small vCenter>
              {profile.preferred_roles.join(', ')}
            </Text>
          </Row>
          <Row>
            <Text tiny vCenter style={styles.userElementCommon}>
              HEROES
            </Text>
            {profile.preferred_heroes.slice(0, 3).map((name, index) => {
              let uri = mlbb.find(hero => hero.name === name).image
              return (
                <Image
                  key={`hero-${index}`}
                  source={{ uri }}
                  borderRadius={17}
                  style={styles.userListHeroes}
                />
              )
            })}
          </Row>
        </Row>
      </View>
    )
  }

  renderTeam() {
    const { teamIdx } = this.state
    const { teams } = this.props
    const team = teams[teamIdx] || {}
    if (!teams) {
      return
    }
    return (
      <View style={{ flexDirection: 'column', paddingBottom: 20 }}>
        <Row justify="flex-start">
          {teams.map((team, idx) => (
            <Tab
              key={`team-tab-${idx}`}
              label={team.name}
              onPress={() => this.setState({ teamIdx: idx })}
              active={teamIdx == idx}
            />
          ))}
        </Row>
        <Row>
          <Image
            source={{ uri: team.avatar }}
            style={{ width: 150, height: 150 }}
          />
        </Row>
        <Row>
          <Image
            source={Images.rankDota2[31]}
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Text h1 bold>
            {team.name}
          </Text>
        </Row>
        <Row>
          <Row>
            <IconFA name="server" />
            <Text small vCenter>
              {team.country && team.country.name}
            </Text>
            <IconFA name="language" />
            <Text small vCenter>
              {team.language}
            </Text>
          </Row>
          {!!team.organisation && (
            <Row>
              <IconFA name="graduation-cap" />
              <Text small vCenter>
                {team.organisation}
              </Text>
            </Row>
          )}
        </Row>
        <Row style={{ justifyContent: 'space-around' }}>
          {team.is_recruiting && (
            <Row>
              <IconFA name="clipboard" />
              <Text small vCenter>
                RECRUITING
              </Text>
            </Row>
          )}
          {team.is_scrim_ready && (
            <Row>
              <IconFA name="bolt" />
              <Text small vCenter>
                READY TO SCRIM
              </Text>
            </Row>
          )}
        </Row>
      </View>
    )
  }

  render() {
    const { user, dota2, profile, teams, currentGame } = this.props
    const teamsRetrieved = all(v => !!v, teams)
    if (!all(v => !!v, [user, dota2, profile, teamsRetrieved])) {
      return null
    }
    let colorsButton = Colors[currentGame].button

    return (
      <MainContainer>
        <BackgroundImage source={Images.background} />
        <ScrollViewContainer>
          <Card
            currentGame={currentGame}
            title="USER PROFILE"
            variant="dota2"
            // headerRight={
            //   <SmallButton label="Edit Profile" color={colorsButton} />
            // }
          >
            {this.renderProfile()}
          </Card>
          {teams.length !== 0 && (
            <Card
              currentGame={currentGame}
              title="MY TEAM"
              variant="dota2"
              headerRight={
                <SmallButton label="Create Team" color={colorsButton} />
              }
            >
              {this.renderTeam()}
            </Card>
          )}
        </ScrollViewContainer>
      </MainContainer>
    )
  }
}

const getUUID = state => path(['users', 'user', 'uuid'], state)

export default connect(
  state => {
    const game = state.users.currentGame
    return {
      user: UserSelectors.selectUser(state),
      profile: UserSelectors.selectGameProfile(state, game, getUUID(state)),
      teams: TeamsSelectors.selectGameTeamProfiles(
        state,
        game,
        path(['users', 'user', `${game}_teams`], state)
      ),
      dota2: ResourceSelectors.selectDota2(state),
      mlbb: ResourceSelectors.mlbbListHeroes(state),
      currentGame: UserSelectors.getCurrentGame(state),
    }
  },
  dispatch =>
    bindActionCreators(
      { ...ResourceActions, ...UserActions, ...TeamsActions },
      dispatch
    )
)(ProfileScreen)
