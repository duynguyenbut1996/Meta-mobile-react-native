/* ------------- Reducers ------------- */
export default (Reducers = {
  fetch: state => state.merge({ fetching: true, error: null, success: false }),

  updateGameTeamProfile: (state, action) => {
    const { game, teamId, profile } = action
    return state.merge(
      {
        fetching: false,
        error: null,
        success: true,
        [game]: { [teamId]: profile },
      },
      { deep: true }
    )
  },

  updateGameTeamProfiles: (state, action) => {
    const { game, profiles } = action
    return state.merge(
      {
        fetching: false,
        error: null,
        [game]: profiles,
      },
      { deep: true }
    )
  },

  // failed to fetch
  failure: state =>
    state.merge({ fetching: false, error: true, success: false }),
})
