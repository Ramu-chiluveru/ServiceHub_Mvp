import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  Cookies from 'js-cookie';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userEmail, navigate]);

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark notification as read');
      }
      
      setNotifications(notifications.map(notification => 
        notification._id === notificationId 
          ? { ...notification, read: true } 
          : notification
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete notification');
      }
      
      setNotifications(notifications.filter(notification => notification._id !== notificationId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="min-h-screen pt-16 flex justify-center items-center">Loading...</div>;
  if (error) return <div className="min-h-screen pt-16 flex justify-center items-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Bell className="h-6 w-6 mr-2 text-blue-600" />
            Notifications
          </h1>
          <button 
            onClick={() => {
              // Mark all as read API call would go here
              setNotifications(notifications.map(n => ({ ...n, read: true })));
            }}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>
        
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
                      <Bell className="h-5 w-5 mt-0.5 mr-3 text-blue-500" />
                    )}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
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