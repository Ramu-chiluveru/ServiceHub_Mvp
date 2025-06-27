import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  Cookies from 'js-cookie';

// Default sample bookings data
const defaultBookings = [
  {
    _id: '1',
    serviceName: 'AC Repair Service',
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    time: '10:00 AM',
    location: '123 Main St, Bangalore',
    price: 1200,
    status: 'confirmed',
    technician: 'Rajesh Kumar',
    serviceDetails: 'Split AC repair and gas refill'
  },
  {
    _id: '2',
    serviceName: 'Plumbing Service',
    date: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    time: '2:30 PM',
    location: '456 Oak Ave, Bangalore',
    price: 800,
    status: 'confirmed',
    technician: 'Vikram Singh',
    serviceDetails: 'Kitchen sink leakage repair'
  },
  {
    _id: '3',
    serviceName: 'Electrical Wiring',
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    time: '11:00 AM',
    location: '789 Pine Rd, Bangalore',
    price: 1500,
    status: 'completed',
    technician: 'Anil Sharma',
    serviceDetails: 'Complete house wiring checkup'
  },
  {
    _id: '4',
    serviceName: 'Painting Service',
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    time: '9:00 AM',
    location: '321 Elm St, Bangalore',
    price: 3500,
    status: 'cancelled',
    cancellationReason: 'Customer rescheduled'
  }
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
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

    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/bookings/user/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        // If API fails, use sample data
        setBookings(defaultBookings);
        setUseSampleData(true);
        setError('Could not connect to server. Showing sample bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail, navigate]);

  const handleCancelBooking = async (bookingId) => {
    try {
      if (useSampleData) {
        // For sample data, just update locally
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: 'cancelled' } 
            : booking
        ));
        return;
      }

      const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      
      setBookings(bookings.filter(booking => booking._id !== bookingId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="min-h-screen pt-16 flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-600" />
            My Bookings
          </h1>
          <div className="flex items-center space-x-4">
            {useSampleData && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                Using Sample Data
              </span>
            )}
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book New Service
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

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-700 mb-2">No bookings yet</h2>
            <p className="text-gray-500 mb-4">You haven't made any bookings yet. Start by exploring our services.</p>
            <button 
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Services
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-gray-800">{booking.serviceName}</h3>
                        {useSampleData && (
                          <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            sample
                          </span>
                        )}
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{booking.location || 'Location not specified'}</span>
                      </div>
                      {booking.technician && (
                        <div className="mt-1 text-sm text-gray-600">
                          Technician: {booking.technician}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-800">₹{booking.price}</p>
                      <div className={`inline-flex items-center text-sm ${
                        booking.status === 'confirmed' ? 'text-green-600' : 
                        booking.status === 'completed' ? 'text-blue-600' :
                        booking.status === 'cancelled' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {booking.status === 'confirmed' && <CheckCircle2 className="h-4 w-4 mr-1" />}
                        {booking.status === 'cancelled' && <XCircle className="h-4 w-4 mr-1" />}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => navigate(`/booking-details/${booking._id}`)}
                      className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                      View details <ChevronRight className="h-4 w-4" />
                    </button>
                    {booking.status === 'confirmed' && (
                      <button 
                        onClick={() => handleCancelBooking(booking._id)}
                        className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Cancel Booking
                      </button>
                    )}
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