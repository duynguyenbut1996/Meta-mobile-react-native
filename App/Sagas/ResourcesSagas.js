import { call, put } from "redux-saga/effects";
import ResourcesActions from "../Redux/ResourcesRedux";

export function* getDotaResources(api) {
  const response = yield call(api.getDotaResources);
  if (response.ok) {
    const { data } = response;
    yield put(ResourcesActions.dotaSuccess(data));
  } else {
    yield put(ResourcesActions.failure());
  }
}

export function* getMlbbResources(api) {
  const response = yield call(api.getHeroesMlbb);
  if (response.ok) {
    const { data } = response;
    yield put(ResourcesActions.mlbbSuccess(data));
  } else {
    yield put(ResourcesActions.failure());
  }
}

export function* getCarouselHub(api) {
  const response = yield call(api.getCarouselHub);
  if (response.ok) {
    const { data } = response;
    yield put(ResourcesActions.carouselSuccess(data));
  } else {
    yield put(ResourcesActions.failure());
  }
}
