import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { INITIAL_STATE } from "./Resources/State";
import Reducers from "./Resources/Reducers";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dotaRequest: null,
  teamDotaRequest: null,
  dotaSuccess: ["resources"],
  failure: null,
  mlbbRequest: null,
  mlbbSuccess: ["resources"],
  getCarouselHub: null,
  carouselSuccess: ["listCarousel"]
});

export const ResourceTypes = Types;

export default Creators;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DOTA_REQUEST]: Reducers.fetch,
  [Types.DOTA_SUCCESS]: Reducers.fetchSuccess("dota2"),
  [Types.FAILURE]: Reducers.failure,
  [Types.MLBB_REQUEST]: Reducers.fetch,
  [Types.MLBB_SUCCESS]: Reducers.fetchSuccess("mlbb"),
  [Types.GET_CAROUSEL_HUB]: Reducers.getCarouselHub,
  [Types.CAROUSEL_SUCCESS]: Reducers.fetchCarousel,
});
