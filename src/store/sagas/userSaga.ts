import { call, put, takeLatest, select } from "redux-saga/effects";
import { request } from "../../utils/request";
import { showLoader, hideLoader } from "./../actions/loaderAction";
import {
  GET_USER_INFO,
  SET_USER_INFO,
  INVALID_USER,
  USER_LOGOUT,
  RESET_STORE,
  USER_LOGOUT_ERROR,
  USER_INFO,
  DISTRICT_LIST,
  SET_DISTRICT_LIST,
  ADD_ADDRESS,
  SET_USER_ADDRESS,
  RESET_USER_STATUS,
  SET_RESET_USER_STATUS,
  SET_USER_ADDRESS_ERROR,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  UPDATE_USER_ACCOUNT,
} from "../actionTypes";

function* userSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "get", "/user/getUserInfo");
    yield put({ type: SET_USER_INFO, payload: response?.data?.data });
    yield put(hideLoader());
  } catch (error: any) {
    console.log("valid token ERROR = ", error);
    const errMsg =
      error?.response?.data?.message ||
      "Something went wrong. Please try again.";
    yield put(hideLoader());
    // yield put({ type: INVALID_USER, payload: errMsg });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
  }
}

function* logoutSaga(action: any): any {
  try {
    yield put(showLoader());
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("userinfo");
    yield localStorage.removeItem("carthash");
    yield put({ type: RESET_STORE });
  } catch (e: any) {
    console.log("logout error = ", e);
    yield put(hideLoader());
    // yield put({ type: USER_LOGOUT_ERROR });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: "Unable to logout. Please try again.",
    });
  }
}

function* setUserInfoSaga(action: any) {
  yield put({ type: SET_USER_INFO, payload: action.payload });
}

function* getDistrictListSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "get", "/user/getDistrictList");
    yield put({ type: SET_DISTRICT_LIST, payload: response?.data?.data });
    yield put(hideLoader());
  } catch (error: any) {
    console.log("valid token ERROR = ", error);
    const errMsg =
      error?.response?.data?.message ||
      "Something went wrong. Please try again.";
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
    yield put(hideLoader());
  }
}

function* addUserAddressSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(
      request,
      "post",
      "/user/addUserAddress",
      action.payload
    );
    const user: any = localStorage.getItem("userinfo");
    if (user) {
      let info = JSON.parse(user);
      info = JSON.stringify({ ...info, ...response.data.data });
      localStorage.setItem("userinfo", info);
    }
    yield put({ type: SET_USER_ADDRESS, payload: response?.data?.data });
    yield put(hideLoader());
    return true;
  } catch (error: any) {
    console.log("valid token ERROR = ", error);
    const errMsg =
      error?.response?.data?.message ||
      "Something went wrong. Please try again.";
    yield put({ type: SET_USER_ADDRESS_ERROR, payload: errMsg });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
    yield put(hideLoader());
  }
}

function* resetUSerStatusSaga() {
  yield put({ type: SET_RESET_USER_STATUS });
}

function* updateUserAccountSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(
      request,
      "post",
      "/user/updateUserAccount",
      action.payload
    );
    const user: any = localStorage.getItem("userinfo");
    if (user) {
      let info = JSON.parse(user);
      info = JSON.stringify({
        ...info,
        name: `${action.payload.formData.firstName.trim()} ${action.payload.formData.lastName.trim()}`,
      });
      localStorage.setItem("userinfo", info);
    }
    let { userInfo } = yield select((state) => state.user);
    userInfo = {
      ...userInfo,
      name: `${action.payload.formData.firstName.trim()} ${action.payload.formData.lastName.trim()}`,
    };
    yield put({ type: SET_USER_INFO, payload: userInfo });
    yield put({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "Account information updated successfully",
    });
    yield put(hideLoader());
    return true;
  } catch (error: any) {
    console.log("valid token ERROR = ", error);
    const errMsg =
      error?.response?.data?.message ||
      "Something went wrong. Please try again.";
    yield put({ type: SET_USER_ADDRESS_ERROR, payload: errMsg });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
    yield put(hideLoader());
  }
}

export function* watchUser() {
  yield takeLatest(GET_USER_INFO, userSaga);
  yield takeLatest(USER_LOGOUT, logoutSaga);
  yield takeLatest(USER_INFO, setUserInfoSaga);
  yield takeLatest(DISTRICT_LIST, getDistrictListSaga);
  yield takeLatest(ADD_ADDRESS, addUserAddressSaga);
  yield takeLatest(RESET_USER_STATUS, resetUSerStatusSaga);
  yield takeLatest(UPDATE_USER_ACCOUNT, updateUserAccountSaga);
}
