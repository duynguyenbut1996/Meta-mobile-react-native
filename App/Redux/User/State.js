import Immutable from 'seamless-immutable'

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  userToken: null,
  user: null,
  isNewUser: false,
  profiles: null,
  fetching: false,
  error: null,
  currentGame: 'dota2',
  inputCreation: {
    first_name: null,
    last_name: null,
    country: null,
    email: null,
    password: null,
    meta_name: null,
    language: null,
    game_type: null,
  },
})
