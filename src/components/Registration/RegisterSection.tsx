import React from "react";
import Input from "../Input";

function RegisterSection({
  register,
  handleSubmit,
  errors,
  onSubmit,
  watchPassword,
}: any) {
  return (
    <section className="contact-section bg-grey pb-5 padding">
      <div className="bg-shape white"></div>
      <div className="map"></div>
      <div className="container">
        <div className="row align-items-center mt-5">
          <div className="col-md-6 col-lg-7 text-center">
            <img src="assets/imgs/log-in.png" className="w-75" />
          </div>
          <div className="col-md-6 col-lg-5">
            <div className="contact-form">
              <form
                className="form-horizontal"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="contact-title">
                  <h2>
                    Create Your Account
                    <span></span>
                  </h2>
                  <p className="password-service-alert">
                    Please remember your password and secret code. You can use the secret code if you forget your password.
                  </p>
                </div>
                <div className="contact-form-group">
                  <div className="form-field full-w">
                    <Input
                      type={"text"}
                      name={"name"}
                      placeholder={"Name"}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your name",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters.",
                        },
                        pattern: {
                          value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                          message: "Name must contain only charecters",
                        },
                        maxLength: {
                          value: 45,
                          message: "Name must be at max 45 characters.",
                        },
                      }}
                      error={errors?.name || null}
                    />
                  </div>
                  <div className="form-field full-w">
                    <Input
                      type={"text"}
                      name={"email"}
                      placeholder={"Email Address"}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your email",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      }}
                      error={errors?.email || null}
                    />
                  </div>
                  <div className="form-field full-w">
                    <Input
                      type={"phone"}
                      name={"phone"}
                      placeholder={"Phone No."}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your phone number",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Invalid phone number",
                        },
                        minLength: {
                          value: 10,
                          message: "invalid phone number.",
                        },
                        maxLength: {
                          value: 10,
                          message: "Invalid phone number",
                        },
                      }}
                      error={errors?.phone || null}
                    />
                  </div>
                  <div className="form-field full-w">
                    <Input
                      type={"password"}
                      name={"password"}
                      placeholder={"Password"}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your password",
                        minLength: {
                          value: 6,
                          message: "Password should be minimum 6 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "Password should be max 30 chars",
                        },
                      }}
                      error={errors?.password || null}
                    />
                  </div>
                  <div className="form-field full-w">
                    <Input
                      type={"text"}
                      name={"secretCode"}
                      placeholder={"Your Secret Code"}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your secret code",
                        minLength: {
                          value: 4,
                          message: "Secret code should be minimum 4 characters",
                        },
                        maxLength: {
                          value: 60,
                          message: "Secret code should be max 60 characters",
                        },
                      }}
                      error={errors?.secretCode || null}
                    />
                  </div>
                  <div className="form-field full-w">
                    <Input
                      type={"password"}
                      name={"confPassword"}
                      placeholder={"Confirm Password"}
                      className={"form-control"}
                      register={register}
                      validationObj={{
                        required: "Please enter your password",
                        minLength: {
                          value: 6,
                          message: "Password should be minimum 6 characters",
                        },
                        maxLength: {
                          value: 30,
                          message: "Password should be max 30 chars",
                        },
                        validate: (value: string) =>
                          value === watchPassword || "Passwords do not match",
                      }}
                      error={errors?.confPassword || null}
                    />
                  </div>
                  <div className="form-field full-w d-grid">
                    <button type="submit" className="default-btn text-center">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterSection;
