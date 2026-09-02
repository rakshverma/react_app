import { all } from "redux-saga/effects";
import { watchLogin } from "./loginSaga";
import { watchUser } from "./userSaga";
import { watchProduct } from "./productSaga";
import { watchCart } from "./cartSaga";
import { watchOrder } from "./orderSaga";

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchUser(),
    watchProduct(),
    watchCart(),
    watchOrder(),
  ]);
}
