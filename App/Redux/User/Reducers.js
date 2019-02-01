export default Reducers = {
  /* ------------- Reducers ------------- */

  login: state =>
    state.merge({ fetching: true, error: null, userToken: null, user: null }),

  // successful login
  loginSuccess: (state, action) => {
    const { userToken, user } = action;
    return state.merge({ fetching: false, error: null, userToken, user });
  },

  updateGameProfile: (state, action) => {
    const { game, userId, profile } = action;
    return state.merge(
      {
        fetching: false,
        error: null,
        profiles: { [game]: { [userId]: profile } }
      },
      { deep: true }
    );
  },

  fetch: state => state.merge({ fetching: true, error: null }),

  updateCurrentGame: (state, action) => {
    const { game } = action;
    return state.merge({ currentGame: game });
  },

  updateInputCreation: (state, action) => {
    const { inputCreation } = action;
    let data = {...state.inputCreation, ...inputCreation}
    return state.merge({ inputCreation: data });
  },

  checkIsNewUser: (state, action) => {
    const { isNewUser } = action;
    return state.merge({ isNewUser });
  },

  // failed to fetch
  failure: (state, action) => {
    const { error = '' } = action;
    return state.merge({ fetching: false, error });
  }
};
