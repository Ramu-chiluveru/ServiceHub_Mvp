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

// OTP sender logic (calls backend instead of fake OTP)
export const sendOtp = async (form, dispatch) => {
  if (!validateEmail(form.email)) {
    dispatch(showToast({ message: "Enter a valid email address.", type: "error" }));
    return;
  }

  try {
    console.log("OTP Generated res: ",res);
    const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
    const res = await axios.post(`${BASE_URL}/api/otp/generate`, { email: form.email });
    console.log("OTP Generated res: ",res);

    // If backend returns OTP (for testing, not production)
    if (res.data?.otp) {
      dispatch(setGeneratedOtp(res.data.otp));
    }

    dispatch(setOtpSent(true));
    dispatch(setResendTimer(60)); // 60 sec timer
    dispatch(showToast({ message: res.data?.message || "OTP sent to your email.", type: "success" }));

  } catch (error) {
    const message = error?.response?.data?.message || error?.message || "Failed to send OTP";
    dispatch(showToast({ message, type: "error" }));
  }
};

// Register API calls
export const call_to_register = async (form, step, dispatch, completedSteps, navigate) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8080";
  console.log(`base url: ${BASE_URL}`);
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
    } else if (step === 2) {
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
        ...(form.role === "provider" ? { services: form.services } : {})
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
      if (res.data.role) Cookies.set('role', res.data.role, { expires: 7, sameSite: 'Lax' });
      if (res.data.token) Cookies.set('token', res.data.token, { expires: 7, sameSite: 'Lax' });

      navigate("/home");
      dispatch(showToast({ message: "Registration completed!", type: "success" }));
    }

    dispatch(showToast({ message: res.data?.message || `Step ${step} completed!`, type: "success" }));
    dispatch(setCompletedSteps([...completedSteps, step]));

  } catch (error) {
    const message = error?.response?.data?.message || error?.message || "Something went wrong";
    dispatch(showToast({ message, type: "error" }));
  } finally {
    dispatch(setLoading(false));
  }
};
