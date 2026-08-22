import { combineReducers } from "redux";
import { loaderReducer } from "./loaderReducer";
import { loginReducer, forgotPassReducer } from "./loginReducer";
import { userReducer } from "./userReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";
import { statusMessageReducer } from "./statusMessageReducer";

const appReducer = combineReducers({
  statusMessage: statusMessageReducer,
  login: loginReducer,
  user: userReducer,
  loader: loaderReducer,
  forgotPass: forgotPassReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE") {
    return {
      ...appReducer(undefined, action),
      user: userReducer(undefined, action),
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
