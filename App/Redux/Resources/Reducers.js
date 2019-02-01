/* ------------- Reducers ------------- */

export default (Reducers = {
  fetch: state => state.merge({ fetching: true, error: null }),

  // curryed fetch to put proper game resources
  fetchSuccess: game => (state, action) => {
    const { resources } = action;
    return state.merge({ fetching: false, error: null, [game]: resources });
  },

  fetchCarousel: (state, action) => {
    const { listCarousel } = action;
    return state.merge({ listCarousel: listCarousel });
  },

  // failed to login
  failure: state => state.merge({ fetching: false, error: true })
});
