import React from "react";
import { Link } from "react-router-dom";

function DashboardSection({ signOutUser, page }: any) {
  return (
    <div className="col-md-3">
      <h4>User Dashboard</h4>
      <ul className="nav-list-item">
        <li>
          <Link
            to={"/myaccount/orders"}
            className={page === "orders" || page === "details" ? "active" : ""}
          >
            <i className="las la-shopping-cart la-lg me-2"></i>
            My Orders
          </Link>
        </li>
        <li>
          <Link
            to={"/myaccount/reviews"}
            className={page === "reviews" ? "active" : ""}
          >
            <i className="las la-pen la-lg me-2"></i> Review
          </Link>
        </li>
        <li>
          <Link
            to={"/myaccount/addresses"}
            className={page === "addresses" ? "active" : ""}
          >
            <i className="las la-map-marker la-lg me-2"></i> Addresses
          </Link>
        </li>
        <li>
          <Link
            to={"/myaccount/profile"}
            className={page === "profile" ? "active" : ""}
          >
            <i className="las la-user la-lg me-2"></i> Account Details
          </Link>
        </li>
        <li>
          <button
            onClick={signOutUser}
            className={page === "logout" ? "active" : ""}
          >
            <i className="las la la-sign-in la-lg me-2"></i> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSection;
