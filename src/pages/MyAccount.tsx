import React, { useEffect, useState } from "react";
import HeadingSection from "../components/Shared/HeadingSection";
import DashboardSection from "../components/MyAccount/DashboardSection";
import Orders from "../components/MyAccount/Orders";
import Reviews from "../components/MyAccount/Reviews";
import Addresses from "../components/MyAccount/Addresses";
import Accounts from "../components/MyAccount/Accounts";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetailsView from "../components/MyAccount/OrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../store/actions/userAction";
import { getOrderListAction } from "../store/actions/orderAction";

function MyAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const [activePage, setActivePage] = useState(page || "orders");
  const { orderList } = useSelector((state: any) => state.order);
  const { userInfo } = useSelector((state: any) => state.user);

  useEffect(() => {
    dispatch(getOrderListAction());
  }, []);

  useEffect(() => {
    setActivePage(page || "orders");
  }, [page]);

  const signOutUser = () => {
    setActivePage("logout");
    dispatch(userLogoutAction());
    navigate("/");
    console.log("sign out calledaaa");
  };
  return (
    <>
      <HeadingSection heading={"My Account"} />
      <section className="checkout-section bg-grey padding">
        <div className="container">
          <div className="row mt-5">
            <DashboardSection signOutUser={signOutUser} page={activePage} />
            {activePage === "orders" && <Orders />}
            {activePage === "reviews" && <Reviews />}
            {activePage === "addresses" && <Addresses />}
            {activePage === "profile" && <Accounts userInfo={userInfo} />}
            {activePage === "details" && <OrderDetailsView />}
          </div>
        </div>
        <div className="bg-shape white"></div>
      </section>
    </>
  );
}

export default MyAccount;
