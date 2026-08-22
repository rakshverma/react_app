import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserAccountAction } from "../../store/actions/userAction";
const separateNameMethod = (fullName: string) => {
  const lastSpaceIndex = fullName.lastIndexOf(" ");
  const firstName = fullName.substring(0, lastSpaceIndex);
  const lastName =
    lastSpaceIndex !== -1 ? fullName.substring(lastSpaceIndex + 1) : "";
  return { firstName, lastName };
};
function Accounts({ userInfo }: any) {
  console.log("userInfo = ", userInfo);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: separateNameMethod(userInfo.name || "").firstName,
    lastName: separateNameMethod(userInfo.name || "").lastName,
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState<any>({});

  const handleInputChange = (type: any, e: any) => {
    setFormData((state: any) => ({ ...state, [type]: e.target.value }));
  };

  const handleSubmit = () => {
    setFormError({});
    let errors: any = {};
    const { firstName, lastName, password, confirmPassword } = formData;
    if (!firstName) {
      errors.firstName = "Please enter first name";
    }
    if (!lastName) {
      errors.lastName = "Please enter last name";
    }
    if (password && password.length < 6) {
      errors.password = "Password should be minimum 6 cahracters in lenght";
    }
    if (password && password.length >= 6 && password != confirmPassword) {
      errors.confirmPassword = "Password and confirm password does not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }
    dispatch(updateUserAccountAction(formData, userInfo.email));
  };
  console.log("formData = ", formData);
  return (
    <div className="col-md-9">
      <div className="checkout-form-wrap py-4">
        <h2> Account Details </h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>
                First Name <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.firstName}
                onChange={(text) => handleInputChange("firstName", text)}
              />
              {formError?.firstName && (
                <p style={{ fontSize: 10, color: "red" }}>
                  {formError?.firstName}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                Last Name <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.lastName}
                onChange={(text) => handleInputChange("lastName", text)}
              />
              {formError?.lastName && (
                <p style={{ fontSize: 10, color: "red" }}>
                  {formError?.lastName}
                </p>
              )}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label>
                Email Address <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="text"
                className="form-control"
                value={userInfo.email}
                readOnly={true}
              />
            </div>
          </div>
          <div className="col-md-12">
            <h2 className="border-bottom mt-3">Password Change</h2>
            <div className="form-group">
              <label>New password (leave blank to leave unchanged)</label>
              <input
                type="text"
                className="form-control"
                value={formData.password}
                onChange={(text) => handleInputChange("password", text)}
              />
              {formError?.password && (
                <p style={{ fontSize: 10, color: "red" }}>
                  {formError?.password}
                </p>
              )}
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="text"
                className="form-control"
                value={formData.confirmPassword}
                onChange={(text) => handleInputChange("confirmPassword", text)}
              />
              {formError?.confirmPassword && (
                <p style={{ fontSize: 10, color: "red" }}>
                  {formError?.confirmPassword}
                </p>
              )}
            </div>
            <button className="default-btn" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
