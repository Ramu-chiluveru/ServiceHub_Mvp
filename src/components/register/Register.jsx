// Register.jsx
import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCheckCircle } from "react-icons/ai"; // From Ant Design Icons
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpValid, setOtpValid] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState("");

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "otp") 
    {
      setOtpValid(value === generatedOtp);
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
      toast.error("Enter a valid Gmail address.");
      return;
    }
    const fakeOtp = "123456"; // Replace with generated OTP from backend in real scenario
    setGeneratedOtp(fakeOtp);
    setOtpSent(true);
    setResendTimer(30);
    toast.success("OTP sent to your email.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) return toast.error("Please verify email with OTP.");
    if (!form.otp || form.otp !== generatedOtp) return toast.error("Invalid OTP.");
    if (!form.firstName || !form.lastName) return toast.error("Enter full name.");
    if (!validatePassword(form.password))
      return toast.error("Password must be at least 6 chars with capital letter & number.");
    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match.");
    toast.success("Registered successfully!");
    // proceed with form submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 gap-1">
      <h1 className="text-gray-400 font-extrabold text-[32px] text-center tracking-wide">
          Welcome to <span className="text-blue-600">Service</span><span className="text-green-400">Hub</span>
        </h1>
        <p className="text-sm text-center text-gray-500 -mt-4">Join us to explore services near you</p>
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Create your account</h2>

        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-lg hover:bg-gray-100 transition">
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        <div className="relative text-center text-gray-500">
          <span className="px-2 bg-white">or</span>
          <div className="absolute inset-0 border-b" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Gmail"
              className="w-full border rounded px-3 py-2"
              required
            />
            <div className="flex gap-2 items-center">
              <input
                type="text"
                name="otp"
                value={form.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className={`flex-1 border rounded px-3 py-2 ${otpValid === true ? 'border-green-500' : otpValid === false ? 'border-red-500' : ''}`}
              />
              {otpValid === true && <AiOutlineCheckCircle className="text-green-600 text-xl" />}
              {otpValid === false && <span className="text-red-500 text-sm">Wrong OTP</span>}
              <button
                type="button"
                onClick={sendOtp}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? `${resendTimer}s` : "Send OTP"}
              </button>
            </div>
          </div>

          {otpSent && (
            <>
              <div className="flex gap-1">
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full border rounded px-3 py-2"
                  />

                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full border rounded px-3 py-2"
                  />
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border rounded px-3 py-2"
              />
            </>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link to={"/login"} className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
