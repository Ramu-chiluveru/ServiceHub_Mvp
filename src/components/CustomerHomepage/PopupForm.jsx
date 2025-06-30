import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import Cookies from 'js-cookie';

const PopupForm = ({ onClose, onRequestAdded, onViewRequests }) => {
  const [servicename, setServicename] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async() => {
    if (servicename && description && price) 
    {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const endpoint = `${BASE_URL}/api/customer/job`;
      const payload = {
        requestName:servicename,
        description:description,
        price:price,
        image:image
      }
      const res = await fetch(endpoint,{
        method: 'POST',
        headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                  },
        body: JSON.stringify(payload)
      });

      console.log('res: ',res);
      
      if (!res.ok) {
        setStatus('error in request');
        return;
      }
        setStatus('success');
      
      if (onRequestAdded)
      {
        onRequestAdded({
          servicename,
          description,
          price,
          image
        });
      }
    } else {
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-sm px-4 py-8 overflow-y-auto"
    >
      <div
        className="relative bg-white shadow-2xl rounded-2xl w-full max-w-xl p-6 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // prevent bubbling
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition z-10"
        >
          <X size={24} />
        </button>

        {/* Success UI */}
        {status === 'success' ? (
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-600 w-16 h-16 mb-4" />
            <p className="text-green-700 font-semibold text-lg mb-4">
              Request Raised Successfully!
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  if (onViewRequests) {
                    onViewRequests();
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                View My Requests
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Raise a Service Request
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Service Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={servicename}
                onChange={(e) => setServicename(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Affordable Price"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* Image Upload */}
              <div className="w-full">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-6 cursor-pointer hover:bg-blue-50 transition"
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border mb-2"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-10 h-10 mb-2 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16v-4m0 0V8m0 4h4m-4 0H8m-4 4V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H8l-4-4z"
                        />
                      </svg>
                      <p className="text-blue-500 font-medium">Click to upload image</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </>
                  )}
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Submit
              </button>
            </div>

            {/* Error Message */}
            {status === 'error' && (
              <p className="mt-4 text-red-600 text-center font-medium">
                Please fill in all fields and upload an image.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PopupForm;
