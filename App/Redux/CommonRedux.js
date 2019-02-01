import { createReducer, createActions } from 'reduxsauce'
import { INITIAL_STATE } from './Common/State'
import CommonReducers from './Common/Reducers'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationMessage: ['show', 'message']
})

console.log('Types', Types);

export const CommomTypes = Types
export default Creators

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_MESSAGE]: CommonReducers.nofiticationMessage,
})
