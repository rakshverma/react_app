import React from "react";
import { Link } from "react-router-dom";

function TotalSection({ cartDetails, shippingCost }: any) {
  console.log("shippingCost = ", shippingCost);
  let subTotal = 0;
  if (cartDetails.length) {
    cartDetails.forEach((item: any) => {
      subTotal += item.price * item.count;
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
              <span>Shipping:</span>₹{shippingCost > 0 ? shippingCost.toFixed(2) : shippingCost}
            </li>
            <li>
              <span>Total:</span>₹{(subTotal + shippingCost).toFixed(2)}
            </li>
            <li>
              <Link to={"/products"} className="default-btn">
                Continue Shopping <span></span>
              </Link>
              <Link to={"/checkout"} className="default-btn">
                Proceed to checkout
                <span></span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TotalSection;
