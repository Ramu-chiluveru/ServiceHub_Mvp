// src/store/slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  completedSteps: [],
  showPassword: false,

  form: {
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    address: {
      street: "",
      city: "",
      village: "",
      mandal: "",
      district: "",
      state: "",
      pincode: ""
    },
    profileImage: null,
    preferences: [],
    businessName: "",
    services: [],
    experience: "",
    availability: "",
    portfolio: [],
    certification: null,
    pricing: ""
  },

  otpSent: false,
  resendTimer: 0,
  otpValid: null,
  generatedOtp: "",
  loading: false,

  toasts: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setCompletedSteps: (state, action) => {
      state.completedSteps = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    updateForm: (state, action) => {
      state.form = {
        ...state.form,
        ...action.payload
      };
    },
    updateAddress: (state, action) => {
      state.form.address = {
        ...state.form.address,
        ...action.payload
      };
    },
    setOtpSent: (state, action) => {
      state.otpSent = action.payload;
    },
    setResendTimer: (state, action) => {
      state.resendTimer = action.payload;
    },
    setOtpValid: (state, action) => {
      state.otpValid = action.payload;
    },
    setGeneratedOtp: (state, action) => {
      state.generatedOtp = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    showToast: (state, action) => {
      const id = Date.now();
      const newToast = { id, message: action.payload.message, type: action.payload.type || 'info' };
      state.toasts.push(newToast);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
    },
  }
});

export const {
  setCurrentStep,
  setCompletedSteps,
  setShowPassword,
  updateForm,
  updateAddress,
  setOtpSent,
  setResendTimer,
  setOtpValid,
  setGeneratedOtp,
  setLoading,
  showToast,
  removeToast
} = formSlice.actions;

export default formSlice.reducer;
