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

export default function StepIndicator()
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

    const steps = [
        { id: 1, title: "Register", icon: "👤" },
        { id: 2, title: "Role", icon: "🏢" },
        { id: 3, title: "Complete Profile", icon: "📋" }
      ];


  return (
        <div className="flex items-center justify-center mb-3">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const isAccessible = step.id <= currentStep || isCompleted;
            
            return (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex flex-col items-center ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                  onClick={() => isAccessible && dispatch(setCurrentStep(step.id))}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isCurrent ? 'bg-blue-500 border-blue-500 text-white' :
                    'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <AiOutlineCheckCircle className="text-lg" />
                    ) : (
                      <span className="text-lg">{step.icon}</span>
                    )}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
  );
}