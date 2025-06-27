import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Clock, AlertCircle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  Cookies from 'js-cookie';

// Default sample notifications data
const defaultNotifications = [
  {
    _id: '1',
    title: 'New Service Request',
    message: 'You have a new AC repair request from John D.',
    type: 'alert',
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    _id: '2',
    title: 'Appointment Reminder',
    message: 'Your electrical service appointment is tomorrow at 2 PM',
    type: 'reminder',
    read: false,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    _id: '3',
    title: 'Payment Received',
    message: 'Your payment of ₹1200 for plumbing service has been processed',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  },
  {
    _id: '4',
    title: 'Service Rating',
    message: 'Customer rated your recent service 5 stars!',
    type: 'info',
    read: false,
    createdAt: new Date(Date.now() - 259200000).toISOString() // 3 days ago
  },
  {
    _id: '5',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Friday from 10 PM to 12 AM',
    type: 'reminder',
    read: true,
    createdAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useSampleData, setUseSampleData] = useState(false);
  const navigate = useNavigate();
  const userEmail = Cookies.get("email");

  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/notifications/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        // If API fails, use sample data
        setNotifications(defaultNotifications);
        setUseSampleData(true);
        setError('Could not connect to server. Showing sample notifications.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userEmail, navigate]);

  // ... rest of your existing functions (markAsRead, deleteNotification)

  if (loading) return <div className="min-h-screen pt-16 flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bell className="h-6 w-6 mr-2 text-blue-600" />
            Notifications
          </h1>
          <div className="flex items-center space-x-4">
            {useSampleData && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Using Sample Data
              </span>
            )}
            <button 
              onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Mark all as read
            </button>
          </div>
        </div>
        
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No notifications yet</h2>
            <p className="text-gray-500">You'll see important updates here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification._id} 
                className={`bg-white rounded-lg shadow-sm p-4 ${!notification.read ? 'border-l-4 border-blue-500' : ''}`}
              >
                <div className="flex justify-between">
                  <div className="flex items-start">
                    {notification.type === 'reminder' && (
                      <Clock className="h-5 w-5 mt-0.5 mr-3 text-yellow-500" />
                    )}
                    {notification.type === 'alert' && (
                      <AlertCircle className="h-5 w-5 mt-0.5 mr-3 text-red-500" />
                    )}
                    {notification.type === 'info' && (
                      <Info className="h-5 w-5 mt-0.5 mr-3 text-blue-500" />
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                        {useSampleData && ' (sample)'}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification._id)}
                        className="text-gray-400 hover:text-green-500"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => deleteNotification(notification._id)}
                      className="text-gray-400 hover:text-red-500"
                      title="Delete"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}