import { User, Edit, Settings, CheckCircle, AlertCircle, Star, LogOut, Shield, MapPin, Phone, Mail, Camera } from 'lucide-react';
import { useState } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    Cookies.remove("token");
    Cookies.remove("role");
    setShowLogoutModal(false);
    navigate("/login");
    return;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Logout */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-white/30">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-600">Manage your profile information</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <button className="absolute bottom-0 right-0 bg-white text-blue-500 p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                  <h4 className="text-xl font-bold mb-1">Ravi Kumar</h4>
                  <p className="text-blue-100 mb-2">⚡ Verified Electrician</p>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Star size={14} fill="currentColor" />
                    <span>4.8 (156 reviews)</span>
                  </div>
                  
                  <div className="w-full space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={16} />
                      <span>Hyderabad, Telangana</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={16} />
                      <span>+91 9876543210</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={16} />
                      <span>ravi.kumar@example.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-lg">
                  <Edit size={18} />
                  Edit Profile
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Settings size={18} />
                  Account Settings
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors shadow-lg">
                  <Shield size={18} />
                  Verify Account
                </button>
              </div>
            </div>
            
            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value="Ravi Kumar"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value="+91 9876543210"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value="ravi.kumar@example.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value="1990-05-15"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      rows={2}
                      value="Flat 304, Green Valley Apartments, Gachibowli, Hyderabad, Telangana - 500032"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Professional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <option>Electrical Work</option>
                      <option>AC Repair</option>
                      <option>Plumbing</option>
                      <option>Painting</option>
                      <option>General Repair</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                    <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                      <option>5+ years</option>
                      <option>3-5 years</option>
                      <option>1-3 years</option>
                      <option>Less than 1 year</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills & Specializations</label>
                    <textarea
                      rows={3}
                      value="Electrical wiring, Switchboard installation, Circuit breaker repair, Home automation, Lighting installation, Electrical safety inspection"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
                    <textarea
                      rows={3}
                      value="Professional electrician with 5+ years of experience in residential and commercial electrical work. Specialized in modern electrical systems and home automation."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Verification & Documents</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={20} />
                      <div>
                        <p className="font-medium text-gray-800">ID Proof Verified</p>
                        <p className="text-sm text-gray-600">Aadhaar Card • Uploaded on 15 Jan 2023</p>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={20} />
                      <div>
                        <p className="font-medium text-gray-800">Address Proof Verified</p>
                        <p className="text-sm text-gray-600">Electricity Bill • Uploaded on 15 Jan 2023</p>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="text-yellow-500" size={20} />
                      <div>
                        <p className="font-medium text-gray-800">Professional Certificate</p>
                        <p className="text-sm text-gray-600">ITI Electrician • Pending verification</p>
                      </div>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                      Upload
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <LogOut className="text-red-500" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Confirm Logout</h3>
                <p className="text-gray-600">Are you sure you want to log out?</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;