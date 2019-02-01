import { call, put } from 'redux-saga/effects'
import TeamsActions from '../Redux/TeamsRedux'
import { getUser } from './UserSagas'

import get from 'lodash/get'

export function* getGameTeamProfile(api, action) {
  const { game, teamId } = action
  const response = yield call(api.getGameTeamProfile, { game, teamId })

  if (response.ok) {
    const profile = response.data
    yield put(TeamsActions.teamProfileSuccess(game, teamId, profile))
  } else {
    yield put(TeamsActions.failure())
  }
}

export function* getGameTeamProfiles(api, action) {
  const { game, teamIds } = action
  let responses = {}
  for (let id of teamIds) {
    const response = yield call(api.getGameTeamProfile, { game, uuid: id })
    if (response.ok) {
      responses[id] = response.data
    } else {
      break
    }
  }
  if (Object.keys(responses).length !== teamIds.length) {
    yield put(TeamsActions.failure())
  } else {
    yield put(TeamsActions.teamProfileMultiSuccess(game, responses))
  }
}

export function* createTeamProfile(api, action) {
  const { game, data } = action
  const response = yield call(api.createTeam, { game, data })
  if (response.ok) {
    const profile = response.data
    yield put(TeamsActions.teamProfileSuccess(game, get(data, 'uuid'), profile))
    // chain saga to replace with updated user
    yield* getUser(api, {})
  } else {
    yield put(TeamsActions.failure())
  }
}

// export function* createTeamProfile(api, action) {
//   const { game, data } = action
//   const response = yield call(api.createTeam, { game, data });
//   console.log('response', response);

// }
