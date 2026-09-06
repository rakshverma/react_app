import { call, put, takeLatest, select, take } from "redux-saga/effects";
import uuid from "react-uuid";
import { request } from "../../utils/request";
import {
  getAllCategoryAction,
  getAllProductsAction,
} from "../actions/productAction";
import { showLoader, hideLoader } from "./../actions/loaderAction";
import {
  CART_ITEM,
  SET_CART_ERROR,
  RESET_CART_ERROR,
  GET_CART_ITEM,
  GET_CART_DETAILS,
  SET_CART_DETAILS,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
  UPDATE_DISTRICT,
  SET_DISTRICT_ERROR,
  SET_DISTRICT,
  REMOVE_EXISTING_CART,
  UPDATE_PINCODE_ERROR,
  UPDATE_PINCODE_SUCCESS,
  RESET_PINCODES_STATUS,
  RESET_CART_STATUS,
  CART_ITEM_SUCCESS,
  SET_EMPTY_CART,
  EMPTY_CART,
  SET_SHIPPING_COST,
  GET_SHIPPING_COST,
  SHOW_SUCCESS_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from "../actionTypes";

const normalizeUnit = (unit: any) => {
  const normalized = `${unit || ""}`.trim().toLowerCase();
  if (["piece", "pieces", "piece(s)"].includes(normalized)) return "piece(s)";
  if (["plate", "plates", "plate(s)"].includes(normalized)) return "plate(s)";
  return normalized;
};

function* setCartItemSaga(action: any): any {
  yield put({ type: RESET_CART_ERROR, payload: false });
  try {
    yield put(showLoader());
    let errorMsg = "";
    let userInfo: any = null;
    let { cartDetails } = yield select((state) => state.cart);
    const cartId = localStorage.getItem("carthash") || uuid();
    const userInfoString = localStorage.getItem("userinfo");
    if (userInfoString) {
      userInfo = JSON.parse(userInfoString);
    }
    const existingIndex = cartDetails.findIndex(
      (item: any) =>
        item.productId === action.payload.productId &&
        item.quantity === parseInt(action.payload.details.quantity) &&
        normalizeUnit(item.unit) === normalizeUnit(action.payload.details.unit)
    );
    if (existingIndex !== -1) {
      if (
        parseInt(cartDetails[existingIndex].count) +
          parseInt(action.payload.count) >
        5
      ) {
        errorMsg = "Maximum limit of 5 exceeded for this item.";
        yield put({ type: SET_CART_ERROR, payload: errorMsg });
        yield put({ type: SHOW_ERROR_MESSAGE, payload: errorMsg });
        yield put(hideLoader());
        return;
      } else {
        cartDetails[existingIndex].count =
          parseInt(cartDetails[existingIndex].count) + parseInt(action.payload.count);
      }
      yield call(request, "put", "/cart", cartDetails[existingIndex]);
    } else {
      let cartItem = {
        cartId,
        productId: action.payload.productId,
        userId: userInfo?.id || null,
        franchiseId: action.payload.franchiseId,
        quantity: parseFloat(action.payload.details.quantity),
        unit: normalizeUnit(action.payload.details.unit),
        price: parseFloat(action.payload.details.price),
        count: action.payload.count,
      };
      cartDetails = [...cartDetails, cartItem];
      yield call(request, "post", "/cart", cartItem);
      localStorage.setItem("carthash", cartId);
    }
    yield put({
      type: SET_CART_DETAILS,
      payload: cartDetails,
    });
    yield put({ type: CART_ITEM_SUCCESS });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Item added to cart" });
    yield put(hideLoader());
  } catch (e: any) {
    yield put(hideLoader());
    // yield put({ type: SET_CART_ERROR, payload: "Unable to update cart." });
    yield put({ type: SHOW_ERROR_MESSAGE, payload: "Unable to update cart." });
  }
}

function* getCartItemSaga(action: any): any {
  yield put({ type: RESET_CART_ERROR, payload: false });
  yield put(showLoader());
  try {
    const cartHash = action.payload.cartHash || "";
    const userId = action.payload.userId || "";
    if (!cartHash && !userId) {
      yield put(hideLoader());
      return;
    }
    const response = yield call(
      request,
      "get",
      `/cart/${encodeURIComponent(cartHash || "null")}/${encodeURIComponent(userId || "null")}`
    );
    yield put({
      type: SET_CART_DETAILS,
      payload: response?.data?.data,
    });
    yield put(hideLoader());
  } catch (e: any) {
    yield put(hideLoader());
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: "Unable to get cart information. Please try again.",
    });
    // yield put({
    //   type: SET_CART_ERROR,
    //   payload: "Unable to get cart information. Please try again.",
    // });
  }
}

function* getCartDetailsSaga(): any {
  yield put(showLoader());
  yield put({ type: RESET_CART_ERROR, payload: false });
  try {
    const cartId = localStorage.getItem("carthash") || null;
    if (!cartId) {
      yield put(hideLoader());
      return;
    }
    const response = yield call(request, "get", `/cart/details/${cartId}`);
    yield put({
      type: SET_CART_DETAILS,
      payload: response?.data?.data,
    });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    // yield put({
    //   type: SET_CART_ERROR,
    //   payload: "Unable to get cart information. Please try again.",
    // });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: "Unable to get cart information. Please try again.",
    });
  }
}

function* removeCartItemSaga(action: any): any {
  yield put(showLoader());
  yield put({ type: RESET_CART_ERROR, payload: false });
  try {
    let { cartDetails } = yield select((state) => state.cart);
    const cartId = localStorage.getItem("carthash") || null;
    if (!cartId) {
      yield put(hideLoader());
      yield put({ type: SHOW_ERROR_MESSAGE, payload: "Unable to remove cart item. Please reload your cart." });
      return;
    }
    yield call(request, "delete", `/cart/${cartId}`, action.payload);
    cartDetails = cartDetails.filter((item: any) => {
      if (
        item.productId === action.payload.productId &&
        item.quantity === parseFloat(action.payload.quantity) &&
        normalizeUnit(item.unit) === normalizeUnit(action.payload.unit)
      )
        return false;
      else return true;
    });
    yield put({
      type: SET_CART_DETAILS,
      payload: cartDetails,
    });
    yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Item removed from cart" });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    // yield put({
    //   type: SET_CART_ERROR,
    //   payload: "Unable to remove cart item. Please try again.",
    // });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: "Unable to remove cart item. Please try again.",
    });
  }
}

function* updateCartItemSaga(action: any): any {
  yield put(showLoader());
  yield put({ type: RESET_CART_ERROR, payload: false });
  try {
    let { cartDetails } = yield select((state) => state.cart);
    const cartId = localStorage.getItem("carthash") || null;
    if (!cartId) {
      yield put(hideLoader());
      yield put({ type: SHOW_ERROR_MESSAGE, payload: "Unable to update cart item. Please reload your cart." });
      return;
    }
    const existingIndex = cartDetails.findIndex(
      (item: any) =>
        item.productId === action.payload.item.productId &&
        item.quantity === parseFloat(action.payload.item.quantity) &&
        normalizeUnit(item.unit) === normalizeUnit(action.payload.item.unit)
    );
    if (existingIndex !== -1) {
      cartDetails[existingIndex].count = action.payload.count;
      yield call(request, "put", "/cart", cartDetails[existingIndex]);
      cartDetails.forEach((item: any) => {
        if (
          item.productId === action.payload.item.productId &&
          item.quantity === parseFloat(action.payload.item.quantity) &&
          normalizeUnit(item.unit) === normalizeUnit(action.payload.item.unit)
        ) {
          item.count = parseInt(action.payload.count);
        }
      });

      yield put({
        type: SET_CART_DETAILS,
        payload: cartDetails,
      });
      yield put({ type: SHOW_SUCCESS_MESSAGE, payload: "Cart updated successfully" });
    } else {
      // yield put({
      //   type: SET_CART_ERROR,
      //   payload: "Unable to update cart item. Please try again.",
      // });
      yield put({
        type: SHOW_ERROR_MESSAGE,
        payload: "Unable to update cart item. Please try again.",
      });
    }
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    // yield put({
    //   type: SET_CART_ERROR,
    //   payload: "Unable to update cart item. Please try again.",
    // });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: "Unable to update cart item. Please try again.",
    });
  }
}

function* updateDistrictSaga(action: any): any {
  yield put(showLoader());
  try {
    const pinCode = encodeURIComponent(`${action.payload || ""}`.trim());
    const response = yield call(
      request,
      "get",
      `/user/district/${pinCode}`
    );
    yield put({
      type: SET_DISTRICT,
      payload: response?.data?.data,
    });
    yield put(hideLoader());
  } catch (e) {
    yield put(hideLoader());
    const errMsg =
      (e as any)?.response?.data?.message ||
      "Unable to update district. Please reload your screen.";
    yield put({ type: SET_DISTRICT_ERROR, payload: errMsg });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
  }
}

function* removeExistingCartSaga(action: any): any {
  try {
    yield put(showLoader());
    const pincode = localStorage.getItem("pincode");
    const carthash = localStorage.getItem("carthash");
    if (pincode) {
      const newPinCode = action.payload;
      const shippingCost = yield call(
        request,
        "get",
        `/product/getShippingCostOnPin/${encodeURIComponent(`${newPinCode}`.trim())}`
      );
      if (carthash) {
        yield call(request, "delete", `/cart/removeCart/${encodeURIComponent(carthash)}`);
      }
      yield put(getAllCategoryAction());
      yield put(getAllProductsAction(newPinCode));
      yield localStorage.setItem("pincode", newPinCode);
      yield put({
        type: SET_CART_DETAILS,
        payload: [],
      });
      yield put({
        type: SET_SHIPPING_COST,
        payload: shippingCost?.data?.data || 0,
      });
      yield put({ type: UPDATE_PINCODE_SUCCESS, payload: true });
      yield put({
        type: SHOW_SUCCESS_MESSAGE,
        payload: "Pincode updated successfully",
      });
    } else {
      const shippingCost = yield call(
        request,
        "get",
        `/product/getShippingCostOnPin/${encodeURIComponent(`${action.payload}`.trim())}`
      );
      yield put({
        type: SET_SHIPPING_COST,
        payload: shippingCost?.data?.data || 0,
      });
      yield localStorage.setItem("pincode", action.payload);
      yield put({ type: UPDATE_PINCODE_SUCCESS, payload: true });
      yield put({
        type: SHOW_SUCCESS_MESSAGE,
        payload: "Pincode updated successfully",
      });
    }
    yield put(hideLoader());
  } catch (e: any) {
    yield put(hideLoader());
    const errMsg =
      e?.response?.data?.message ||
      "Unable to update pin code. Please reload your screen.";
    yield put({
      type: UPDATE_PINCODE_ERROR,
      payload: errMsg,
    });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
  }
}

function* getShippingCostSaga(action: any): any {
  try {
    yield put(showLoader());
    if (action.payload) {
      const pinCode = encodeURIComponent(`${action.payload}`.trim());
      const shippingCost = yield call(
        request,
        "get",
        `/product/getShippingCostOnPin/${pinCode}`
      );
      yield put({
        type: SET_SHIPPING_COST,
        payload: shippingCost?.data?.data || 0,
      });
    }
    yield put(hideLoader());
  } catch (e: any) {
    yield put(hideLoader());
    const errMsg =
      e?.response?.data?.message ||
      "Unable to update pin code. Please reload your screen.";
    yield put({
      type: UPDATE_PINCODE_ERROR,
      payload: errMsg,
    });
    yield put({
      type: SHOW_ERROR_MESSAGE,
      payload: errMsg,
    });
  }
}

function* resetStatusSaga() {
  yield put({
    type: RESET_CART_STATUS,
  });
}

function* setEmptyCartSaga() {
  yield put({
    type: SET_EMPTY_CART,
  });
}

export function* watchCart() {
  yield takeLatest(CART_ITEM, setCartItemSaga);
  yield takeLatest(GET_CART_ITEM, getCartItemSaga);
  yield takeLatest(GET_CART_DETAILS, getCartDetailsSaga);
  yield takeLatest(REMOVE_CART_ITEM, removeCartItemSaga);
  yield takeLatest(UPDATE_CART_ITEM, updateCartItemSaga);
  yield takeLatest(UPDATE_DISTRICT, updateDistrictSaga);
  yield takeLatest(REMOVE_EXISTING_CART, removeExistingCartSaga);
  yield takeLatest(RESET_PINCODES_STATUS, resetStatusSaga);
  yield takeLatest(EMPTY_CART, setEmptyCartSaga);
  yield takeLatest(GET_SHIPPING_COST, getShippingCostSaga);
}
