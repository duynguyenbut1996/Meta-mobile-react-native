import { takeLatest, all, takeEvery } from 'redux-saga/effects'
import API from '../Services/Api'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { TeamsTypes } from '../Redux/TeamsRedux'
import { UserTypes } from '../Redux/UserRedux'
import { ResourceTypes } from '../Redux/ResourcesRedux'

/* ------------- Sagas ------------- */

import {
  getGameTeamProfile,
  getGameTeamProfiles,
  createTeamProfile,
} from './TeamsSagas'

import {
  getUserToken,
  getUser,
  getGameProfile,
  getTokenFB,
  createAccount,
  forgotPassword,
  updateUserProfile,
  createGameProfile,
} from './UserSagas'

import {
  getDotaResources,
  getMlbbResources,
  getCarouselHub,
} from './ResourcesSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    takeLatest(UserTypes.LOGIN_REQUEST, getUserToken, api),
    takeLatest(UserTypes.LOGIN_FB, getTokenFB, api),
    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.GAME_PROFILE_REQUEST, getGameProfile, api),
    takeLatest(UserTypes.CREATE_ACCOUNT, createAccount, api),
    takeLatest(UserTypes.FORGOT_PASSWORD, forgotPassword, api),
    takeLatest(ResourceTypes.DOTA_REQUEST, getDotaResources, api),
    takeLatest(TeamsTypes.TEAM_PROFILE_MULTI_REQUEST, getGameTeamProfiles, api),
    takeLatest(ResourceTypes.MLBB_REQUEST, getMlbbResources, api),
    takeLatest(ResourceTypes.GET_CAROUSEL_HUB, getCarouselHub, api),
    takeLatest(TeamsTypes.CREATE_TEAM_REQUEST, createTeamProfile, api),
    takeLatest(UserTypes.UPDATE_USER_PROFILE, updateUserProfile, api),
    takeLatest(UserTypes.CREATE_GAME_PROFILE, createGameProfile, api),
  ])
}
