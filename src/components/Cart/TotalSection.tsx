import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function TotalSection({ cartDetails, shippingCost, hasUnavailableItems }: any) {
  const isAuthenticated = useAuth();
  let subTotal = 0;
  if (cartDetails.length) {
    cartDetails.forEach((item: any) => {
      subTotal += Number(item.price) * Number(item.count);
    });
  }
  return (
    <div className="row">
      {cartDetails.length > 0 && (
        <div className="col-lg-6 offset-lg-6">
          <ul className="cart-total p-4 mt-30">
            <li>
              <span>Subtotal:</span>₹{subTotal.toFixed(2)}
            </li>
            <li>
              <span>Shipping:</span>₹{Number(shippingCost) > 0 ? Number(shippingCost).toFixed(2) : Number(shippingCost)}
            </li>
            <li>
              <span>Total:</span>₹{(subTotal + Number(shippingCost)).toFixed(2)}
            </li>
            <li>
              <Link to={"/products"} className="default-btn">
                Continue Shopping <span></span>
              </Link>
              {hasUnavailableItems ? (
                <span className="default-btn" style={{ opacity: 0.6, cursor: "not-allowed" }}>
                  Remove unavailable items
                  <span></span>
                </span>
              ) : (
                <Link to={isAuthenticated ? "/checkout" : "/checkout/create-account"} className="default-btn">
                  Proceed to checkout
                  <span></span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TotalSection;
