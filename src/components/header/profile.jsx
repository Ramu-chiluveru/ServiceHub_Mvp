import React, { useState, useEffect } from 'react';
import { UserCircle, Settings, Calendar, Bell, Heart, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user/profile/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userEmail, navigate]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/update/${userEmail}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="min-h-screen pt-16 flex justify-center items-center">Loading...</div>;
  if (error) return <div className="min-h-screen pt-16 flex justify-center items-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <UserCircle className="h-16 w-16 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500">{user.email}</p>
              <button 
                className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => navigate('/settings')}
              >
                Edit Profile
              </button>
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
                  <p className="text-sm text-gray-600"><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {user.email}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {user.phone || 'Not provided'}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-2">Account Details</h3>
                  <p className="text-sm text-gray-600"><span className="font-medium">Member since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Last updated:</span> {new Date(user.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <button 
                    onClick={() => navigate('/my-bookings')}
                    className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 p-3 rounded-lg hover:bg-blue-100"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Bookings</span>
                  </button>
                  <button 
                    onClick={() => navigate('/favorites')}
                    className="flex items-center justify-center gap-2 bg-pink-50 text-pink-600 p-3 rounded-lg hover:bg-pink-100"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Favorites</span>
                  </button>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}