import {
  PLACE_ORDER,
  ORDER_LIST,
  ADD_REVIEW,
  GET_REVIEW,
  DELETE_REVIEW,
  RESET_ORDER_STATUS,
  ORDER_DATA,
} from "../actionTypes";

export const placeUserOrderAction = (
  formData: any,
  cartDetails: any,
  orderDeliveryDates: any,
  userId: any,
  isPincodeChanged: boolean,
  shipping_cost: any
) => {
  return {
    type: PLACE_ORDER,
    payload: {
      formData,
      cartDetails,
      orderDeliveryDates,
      userId,
      isPincodeChanged,
      shipping_cost
    },
  };
};

export const getOrderDetailsOnRefId = (refId: any) => {
  return { type: ORDER_DATA, payload: refId };
};
export const getOrderListAction = () => {
  return { type: ORDER_LIST };
};
export const addReviewAction = (stars: number, review: string, pid: number) => {
  return { type: ADD_REVIEW, payload: { stars, review, pid } };
};
export const getReviewListAction = () => {
  return { type: GET_REVIEW };
};
export const deleteReviewAction = (id: number) => {
  return { type: DELETE_REVIEW, payload: id };
};
export const resetOrderStatusAction = () => {
  return { type: RESET_ORDER_STATUS };
};
