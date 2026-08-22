import {
  CART_ITEM,
  GET_CART_ITEM,
  GET_CART_DETAILS,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM,
  UPDATE_DISTRICT,
  REMOVE_EXISTING_CART,
  RESET_PINCODES_STATUS,
  RESET_CART_STATUS,
  EMPTY_CART,
  GET_SHIPPING_COST
} from "../actionTypes";

export const setCartItemAction = (cartItem: any) => {
  return { type: CART_ITEM, payload: cartItem };
};
export const getCartItemAction = (cartHash: any, userId: any) => {
  return { type: GET_CART_ITEM, payload: { cartHash, userId } };
};
export const getCartDetailsAction = () => {
  return { type: GET_CART_DETAILS, payload: null };
};
export const removeCartItemAction = (item: any) => {
  return { type: REMOVE_CART_ITEM, payload: item };
};
export const updateQuantityCountAction = (count: number, item: any) => {
  return { type: UPDATE_CART_ITEM, payload: { count, item } };
};
export const getDistrictOnPinCodeAction = (pincode: any) => {
  return { type: UPDATE_DISTRICT, payload: pincode };
};
export const removeExistingCartDetails = (userPinCode: any) => {
  return { type: REMOVE_EXISTING_CART, payload: userPinCode };
};
export const resetPinCodeStatusAction = () => {
  return { type: RESET_PINCODES_STATUS, payload: null };
};
export const resetCartStatus = () => {
  return { type: RESET_PINCODES_STATUS, payload: null };
};

export const setEmptyCartAction = () => {
  return { type: EMPTY_CART };
};

export const getShippingCostAction = (pin: any) => {
  return { type: GET_SHIPPING_COST, payload: pin };
}
