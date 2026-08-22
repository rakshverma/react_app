import {
  GET_ALL_CATEGORY,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_REVIEW,
  CART_ITEM,
} from "../actionTypes";
export const getAllCategoryAction = () => {
  return { type: GET_ALL_CATEGORY, payload: {} };
};
export const getAllProductsAction = (pinCode: any) => {
  return { type: GET_ALL_PRODUCTS, payload: pinCode };
};
export const getReviewsOnProductAction = (productId: any) => {
  return { type: GET_PRODUCT_REVIEW, payload: productId };
};
