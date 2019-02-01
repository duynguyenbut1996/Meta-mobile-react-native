import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-picker'

import { serverOptions } from '../../utils/server'
import { listLanguage } from '../../utils/languages'
import { listCountry } from '../../utils/countries'
import { SELECT_GAME, CREATE_TEAM } from '../../utils/game'
import SelectGame from '../SelectGame'
import NextStep from '../../Components/NextStep'
import SmallButton from '../../Components/Buttons/SmallButton'
import InputText from '../../Components/Inputs/InputText'
import Picker from '../../Components/Picker'
import Images from '../../Themes/Images'

import TeamsActions from '../../Redux/TeamsRedux'
import { TeamsSelectors } from '../../Redux/Teams/Selectors'

import styles from '../Styles/Teams/TeamCreationStyles'

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
}

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

class TeamCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      game: '',
      textUpImage: 'UPLOAD',
      avatarSource: '',
      avatar: {},
      name: '',
      language: '',
      description: '',
      server: '',
      country: '',
      is_recruiting: false,
      is_scrim_ready: false,
      organisation: '',
      is_active: true,
    }

    this.onClickNext = this.onClickNext.bind(this)
    this.onClickBack = this.onClickBack.bind(this)
    this.renderInviteItem = this.renderInviteItem.bind(this)
    this.renderBorder = this.renderBorder.bind(this)
    this.uploadImageTeam = this.uploadImageTeam.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { success } = nextProps
    const { navigation } = this.props

    if (success) {
      navigation.navigate('ProfileStack')
    }

    this.onClickNext = this.onClickNext.bind(this)
    this.onClickBack = this.onClickBack.bind(this)
    this.renderInviteItem = this.renderInviteItem.bind(this)
    this.renderBorder = this.renderBorder.bind(this)
    this.uploadImageTeam = this.uploadImageTeam.bind(this)
  }

  renderSelectGame() {
    return <SelectGame onClickNext={this.onClickNext} />
  }

  uploadImageTeam() {
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

  onClickNext({ game, action }) {
    const {
      avatar,
      name,
      language,
      description,
      server,
      country,
      is_recruiting,
      is_scrim_ready,
      organisation,
      is_active,
      step,
    } = this.state
    switch (action) {
      case SELECT_GAME:
        this.setState({
          step: step + 1,
          game,
        })
        break
      case CREATE_TEAM:
        // this.setState({
        //   step: step + 1,
        //   game,
        // })
        this.props.createTeamRequest(game, {
          avatar,
          name,
          language,
          description,
          server,
          country,
          is_recruiting,
          is_scrim_ready,
          organisation,
          is_active,
        })
        break

      default:
        break
    }
  }

  onClickBack() {
    this.setState({
      step: this.state.step - 1,
      avatarSource: '',
      textUpImage: 'UPLOAD',
    })
  }

  iconCheck() {
    return (
      <TouchableOpacity>
        <Icon name={'check'} color="#fff" size={18} style={{ opacity: 0.2 }} />
      </TouchableOpacity>
    )
  }

  renderInviteItem() {
    return (
      <View style={styles.inviteItem}>
        <View style={styles.itemLeft}>
          <Image style={styles.avatar} source={Images.dota2} />
          <Text style={styles.name}>Mike Shane</Text>
        </View>
        {this.iconCheck()}
      </View>
    )
  }

  renderBorder() {
    return <View style={styles.solid} />
  }

  renderInputForm() {
    const {
      step,
      game,
      avatarSource,
      textUpImage,
      name,
      organisation,
      is_recruiting,
      is_scrim_ready,
      language,
      description,
      server,
      country,
    } = this.state

    return (
      <View style={styles.controlLayout}>
        <View style={styles.wrapperLogoGame}>
          <Image
            width={20}
            height={30}
            source={Images[game]}
            style={
              game === 'mlbb'
                ? { width: 80, height: 40 }
                : { width: 50, height: 50 }
            }
          />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.textTeamLogo}>TEAM LOGO</Text>
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
              <InputText
                label="TEAM NAME"
                onChangeText={name => this.setState({ name })}
                value={name}
              />
            </View>
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
                label="RECRUITING"
                data={recruiting}
                onSelected={ready => this.setState({ is_recruiting: ready })}
                value={is_recruiting}
              />
            </View>
            <View style={styles.flex1}>
              <Picker
                label="READY TO SCRIM"
                data={readyScrim}
                onSelected={ready => this.setState({ is_scrim_ready: ready })}
                value={is_scrim_ready}
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
                label="SERVER"
                data={serverOptions}
                onSelected={server => this.setState({ server })}
                value={server}
              />
            </View>
            <View style={styles.flex1}>
              <Picker
                label="Language"
                data={listLanguage}
                onSelected={language => this.setState({ language })}
                value={language}
              />
            </View>
          </View>
          <View style={styles.commonSection}>
            <View style={styles.flex1}>
              <Picker
                label="LOCATION"
                data={listCountry}
                onSelected={country => this.setState({ country })}
                value={country}
              />
            </View>
          </View>
        </View>
        <NextStep
          counStep={[1, 2, 3]}
          backDisplay={true}
          navigate={'hub'}
          isActiveStep={step}
          onClickNext={() => this.onClickNext({ game, action: CREATE_TEAM })}
          onClickBack={this.onClickBack}
        />
      </View>
    )
  }

  renderInvitePlayer() {
    return (
      <View style={styles.controlLayout}>
        <View style={styles.formInvite}>
          <View style={styles.stepTitle}>
            <Text style={styles.textInvite}>Invite Players</Text>
            {this.iconCheck()}
          </View>
          <View style={styles.inviteContent}>
            <Text style={styles.labelContent}>REFERAL LINK</Text>
            <Text style={styles.code}>meta.us/signup?code=XHkNGX26n</Text>
            <Text style={styles.labelContent}>META CONNETIONS</Text>
            <View>{this.renderInviteItem()}</View>
            {this.renderBorder()}
            <Text style={styles.labelContent}>FACEBOOK FRIENDS</Text>
            <View>{this.renderInviteItem()}</View>
            <View>{this.renderInviteItem()}</View>
            <Text style={styles.labelContent}>PHONE CONTACTS</Text>
            <View>{this.renderInviteItem()}</View>
          </View>
          <NextStep content={'Send Invitations'} />
        </View>
      </View>
    )
  }

  render() {
    const { step, name } = this.state

    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.background}
          style={{ width: '100%', height: '100%' }}
        >
          <ScrollView>
            {step === 1 && this.renderSelectGame()}
            {step === 2 && this.renderInputForm()}
            {step === 3 && this.renderInvitePlayer()}
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}

export default connect(
  state => ({
    success: TeamsSelectors.selectSuccess(state),
  }),
  dispatch => bindActionCreators({ ...TeamsActions }, dispatch)
)(TeamCreation)
