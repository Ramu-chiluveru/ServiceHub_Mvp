import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NEW: Add role selection (customer or service provider)
  const [role, setRole] = useState("customer"); // default to 'customer'

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return toast.error("Enter a valid Gmail address.");
    if (!password) return toast.error("Password is required.");

    try {
      // ✅ Changed: use correct API endpoint based on selected role
      const endpoint = role === "customer"
        ? "http://localhost:8080/api/customer/login"
        : "http://localhost:8080/api/provider/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Logged in successfully!");
        // You can redirect or store login info here
      } else {
        toast.error(data.message || "Login failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome back 👋</h2>
        <p className="text-center text-sm text-gray-500">
          Log in to continue to <span className="text-blue-600 font-semibold text-[20px]">ServiceHub</span>
        </p>

        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-lg hover:bg-gray-100 transition">
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>

        <div className="relative text-center text-gray-500">
          <span className="px-2 bg-white">or</span>
          <div className="absolute inset-0 border-b" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ NEW: Role selection dropdown */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="customer">Customer</option>
            <option value="provider">Service Provider</option>
          </select>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Gmail"
            className="w-full border rounded px-3 py-2"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
