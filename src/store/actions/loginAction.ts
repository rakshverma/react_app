import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  FORGOT_PASSWORD_REQUEST,
} from "../actionTypes";

export const registerUserAction = (data: any) => {
  return { type: REGISTER_REQUEST, payload: data };
};
export const loginUserAction = (data: any) => {
  return { type: LOGIN_REQUEST, payload: data };
};
export const forgotPasswordAction = (email: string) => {
  return { type: FORGOT_PASSWORD_REQUEST, payload: email };
};
