 import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
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
import {sendOtp,validateEmail,validatePassword} from "../../utils";


 export default function RenderStep1({handleChange,handleStepSubmit})
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


    const sendOtp = () => 
    {
        if (!validateEmail(form.email)) 
        {
          dispatch(showToast({ message: "Enter a valid email address.", type: "error" }));
          return;
        }
        const fakeOtp = "123456";
        dispatch(setGeneratedOtp(fakeOtp));
        dispatch(setOtpSent(true));
        dispatch(setResendTimer(30));
        dispatch(showToast({ message: "OTP sent to your email.", type: "success" }));
    };

  const dispatch = useDispatch();

   return (
    <div className="space-y-4">
      <div className="space-y-2">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
          required
        />
        <div className="flex gap-2 items-center">
          <input
            type="text"
            name="otp"
            value={form.otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className={`flex-1 border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
              otpValid === true ? 'border-green-500 bg-green-50' : 
              otpValid === false ? 'border-red-500 bg-red-50' : 
              'border-gray-200 focus:border-blue-500'
            }`}
          />
          {otpValid === true && <AiOutlineCheckCircle className="text-green-600 text-2xl" />}
          {otpValid === false && <span className="text-red-500 text-sm font-medium">Invalid</span>}

          <button
            type="button"
            onClick={sendOtp}
            className="w-[50px] md:w-auto px-3 md:px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            disabled={resendTimer > 0 || otpValid === true}
          >
            {resendTimer > 0 ? `${resendTimer}s` : "OTP"}
          </button>


        </div>
      </div>
      {otpSent && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex gap-3">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => dispatch(setShowPassword(!showPassword))}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none transition-colors"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => dispatch(setShowPassword(!showPassword))}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      )}
    </div>

   );
 }