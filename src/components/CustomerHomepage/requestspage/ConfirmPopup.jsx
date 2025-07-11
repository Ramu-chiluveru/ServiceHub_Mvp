import React, { useState } from "react";
import Cookies from "js-cookie";
import { AlertCircle, CheckCircle, X } from "lucide-react";

const ConfirmPopup = ({ message, id, onClose }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    const token = Cookies.get("token");
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const endpoint = `${BASE_URL}/api/customer/job/${id}`;
    const payload = { status : "cancelled"};

    console.log(`endpoint: ${endpoint} with token: ${token}`);

    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      setLoading(false);

      if (!response.ok) 
      {
        setStatus("error");
        return;
      }

      setStatus("success");
    } 
    catch (err) 
    {
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center relative">
        {/* Cross Icon inside popup (relative container) */}
        <button
          onClick={() => onClose({ confirm: false, id: "" })}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={20} />
        </button>

        {status === null && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {message} <span className="text-blue-600 font-mono">{id}</span>
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => onClose({ confirm: false, id: "" })}
                className="px-5 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm"}
              </button>
            </div>
          </>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <div>
                <p className="text-red-800 font-semibold">Request Failed</p>
                <p className="text-red-700 text-sm">
                  Please try again or check your internet connection.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setStatus(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Request Submitted Successfully!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmPopup;
