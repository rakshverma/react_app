import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { LoginFormData } from "../types";
import WelcomeSection from "../components/Registration/WelcomeSection";
import SignInSection from "../components/Registration/SignInSection";
import {
  loginUserAction,
  forgotPasswordAction,
} from "../store/actions/loginAction";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const { isSuccess, isError } = useSelector((state: any) => state.login);
  const [forgotPassView, setForgotPassView] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>();

  useEffect(() => {
    if (isSuccess || isAuthenticated) {
      navigate("/");
    }
  }, [isSuccess, isAuthenticated, navigate]);

  const onSubmit = (data: any) => {
    console.log(data);
    if (forgotPassView) {
      dispatch(forgotPasswordAction(data.email));
    } else {
      dispatch(loginUserAction(data));
    }

    reset();
  };

  return (
    <>
      <WelcomeSection />
      <SignInSection
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        setForgotPassView={setForgotPassView}
        forgotPassView={forgotPassView}
      />
    </>
  );
}

export default Login;
