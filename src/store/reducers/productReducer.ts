import {
  SET_CATEGORY_INFO,
  SET_PRODUCT_INFO,
  SET_PRODUCT_REVIEW,
} from "./../actionTypes";

const initialState = {
  isSuccess: false,
  isError: false,
  categoryList: [],
  productList: [],
  reviewList: [],
  productReview: [],
};

export function productReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CATEGORY_INFO:
      return {
        ...state,
        categoryList: action.payload,
        isSuccess: true,
        isError: false,
      };
    case SET_PRODUCT_INFO:
      return {
        ...state,
        productList: action.payload,
        isSuccess: true,
        isError: false,
      };
    case SET_PRODUCT_REVIEW:
      return {
        ...state,
        productReview: action.payload,
        isSuccess: true,
        isError: false,
      };
    default:
      return { ...state };
  }
}
