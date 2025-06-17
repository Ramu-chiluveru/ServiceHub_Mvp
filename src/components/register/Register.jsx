// import React, { useState, useEffect } from "react";
// import { toast, Toaster } from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";
// import { AiOutlineCheckCircle } from "react-icons/ai"; // From Ant Design Icons
// import { Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";

// export default function MultiStepRegister() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedSteps, setCompletedSteps] = useState([]);

//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     // Step 1: Basic Registration
//     email: "",
//     otp: "",
//     firstName: "",
//     lastName: "",
//     password: "",
//     confirmPassword: "",
//     // Step 2: Role Selection
//     role: "",
//     // Step 3: Profile Completion
//     phone: "",
//     address: "",
//     profileImage: null,
//     // Customer specific
//     preferences: [],
//     // Service Provider specific
//     businessName: "",
//     services: [],
//     experience: "",
//     availability: "",
//     portfolio: [],
//     certification: null,
//     pricing: ""
//   });

//   const [otpSent, setOtpSent] = useState(false);
//   const [resendTimer, setResendTimer] = useState(0);
//   const [otpValid, setOtpValid] = useState(null);
//   const [generatedOtp, setGeneratedOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Toast notification system
//   const [toasts, setToasts] = useState([]);

//   const showToast = (message, type = 'info') => {
//     const id = Date.now();
//     const newToast = { id, message, type };
//     setToasts(prev => [...prev, newToast]);
//     setTimeout(() => {
//       setToasts(prev => prev.filter(toast => toast.id !== id));
//     }, 4000);
//   };

//   const steps = [
//     { id: 1, title: "Register", icon: "👤" },
//     { id: 2, title: "Role", icon: "🏢" },
//     { id: 3, title: "Complete Profile", icon: "📋" }
//   ];

//   const serviceCategories = [
//     "Home Cleaning", "Plumbing", "Electrical", "Gardening", 
//     "Tutoring", "Beauty & Wellness", "Appliance Repair", "Carpentry"
//   ];

//   const preferences = [
//     "Home Services", "Education", "Health & Wellness", "Technology",
//     "Beauty & Personal Care", "Events & Entertainment"
//   ];

//   useEffect(() => {
//     if (resendTimer > 0) {
//       const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [resendTimer]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === 'file') 
//     {
//       setForm({ ...form, [name]: files[0] });
//     } else 
//     {
//       setForm({ ...form, [name]: value });
//       if (name === "otp") 
//       {
//         setOtpValid(value === generatedOtp);
//       }
//     }
//   };

//   const handleMultiSelect = (name, value) => {
//     const currentArray = form[name] || [];
//     if (currentArray.includes(value)) {
//       setForm({ ...form, [name]: currentArray.filter(item => item !== value) });
//     } else {
//       setForm({ ...form, [name]: [...currentArray, value] });
//     }
//   };

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
//   };

//   const sendOtp = () => {
//     if (!validateEmail(form.email)) {
//       showToast("Enter a valid email address.", "error");
//       return;
//     }
//     const fakeOtp = "123456";
//     setGeneratedOtp(fakeOtp);
//     setOtpSent(true);
//     setResendTimer(30);
//     showToast("OTP sent to your email.", "success");
//   };

//   const sendToBackend = async (stepData, step) => {
//     setLoading(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // Mock API endpoints for each step
//       const endpoints = {
//         1: '/api/auth/register',
//         2: '/api/user/role',
//         3: '/api/user/profile'
//       };

//       console.log(`Sending to ${endpoints[step]}:`, stepData);

//       // Simulate success response
//       showToast(`Step ${step} completed successfully!`, "success");
//       setCompletedSteps([...completedSteps, step]);

//       if (step < 3) {
//         setCurrentStep(step + 1);
//       } else {
//         showToast("Registration completed! Welcome to ServiceHub!", "success");
//         // Redirect to dashboard or login
//       }
//     } catch (error) {
//       showToast("Something went wrong. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStepSubmit = (e) => {
//     if (e) e.preventDefault();

//     if (currentStep === 1) {
//       // Validate Step 1
//       if (!otpSent) return showToast("Please verify email with OTP.", "error");
//       if (!form.otp || form.otp !== generatedOtp) return showToast("Invalid OTP.", "error");
//       if (!form.firstName || !form.lastName) return showToast("Enter full name.", "error");
//       if (!validatePassword(form.password)) return showToast("Password must be at least 6 chars with capital letter & number.", "error");
//       if (form.password !== form.confirmPassword) return showToast("Passwords do not match.", "error");

//       const stepData = {
//         email: form.email,
//         firstName: form.firstName,
//         lastName: form.lastName,
//         password: form.password
//       };
//       sendToBackend(stepData, 1);

//     } else if (currentStep === 2) {
//       // Validate Step 2
//       if (!form.role) return showToast("Please select your role.", "error");

//       const stepData = { role: form.role };
//       sendToBackend(stepData, 2);

//     } else if (currentStep === 3) {
//       // Validate Step 3
//       if (!form.phone || !form.address) return showToast("Please fill all required fields.", "error");

//       if (form.role === 'provider' && (!form.businessName || form.services.length === 0)) {
//         return showToast("Please complete your business information.", "error");
//       }

//       const stepData = {
//         phone: form.phone,
//         address: form.address,
//         profileImage: form.profileImage,
//         ...(form.role === 'customer' ? { preferences: form.preferences } : {}),
//         ...(form.role === 'provider' ? {
//           businessName: form.businessName,
//           services: form.services,
//           experience: form.experience,
//           availability: form.availability,
//           pricing: form.pricing
//         } : {})
//       };
//       sendToBackend(stepData, 3);
//     }
//   };

//   const StepIndicator = () => (
//     <div className="flex items-center justify-center mb-8">
//       {steps.map((step, index) => {
//         const isCompleted = completedSteps.includes(step.id);
//         const isCurrent = currentStep === step.id;
//         const isAccessible = step.id <= currentStep || isCompleted;

//         return (
//           <div key={step.id} className="flex items-center">
//             <div className={`flex flex-col items-center ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
//               <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
//                 isCompleted ? 'bg-green-500 border-green-500 text-white' :
//                 isCurrent ? 'bg-blue-500 border-blue-500 text-white' :
//                 'bg-gray-100 border-gray-300 text-gray-400'
//               }`}>
//                 {isCompleted ? (
//                   <span className="text-lg">✓</span>
//                 ) : (
//                   <span className="text-lg">{step.icon}</span>
//                 )}
//               </div>
//               <span className={`text-xs mt-2 font-medium ${
//                 isCompleted || isCurrent ? 'text-gray-800' : 'text-gray-400'
//               }`}>
//                 {step.title}
//               </span>
//             </div>
//             {index < steps.length - 1 && (
//               <div className={`w-16 h-0.5 mx-4 ${
//                 completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-300'
//               }`} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );

//   const renderStep1 = () => (
//     <div className="space-y-4">
//       <div className="space-y-2">
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Enter your email"
//           className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//           required
//         />
//         <div className="flex gap-2 items-center">
//           <input
//             type="text"
//             name="otp"
//             value={form.otp}
//             onChange={handleChange}
//             placeholder="Enter OTP"
//             className={`flex-1 border-2 rounded-lg px-4 py-3 focus:outline-none transition-colors ${
//               otpValid === true ? 'border-green-500 bg-green-50' : 
//               otpValid === false ? 'border-red-500 bg-red-50' : 
//               'border-gray-200 focus:border-blue-500'
//             }`}
//           />
//           {otpValid === true && <span className="text-green-600 text-2xl">✓</span>}
//           {otpValid === false && <span className="text-red-500 text-sm font-medium">Invalid</span>}
//           <button
//             type="button"
//             onClick={sendOtp}
//             className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//             disabled={resendTimer > 0 || otpValid === true}
//           >
//             {resendTimer > 0 ? `${resendTimer}s` : "OTP"}
//           </button>
//         </div>
//       </div>

//       {otpSent && (
//         <div className="space-y-4 animate-fadeIn">
//           <div className="flex gap-3">
//             <input
//               type="text"
//               name="firstName"
//               value={form.firstName}
//               onChange={handleChange}
//               placeholder="First Name"
//               className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//             />
//             <input
//               type="text"
//               name="lastName"
//               value={form.lastName}
//               onChange={handleChange}
//               placeholder="Last Name"
//               className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//             />
//           </div>
//           <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           placeholder="Create Password"
//           className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none transition-colors"
//         />
//         <div
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//         </div>
//       </div>

//       {/* Confirm Password Field */}
//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           name="confirmPassword"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm Password"
//           className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 focus:border-blue-500 focus:outline-none transition-colors"
//         />
//         <div
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//         </div>
//       </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">How do you want to use ServiceHub?</h3>
//         <p className="text-gray-600">Choose your role to get personalized experience</p>
//       </div>

//       <div className="grid grid-cols-1 gap-4">
//         <div 
//           onClick={() => setForm({...form, role: 'customer'})}
//           className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
//             form.role === 'customer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
//           }`}
//         >
//           <div className="flex items-center space-x-4">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//               form.role === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
//             }`}>
//               <span className="text-xl">👤</span>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-800">I'm a Customer</h4>
//               <p className="text-gray-600 text-sm">Looking for services and professionals</p>
//             </div>
//           </div>
//         </div>

//         <div 
//           onClick={() => setForm({...form, role: 'provider'})}
//           className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
//             form.role === 'provider' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
//           }`}
//         >
//           <div className="flex items-center space-x-4">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//               form.role === 'provider' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
//             }`}>
//               <span className="text-xl">🏢</span>
//             </div>
//             <div>
//               <h4 className="font-semibold text-gray-800">I'm a Service Provider</h4>
//               <p className="text-gray-600 text-sm">Offering services to customers</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const renderStep3 = () => (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete Your Profile</h3>
//         <p className="text-gray-600">Help us personalize your ServiceHub experience</p>
//       </div>

//       {/* Common fields */}
//       <div className="space-y-4">
//         <div className="flex items-center space-x-4">
//           <span className="text-gray-400 text-xl">📞</span>
//           <input
//             type="tel"
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             placeholder="Phone Number"
//             className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <span className="text-gray-400 text-xl">📍</span>
//           <textarea
//             name="address"
//             value={form.address}
//             onChange={handleChange}
//             placeholder="Your Address"
//             rows="3"
//             className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors resize-none"
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <span className="text-gray-400 text-xl">📷</span>
//           <input
//             type="file"
//             name="profileImage"
//             onChange={handleChange}
//             accept="image/*"
//             className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//           />
//         </div>
//       </div>

//       {/* Customer specific fields */}
//       {form.role === 'customer' && (
//         <div className="space-y-4 border-t pt-6">
//           <h4 className="font-semibold text-gray-800">Your Interests</h4>
//           <div className="grid grid-cols-2 gap-3">
//             {preferences.map(pref => (
//               <button
//                 key={pref}
//                 type="button"
//                 onClick={() => handleMultiSelect('preferences', pref)}
//                 className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
//                   form.preferences.includes(pref) 
//                     ? 'border-blue-500 bg-blue-50 text-blue-700' 
//                     : 'border-gray-200 hover:border-gray-300'
//                 }`}
//               >
//                 {pref}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Service Provider specific fields */}
//       {form.role === 'provider' && (
//         <div className="space-y-6 border-t pt-6">
//           <div className="space-y-4">
//             <input
//               type="text"
//               name="businessName"
//               value={form.businessName}
//               onChange={handleChange}
//               placeholder="Business Name"
//               className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//             />

//             <div>
//               <h4 className="font-semibold text-gray-800 mb-3">Services You Offer</h4>
//               <div className="grid grid-cols-2 gap-3">
//                 {serviceCategories.map(service => (
//                   <button
//                     key={service}
//                     type="button"
//                     onClick={() => handleMultiSelect('services', service)}
//                     className={`p-3 text-sm rounded-lg border-2 transition-all duration-200 ${
//                       form.services.includes(service) 
//                         ? 'border-green-500 bg-green-50 text-green-700' 
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     {service}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="experience"
//                 value={form.experience}
//                 onChange={handleChange}
//                 placeholder="Years of Experience"
//                 className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//               />
//               <input
//                 type="text"
//                 name="pricing"
//                 value={form.pricing}
//                 onChange={handleChange}
//                 placeholder="Starting Price (₹)"
//                 className="border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//               />
//             </div>

//             <div className="flex items-center space-x-4">
//               <span className="text-gray-400 text-xl">⏰</span>
//               <select
//                 name="availability"
//                 value={form.availability}
//                 onChange={handleChange}
//                 className="flex-1 border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors"
//               >
//                 <option value="">Select Availability</option>
//                 <option value="weekdays">Weekdays Only</option>
//                 <option value="weekends">Weekends Only</option>
//                 <option value="flexible">Flexible Hours</option>
//                 <option value="24x7">24/7 Available</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center px-4 py-8 m-10">
//       <div className="max-w-2xl w-full">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">
//             Welcome to <span className="text-blue-600">Service</span><span className="text-green-500">Hub</span>
//           </h1>
//           <p className="text-gray-600">Join our community of service providers and customers</p>
//         </div>

//         {/* Step Indicator */}
//         <StepIndicator />

//         {/* Form Container */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
//           {/* Google Sign Up Option (only for step 1) */}
//           {currentStep === 1 && (
//             <>
//               <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 mb-6">
//                 <FcGoogle className="text-xl" />
//                 <span className="font-medium text-gray-700">Continue with Google</span>
//               </button>

//               <div className="relative text-center text-gray-500 mb-6">
//                 <span className="px-4 bg-white text-sm">or continue with email</span>
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-200" />
//                 </div>
//               </div>
//             </>
//           )}

//           {/* Form Steps */}
//           <div className="space-y-6">
//             {currentStep === 1 && renderStep1()}
//             {currentStep === 2 && renderStep2()}
//             {currentStep === 3 && renderStep3()}

//             {/* Submit Button */}
//             <button
//               onClick={handleStepSubmit}
//               disabled={loading}
//               className="w-full py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {loading ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Processing...</span>
//                 </div>
//               ) : (
//                 currentStep === 3 ? 'Complete Registration' : 'Continue'
//               )}
//             </button>
//           </div>

//           {/* Login Link */}
//           <p className="text-center text-sm text-gray-600 mt-6">
//             Already have an account? 
//             <a href="/login" className="text-blue-600 hover:underline font-medium ml-1">
//               Sign in
//             </a>
//           </p>
//         </div>
//       </div>

//       {/* Custom Toast System */}
//       <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
//         {toasts.map(toast => (
//           <div
//             key={toast.id}
//             className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
//               toast.type === 'success' ? 'bg-green-500' :
//               toast.type === 'error' ? 'bg-red-500' :
//               'bg-blue-500'
//             }`}
//           >
//             {toast.message}
//           </div>
//         ))}
//       </div>

//       <Toaster 
//         position="top-center"
//         toastOptions={{
//           duration: 4000,
//           style: {
//             background: '#363636',
//             color: '#fff',
//             borderRadius: '10px',
//             fontSize: '14px'
//           }
//         }}
//       />

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// }


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

const BASE_URL = 'http://localhost:8080';

export default function MultiStepRegister() {
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

  const serviceCategories = [
    "Home Cleaning", "Plumbing", "Electrical", "Gardening", 
    "Tutoring", "Beauty & Wellness", "Appliance Repair", "Carpentry"
  ];

  const preferences = [
    "Home Services", "Education", "Health & Wellness", "Technology",
    "Beauty & Personal Care", "Events & Entertainment"
  ];

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

  const handleMultiSelect = (name, value) => {
    const currentArray = form[name] || [];
    if (currentArray.includes(value)) {
      dispatch(updateForm({ [name]: currentArray.filter(item => item !== value) }));
    } else {
      dispatch(updateForm({ [name]: [...currentArray, value] }));
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const sendOtp = () => {
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

  const sendToBackend = async (stepData, step) => {
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
        endpoint = "/api/user/profile";
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

      dispatch(showToast({ message: res.data || `Step ${step} completed!`, type: "success" }));
      dispatch(setCompletedSteps([...completedSteps, step]));

      if (step < 3) {
        dispatch(setCurrentStep(step + 1));
      } else {
        dispatch(showToast({ message: "Registration completed!", type: "success" }));
      }
    } catch (error) {
      const message = error?.response?.data || error?.message || "Something went wrong";
      dispatch(showToast({ message, type: "error" }));
    } finally {
      dispatch(setLoading(false));
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
      
      sendToBackend({
        email: form.email,
        firstName: form.firstName,
        lastName: form.lastName,
        password: form.password
      }, 1);
    } else if (currentStep === 2) {
      if (!form.role) {
        dispatch(showToast({ message: "Please select your role.", type: "error" }));
        return;
      }
      
      sendToBackend({ 
        email: form.email,
        role: form.role 
      }, 2);
    } else if (currentStep === 3) {
      if (!form.phone || !form.street || !form.village || !form.mandal || !form.district || !form.state || !form.pincode) {
        dispatch(showToast({ message: "Please fill all required fields.", type: "error" }));
        return;
      }
      
      if (form.role === 'provider' && form.services.length === 0) {
        dispatch(showToast({ message: "Please select at least one service.", type: "error" }));
        return;
      }
      
      sendToBackend({
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
      }, 3);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
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

  const renderStep1 = () => (
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
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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

  const renderStep2 = () => (
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

  const renderStep3 = () => (
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex flex-col items-center justify-center px-4 py-8">
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
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

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