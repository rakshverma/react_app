import { call, put, takeLatest, select, take } from "redux-saga/effects";
import { request } from "../../utils/request";
import { showLoader, hideLoader } from "./../actions/loaderAction";
import {
  PLACE_ORDER,
  SET_ORDER_ERROR,
  SET_ORDER_DETAILS,
  SET_RESET_ORDER_STATUS,
  RESET_ORDER_STATUS,
  SET_USER_INFO,
  ORDER_LIST,
  SET_USER_ORDER_LIST,
  ADD_REVIEW,
  SET_REVIEW,
  SET_REVIEW_ERROR,
  GET_REVIEW,
  DELETE_REVIEW,
  ORDER_DATA,
  SET_ORDER_DATA,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";
import { setUserInfoAction } from "./../actions/userAction";
import { setEmptyCartAction } from "../actions/cartAction";

function* setOrderDetailsSaga(action: any): any {
  try {
    yield put(showLoader());
    const cartId = localStorage.getItem("carthash");
    if (!cartId)
      yield put({
        type: SET_ORDER_ERROR,
        payload: "Unable to place order. Check your cart.",
      });
    const response = yield call(request, "post", "/order", {
      formData: action.payload.formData,
      cartId,
      deliveryDates: action.payload.orderDeliveryDates,
      userId: action.payload.userId,
      isPincodeChanged: action.payload.isPincodeChanged,
      shipping_cost: action.payload.shipping_cost,
    });
    yield localStorage.removeItem("carthash");
    let userInfo: any = localStorage.getItem("userinfo");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      userInfo = { ...userInfo, ...response.data.data.user };
      if (response?.data?.data?.user?.token) {
        localStorage.setItem("token", response.data.data.user.token);
      }
      localStorage.setItem("userinfo", JSON.stringify(userInfo));
    } else {
      userInfo = { ...response.data.data.user };
      if (response?.data?.data?.user?.token) {
        localStorage.setItem("token", response.data.data.user.token);
        localStorage.setItem("userinfo", JSON.stringify(userInfo));
      }
    }

    yield put(setEmptyCartAction());
    yield put(setUserInfoAction(userInfo || {}));
    yield put({
      type: SET_ORDER_DETAILS,
      payload: { refId: response?.data?.data?.refId || "" },
    });
    yield put(hideLoader());
  } catch (e: any) {
    console.log("error = ", e);
    yield put(hideLoader());
    const errMsg =
      e?.response?.data?.data && e?.response?.data?.message
        ? `${e.response.data.message}. ${e.response.data.data.toString(",")}`
        : e?.response?.data?.message
        ? `${e.response.data.message}`
        : "Unable to place order. Please reload your page.";
    if (e?.response?.data?.data && e?.response?.data?.message) {
      yield put({
        type: SET_ORDER_ERROR,
        payload: `${e.response.data.message}. ${e.response.data.data.toString(
          ","
        )}`,
      });
    } else if (e?.response?.data?.message) {
      yield put({
        type: SET_ORDER_ERROR,
        payload: `${e.response.data.message}`,
      });
    } else {
      yield put({
        type: SET_ORDER_ERROR,
        payload: "Unable to place order. Please reload your page.",
      });
    }

    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
  }
}

function* resetOrderStatusSaga() {
  yield put({
    type: SET_RESET_ORDER_STATUS,
  });
}

function* getOrderListSaga(action: any): any {
  try {
    yield put(showLoader());
    let url = `/order/list`;
    if (action.payload) {
      url = `/order/list?refId=${action.payload}`;
    }
    const response = yield call(request, "get", url);
    yield put({
      type: SET_USER_ORDER_LIST,
      payload: response?.data?.data || [],
    });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    yield put({ type: SET_USER_ORDER_LIST, payload: [] });
  }
}

function* getOrderSuccessDataSaga(action: any): any {
  try {
    yield put(showLoader());
    let url = `/order/item?refId=${action.payload}`;
    const response = yield call(request, "get", url);
    yield put({
      type: SET_ORDER_DATA,
      payload: response?.data?.data || [],
    });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    yield put({ type: SET_ORDER_DATA, payload: [] });
  }
}

function* addReviewSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "post", "/order/review", {
      stars: action.payload.stars,
      review: action.payload.review,
      pid: action.payload.pid,
    });
    yield put({
      type: SET_REVIEW,
      payload: response?.data?.data || [],
    });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    yield put({ type: SET_REVIEW, payload: [] });
  }
}

function* getReviewSaga(): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "get", "/order/review");
    yield put({
      type: SET_REVIEW,
      payload: response?.data?.data || [],
    });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    // yield put({
    //   type: SET_REVIEW_ERROR,
    //   payload: "Unable to load reviews. Please reload your page.",
    // });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: "Unable to load reviews. Please reload your screen.",
    });
  }
}

function* deleteReviewSaga(action: any): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "delete", "/order/review", {
      id: action.payload,
    });
    yield put({
      type: SET_REVIEW,
      payload: response?.data?.data || [],
    });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    // yield put({
    //   type: SET_REVIEW_ERROR,
    //   payload: "Unable to delete review. Please reload your page.",
    // });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: "Unable to delete review. Please reload your screen.",
    });
  }
}

export function* watchOrder() {
  yield takeLatest(PLACE_ORDER, setOrderDetailsSaga);
  yield takeLatest(RESET_ORDER_STATUS, resetOrderStatusSaga);
  yield takeLatest(ORDER_LIST, getOrderListSaga);
  yield takeLatest(ADD_REVIEW, addReviewSaga);
  yield takeLatest(GET_REVIEW, getReviewSaga);
  yield takeLatest(DELETE_REVIEW, deleteReviewSaga);
  yield takeLatest(ORDER_DATA, getOrderSuccessDataSaga);
}
