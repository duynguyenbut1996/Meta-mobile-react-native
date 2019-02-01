import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ResourceSelectors } from '../../Redux/Resources/Selectors'
import { UserSelectors } from '../../Redux/User/Selectors'
import { ranks } from '../../utils/game'
import { isEmpty, get } from 'lodash'
import { roles } from '../../utils/position'
import ResourceActions from '../../Redux/ResourcesRedux'
import UserActions from '../../Redux/UserRedux'
import CommonActions from '../../Redux/CommonRedux'
import SmallButton from '../../Components/Buttons/SmallButton'
import NextStep from '../../Components/NextStep'
import InputText from '../../Components/Inputs/InputText'
import Picker from '../../Components/Picker'
import Images from '../../Themes/Images'
import styles from './styles/MlbbProfile'
import BackgroundImage from '../../Components/Image/BackgroundImage'
import ImagePicker from 'react-native-image-picker'
import HeroPicker from '../../Components/HeroPicker/HeroPicker'

const width = Dimensions.get('window').width

class MlbbProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
  })

  constructor(props) {
    super(props)
    this.state = {
      rank: '',
      stars: '',
      avatar: '',
      country: '',
      language: '',
      description: '',
      avatarSource: {},
      organisation: '',
      preferred_roles: [''],
      preferred_heroes: [],
      mobile_legends_id: 0,
      keyboardShown: false,
    }
  }

  componentDidMount() {
    console.log('mlbbHeroes')
    const { mlbbHeroes } = this.props
    if (!mlbbHeroes) {
      this.props.mlbbRequest()
    }
  }

  componentWillMount() {
    const { user } = this.props
    console.log('user', user)
    if (!isEmpty(user)) {
      this.setState({
        avatar: user.avatar,
        country: get(user, 'country.code', ''),
        language: get(user, 'preferred_languages[0]'),
        description: user.description,
        organisation: user.organisation,
      })
    }

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this._keyboardDidShow()
    )
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this._keyboardDidHide()
    )
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow() {
    this.setState({ keyboardShown: true })
  }

  _keyboardDidHide() {
    this.setState({ keyboardShown: false })
  }

  onClickNext = ({ game }) => {
    const { user, mlbbHeroes, navigation } = this.props
    const {
      rank,
      stars,
      avatar,
      country,
      language,
      description,
      organisation,
      mobile_legends_id,
      preferred_roles,
      preferred_heroes
    } = this.state
    this.props.updateUserProfile({
      avatar,
      country,
      language,
      description,
      organisation,
      uuid: user.uuid,
      first_name: user.first_name,
      last_name: user.last_name,
    })
    this.props.createGameProfile(game, {
      rank,
      stars,
      player_type: '',
      mobile_legends_id,
      preferred_roles,
      preferred_heroes: mlbbHeroes.filter(({ hero_id }) => preferred_heroes.includes(hero_id)).map(({ name }) => name),
    })
    this.props.showMessage(true, 'Create Profile');
    navigation.navigate('WalkThroughScreen')
  }

  onClickBack = () => {
    const { navigation } = this.props

    navigation.navigate('FinalStep')
    this.setState({
      avatarSource: '',
      textUpImage: 'UPLOAD',
      preferred_roles: [],
      preferred_heroes: [],
      mobile_legend_id: '',
    })
  }

  uploadImageTeam = () => {
    const options = {
      path: 'images',
      skipBackup: true,
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert('Error', response.error, [
          { text: 'OK', onPress: () => this.props.failure('') },
        ])
      } else {
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        }

        this.setState({
          avatarSource: source,
          textUpImage: 'CHOOSE IMAGE',
          avatar: source,
        })
      }
    })
  }

  onSelecteHero = id => {
    const { preferred_heroes } = this.state
    if (id && preferred_heroes.length < 3 && !preferred_heroes.includes(id)) {
      preferred_heroes[preferred_heroes.length] = id
      this.setState({ preferred_heroes }, () => {})
    }
  }

  onRemoveHero = id => {
    let { preferred_heroes } = this.state
    if (id && preferred_heroes.includes(id)) {
      preferred_heroes = preferred_heroes.filter(sid => sid !== id)
      this.setState({ preferred_heroes })
    }
  }

  render() {
    const {
      bio,
      rank,
      stars,
      organisation,
      avatarSource,
      keyboardShown,
      preferred_roles,
      preferred_heroes,
      mobile_legend_id,
    } = this.state
    const { mlbbHeroes } = this.props
    let pickerHeros = []
    const rankOptions = ranks.mlbb.map(rk => ({ value: rk, label: rk }))
    if (mlbbHeroes) {
      pickerHeros = mlbbHeroes.map(({ hero_id, name, image }) => ({
        value: hero_id,
        label: name,
        image,
      }))
    }

    // console.log('preferred_heroes', preferred_heroes)

    return (
      <View style={styles.controlLayout}>
        <BackgroundImage source={Images.background} />
        <ScrollView>
          <View style={styles.wrapperLogoGame}>
            <Image
              width={20}
              height={30}
              source={Images.mlbb}
              style={{ width: 80, height: 40 }}
            />
            <Text style={{ color: '#fff', fontSize: 40 }}> Profile </Text>
          </View>
          <View style={styles.formInput}>
            <Text style={styles.textTeamLogo}>PROFILE PHOTO</Text>
            <View style={styles.buttonUpload}>
              <SmallButton
                label={'Upload'}
                onPress={() => this.uploadImageTeam()}
              />
            </View>
            {Boolean(avatarSource) && (
              <Image
                source={avatarSource}
                width={50}
                height={50}
                style={styles.reviewImage}
              />
            )}
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <Picker
                  label="RANK"
                  data={rankOptions}
                  onSelected={rank => this.setState({ rank })}
                  value={rank}
                />
              </View>
            </View>
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <InputText
                  label="DESCRIPTION"
                  onChangeText={bio => this.setState({ bio })}
                  value={bio}
                />
              </View>
              <View style={styles.flex1}>
                <InputText
                  label="STARS"
                  onChangeText={stars => this.setState({ stars })}
                  value={stars}
                />
              </View>
            </View>
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <InputText
                  label="SCHOOL"
                  onChangeText={organisation => this.setState({ organisation })}
                  value={organisation}
                />
              </View>
            </View>
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <Picker
                  label="PRIMARY ROLE"
                  data={roles}
                  onSelected={role => {
                    console.log('role', role)
                    preferred_roles[0] = role
                    this.setState({ preferred_roles })
                  }}
                  value={preferred_roles[0]}
                />
              </View>
              <View style={styles.flex1}>
                <Picker
                  label="SECONDARY ROLE"
                  data={roles}
                  onSelected={role => {
                    preferred_roles[1] = role
                    this.setState({ preferred_roles })
                  }}
                  value={preferred_roles[1]}
                />
              </View>
            </View>
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <HeroPicker
                  data={pickerHeros}
                  heros={preferred_heroes}
                  onSelected={this.onSelecteHero}
                  onRemove={this.onRemoveHero}
                />
              </View>
            </View>
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <InputText
                  label="MLBB ID"
                  onChangeText={mlbbId =>
                    this.setState({ mobile_legend_id: mlbbId })
                  }
                  value={mobile_legend_id}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {!keyboardShown && (
          <NextStep
            counStep={[1, 2, 3, 4]}
            backDisplay={true}
            navigate={'hub'}
            content="COMPLETE REGISTRATION"
            isActiveStep={4}
            onClickNext={() => this.onClickNext({ game: 'mlbb' })}
            onClickBack={this.onClickBack}
          />
        )}
      </View>
    )
  }
}

export default connect(
  state => {
    return {
      mlbbHeroes: ResourceSelectors.mlbbListHeroes(state),
      user: UserSelectors.selectUser(state),
    }
  },
  dispatch =>
    bindActionCreators(
      {
        ...ResourceActions,
        ...UserActions,
        showMessage: CommonActions.notificationMessage,
      },
      dispatch
    )
)(MlbbProfile)
