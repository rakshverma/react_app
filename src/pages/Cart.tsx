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
import { getAllProductsAction } from "../store/actions/productAction";

const parsePriceRows = (value: any) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const normalizeUnit = (unit: any) => `${unit || ""}`.trim().toLowerCase();

const isCartItemAvailable = (cartItem: any, productList: any[]) => {
  const product = productList.find((item: any) => `${item.id}` === `${cartItem.productId}`);
  if (!product || Number(product.is_available) !== 1 || `${product.franchise_id}` !== `${cartItem.franchiseId}`) return false;
  return parsePriceRows(product.quantity_wise_price).some((priceRow: any) => {
    return (
      Number(priceRow.quantity) === Number(cartItem.quantity) &&
      normalizeUnit(priceRow.unit) === normalizeUnit(cartItem.unit) &&
      Number(priceRow.price) === Number(cartItem.price)
    );
  });
};

function Cart() {
  const dispatch = useDispatch();
  const { cartDetails, shippingCost } = useSelector((state: any) => state.cart);
  const { productList } = useSelector((state: any) => state.product);

  useEffect(() => {
    dispatch(getCartDetailsAction());
    const pincode = localStorage.getItem("pincode");
    dispatch(getAllProductsAction(pincode));
  }, [dispatch]);

  const unavailableItems = cartDetails.filter((item: any) => !isCartItemAvailable(item, productList));

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
            unavailableItems={unavailableItems}
            removeCartItem={removeCartItem}
            updateQuantityCount={updateQuantityCount}
          />
          <TotalSection cartDetails={cartDetails} shippingCost={shippingCost} hasUnavailableItems={unavailableItems.length > 0} />
        </div>
      </section>
    </>
  );
}

export default Cart;
