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


export default function RenderStep2()
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
  
    const dispatch = useDispatch();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">How do you want to use ServiceHub?</h3>
        <p className="text-gray-600">Choose your role to get personalized experience</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div 
          onClick={() => dispatch(updateForm({ role: 'customer' }))}
          className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
            form.role === 'customer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              form.role === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <span className="text-xl">👤</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">I'm a Customer</h4>
              <p className="text-gray-600 text-sm">Looking for services and professionals</p>
            </div>
          </div>
        </div>
        
        <div 
          onClick={() => dispatch(updateForm({ role: 'provider' }))}
          className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
            form.role === 'provider' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              form.role === 'provider' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              <span className="text-xl">🏢</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">I'm a Service Provider</h4>
              <p className="text-gray-600 text-sm">Offering services to customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}