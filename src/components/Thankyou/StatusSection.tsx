import React from "react";
import { Link } from "react-router-dom";

function StatusSection({ refId, userInfo }: any) {
  return (
    <div className="col-md-12">
      <div className="checkout-form-wrap mb-4 text-center">
        <h3 className="text-success">
          <i className="las la-check-circle la-lg"></i> Your order has been
          received.
        </h3>
        <p className="mb-0">
          Check your order status in{" "}
          {userInfo?.id ? (
            <Link to={`/myaccount/details?ref=${refId}`}>Track My Order</Link>
          ) : (
            <Link to={`/signin`}>Track My Order</Link>
          )}{" "}
          about next steps information.
        </p>
      </div>
    </div>
  );
}

export default StatusSection;
