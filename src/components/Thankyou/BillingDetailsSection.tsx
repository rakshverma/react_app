import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function BillingDetailsSection({ orderList, refId, userInfo }: any) {
  const details = () => {
    if (orderList.length) {
      const { name, email, phone_number, inserted_at, ref_no, total_price } =
        orderList[0];
      return (
        <>
          <table className="table">
            <tbody>
              <tr>
                <td className="text-start">Name</td>

                <td className="text-end">{name}</td>
              </tr>
              <tr>
                <td className="text-start">Email</td>

                <td className="text-end">{email}</td>
              </tr>
              <tr>
                <td className="text-start">Phone</td>

                <td className="text-end">{phone_number}</td>
              </tr>
              <tr>
                <td className="text-start">Order Date</td>

                <td className="text-end">
                  {moment(inserted_at).format("MMMM D, YYYY")}
                </td>
              </tr>
              <tr>
                <td className="text-start">Order Number</td>

                <td className="text-end">#{ref_no}</td>
              </tr>
              <tr>
                <td className="text-start">Payment Method</td>

                <td className="text-end">Scan QR on Delivery / Pay By Cash</td>
              </tr>
              <tr>
                <td className="text-start">Total</td>

                <td className="text-end">₹{`${total_price.toFixed(2)}`}</td>
              </tr>
            </tbody>
          </table>
        </>
      );
    } else return null;
  };

  return (
    <div className="col-lg-4 sm-padding">
      <div className="checkout-form-wrap p-4">
        <h2>Billing Details</h2>
        {details()}
        {userInfo?.id ? (
          <Link
            to={`/myaccount/details?ref=${refId}`}
            className="purchase-btn d-grid text-center ms-0"
          >
            Track My Order
          </Link>
        ) : (
          <Link to={`/signin`} className="purchase-btn d-grid text-center ms-0">
            Track My Order
          </Link>
        )}
      </div>
    </div>
  );
}

export default BillingDetailsSection;
