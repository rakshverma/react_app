import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { CLEAR_STATUS_MESSAGE } from "../../store/actionTypes";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: any) => state.statusMessage.isError);
  const success = useSelector((state: any) => state.statusMessage.isSuccess);
  useEffect(() => {
    // Dismiss all existing toasts before showing new ones

    if (error) {
      // Use the unique key as the toastId
      toast.dismiss();
      toast.error(error, { toastId: `error-${Date.now()}` });
      dispatch({ type: CLEAR_STATUS_MESSAGE });
    }

    if (success) {
      toast.dismiss();
      // Use the unique key as the toastId
      toast.success(success, { toastId: `success-${Date.now()}` });
      dispatch({ type: CLEAR_STATUS_MESSAGE });
    }
  }, [dispatch, error, success]);

  return <ToastContainer />;
};

export default Toast;
