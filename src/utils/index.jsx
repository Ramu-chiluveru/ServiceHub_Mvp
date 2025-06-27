// utils/index.js
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import Cookies from "js-cookie";

import {
  setCurrentStep,
  setCompletedSteps,
  setShowPassword,
  updateForm,
  setOtpSent,
  setResendTimer,
  setOtpValid,
  setGeneratedOtp,
  setLoading,
  showToast,
  removeToast
} from "../store/slices/formSlice";

// Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  return password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

// OTP sender logic
export const sendOtp = (form, dispatch, setGeneratedOtp, setOtpSent, setResendTimer, showToast) => {
  if (!validateEmail(form.email)) {
    dispatch(showToast({ message: "Enter a valid email address.", type: "error" }));
    return;
  }

  const fakeOtp = "123456";
  dispatch(setGeneratedOtp(fakeOtp));
  dispatch(setOtpSent(true));
  dispatch(setResendTimer(30));
  dispatch(showToast({ message: "OTP sent to your email.", type: "success" }));
};

// utils/index.js
export const call_to_register = async (form, step, dispatch, completedSteps, navigate) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  dispatch(setLoading(true));
  try {
    let endpoint = "";
    let payload = {};

    if (step === 1) {
      endpoint = "/api/user/register";
      payload = {
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password
      };
    } 
    else if (step === 2) 
      {
      endpoint = "/api/user/role";
      payload = {
        email: form.email,
        role: form.role
      };
    } else if (step === 3) {
      endpoint = "/api/user/address";
      payload = {
        email: form.email,
        phone: form.phone,
        street: form.street,
        village: form.village,
        mandal: form.mandal,
        district: form.district,
        state: form.state,
        pincode: form.pincode,
        ...(form.role === "customer" ? { preferences: form.preferences } : {}),
        ...(form.role === "provider" ? {
          services: form.services
        } : {})
      };
    }

    const res = await axios.post(`${BASE_URL}${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    });

    console.log(res);

    if (step < 3) {
      dispatch(setCurrentStep(step + 1));
    } else {
      Cookies.set('email', res.data.email, { expires: 7, sameSite: 'Lax' });
      Cookies.set('role', res.data.role, { expires: 7, sameSite: 'Lax' });
      navigate("/home");
      dispatch(showToast({ message: "Registration completed!", type: "success" }));
    }
    dispatch(showToast({ message: res.message || `Step ${step} completed!`, type: "success" }));
    dispatch(setCompletedSteps([...completedSteps, step]));

  } catch (error) {
    const message = error?.response?.data || error?.message || "Something went wrong";
    dispatch(showToast({ message, type: "error" }));
  } finally {
    dispatch(setLoading(false));
  }
};
