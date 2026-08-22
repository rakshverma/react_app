import {
  SET_CART_ERROR,
  RESET_CART_ERROR,
  SET_CART_DETAILS,
  UPDATE_PINCODE_ERROR,
  UPDATE_PINCODE_SUCCESS,
  RESET_CART_STATUS,
  CART_ITEM_SUCCESS,
  SET_EMPTY_CART,
  SET_SHIPPING_COST
} from "./../actionTypes";

const initialState = {
  isSuccess: false,
  isError: false,
  isPincodeError: false,
  isPincodeSuccess: false,
  cartDetails: [],
  shippingCost: 0
};

export function cartReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CART_ERROR:
      return {
        ...state,
        isError: action.payload,
      };
    case SET_CART_DETAILS:
      return {
        ...state,
        cartDetails: action.payload,
      };
    case CART_ITEM_SUCCESS:
      return {
        ...state,
        isSuccess: true,
      };
    case RESET_CART_ERROR:
      return {
        ...state,
        isError: false,
        isSuccess: false,
      };
    case UPDATE_PINCODE_ERROR:
      return {
        ...state,
        isPincodeError: action.payload,
      };
    case UPDATE_PINCODE_SUCCESS:
      return {
        ...state,
        isPincodeSuccess: action.payload,
      };
    case RESET_CART_STATUS:
      return {
        ...state,
        isSuccess: false,
        isError: false,
        isPincodeError: false,
        isPincodeSuccess: false,
      };
    case SET_EMPTY_CART:
      return {
        ...state,
        isSuccess: false,
        isError: false,
        isPincodeError: false,
        isPincodeSuccess: false,
        cartDetails: [],
      };
      case SET_SHIPPING_COST:
        return {
          ...state,
          shippingCost: action.payload
        };
    default:
      return { ...state };
  }
}
