import {
  GET_USER_INFO,
  USER_LOGOUT,
  USER_INFO,
  DISTRICT_LIST,
  ADD_ADDRESS,
  RESET_USER_STATUS,
  UPDATE_USER_ACCOUNT,
} from "../actionTypes";

export const getUserInfoAction = () => {
  return { type: GET_USER_INFO };
};
export const userLogoutAction = () => {
  return { type: USER_LOGOUT };
};
export const setUserInfoAction = (user: any) => {
  return { type: USER_INFO, payload: user };
};
export const getDistrictListAction = () => {
  return { type: DISTRICT_LIST };
};

export const updateAddressAction = (data: any) => {
  return { type: ADD_ADDRESS, payload: data };
};

export const resetUserStatus = () => {
  return { type: RESET_USER_STATUS };
};

export const updateUserAccountAction = (formData: any, email: any) => {
  return { type: UPDATE_USER_ACCOUNT, payload: { formData, email } };
};
