import { call, put, takeLatest } from "redux-saga/effects";
import { request } from "../../utils/request";
import { showLoader, hideLoader } from "./../actions/loaderAction";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  SET_USER_INFO,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
  FORGOT_PASSWORD_REQUEST,
} from "../actionTypes";

function* registerSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(
      request,
      "post",
      "/auth/register",
      action.payload
    );
    yield localStorage.setItem("token", response.data.data.token || "");
    const { id, name, phone_number, email, status } = response?.data?.data;
    yield localStorage.setItem(
      "userinfo",
      JSON.stringify({ id, name, phone_number, email, status })
    );
    yield put({ type: SET_USER_INFO, payload: response?.data?.data });
    yield put({ type: LOGIN_SUCCESS, payload: response?.data.message });
    yield put(hideLoader());
  } catch (error: any) {
    console.log("REGISTER ERROR = ", error);
    yield put(hideLoader());
    const errMsg =
      error?.response?.data?.message ||
      "Please try again.";
    // yield put({ type: LOGIN_FAILURE, payload: errMsg });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
  }
}

function* loginSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "post", "/auth/login", action.payload);
    console.log("LOGIN RESPONSE = ", response);
    yield localStorage.setItem("token", response?.data?.data?.token || "");
    const { id, name, phone_number, email, status } = response?.data?.data;
    yield localStorage.setItem(
      "userinfo",
      JSON.stringify({ id, name, phone_number, email, status })
    );
    yield put({ type: SET_USER_INFO, payload: response?.data?.data });
    yield put({ type: LOGIN_SUCCESS, payload: response?.data?.message });
    yield put(hideLoader());
  } catch (error: any) {
    console.log("LOGIN ERROR = ", error);
    const errMsg =
      error?.response?.data?.message ||
      "Please try again.";
    // yield put({ type: LOGIN_FAILURE, payload: errMsg });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
    yield put(hideLoader());
  }
}

function* forgotPassSaga(action: any): any {
  try {
    yield put(showLoader());
    const isPrivateRoute = 0;
    yield call(
      request,
      "post",
      "/auth/forgotpassword",
      action.payload,
      isPrivateRoute
    );
    yield put(hideLoader());
    // yield put({ type: FORGOT_PASS_SUCCESS });
    yield put({
      type: SHOW_SUCCESS_MESSAGE,
      payload: "Password reset successfully. Please sign in with your new password.",
    });
  } catch (error: any) {
    const errMsg =
      error?.response?.data?.message ||
      "Please try again.";
    yield put(hideLoader());
    // yield put({ type: FORGOT_PASS_FAILURE, payload: errMsg });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
  }
}

export function* watchLogin() {
  yield takeLatest(REGISTER_REQUEST, registerSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassSaga);
}
