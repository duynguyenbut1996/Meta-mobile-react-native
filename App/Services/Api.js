// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import qs from 'qs'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { APP_API_URL, APP_API_VERSION } from 'react-native-dotenv'

const URLS = {
  dota2: 'dota2',
  mlbb: 'mobile-legends',
}

// our "constructor"
const create = () => {
  const baseURL = `${APP_API_URL}/api/v${APP_API_VERSION}`
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      accept: 'application/json',
    },
    // 2 min timeout...
    timeout: 120000,
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const postLogin = ({ username, password }) =>
    api.post(
      '/auth/login/',
      {},
      {
        headers: { 'content-type': 'application/json' },
        auth: {
          username,
          password,
        },
      }
    )

  const loginFB = token =>
    api.post(`/auth/facebook-login/`, { access_token: token })

  const getOwnUser = () => api.get('/auth/me/')

  const getDotaResources = () => api.get('/dota2/game-data/heroes/')

  const getHeroesMlbb = () => api.get('mobile-legends/game-data/heroes/')

  const getGameProfile = ({ game, uuid }) => {
    const endpoints = {
      dota2: id => `${URLS[game]}/dota2-profiles/${id}/`,
      mlbb: id => `${URLS[game]}/player-profiles/${id}/`,
    }
    return api.get(endpoints[game](uuid))
  }

  const getGameTeamProfile = ({ game, uuid }) => {
    return api.get(`${URLS[game]}/teams/${uuid}`)
  }
  const userAddon = ({ gameId }) => api.get(`/users/${gameId}/addons/`)

  const getCarouselHub = () => api.get('landing-page/carousel/announcement/')

  const createAccount = inputCreation =>
    api.post('/users/', qs.stringify(inputCreation), {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })

  const createTeam = ({ game, data }) => {
    // return
    let bodyFormData = new FormData()
    const notRequired = ['created', 'modified', 'uuid', 'members']
    for (let key in data) {
      if (
        !data.hasOwnProperty(key) ||
        notRequired.indexOf(key) !== -1 ||
        data[key] === null ||
        data[key] === undefined
      ) {
        continue
      }
      switch (key) {
        case 'avatar':
          if (!isEmpty(data[key])) {
            bodyFormData.append(key, data[key])
          }
          break
        case 'country':
          bodyFormData.append(key, data[key])
          break
        case 'recruiting_position':
        case 'background_photo':
        case 'team_requests':
        case 'recruitment_follower':
          break
        default:
          bodyFormData.append(key, data[key])
          break
      }
    }
    return api.post(`${game}/teams`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        accept: 'multipart/form-data',
      },
    })
  }

  const updateUserProfile = data => {
    console.log('data', data)
    const notRequired = [
      'uuid',
      'last_seen',
      'timezone',
      'connection_requests',
      'reputation',
      'connection_follower',
      'followers_url',
      'referral_codes',
      'change_meta_name',
      'meta_name',
    ]
    let bodyFormData = new FormData()
    for (let item in data) {
      if (notRequired.indexOf(item) !== -1) {
        continue
      }
      bodyFormData.append(item, data[item])
    }
    return api.put(`users/${data.uuid}/`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'multipart/form-data',
      },
    })
  }

  const createGameProfile = ({ game, data }) => {
    console.log('api', game, data)
    const endpoints = {
      dota2: 'dota2/dota2-profiles/',
      mlbb: 'mobile-legends/player-profiles/',
    }
    return api.post(endpoints[game], data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
  }

  const forgotPassword = email =>
    api.post(
      '/auth/password/reset/',
      { email: email },
      {
        headers: { 'content-type': 'application/json' },
      }
    )
  return {
    api,
    postLogin,
    getOwnUser,
    getDotaResources,
    getGameProfile,
    getGameTeamProfile,
    loginFB,
    getHeroesMlbb,
    userAddon,
    getCarouselHub,
    createAccount,
    forgotPassword,
    createTeam,
    updateUserProfile,
    createGameProfile,
  }
}

export default {
  create,
}
