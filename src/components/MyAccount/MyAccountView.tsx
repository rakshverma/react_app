import React, { useEffect, useState } from "react";
import HeadingSection from "../Shared/HeadingSection";
import DashboardSection from "./DashboardSection";
import Orders from "./Orders";
import Reviews from "./Reviews";
import Addresses from "./Addresses";
import Accounts from "./Accounts";
import { useNavigate, useParams } from "react-router-dom";
import OrderDetailsView from "./OrderDetailsView";
import { useDispatch } from "react-redux";
import { userLogoutAction } from "../../store/actions/userAction";

function MyAccountView({ orderList }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const [activePage, setActivePage] = useState(page || "orders");

  useEffect(() => {
    setActivePage(page || "orders");
  }, [page]);

  const signOutUser = () => {
    // setActivePage("logout");
    // dispatch(userLogoutAction());
    navigate("/products");
    // console.log("sign out calledaaa");
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
            {activePage === "profile" && <Accounts />}
            {activePage === "details" && <OrderDetailsView />}
          </div>
        </div>
        <div className="bg-shape white"></div>
      </section>
    </>
  );
}

export default MyAccountView;
