import { createReducer, createActions } from "reduxsauce";
import { path } from "ramda";

import { INITIAL_STATE } from './User/State'
import UserReducers from './User/Reducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userRequest: ["token"],
  loginRequest: ["username", "password"],
  loginSuccess: ["userToken", "user"],
  emailRequestPasswordRequest: ["email"],
  emailRequestPasswordSuccess: null,
  gameProfileRequest: ["game", "userId", "uuid"],
  gameProfileSuccess: ["game", "userId", "profile"],
  failure: ['error'],
  loginFb: ["token"],
  updateCurrentGame: ['game'],
  createAccount: ["inputCreation"],
  updateInputCreation: ["inputCreation"],
  forgotPassword: ['email'],
  updateUserProfile: ['data'],
  checkIsNewUser: ["isNewUser"],
  createGameProfile: ['game', 'data']
});

export const UserTypes = Types;
export default Creators;


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_REQUEST]: UserReducers.login,
  [Types.LOGIN_REQUEST]: UserReducers.login,
  [Types.LOGIN_SUCCESS]: UserReducers.loginSuccess,
  [Types.GAME_PROFILE_REQUEST]: UserReducers.fetch,
  [Types.GAME_PROFILE_SUCCESS]: UserReducers.updateGameProfile,
  [Types.FAILURE]: UserReducers.failure,
  [Types.UPDATE_CURRENT_GAME]: UserReducers.updateCurrentGame,
  [Types.CREATE_ACCOUNT]: UserReducers.createAccount,
  [Types.UPDATE_INPUT_CREATION]: UserReducers.updateInputCreation,
  // [Types.UPDATE_USER_PROFILE]: 
  [Types.CHECK_IS_NEW_USER]: UserReducers.checkIsNewUser,
});
