import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { RegisterFormData } from "../types";
import { registerUserAction } from "../store/actions/loginAction";
import WelcomeSection from "../components/Registration/WelcomeSection";
import RegisterSection from "../components/Registration/RegisterSection";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state: any) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<RegisterFormData>();
  const watchPassword = watch("password");
  useEffect(() => {
    if (isSuccess) {
      reset();
      navigate("/");
    }
  }, [isSuccess, navigate, reset]);

  const onSubmit = (data: any) => {
    dispatch(registerUserAction(data));
  };

  return (
    <>
      <WelcomeSection />
      <RegisterSection
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
        watchPassword={watchPassword}
      />
    </>
  );
}

export default Register;
