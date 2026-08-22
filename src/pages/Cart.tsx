import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadingSection from "../components/Shared/HeadingSection";
import ProductListSection from "../components/Cart/ProductListSection";
import TotalSection from "../components/Cart/TotalSection";
import {
  getCartDetailsAction,
  removeCartItemAction,
  updateQuantityCountAction,
} from "../store/actions/cartAction";

function Cart() {
  const dispatch = useDispatch();
  const { cartDetails, shippingCost } = useSelector((state: any) => state.cart);
  const { productList } = useSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(getCartDetailsAction());
  }, [dispatch]);

  const removeCartItem = (item: any) => {
    dispatch(removeCartItemAction(item));
  };

  const updateQuantityCount = (count: number, item: any) => {
    dispatch(updateQuantityCountAction(count, item));
  };

  return (
    <>
      <HeadingSection heading={"Your Cart"} />
      <section className="cart-section bg-grey padding">
        <div className="container">
          <ProductListSection
            cartDetails={cartDetails}
            productList={productList}
            removeCartItem={removeCartItem}
            updateQuantityCount={updateQuantityCount}
          />
          <TotalSection cartDetails={cartDetails} shippingCost={shippingCost} />
        </div>
      </section>
    </>
  );
}

export default Cart;
