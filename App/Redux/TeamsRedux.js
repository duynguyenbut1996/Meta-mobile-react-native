import { createReducer, createActions } from 'reduxsauce'
import { INITIAL_STATE } from './Teams/State'
import TeamReducers from './Teams/Reducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  teamProfileRequest: ['game', 'teamId'],
  teamProfileSuccess: ['game', 'teamId', 'profile'],
  teamProfileMultiRequest: ['game', 'teamIds'],
  teamProfileMultiSuccess: ['game', 'profiles'],
  failure: null,
  createTeamRequest: ['game', 'data'],
  createTeamSuccess: ['game', 'data'],
})

export const TeamsTypes = Types
export default Creators

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TEAM_PROFILE_REQUEST]: TeamReducers.fetch,
  [Types.TEAM_PROFILE_SUCCESS]: TeamReducers.updateGameTeamProfile,
  [Types.TEAM_PROFILE_MULTI_REQUEST]: TeamReducers.fetch,
  [Types.TEAM_PROFILE_MULTI_SUCCESS]: TeamReducers.updateGameTeamProfiles,
  [Types.FAILURE]: TeamReducers.failure,
  [Types.CREATE_TEAM_REQUEST]: TeamReducers.fetch,
  [Types.CREATE_TEAM_SUCCESS]: TeamReducers.updateGameTeamProfile,
})
