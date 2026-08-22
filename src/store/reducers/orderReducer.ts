import {
  SET_ORDER_ERROR,
  SET_ORDER_DETAILS,
  SET_ORDER_PROGRESS,
  SET_RESET_ORDER_STATUS,
  SET_USER_ORDER_LIST,
  SET_REVIEW,
  SET_ORDER_DATA,
} from "./../actionTypes";

const initialState = {
  isSuccess: false,
  isError: false,
  orderDetails: {},
  isPlacingOrder: false,
  orderProgressStep: "",
  orderList: [],
  reviewList: [],
  orderSuccessData: [],
};

export function orderReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_ORDER_ERROR:
      return {
        ...state,
        isError: action.payload,
        isPlacingOrder: false,
      };
    case SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload,
        isSuccess: true,
        isPlacingOrder: false,
        orderProgressStep: "Order Placed",
      };
    case SET_ORDER_PROGRESS:
      return {
        ...state,
        isPlacingOrder: action.payload.isPlacingOrder,
        orderProgressStep: action.payload.step,
      };
    case SET_RESET_ORDER_STATUS:
      return {
        ...state,
        isSuccess: false,
        isError: false,
        isPlacingOrder: false,
        orderProgressStep: "",
      };
    case SET_USER_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
      };
    case SET_ORDER_DATA:
      return {
        ...state,
        orderSuccessData: action.payload,
      };
    case SET_REVIEW:
      return {
        ...state,
        reviewList: action.payload,
      };
    default:
      return { ...state };
  }
}
