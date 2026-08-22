import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getOrderListAction,
  addReviewAction,
  getReviewListAction,
  deleteReviewAction,
} from "../../store/actions/orderAction";
import { Link } from "react-router-dom";
import { uploadUrl } from "../../utils/axios";
import StarRating from "./StarRating";
import StarRatingReadOnly from "../Shared/StarRatingReadOnly";

function Reviews() {
  const dispatch = useDispatch();
  const { orderList, reviewList } = useSelector((state: any) => state.order);

  useEffect(() => {
    dispatch(getReviewListAction());
    if (!orderList.length) {
      dispatch(getOrderListAction());
    }
  }, []);

  const submitReview = (stars: number, review: string, pid: number) => {
    dispatch(addReviewAction(stars, review, pid));
  };

  const deleteReview = (id: number) => {
    dispatch(deleteReviewAction(id));
  };

  const orders = () => {
    const uniqueProducts = Object.values(
      orderList[0].itemList.reduce((acc: any, obj: any) => {
        const check = reviewList.filter(
          (o: any) => o.product_id === obj.product_id
        );
        if (!check.length) acc[obj.product_id] = obj;
        return acc;
      }, {})
    );
    if (!uniqueProducts.length)
      return <div>You already reviewd your orders.</div>;
    const list = uniqueProducts.map((item: any, i: number) => {
      const images = JSON.parse(item.images);
      return (
        <div className="row cart-body" key={`rev_itm_${i}`}>
          <div className="col-md-6">
            <div className="cart-item">
              <img
                src={`${uploadUrl}${images}`}
                crossOrigin="anonymous"
                alt="food"
              />
              <div className="cart-content">
                <h3 className="mb-0">
                  <a href="shop-details.html">{item.name}</a>
                </h3>
                <p className="text-muted">
                  Order :{" "}
                  {moment(orderList[0].inserted_at).format("DD/MM/YYYY")} <br />{" "}
                  Delivery Date : -{" "}
                </p>
              </div>
            </div>
          </div>
          <StarRating submitReview={submitReview} pid={item.id} />
        </div>
      );
    });
    return list;
  };

  return (
    <div className="col-md-9">
      <div className="checkout-form-wrap p-4">
        <h2 className="border-bottom">Review your last order</h2>
        {orderList.length > 0 && orders()}

        {reviewList.length > 0 && (
          <>
            <h2 className="border-bottom">Past Review</h2>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-start">Date</th>
                  <th className="text-start">Product</th>
                  <th className="text-start">Review</th>
                  <th className="text-start">Actions</th>
                </tr>
              </thead>

              <tbody>
                {reviewList.map((item: any, i: number) => {
                  return (
                    <tr key={`rev_list_${i}`}>
                      <td className="text-start">
                        {moment(item.inserted_at).format("DD/MM/YYYY")}
                      </td>
                      <td className="text-start">
                        <a href="shop-details.html">{item.name}</a>
                      </td>
                      <td className="text-start">
                        <div className="comment-author">
                          <StarRatingReadOnly rating={item.stars} />
                        </div>
                        <p>{item.message}</p>
                      </td>
                      <td className="text-start">
                        {/* <a href="#" title="Edit">
                          <i className="las la-pen la-lg text-success"></i>
                        </a> */}
                        <Link
                          to={""}
                          onClick={() => deleteReview(item.product_id)}
                          title="Delete"
                        >
                          <i className="las la-trash-alt la-lg"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Reviews;
