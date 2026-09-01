import React from "react";
import { Link } from "react-router-dom";
import Input from "../Input";

function SignInSection({
  register,
  handleSubmit,
  errors,
  onSubmit,
  setForgotPassView,
  forgotPassView,
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
              <div className="contact-title">
                <h2>
                  {forgotPassView ? "Reset Password" : "Sign In Your Account"}
                  <span></span>
                </h2>
                {forgotPassView && (
                  <p className="password-service-alert">
                    Use the secret code you saved during registration to set a new password.
                  </p>
                )}
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="form-horizontal"
              >
                <div className="contact-form-group">
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
                  {forgotPassView && (
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
                  )}
                  <div className="form-field full-w">
                    <Input
                      type={"password"}
                      name={"password"}
                      placeholder={forgotPassView ? "New Password" : "Password"}
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
                  {forgotPassView && (
                    <div className="form-field full-w">
                      <Input
                        type={"password"}
                        name={"confPassword"}
                        placeholder={"Confirm New Password"}
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
                  )}

                  <div className="form-field full-w d-grid">
                    <button type="submit" className="default-btn text-center">
                      {forgotPassView ? "Reset Password" : "Sign In"}
                    </button>
                  </div>
                  <div className="form-field full-w d-grid">
                    <button
                      type="button"
                      className="app-auth-link"
                      onClick={() => {
                        setForgotPassView(!forgotPassView);
                      }}
                    >
                      {forgotPassView ? "Sign In" : "Forgot Password?"}
                    </button>
                  </div>
                </div>
              </form>
              <div id="form-messages" className="alert" role="alert"></div>

              <div style={{ paddingTop: 20 }}>
                New to JhatkaByte? <Link to={"/signup"}>Create account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInSection;
