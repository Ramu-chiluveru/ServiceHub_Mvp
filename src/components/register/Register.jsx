import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { validatePassword,call_to_register } from "../../utils";

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
} from "../../store/slices/formSlice";

import RenderStep1 from "./Step1";
import RenderStep2 from "./Step2";
import RenderStep3 from "./Step3";
import StepIndicator from "./Indicator";

export default function MultiStepRegister()
{
  
  const { 
    currentStep,
    generatedOtp, 
    form, 
    showPassword, 
    toasts,
    completedSteps,
    otpSent,
    resendTimer,
    otpValid,
    loading 
  } = useSelector((state) => state.form);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => dispatch(setResendTimer(resendTimer - 1)), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, dispatch]);

  useEffect(() => {
    const toastTimeouts = toasts.map(toast => {
      return setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, 3000);
    });

    return () => {
      toastTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [toasts, dispatch]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    dispatch(updateForm({ [name]: value }));
    if (name === "otp") {
      dispatch(setOtpValid(value === generatedOtp));
    }
  };


  const handleStepSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (currentStep === 1) {
      if (!otpSent) {
        dispatch(showToast({ message: "Please verify email with OTP.", type: "error" }));
        return;
      }
      if (!form.otp || form.otp !== generatedOtp) {
        dispatch(showToast({ message: "Invalid OTP.", type: "error" }));
        return;
      }
      if (!form.firstName || !form.lastName) {
        dispatch(showToast({ message: "Enter full name.", type: "error" }));
        return;
      }
      if (!validatePassword(form.password)) {
        dispatch(showToast({ message: "Password must be at least 6 chars with capital letter & number.", type: "error" }));
        return;
      }
      if (form.password !== form.confirmPassword) {
        dispatch(showToast({ message: "Passwords do not match.", type: "error" }));
        return;
      }
      
      call_to_register({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password
      }, 1, dispatch, completedSteps, navigate);

    } else if (currentStep === 2) {
      if (!form.role) {
        dispatch(showToast({ message: "Please select your role.", type: "error" }));
        return;
      }
      
      call_to_register({ 
        email: form.email,
        role: form.role 
      }, 2,dispatch,completedSteps,navigate);
    } else if (currentStep === 3) {
      if (!form.phone || !form.street || !form.village || !form.mandal || !form.district || !form.state || !form.pincode) {
        dispatch(showToast({ message: "Please fill all required fields.", type: "error" }));
        return;
      }
      
      if (form.role === 'provider' && form.services.length === 0) {
        dispatch(showToast({ message: "Please select at least one service.", type: "error" }));
        return;
      }
      
      call_to_register({
        email: form.email,
        phone: form.phone,
        street: form.street,
        village: form.village,
        mandal: form.mandal,
        district: form.district,
        state: form.state,
        pincode: form.pincode,
        ...(form.role === 'customer' ? { preferences: form.preferences } : {}),
        ...(form.role === 'provider' ? {
          services: form.services
        } : {})
      }, 3,dispatch,completedSteps,navigate);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center px-4 py-8 m-8">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to <span className="text-blue-600">Service</span><span className="text-green-500">Hub</span>
          </h1>
          <p className="text-gray-600">Join our community of service providers and customers</p>
        </div>

        <StepIndicator />

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {currentStep === 1 && (
            <>
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 mb-6">
                <FcGoogle className="text-xl" />
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>

              <div className="relative text-center text-gray-500 mb-6">
                <span className="px-4 bg-white text-sm">or continue with email</span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
              </div>
            </>
          )}

          <div className="space-y-6">
            {currentStep === 1 && <RenderStep1 handleChange={handleChange} handleStepSubmit={handleStepSubmit}/>}
            {currentStep === 2 && <RenderStep2/>}
            {currentStep === 3 && <RenderStep3 handleChange={handleChange} />}

            <button
              onClick={handleStepSubmit}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                currentStep === 3 ? 'Complete Registration' : 'Continue'
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? 
            <Link to="/login" className="text-blue-600 hover:underline font-medium ml-1">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
              toast.type === 'success' ? 'bg-green-500' :
              toast.type === 'error' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
            onClick={() => dispatch(removeToast(toast.id))}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
}