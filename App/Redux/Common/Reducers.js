/* ------------- Reducers ------------- */

export default Reducers = {
  nofiticationMessage: (state, action) => {
    const { show, message } = action
    return state.merge({ show, message })
  },
};
