import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { getUserInfoAction } from "../../store/actions/userAction";
import {
  getCartItemAction,
  removeExistingCartDetails,
  getShippingCostAction,
  resetCartStatus
} from "../../store/actions/cartAction";
import {
  getAllCategoryAction,
  getAllProductsAction,
} from "../../store/actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderColor: "#ffffff",
  },
};

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userPinCode, setUserPinCode] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const { userInfo } = useSelector((state: any) => state.user);
  const { cartDetails, isPincodeError, isPincodeSuccess } = useSelector(
    (state: any) => state.cart
  );
  const isAuthenticated = useAuth();
  const carthash = localStorage.getItem("carthash");
  const pincode = localStorage.getItem("pincode");
  useEffect(() => {
    if (!pincode) {
      setIsOpenModal(true);
    }
    if(pincode) {
      dispatch(getShippingCostAction(pincode));
    }
    if (isAuthenticated && Object.keys(userInfo).length === 0) {
      dispatch(getUserInfoAction());
    }
    if (carthash || userInfo.id) {
      dispatch(getCartItemAction(carthash, userInfo?.id));
    }
  }, []);

  useEffect(() => {
    if (isPincodeSuccess) {
      setUserPinCode("");
      setPinCodeError("");
      setIsOpenModal(false);
      navigate("/products", { state: { updatePincode: true } });
      dispatch(resetCartStatus());
    }
  }, [dispatch, isPincodeSuccess, navigate]);

  useEffect(() => {
    if (isPincodeError) {
      setPinCodeError(typeof isPincodeError === "string" ? isPincodeError : "Out of service area definition");
      setIsOpenModal(true);
    }
  }, [isPincodeError]);

  const updateUserPinCode = () => {
    const pincodePattern = /^[1-9][0-9]{5}$/;
    if (!userPinCode || (userPinCode && !userPinCode.match(pincodePattern))) {
      setPinCodeError("Please enter valid pin code");
      return;
    }
    setPinCodeError("");
    dispatch(removeExistingCartDetails(userPinCode));
  };

  return (
    <header className="header dark-text">
      <div className="primary-header-one primary-header">
        <div className="container">
          <div className="primary-header-inner">
            <div className="header-logo">
              <a href="#">
                <img
                  className="light"
                  src="assets/imgs/jhatkabyte-logo.png"
                  alt="Logo"
                />
                <img
                  className="dark"
                  src="assets/imgs/jhatkabyte-logo.png"
                  alt="Logo"
                />
              </a>
            </div>
            <div className={`header-menu-wrap ${isMobileMenuOpen ? "is-open" : ""}`}>
              <ul className="slider-menu">
                <li>
                  <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to={"/products"} onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
                </li>
                <li>
                  <Link to={"/aboutus"} onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                </li>
                <li>
                  <Link to={"/contactus"} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
                </li>
                <li>
                  {isAuthenticated ? (
                    <Link to={"/myaccount"} onClick={() => setIsMobileMenuOpen(false)}>My Account</Link>
                  ) : (
                    <Link to={"/signin"} onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                  )}
                </li>
              </ul>
            </div>
            <div className="header-right">
              <div className="cart-icon">
                <Link to={"/cart"}>
                  <i className="las la-shopping-cart"></i>
                  {cartDetails.length > 0 && <span>{cartDetails.length}</span>}
                </Link>
              </div>
              {isAuthenticated && (
                <div style={{ marginLeft: 40 }}>
                  <div
                    className="rounded-circle border d-flex justify-content-center align-items-center"
                    style={{ width: 40, height: 40, backgroundColor: "red" }}
                  >
                    <span
                      style={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {userInfo.name ? userInfo.name[0].toUpperCase() : ""}
                    </span>
                  </div>
                </div>
              )}

              {pincode ? (
                <div className="d-flex ms-3 ms-md-4 ps-md-3">
                  <Link
                    to="#"
                    onClick={() => setIsOpenModal(true)}
                    className="text-dark pincode-modal"
                  >
                    <i className="fas fa-map-marker-alt me-1"></i>
                    {pincode}{" "}
                    <i className="fas fa-angle-down ms-1 text-muted"></i>
                  </Link>
                </div>
              ) : null}

              <button
                type="button"
                className="mobile-menu-icon"
                aria-label="Toggle navigation"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((value) => !value)}
              >
                <div className="burger-menu">
                  <div className="line-menu line-half first-line"></div>
                  <div className="line-menu"></div>
                  <div className="line-menu line-half last-line"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpenModal && (
        <Modal show={isOpenModal} onHide={() => {}}>
          <Modal.Body>
            {pincode && (
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={() => setIsOpenModal(false)}
              >
                <span aria-hidden="true" style={{ fontSize: 25 }}>
                  &times;
                </span>
              </button>
            )}
            <div className="modal-body text-center p-4">
              <img
                src="assets/imgs/delivery-icon.png"
                style={{ width: 80 }}
                alt=""
              />
              <h4 className="my-2">
                Check the availability of items at your location
              </h4>
              <div className="mx-md-5">
                <input
                  type="text"
                  className="form-control mt-0"
                  placeholder="Enter pincode here"
                  value={userPinCode}
                  onChange={(e) => {
                    setUserPinCode(e.target.value);
                  }}
                  maxLength={6}
                />
                <button
                  onClick={() => {
                    updateUserPinCode();
                  }}
                  className="purchase-btn mt-2 ms-0 d-block"
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
                <span style={{ color: "red" }}>{pinCodeError}</span>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </header>
  );
}

export default Header;
