import { takeLatest, put } from "redux-saga/effects";
import { SHOW_LOADER, HIDE_LOADER } from "./../actionTypes";

function* showLoaderSaga() {
  yield put({ type: SHOW_LOADER });
}

function* hideLoaderSaga() {
  yield put({ type: HIDE_LOADER });
}

export function* watchLoader() {
  yield takeLatest(SHOW_LOADER, showLoaderSaga);
  yield takeLatest(HIDE_LOADER, hideLoaderSaga);
}
