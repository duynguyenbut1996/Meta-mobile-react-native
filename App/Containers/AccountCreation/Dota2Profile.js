import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-picker'
import MultiSelect from 'react-native-multiple-select'

import { serverOptions } from '../../utils/server'
import { listLanguage } from '../../utils/languages'
import { listCountry } from '../../utils/countries'
import { preferPositions } from '../../utils/position'
import { SELECT_GAME, CREATE_TEAM } from '../../utils/game'
import { rankTier } from '../../utils/rankTier'
import SelectGame from '../SelectGame'
import NextStep from '../../Components/NextStep'
import SmallButton from '../../Components/Buttons/SmallButton'
import InputText from '../../Components/Inputs/InputText'
import Picker from '../../Components/Picker'
import Images from '../../Themes/Images'

import ResourceActions from '../../Redux/ResourcesRedux'
import UserActions from '../../Redux/UserRedux'
import { ResourceSelectors } from '../../Redux/Resources/Selectors'
import { UserSelectors } from '../../Redux/User/Selectors'
import HeroPicker from '../../Components/HeroPicker/HeroPicker'

import styles from '../Styles/Teams/TeamCreationStyles'

const recruiting = [
  { value: false, label: 'Not Recruiting' },
  { value: true, label: 'Recruiting' },
]

const readyScrim = [
  {
    value: false,
    label: 'Not Ready',
  },
  { value: true, label: 'Ready To Scrim' },
]

class Dota2Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      textUpImage: 'UPLOAD',
      avatarSource: '',
      avatar: {},
      rank: 11,
      language: 'English',
      description: '',
      server: 'US West',
      country: 'AF',
      position: 'Carry',
      organisation: '',
      is_active: true,
      listHeroes: [],
      selectedItems: [],
      preferred_heroes: [],
      keyboardShown: false,
    }

    this.onClickNext = this.onClickNext.bind(this)
    this.onClickBack = this.onClickBack.bind(this)
    this.uploadImageTeam = this.uploadImageTeam.bind(this)
  }

  componentDidMount() {
    const { dota2Heroes } = this.props
    if (!dota2Heroes) {
      this.props.dotaRequest()
    }
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this._keyboardDidShow()
    )
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this._keyboardDidHide()
    )
  }

  renderSelectGame() {
    return <SelectGame onClickNext={this.onClickNext} />
  }

  uploadImageTeam() {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    ImagePicker.showImagePicker(options, response => {

      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        Alert.alert('Error', response.error, {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        })
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

  onClickNext({ game }) {
    const { user } = this.props
    const {
      avatar,
      rank,
      language,
      description,
      server,
      country,
      position,
      organisation,
      listHeroes,
    } = this.state
    const update = this.props.updateUserProfile({
      avatar,
      language,
      description,
      country,
      organisation,
      uuid: user.uuid,
      first_name: user.first_name,
      last_name: user.last_name,
    })
    console.log('UPdate', update);
    const create = this.props.createGameProfile(game, {
      rank_tier: rank,
      preferred_server: server,
      preferred_positions: [position],
      preferred_heroes: listHeroes,
    })
    console.log('create', create);
  }

  onSelectedItemsChange = selectedItems => {
    const { listHeroes } = this.state
    if (listHeroes.length === 3) {
      selectedItems.shift()
    }
    this.setState({
      listHeroes: selectedItems,
      selectedItems,
    })
  }

  onSelecteHero = id => {
    const { preferred_heroes } = this.state
    if (id && preferred_heroes.length < 3 && !preferred_heroes.includes(id)) {
      preferred_heroes[preferred_heroes.length] = id
      this.setState({ preferred_heroes })
    }
  }

  onRemoveHero = id => {
    let { preferred_heroes } = this.state
    if (id && preferred_heroes.includes(id)) {
      preferred_heroes = preferred_heroes.filter(sid => sid !== id)
      this.setState({ preferred_heroes })
    }
  }

  onClickBack() {
    const { navigation } = this.props

    navigation.navigate('FinalStep')
    this.setState({
      avatarSource: '',
      textUpImage: 'UPLOAD',
    })
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

  renderInputForm() {
    const {
      avatarSource,
      textUpImage,
      rank,
      position,
      organisation,
      description,
      server,
      preferred_heroes,
      keyboardShown,
    } = this.state

    const { dota2Heroes, game } = this.props
    let pickerHeros = []
    if (dota2Heroes) {
      pickerHeros = dota2Heroes.map(({ hero_id, name, image }) => ({
        value: hero_id,
        label: name,
        image,
      }))
    }
    return (
      <View style={styles.controlLayout}>
        <ScrollView>
          <View style={styles.wrapperLogoGame}>
            <Image
              width={20}
              height={30}
              source={Images.dota2}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ color: '#fff', fontSize: 40 }}> Profile </Text>
          </View>
          <View style={styles.formInput}>
            <Text style={styles.textTeamLogo}>PROFILE PHOTO</Text>
            <View style={styles.buttonUpload}>
              <SmallButton
                label={textUpImage}
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
                  data={rankTier}
                  onSelected={rank => this.setState({ rank })}
                  value={rank}
                />
              </View>
              <View style={styles.flex1}>
                <Picker
                  label="SERVER"
                  data={serverOptions}
                  onSelected={server => this.setState({ server })}
                  value={server}
                />
              </View>
            </View>
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <InputText
                  label="DESCRIPTION"
                  onChangeText={description => this.setState({ description })}
                  value={description}
                />
              </View>
            </View>
            <View style={styles.commonSection}>
              <View style={styles.flex1}>
                <Picker
                  label="POSITION"
                  data={preferPositions}
                  onSelected={position => this.setState({ position })}
                  value={position}
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
                <HeroPicker
                  data={pickerHeros}
                  heros={preferred_heroes}
                  onSelected={this.onSelecteHero}
                  onRemove={this.onRemoveHero}
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
            onClickNext={() => this.onClickNext({ game })}
            onClickBack={this.onClickBack}
          />
        )}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.background}
          style={{ width: '100%', height: '100%' }}
        >
          {this.renderInputForm()}
        </ImageBackground>
      </View>
    )
  }
}

export default connect(
  state => {
    console.log('state', state)
    return {
      dota2Heroes: ResourceSelectors.selectDota2(state),
      user: UserSelectors.selectUser(state),
      game: UserSelectors.getCurrentGame(state),
    }
  },
  dispatch =>
    bindActionCreators({ ...ResourceActions, ...UserActions }, dispatch)
)(Dota2Profile)
