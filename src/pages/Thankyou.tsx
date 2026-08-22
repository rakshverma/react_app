import React, { useEffect } from "react";
import HeadingSection from "../components/Shared/HeadingSection";
import StatusSection from "../components/Thankyou/StatusSection";
import OrderDetailsSection from "../components/Thankyou/OrderDetailsSection";
import BillingDetailsSection from "../components/Thankyou/BillingDetailsSection";
import { getOrderDetailsOnRefId } from "../store/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetOrderStatusAction } from "../store/actions/orderAction";

function Thankyou() {
  const dispatch = useDispatch();
  const { refId } = useParams();
  const { orderSuccessData, isError } = useSelector(
    (state: any) => state.order
  );
  const { userInfo } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(resetOrderStatusAction());
  }, []);

  useEffect(() => {
    dispatch(getOrderDetailsOnRefId(refId));
  }, [refId, dispatch]);

  return (
    <>
      <HeadingSection />
      <section className="checkout-section bg-grey padding">
        <div className="container">
          <div className="row mt-5">
            <StatusSection refId={refId} userInfo={userInfo} />
            <OrderDetailsSection orderList={orderSuccessData} />
            <BillingDetailsSection
              orderList={orderSuccessData}
              refId={refId}
              userInfo={userInfo}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Thankyou;
