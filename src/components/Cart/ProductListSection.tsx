import React from "react";
import CartListHeaders from "./CartListHeaders";
import { uploadUrl } from "../../utils/axios";

const getProductImage = (data: string) => {
  try {
    const images = JSON.parse(data);
    if (images.length) {
      return (
        <img
          src={`${uploadUrl}${images[0]}`}
          alt="food"
          crossOrigin="anonymous"
        />
      );
    } else return null;
  } catch (e) {
    return null;
  }
};

function ProductListSection({
  cartDetails,
  productList,
  removeCartItem,
  updateQuantityCount,
}: any) {
  const getOptions = () => {
    const options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  return (
    <>
      <CartListHeaders />
      {cartDetails.length > 0 &&
        cartDetails.map((item: any, index: number) => {
          return (
            <div key={`cart_item_${index}`} className="row cart-body pb-30">
              <div className="col-lg-6">
                <div className="cart-item">
                  {getProductImage(item.images)}
                  <div className="cart-content">
                    <h3>
                      <a href="shop-details.html">{item.name}</a>
                    </h3>
                    <p>Weight : {`${item.quantity}${item.unit}`}</p>
                  </div>
                </div>
              </div>
              <div className="col-4 col-lg-3">
                <div className="cart-item">
                  <select
                    name="quantityCount"
                    value={item.count}
                    onChange={(e: any) => {
                      updateQuantityCount(e.target.value, item);
                    }}
                  >
                    {getOptions()}
                    {/* <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option> */}
                  </select>
                </div>
              </div>
              <div className="col-3 col-lg-1">
                <div className="cart-item">
                  <p>₹{item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="col-3 col-lg-1">
                <div className="cart-item">
                  <p>₹{(item.price * item.count).toFixed(2)}</p>
                </div>
              </div>
              <div className="col-2 col-lg-1">
                <div className="cart-item">
                  <button
                    className="remove"
                    onClick={() => removeCartItem(item)}
                  >
                    <i className="las la-times"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {cartDetails.length === 0 && (
        <div style={{ textAlign: "center" }}>Your cart is empty</div>
      )}
    </>
  );
}

export default ProductListSection;
