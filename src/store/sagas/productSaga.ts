import { call, put, takeLatest } from "redux-saga/effects";
import { request } from "../../utils/request";
import { showLoader, hideLoader } from "./../actions/loaderAction";
import {
  GET_ALL_CATEGORY,
  GET_ALL_PRODUCTS,
  SET_CATEGORY_INFO,
  CATEGORY_SUCCESS,
  SET_PRODUCT_INFO,
  PRODUCT_SUCCESS,
  GET_PRODUCT_REVIEW,
  SET_PRODUCT_REVIEW,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";

function* getAllcategorySaga(): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "get", "/product/getCategoryList");
    yield put({ type: SET_CATEGORY_INFO, payload: response?.data?.data });
    yield put({ type: CATEGORY_SUCCESS, payload: true });
    yield put(hideLoader());
  } catch (error: any) {
    yield put({ type: SET_CATEGORY_INFO, payload: [] });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: error?.response?.data?.message || "Unable to load categories. Please try again.",
    });
    yield put(hideLoader());
  }
}

function* getAllProductSaga(action: any): any {
  try {
    yield put(showLoader());
    const pinCode = encodeURIComponent(`${action.payload || ""}`.trim());
    if (!pinCode) {
      yield put({ type: SET_PRODUCT_INFO, payload: [] });
      yield put(hideLoader());
      return;
    }
    const response = yield call(
      request,
      "get",
      `/product/getProductList/${pinCode}`
    );
    yield put({ type: SET_PRODUCT_INFO, payload: response?.data?.data });
    yield put({ type: PRODUCT_SUCCESS, payload: true });
    yield put(hideLoader());
  } catch (error: any) {
    yield put({ type: SET_PRODUCT_INFO, payload: [] });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: error?.response?.data?.message || "Unable to load products for this pincode. Please try again.",
    });
    yield put(hideLoader());
  }
}

function* getProductReviewOnIdSaga(action: any): any {
  try {
    let url = "/product/getProductReview";
    if (action.payload)
      url = `/product/getProductReview?productId=${action.payload}`;
    yield put(showLoader());
    const response = yield call(request, "get", url);
    yield put({ type: SET_PRODUCT_REVIEW, payload: response?.data?.data });
    yield put(hideLoader());
    yield put({ type: PRODUCT_SUCCESS, payload: true });
  } catch (error: any) {
    yield put({ type: SET_PRODUCT_REVIEW, payload: [] });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: error?.response?.data?.message || "Unable to load product reviews. Please try again.",
    });
    yield put(hideLoader());
  }
}

export function* watchProduct() {
  yield takeLatest(GET_ALL_CATEGORY, getAllcategorySaga);
  yield takeLatest(GET_ALL_PRODUCTS, getAllProductSaga);
  yield takeLatest(GET_PRODUCT_REVIEW, getProductReviewOnIdSaga);
}
