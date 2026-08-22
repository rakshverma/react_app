/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import { uploadUrl } from "../../utils/axios";

const getReceiptUrl = (receiptUrl: string) => {
  if (!receiptUrl) return "";
  return `${uploadUrl}${receiptUrl.replace(/^\/?uploads\/?/, "")}`;
};

function Orders() {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state: any) => state.order);

  const orders = () => {
    if (orderList.length) {
      return (
        <table className="table">
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
                <tr>
                  <td className="text-start">
                    {moment(inserted_at).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-start">
                    {item.itemList.map((obj: any) => {
                      return (
                        <>
                          <Link to={`/product/details/${obj.product_id}`}>
                            {obj?.name}
                          </Link>{" "}
                          weight: {`${obj?.quantity}${obj?.unit}`} x{" "}
                          {obj?.count} <br />
                        </>
                      );
                    })}
                  </td>
                  <td className="text-start">
                    {item.itemList.map((obj: any) => {
                      return (
                        <>
                          <span>₹{(Number(obj.price) * Number(obj.count)).toFixed(2)}</span>
                          <br />
                        </>
                      );
                    })}
                  </td>
                  <td className="text-start text-info">
                    {item.itemList.map((obj: any) => {
                      let status = "";
                      if (obj.delivery_status === 1) status = "Processing";
                      if (obj.delivery_status === 2) status = "On the way";
                      if (obj.delivery_status === 3) status = "Delivered";
                      if (obj.delivery_status === 4) status = "canceled";
                      return (
                        <>
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
                          <br />
                        </>
                      );
                    })}
                  </td>
                  <td className="text-start">
                    {item.itemList.map((obj: any) => {
                      return (
                        <>
                          <span>{obj.delivery_date}</span>
                          <br />
                        </>
                      );
                    })}
                  </td>
                  <td className="text-start">
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
    <div className="col-md-9">
      <div className="checkout-form-wrap p-4">
        <h2>My Orders</h2>
        {orders()}
      </div>
    </div>
  );
}

export default Orders;
