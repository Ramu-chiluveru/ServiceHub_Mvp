import { User, Edit, Settings, CheckCircle, AlertCircle, Star } from 'lucide-react';

const Profile = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <User className="text-blue-500" />
          My Profile
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
                    <Edit size={16} />
                  </button>
                </div>
                <h4 className="text-xl font-bold text-gray-800">Ravi Kumar</h4>
                <p className="text-gray-600 mb-2">⚡ Verified Electrician</p>
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Star size={14} fill="currentColor" />
                  <span>4.8 (156 reviews)</span>
                </div>
                
                <div className="w-full space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                    <Edit size={16} />
                    Edit Profile
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Settings size={16} />
                    Account Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value="Ravi Kumar"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value="+91 9876543210"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value="ravi.kumar@example.com"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value="Hyderabad, Telangana"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-4">Professional Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
                  <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Electrical Work</option>
                    <option>AC Repair</option>
                    <option>Plumbing</option>
                    <option>Painting</option>
                    <option>General Repair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
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
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
  );
};

export default Profile;