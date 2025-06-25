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

export default function RenderStep3({handleChange})
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


  const serviceCategories = [
      "Home Cleaning", "Plumbing", "Electrical", "Gardening", 
      "Tutoring", "Beauty & Wellness", "Appliance Repair", "Carpentry"
    ];
  
  const preferences = [
      "Home Services", "Education", "Health & Wellness", "Technology",
      "Beauty & Personal Care", "Events & Entertainment"
    ];


  const handleMultiSelect = (name, value) => {
      const currentArray = form[name] || [];
      if (currentArray.includes(value)) {
        dispatch(updateForm({ [name]: currentArray.filter(item => item !== value) }));
      } else {
        dispatch(updateForm({ [name]: [...currentArray, value] }));
      }
    };
  
    
  

  return(
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Your Profile</h3>
        <p className="text-gray-600">Help us personalize your ServiceHub experience</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-xl">📞</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
        </div>
        
        <h4 className="font-semibold text-gray-800 mt-6">Address Details</h4>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="Street/House No"
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
          <input
            type="text"
            name="village"
            value={form.village}
            onChange={handleChange}
            placeholder="Village/Town"
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
          <input
            type="text"
            name="mandal"
            value={form.mandal}
            onChange={handleChange}
            placeholder="Mandal"
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
          <input
            type="text"
            name="district"
            value={form.district}
            onChange={handleChange}
            placeholder="District"
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            placeholder="Pincode"
            className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
            required
          />
        </div>

        {form.role === 'customer' && (
          <div className="space-y-4 border-t pt-6">
            <h4 className="font-semibold text-gray-800">Your Interests</h4>
            <div className="grid grid-cols-2 gap-3">
              {preferences.map(pref => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => handleMultiSelect('preferences', pref)}
                  className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
                    form.preferences?.includes(pref) 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        )}

        {form.role === 'provider' && (
          <div className="space-y-6 border-t pt-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Services You Offer</h4>
              <div className="grid grid-cols-2 gap-3">
                {serviceCategories.map(service => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleMultiSelect('services', service)}
                    className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
                      form.services?.includes(service) 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}