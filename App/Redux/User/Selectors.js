import { path } from 'ramda'
/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectUserToken: state => state.users.userToken,
  selectUser: state => state.users.user,
  selectGameProfile: (state, game, userId) => path(['users', 'profiles', game, userId], state),
  getCurrentGame: state => state.users.currentGame,
  getInputCreation: state => state.users.inputCreation,
  selectError: ({ users }) => users.error,
  selectFetching: state => state.users.fetching,
  selectIsNewUser: state => state.users.isNewUser,
}
