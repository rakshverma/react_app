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
} from "../actionTypes";

function* getAllcategorySaga(): any {
  try {
    yield put(showLoader());
    const response = yield call(request, "get", "/product/getCategoryList");
    yield put({ type: SET_CATEGORY_INFO, payload: response?.data?.data });
    yield put({ type: CATEGORY_SUCCESS, payload: true });
    yield put(hideLoader());
  } catch (error: any) {
    console.log("get category ERROR = ", error);
    yield put({ type: SET_CATEGORY_INFO, payload: [] });
    yield put(hideLoader());
  }
}

function* getAllProductSaga(action: any): any {
  try {
    yield put(showLoader());
    const pinCode = encodeURIComponent(`${action.payload || ""}`.trim());
    const response = yield call(
      request,
      "get",
      `/product/getProductList/${pinCode}`
    );
    yield put({ type: SET_PRODUCT_INFO, payload: response?.data?.data });
    yield put({ type: PRODUCT_SUCCESS, payload: true });
    yield put(hideLoader());
  } catch (error: any) {
    console.log("get product ERROR = ", error);
    yield put({ type: SET_PRODUCT_INFO, payload: [] });
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
    console.log("get product ERROR = ", error);
    yield put({ type: SET_PRODUCT_REVIEW, payload: [] });
    yield put(hideLoader());
  }
}

export function* watchProduct() {
  yield takeLatest(GET_ALL_CATEGORY, getAllcategorySaga);
  yield takeLatest(GET_ALL_PRODUCTS, getAllProductSaga);
  yield takeLatest(GET_PRODUCT_REVIEW, getProductReviewOnIdSaga);
}
