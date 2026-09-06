import {
  SET_USER_INFO,
  INVALID_USER,
  USER_LOGOUT_ERROR,
  SET_DISTRICT,
  SET_DISTRICT_LIST,
  SET_USER_ADDRESS,
  SET_USER_ADDRESS_LIST,
  SET_RESET_USER_STATUS,
  SET_USER_ADDRESS_ERROR,
} from "../actionTypes";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userinfo");
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

const initialState = {
  userInfo: loadState() || {},
  district: "",
  isError: false,
  isSuccess: false,
  logoutError: false,
  districtList: [],
  addressList: [],
};
export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload || {} };
    case INVALID_USER:
      return { ...state, isError: true };
    case USER_LOGOUT_ERROR:
      return { ...state, logoutError: true };
    case SET_DISTRICT:
      return { ...state, district: action.payload };
    case SET_DISTRICT_LIST:
      return { ...state, districtList: action.payload };
    case SET_USER_ADDRESS:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...(action.payload?.savedAddress || action.payload) },
        addressList: action.payload?.addressList || state.addressList,
        isSuccess: true,
      };
    case SET_USER_ADDRESS_LIST:
      return { ...state, addressList: action.payload || [] };
    case SET_USER_ADDRESS_ERROR:
      return { ...state, isError: action.payload };
    case SET_RESET_USER_STATUS:
      return { ...state, isError: false, isSuccess: false };
    default:
      return { ...state };
  }
}
