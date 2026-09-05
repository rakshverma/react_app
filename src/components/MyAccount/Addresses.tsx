import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfoAction,
  updateAddressAction,
  resetUserStatus,
} from "../../store/actions/userAction";
import { removeExistingCartDetails } from "../../store/actions/cartAction";

function Addresses() {
  const dispatch = useDispatch();
  const { userInfo, isSuccess, isError } = useSelector(
    (state: any) => state.user
  );
  console.log("userInfo = ", userInfo);
  const [formData, setFormData] = useState({
    state: "West Bengal",
    district: userInfo?.district || "",
    street: userInfo?.street || "",
    landmark: userInfo?.landmark || "",
    pincode: userInfo?.pin_code || "",
  });
  const [orderErrors, setOrderErrors] = useState<any>({});
  const [isShowMOdal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      dispatch(getUserInfoAction());
    }
    return () => {
      console.log("COMPONENT UNMOUNT ADDRESS");
      dispatch(resetUserStatus());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetUserStatus());
      const pin = localStorage.getItem("pincode");
      if (pin !== formData.pincode) {
        console.log("PIN CHANGED");
        dispatch(removeExistingCartDetails(formData.pincode));
      }
    }
  }, [isSuccess]);

  const updateFormData = (name: string, value: string) => {
    setFormData((state: any) => ({
      ...state,
      [name]: value,
    }));
  };

  const validateFormData = (formData: any) => {
    const errors: any = {};
    const pinRegex = /^\d{6}$/;
    const { state, district, street, landmark, pincode } = formData;

    if (!state) errors.state = "Please select your state";
    if (!district) errors.district = "Please enter your district";
    if (!street) errors.street = "Please enter your street";
    if (!pincode) errors.pincode = "Please enter your pincode";
    if (pincode && !pinRegex.test(pincode))
      errors.pincode = "Please enter valid pincode";

    return errors;
  };

  const submitAddressData = (e: any) => {
    e.preventDefault();
    setOrderErrors({});
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setOrderErrors(errors);
      return;
    } else {
      dispatch(updateAddressAction(formData));
    }
  };

  return (
    <>
      <div className="col-md-9">
        <div className="checkout-form-wrap py-4">
          <h2>My Address Book</h2>
          <div className="row">
            <div className="col-md-8">
              <>
                <div className="checkout-form">
                  <div className="form-field">
                    <input
                      type="text"
                      id="street"
                      name="street"
                      className="form-control"
                      placeholder="Street"
                      value={formData.street}
                      defaultValue={userInfo?.street || ""}
                      onChange={(e) => {
                        updateFormData("street", e.target.value);
                      }}
                    />
                    {orderErrors.street && (
                      <p style={{ color: "red" }}>{orderErrors.street}</p>
                    )}
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      className="form-control"
                      placeholder="State"
                      disabled={true}
                      defaultValue={userInfo?.state || ""}
                      onChange={(e) => {
                        updateFormData("state", e.target.value);
                      }}
                    />
                    {orderErrors.state && (
                      <p style={{ color: "red" }}>{orderErrors.state}</p>
                    )}
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      id="district"
                      name="district"
                      className="form-control"
                      placeholder="District"
                      value={formData.district}
                      defaultValue={userInfo?.district || ""}
                      onChange={(e) => {
                        updateFormData("district", e.target.value);
                      }}
                    />
                    {orderErrors.district && (
                      <p style={{ color: "red" }}>{orderErrors.district}</p>
                    )}
                  </div>
                  <div className="form-field">
                    <input
                      type="text"
                      id="pinCode"
                      name="pincode"
                      className="form-control"
                      placeholder="Post Code"
                      defaultValue={userInfo?.pincode || ""}
                      value={formData.pincode}
                      onChange={(e) => {
                        updateFormData("pincode", e.target.value);
                      }}
                    />
                    {orderErrors.pincode && (
                      <p style={{ color: "red" }}>{orderErrors.pincode}</p>
                    )}
                  </div>

                  <div className="form-field">
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      className="form-control"
                      placeholder="Nearest Landmark"
                      value={formData.landmark}
                      defaultValue={userInfo?.landmark || ""}
                      onChange={(e) => {
                        updateFormData("landmark", e.target.value);
                      }}
                    />
                    {orderErrors.landmark && (
                      <p style={{ color: "red" }}>{orderErrors.landmark}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="default-btn"
                  style={{ marginTop: 20 }}
                  onClick={submitAddressData}
                >
                  Update Your Address <span></span>
                </button>
              </>

              {/* {Object.keys(userInfo).length > 0 && userInfo.street && (
              <div className="border rounded p-4">
                <a href="#" title="Edit" className="float-end pt-3">
                  <i className="las la-edit la-lg"></i>
                </a>
                <h2>Shipping Address</h2>
                <p>
                  {userInfo?.street} <br /> {`${userInfo?.district},`} <br />
                  {userInfo?.state} {userInfo?.pin_code}.
                </p>
              </div>
            )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addresses;
