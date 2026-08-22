import React from "react";

function CartListHeaders() {
  return (
    <div className="row cart-header mt-5">
      <div className="col-lg-6">Product</div>
      <div className="col-lg-3">Quantity</div>
      <div className="col-lg-1">Price</div>
      <div className="col-lg-1">Total</div>
      <div className="col-lg-1"></div>
    </div>
  );
}

export default CartListHeaders;
