import { all } from "redux-saga/effects";
import { watchLogin } from "./loginSaga";
import { watchUser } from "./userSaga";
import { watchProduct } from "./productSaga";
import { watchCart } from "./cartSaga";
import { watchOrder } from "./orderSaga";
import { watchLoader } from "./loaderSaga";

export default function* rootSaga() {
  yield all([
    // watchLoader(),
    watchLogin(),
    watchUser(),
    watchProduct(),
    watchCart(),
    watchOrder(),
  ]);
}
