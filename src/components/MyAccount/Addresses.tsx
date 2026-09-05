import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAddressAction,
  getUserAddressListAction,
  getUserInfoAction,
  resetUserStatus,
  setDefaultUserAddressAction,
  updateAddressAction,
} from "../../store/actions/userAction";
import { removeExistingCartDetails } from "../../store/actions/cartAction";

const emptyAddress = {
  id: "",
  label: "Home",
  recipientName: "",
  phoneNumber: "",
  state: "West Bengal",
  district: "",
  street: "",
  landmark: "",
  pincode: "",
  isDefault: false,
};

function Addresses() {
  const dispatch = useDispatch();
  const { userInfo, addressList, isSuccess } = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState<any>(emptyAddress);
  const [orderErrors, setOrderErrors] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (Object.keys(userInfo).length === 0) {
      dispatch(getUserInfoAction());
    }
    dispatch(getUserAddressListAction());
    return () => {
      dispatch(resetUserStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetUserStatus());
      dispatch(getUserAddressListAction());
      const pin = localStorage.getItem("pincode");
      if (formData.isDefault && pin !== formData.pincode) {
        dispatch(removeExistingCartDetails(formData.pincode));
      }
      setFormData(emptyAddress);
      setIsEditing(false);
    }
  }, [dispatch, formData.isDefault, formData.pincode, isSuccess]);

  const updateFormData = (name: string, value: string | boolean) => {
    setFormData((state: any) => ({
      ...state,
      [name]: value,
    }));
  };

  const validateFormData = (data: any) => {
    const errors: any = {};
    const pinRegex = /^\d{6}$/;
    const phoneNumberRegex = /^\d{10}$/;

    if (!data.label?.trim()) errors.label = "Please enter address label";
    if (!data.street?.trim()) errors.street = "Please enter your street";
    if (!data.state?.trim()) errors.state = "Please enter your state";
    if (!data.district?.trim()) errors.district = "Please enter your district";
    if (!data.pincode?.trim()) errors.pincode = "Please enter your pincode";
    if (data.pincode && !pinRegex.test(data.pincode)) errors.pincode = "Please enter valid pincode";
    if (data.phoneNumber && !phoneNumberRegex.test(data.phoneNumber)) errors.phoneNumber = "Please enter valid phone number";

    return errors;
  };

  const submitAddressData = (e: any) => {
    e.preventDefault();
    setOrderErrors({});
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setOrderErrors(errors);
      return;
    }
    dispatch(updateAddressAction(formData));
  };

  const editAddress = (address: any) => {
    setIsEditing(true);
    setOrderErrors({});
    setFormData({
      id: address.id,
      label: address.label || "Home",
      recipientName: address.recipient_name || "",
      phoneNumber: address.phone_number || "",
      state: address.state || "West Bengal",
      district: address.district || "",
      street: address.street || "",
      landmark: address.landmark || "",
      pincode: address.pin_code || "",
      isDefault: Boolean(address.is_default),
    });
  };

  const deleteAddress = (address: any) => {
    if (window.confirm("Delete this saved address?")) {
      dispatch(deleteUserAddressAction(address.id));
    }
  };

  return (
    <div className="col-md-9">
      <div className="checkout-form-wrap py-4 address-book-panel">
        <div className="address-book-header">
          <div>
            <h2>My Address Book</h2>
            <p>Save delivery addresses and choose one as your default checkout address.</p>
          </div>
          <button
            type="button"
            className="default-btn address-book-add"
            onClick={() => {
              setIsEditing(false);
              setOrderErrors({});
              setFormData(emptyAddress);
            }}
          >
            Add Address <span></span>
          </button>
        </div>

        {addressList?.length > 0 && (
          <div className="address-card-grid">
            {addressList.map((address: any) => (
              <div className={`address-card ${address.is_default ? "is-default" : ""}`} key={address.id}>
                <div className="address-card-top">
                  <strong>{address.label || "Address"}</strong>
                  {address.is_default && <span>Default</span>}
                </div>
                <p>{address.recipient_name || userInfo?.name || "Recipient"}</p>
                <p>{address.street}</p>
                <p>{address.landmark ? `${address.landmark}, ` : ""}{address.district}, {address.state} - {address.pin_code}</p>
                {address.phone_number && <p>Phone: {address.phone_number}</p>}
                <div className="address-card-actions">
                  {!address.is_default && (
                    <button type="button" onClick={() => dispatch(setDefaultUserAddressAction(address.id))}>
                      Set Default
                    </button>
                  )}
                  <button type="button" onClick={() => editAddress(address)}>Edit</button>
                  {!address.is_default && (
                    <button type="button" className="danger" onClick={() => deleteAddress(address)}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <form className="checkout-form address-book-form" onSubmit={submitAddressData}>
          <h3>{isEditing ? "Edit Address" : "Add New Address"}</h3>
          <div className="form-field">
            <input type="text" name="label" className="form-control" placeholder="Label e.g. Home, Work" value={formData.label} onChange={(e) => updateFormData("label", e.target.value)} />
            {orderErrors.label && <p style={{ color: "red" }}>{orderErrors.label}</p>}
          </div>
          <div className="form-field">
            <input type="text" name="recipientName" className="form-control" placeholder="Recipient Name" value={formData.recipientName} onChange={(e) => updateFormData("recipientName", e.target.value)} />
          </div>
          <div className="form-field">
            <input type="text" name="phoneNumber" className="form-control" placeholder="Phone Number" value={formData.phoneNumber} onChange={(e) => updateFormData("phoneNumber", e.target.value)} />
            {orderErrors.phoneNumber && <p style={{ color: "red" }}>{orderErrors.phoneNumber}</p>}
          </div>
          <div className="form-field full-w">
            <input type="text" name="street" className="form-control" placeholder="Street / House / Building" value={formData.street} onChange={(e) => updateFormData("street", e.target.value)} />
            {orderErrors.street && <p style={{ color: "red" }}>{orderErrors.street}</p>}
          </div>
          <div className="form-field">
            <input type="text" name="district" className="form-control" placeholder="District" value={formData.district} onChange={(e) => updateFormData("district", e.target.value)} />
            {orderErrors.district && <p style={{ color: "red" }}>{orderErrors.district}</p>}
          </div>
          <div className="form-field">
            <input type="text" name="state" className="form-control" placeholder="State" value={formData.state} onChange={(e) => updateFormData("state", e.target.value)} />
            {orderErrors.state && <p style={{ color: "red" }}>{orderErrors.state}</p>}
          </div>
          <div className="form-field">
            <input type="text" name="pincode" className="form-control" placeholder="Post Code" maxLength={6} value={formData.pincode} onChange={(e) => updateFormData("pincode", e.target.value)} />
            {orderErrors.pincode && <p style={{ color: "red" }}>{orderErrors.pincode}</p>}
          </div>
          <div className="form-field">
            <input type="text" name="landmark" className="form-control" placeholder="Nearest Landmark" value={formData.landmark} onChange={(e) => updateFormData("landmark", e.target.value)} />
          </div>
          <label className="address-default-toggle">
            <input type="checkbox" checked={formData.isDefault} onChange={(e) => updateFormData("isDefault", e.target.checked)} />
            <span>Use as default delivery address</span>
          </label>
          <button type="submit" className="default-btn address-book-submit">
            {isEditing ? "Update Address" : "Save Address"} <span></span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addresses;
