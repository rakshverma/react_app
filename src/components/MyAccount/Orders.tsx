/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { uploadUrl } from "../../utils/axios";

const getReceiptUrl = (receiptUrl: string) => {
  if (!receiptUrl) return "";
  return `${uploadUrl}${receiptUrl.replace(/^\/?uploads\/?/, "")}`;
};

function Orders() {
  const { orderList } = useSelector((state: any) => state.order);

  const orders = () => {
    if (orderList.length) {
      return (
        <table className="table my-account-orders-table">
          <thead>
            <tr>
              <th className="text-start">Date</th>
              <th className="text-start">Product</th>
              <th className="text-start">Total</th>
              <th className="text-start">Delivery Status</th>
              <th className="text-start">Delivery Date</th>
              <th className="text-start">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orderList.map((item: any, i: number) => {
              const { inserted_at, id } = item;
              return (
                <tr key={`order_${id || i}`}>
                  <td className="text-start" data-label="Date">
                    {moment(inserted_at).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-start" data-label="Product">
                    {item.itemList.map((obj: any, itemIndex: number) => {
                      return (
                        <div className="my-account-order-line" key={`order_${id}_product_${obj.product_id || itemIndex}`}>
                          <Link to={`/product/details/${obj.product_id}`}>
                            {obj?.name}
                          </Link>{" "}
                          weight: {`${obj?.quantity}${obj?.unit}`} x{" "}
                          {obj?.count} <br />
                        </div>
                      );
                    })}
                  </td>
                  <td className="text-start" data-label="Total">
                    {item.itemList.map((obj: any, itemIndex: number) => {
                      return (
                        <div className="my-account-order-line" key={`order_${id}_price_${itemIndex}`}>
                          <span>₹{(Number(obj.price) * Number(obj.count)).toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </td>
                  <td className="text-start text-info" data-label="Delivery Status">
                    {item.itemList.map((obj: any, itemIndex: number) => {
                      let status = "";
                      if (obj.delivery_status === 1) status = "Processing";
                      if (obj.delivery_status === 2) status = "On the way";
                      if (obj.delivery_status === 3) status = "Delivered";
                      if (obj.delivery_status === 4) status = "canceled";
                      return (
                        <div className="my-account-order-line" key={`order_${id}_status_${itemIndex}`}>
                          <a
                            className={`text-${
                              obj.delivery_status === 1 ||
                              obj.delivery_status === 2
                                ? "info"
                                : obj.delivery_status === 3
                                ? "success"
                                : "danger"
                            }`}
                          >
                            <i className="las la la-clock-o la-lg"></i>
                            {status}
                          </a>{" "}
                        </div>
                      );
                    })}
                  </td>
                  <td className="text-start" data-label="Delivery Date">
                    {item.itemList.map((obj: any, itemIndex: number) => {
                      return (
                        <div className="my-account-order-line" key={`order_${id}_date_${itemIndex}`}>
                          <span>{obj.delivery_date}</span>
                        </div>
                      );
                    })}
                  </td>
                  <td className="text-start" data-label="Actions">
                    <Link to={"/myaccount/reviews"}>Review</Link>
                    <br />
                    <Link to={`/myaccount/details?ref=${Number(id) + 1000}`}>
                      View Details
                    </Link>
                    {item.receipt_url && (
                      <>
                        <br />
                        <a href={getReceiptUrl(item.receipt_url)} target="_blank" rel="noreferrer">
                          View Invoice
                        </a>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else return null;
  };

  return (
    <div className="col-md-9 my-account-main">
      <div className="checkout-form-wrap p-4">
        <h2>My Orders</h2>
        {orders()}
      </div>
    </div>
  );
}

export default Orders;
