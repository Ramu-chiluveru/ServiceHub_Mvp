import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Upload, Star, AlertCircle } from 'lucide-react';
import Cookies from 'js-cookie';

const PopupForm = ({ onClose, onRequestAdded, onViewRequests,setEditingService,service }) => {
  // State management for form fields
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [servicename,setServicename] = useState('');
  const [status,setStatus] = useState('');

  const token = Cookies.get("token");

 useEffect(() => {
  if (service) {
    console.log(`service received: ${JSON.stringify(service)}`);
    setCategory(service.category || '');
    setDescription(service.description || '');
    setPrice(service.price || '');
    setServicename(service.servicename || '');
  }
}, [service]);


  // Service categories dropdown options
  const categories = [
    { value: 'plumbing', label: 'Plumbing Services' },
    { value: 'ac-repair', label: 'AC Repair & Maintenance' },
    { value: 'furniture', label: 'Furniture Assembly' },
    { value: 'electrical', label: 'Electrical Services' },
    { value: 'cleaning', label: 'Cleaning Services' },
    { value: 'carpentry', label: 'Carpentry & Woodwork' },
    { value: 'painting', label: 'Painting Services' },
    { value: 'appliance', label: 'Appliance Repair' },
    { value: 'pest-control', label: 'Pest Control' },
    { value: 'landscaping', label: 'Landscaping & Gardening' },
    { value: 'home-security', label: 'Home Security' },
    { value: 'other', label: 'Other Services' }
  ];


  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Form submission handler
  const handleSubmit = async () => {
  if (category && description && price && servicename) {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const isEditing = !!service;
    const endpoint = isEditing
      ? `${BASE_URL}/api/provider/service/${service.id}`  // PUT for update
      : `${BASE_URL}/api/provider/service`;               // POST for new

    const method = isEditing ? 'PUT' : 'POST';

    console.log(`endpoint: ${endpoint}`);
    const payload = {
      category,
      description,
      servicename,
      price,
      image
    };

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');

      if (onRequestAdded) {
        onRequestAdded(payload);
      }

      // Reset editing state after update
      if (isEditing && setEditingService) {
        setEditingService(null);
      }

    } catch (error) {
      console.error("Request failed:", error);
      setStatus('error');
    }
  } else {
    setStatus('error');
  }
};

  // const handleSubmit = async() => {
  //   if (category && description && price && servicename) 
  //   {
  //     const BASE_URL = import.meta.env.VITE_BASE_URL;
  //     const endpoint = `${BASE_URL}/api/provider/service`;
  //     const payload = {
  //       category: category,
  //       description: description,
  //       servicename: servicename,
  //       price: price,
  //       image: image
  //     }

  //     console.log(`token: ${token}`);
  //     console.log(`payload: ${JSON.stringify(payload)}`);
      
  //     try {
  //       const res = await fetch(endpoint, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`
  //         },
  //         body: JSON.stringify(payload)
  //       });

  //       console.log(res);

  //       if (!res.ok) 
  //       {
  //         setStatus('error');
  //         return;
  //       }
        
  //       setStatus('success');
        
  //       if (onRequestAdded) {
  //         onRequestAdded({
  //           category,
  //           description,
  //           price,
  //           servicename,
  //           image
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       setStatus('error');
  //     }
  //   } else {
  //     setStatus('error');
  //   }
  // };

  // Remove uploaded image
  const removeImage = () => {
    setImage(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-4 overflow-y-auto"
      onClick={(e) => {
        // Close only when clicking on backdrop
        if (e.target === e.currentTarget) 
        {
          console.log("close clicked");
          setEditingService(null);
          onClose();
        }
      }}
    >
      {/* Modal Container with fixed height and internal scrolling */}
      <div 
        className="relative bg-white shadow-2xl rounded-2xl w-full max-w-2xl mx-auto my-8 flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Gradient Background - fixed position */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-t-2xl relative">
          {/* Close Button */}
          <button
            onClick={(e) => {
                console.log("close clicked");
                setEditingService(null);
                onClose();
            }}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 z-10"
          >
            <X size={20} />
          </button>
          
          {/* Blue Heading as requested */}
          <h2 className="text-2xl font-bold mb-2 pr-12 text-blue-200">Add Service for Customers</h2>
        </div>

        {/* Form Content with scrollable area */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* Error State */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-red-800 font-medium">Request Failed</p>
                  <p className="text-red-700 text-sm">Please fill in all required fields and try again.</p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setStatus(null)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Added Successfully!</h3>
              <p className="text-gray-600 mb-6">Your service request has been received and will be processed shortly.</p>
              
              <div className="space-y-3">
                <button
                  onClick={onClose}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Form Fields */}
              <div className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Select a service category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Priority Selection - Changed to dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Title <span className="text-red-500">*</span>
                  </label>
                  <input
                  type='text'
                    value={servicename}
                    onChange={(e) => setServicename(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Describe the service you need in detail..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-colors"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter your budget"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                {/* Image Upload - Optional */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image <span className="text-gray-500">(Optional)</span>
                  </label>
                  
                  {image ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="imageUpload"
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-gray-600 font-medium mb-1">Click to upload image</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                    </label>
                  )}
                  
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                {/* Submit Button - Fixed at bottom */}
                <div className="pt-4">
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Submit Service Request
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;