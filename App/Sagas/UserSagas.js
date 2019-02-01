import { call, put } from 'redux-saga/effects'
import { path, pathOr } from 'ramda'
import UserActions from '../Redux/UserRedux'

export function* getTokenFB(api, action) {
  const response = yield call(api.loginFB, action.token)
  if (response.ok) {
    const { token, user } = response.data
    api.api.setHeader('Authorization', `Token ${token}`)
    yield put(UserActions.loginSuccess(token, user))
  } else {
    yield put(UserActions.failure())
  }
}

export function* getUserToken(api, action) {
  const { username, password } = action
  const response = yield call(api.postLogin, { username, password })
  if (response.ok) {
    const {
      data: { token, user },
    } = response
    api.api.setHeader('Authorization', `Token ${token}`)
    yield put(UserActions.loginSuccess(token, user))
  } else {
    const {
      data: { detail },
    } = response
    yield put(UserActions.failure(detail))
  }
}

export function* getUser(api, action) {
  try {
    const { token } = action
    if (token) {
      api.api.setHeader('Authorization', `Token ${token}`)
    }
    const response = yield call(api.getOwnUser)
    if (response.ok) {
      let user = response.data
      const responseAddon = yield call(api.userAddon, { gameId: user.uuid })
      // Format user profile
      if (responseAddon.ok) {
        const mlbbProfile = path(
          ['data', 'game_profiles', 'Mobile Legends'],
          responseAddon
        )
        const dota2Profile = path(
          ['data', 'game_profiles', 'Dota2'],
          responseAddon
        )
        user.dota2_player_profile = pathOr('', ['profile'], dota2Profile)
        user.dota2_teams = pathOr([], ['teams'], dota2Profile)
        user.mlbb_player_profile = pathOr('', ['profile'], mlbbProfile)
        user.mlbb_teams = pathOr([], ['teams'], mlbbProfile)
      }
      yield put(UserActions.loginSuccess(token, user))
    } else {
      yield put(UserActions.failure())
    }
  } catch (ex) {
    yield put(UserActions.failure())
  }
}

export function* getGameProfile(api, action) {
  const { game, userId, uuid } = action
  const response = yield call(api.getGameProfile, { game, uuid })
  const data = response.data
  if (response.ok) {
    const profile = data
    yield put(UserActions.gameProfileSuccess(game, userId, profile))
  } else {
    yield put(UserActions.failure())
  }
}

export function* createAccount(api, action) {
  const { inputCreation } = action
  const response = yield call(api.createAccount, inputCreation)
  if (response.ok) {
    console.log(response.data)
    let isNewUser = true
    const { token, user } = response.data
    api.api.setHeader('Authorization', `Token ${token}`)
    yield put(UserActions.checkIsNewUser(isNewUser))
    yield put(UserActions.loginSuccess(token, user))
  } else {
    yield put(UserActions.failure())
  }
}

export function* forgotPassword(api, action) {
  const { email } = action
  const response = yield call(api.forgotPassword, email)
  if (response.ok) {
    return response;
  } else {
    yield put(UserActions.failure())
  }
}

export function* updateUserProfile(api, action) {
  const { data } = action
  console.log('data', data)
  const response = yield call(api.updateUserProfile, data)
  if(response.ok) {
  }
  console.log('res', response)
}

export function* createGameProfile(api, action) {
  const { game, data } = action;
  const response = yield call(api.createGameProfile, { game, data });
  if (response.data && response.ok) {
    yield put(UserActions.gameProfileSuccess(game, response.data.user, response.data ))
  }
}
