import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Picker, Keyboard, Alert } from 'react-native'

import styles from '../../Containers/Styles/CreateAccountStyles'
import InputScrollView from 'react-native-input-scroll-view'
import { FullButton, InputText } from '../../Components/'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserActions from '../../Redux/UserRedux'
import { listLanguage } from '../../utils/languages'
import { listCountry } from '../../utils/countries'
import { UserSelectors } from '../../Redux/User/Selectors'

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
      language: 'English',
      country: 'AF',
      keyboardShown: false,
    }
    this.nextStep = this.nextStep.bind(this)
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      this._keyboardDidShow()
    )
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      this._keyboardDidHide()
    )
  }

  _keyboardDidShow() {
    this.setState({ keyboardShown: true })
  }

  _keyboardDidHide() {
    this.setState({ keyboardShown: false })
  }

  nextStep() {
    const { firstName, lastName, metaName, language, country } = this.state
    const error = this.validateCreateUser()
    if (Boolean(error)) {
      return this.alertButton(error)
    }
    let data = {
      first_name: firstName,
      last_name: lastName,
      meta_name: metaName,
      language,
      country,
    }
    let inputCreation = {...this.props.getInputCreation, ...data}
    this.props.createAccount(inputCreation)
    this.props.navigation.navigate('FinalStep')
  }

  alertButton(error) {
    return Alert.alert('Create Account error!', `${error} is Empty.`, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ])
  }

  validateCreateUser() {
    const { firstName, lastName, metaName } = this.state

    let error = []
    if (!firstName) error.push('First name')
    if (!lastName) error.push('Last name')
    if (!metaName) error.push('Meta Username')
    if(error.length > 0) {
      return error.join(', ')
    }
    return ''
  }

  render() {
    const { firstName, lastName, metaName, keyboardShown } = this.state
    return (
      <View style={styles.container}>
        <InputScrollView keyboardOffset={60}>
          <View>
            <Text style={styles.titleStep}>Your Info</Text>
            <View style={[styles.formRegister, styles.secondStyle]}>
              <View style={styles.inputCreate}>
                <InputText
                  label="FIRST NAME"
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={firstName => this.setState({ firstName })}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputCreate}>
                <InputText
                  label="LAST NAME"
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={lastName => this.setState({ lastName })}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputCreate}>
                <InputText
                  label="META USERNAME"
                  placeholder="Meta Username"
                  value={metaName}
                  onChangeText={metaName => this.setState({ metaName })}
                  autoCapitalize="none"
                />
              </View>
              <View style={[styles.inputCreate, styles.borderBottom]}>
                <Text style={{ color: 'gray' }}>COUNTRY</Text>
                <Picker
                  type="dropdwon"
                  style={styles.pickerInput}
                  selectedValue={this.state.country}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ country: itemValue })
                  }
                >
                  {listCountry.map((item, index) => {
                    return (
                      <Picker.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                      />
                    )
                  })}
                </Picker>
              </View>
              <View style={[styles.inputCreate, styles.borderBottom]}>
                <Text style={{ color: 'gray' }}>LANGUAGE</Text>
                <Picker
                  type="dropdwon"
                  style={styles.pickerInput}
                  selectedValue={this.state.language}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ language: itemValue })
                  }
                >
                  {listLanguage.map((item, index) => {
                    return <Picker.Item label={item} value={item} key={index} />
                  })}
                </Picker>
              </View>
            </View>
          </View>
        </InputScrollView>
        {!keyboardShown && (
          <View>
            <View style={styles.stepByStep}>
              <TouchableOpacity onPress={this.nextStep}>
                <Text style={styles.stepText}>NEXT STEP</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 10,
                  position: 'relative',
                }}
              >
                <View style={styles.dots} />
                <View style={[styles.dots, styles.activeDots]} />
                <View style={styles.dots} />
                <View style={styles.dots} />
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Icon name="long-arrow-left" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
