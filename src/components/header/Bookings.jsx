import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, ChevronRight, AlertCircle, CheckCircle2, CheckCircle,
  XCircle, Search, Filter, Star, Phone, MessageCircle, Download,
  RefreshCw, Eye, MoreVertical, User, Wrench, BookOpen,
  TrendingUp, DollarSign, Activity
} from 'lucide-react';
import Cookies from 'js-cookie';

// Enhanced sample bookings data with more details
const defaultBookings = [
  {
    _id: '1',
    serviceName: 'AC Repair Service',
    date: new Date(Date.now() + 86400000).toISOString(),
    time: '10:00 AM',
    duration: '2-3 hours',
    location: '123 Main St, Koramangala, Bangalore',
    price: 1200,
    status: 'confirmed',
    technician: 'Rajesh Kumar',
    technicianPhone: '+91 98765 43210',
    technicianRating: 4.8,
    serviceDetails: 'Split AC repair and gas refill',
    bookingId: 'BK001',
    serviceType: 'Home Appliances',
    estimatedPrice: '₹1000-1500',
    urgency: 'normal',
    paymentStatus: 'pending',
    notes: 'Please call before arriving'
  },
  {
    _id: '2',
    serviceName: 'Plumbing Service',
    date: new Date(Date.now() + 172800000).toISOString(),
    time: '2:30 PM',
    duration: '1-2 hours',
    location: '456 Oak Ave, HSR Layout, Bangalore',
    price: 800,
    status: 'confirmed',
    technician: 'Vikram Singh',
    technicianPhone: '+91 98765 43211',
    technicianRating: 4.6,
    serviceDetails: 'Kitchen sink leakage repair',
    bookingId: 'BK002',
    serviceType: 'Plumbing',
    estimatedPrice: '₹500-1000',
    urgency: 'high',
    paymentStatus: 'paid',
    notes: 'Gate code: 1234'
  },
  {
    _id: '3',
    serviceName: 'Electrical Wiring',
    date: new Date(Date.now() - 86400000).toISOString(),
    time: '11:00 AM',
    duration: '4-5 hours',
    location: '789 Pine Rd, Whitefield, Bangalore',
    price: 1500,
    status: 'completed',
    technician: 'Anil Sharma',
    technicianPhone: '+91 98765 43212',
    technicianRating: 4.9,
    serviceDetails: 'Complete house wiring checkup',
    bookingId: 'BK003',
    serviceType: 'Electrical',
    estimatedPrice: '₹1200-2000',
    urgency: 'normal',
    paymentStatus: 'paid',
    completedAt: new Date(Date.now() - 82800000).toISOString(),
    rating: 5,
    review: 'Excellent service, very professional'
  },
  {
    _id: '4',
    serviceName: 'Painting Service',
    date: new Date(Date.now() - 259200000).toISOString(),
    time: '9:00 AM',
    duration: '6-8 hours',
    location: '321 Elm St, Indiranagar, Bangalore',
    price: 3500,
    status: 'cancelled',
    bookingId: 'BK004',
    serviceType: 'Home Improvement',
    estimatedPrice: '₹3000-4000',
    urgency: 'low',
    paymentStatus: 'refunded',
    cancellationReason: 'Customer rescheduled',
    cancelledAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    _id: '5',
    serviceName: 'Deep Cleaning',
    date: new Date(Date.now() + 259200000).toISOString(),
    time: '8:00 AM',
    duration: '3-4 hours',
    location: '567 MG Road, Bangalore',
    price: 2200,
    status: 'confirmed',
    technician: 'Priya Nair',
    technicianPhone: '+91 98765 43213',
    technicianRating: 4.7,
    serviceDetails: '3BHK deep cleaning service',
    bookingId: 'BK005',
    serviceType: 'Cleaning',
    estimatedPrice: '₹2000-2500',
    urgency: 'normal',
    paymentStatus: 'paid',
    notes: 'Pet-friendly cleaning products preferred'
  }
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useSampleData, setUseSampleData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('completed');

  // Mock user data - in real app this would come from auth context
  const userEmail = Cookies.get("token");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBookings(defaultBookings);
        setUseSampleData(true);
      } catch (err) {
        setBookings(defaultBookings);
        setUseSampleData(true);
        setError('Could not connect to server. Showing sample bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(booking => {
      const matchesSearch = booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.technician?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          booking.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'price':
          return b.price - a.price;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking => 
        booking._id === bookingId 
          ? { ...booking, status: 'cancelled', cancelledAt: new Date().toISOString() } 
          : booking
      ));
    }
  };

  const handleRescheduleBooking = (bookingId) => {
    // In real app, this would open a reschedule modal
    alert('Reschedule functionality would open here');
  };

  const handleContactTechnician = (phone) => {
    window.open(`tel:${phone}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    totalSpent: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-gray-600">Manage and track all your service bookings</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              {useSampleData && (
                <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
                  Demo Mode
                </span>
              )}
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Book New Service
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Confirmed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">

    {/* Search */}
    <div className="w-full lg:w-1/4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>

    {/* Filter Tabs */}
    <div className="w-full lg:w-2/4 flex gap-2 border border-gray-300 rounded-lg">
      <button
        onClick={() => {
          setActiveTab('completed');
          setFilterStatus('completed');
        }}
        className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
          activeTab === 'completed'
            ? 'bg-green-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <CheckCircle className="w-4 h-4" />
        Completed
        <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{stats.completedRequests}</span>
      </button>

      <button
        onClick={() => {
          setActiveTab('confirmed');
          setFilterStatus('confirmed');
        }}
        className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
          activeTab === 'confirmed'
            ? 'bg-yellow-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Clock className="w-4 h-4" />
        Confirmed
        <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{stats.pendingRequests}</span>
      </button>

      <button
        onClick={() => {
          setActiveTab('cancelled');
          setFilterStatus('cancelled');
        }}
        className={`flex-1 px-4 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm ${
          activeTab === 'cancelled'
            ? 'bg-red-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <XCircle className="w-4 h-4" />
        Cancelled
        <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{stats.cancelledRequests}</span>
      </button>
    </div>

    {/* Sort + Refresh */}
    <div className="w-full lg:w-1/4 flex items-center gap-2">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="date">Sort by Date</option>
        <option value="price">Sort by Price</option>
        <option value="status">Sort by Status</option>
      </select>
      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
        <RefreshCw className="h-4 w-4" />
      </button>
    </div>
    
  </div>
</div>


        </div>

        {error && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
              <div className="ml-3">
                <p className="text-sm text-amber-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              {searchQuery || filterStatus !== 'all' ? 'No matching bookings' : 'No bookings yet'}
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchQuery || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'You haven\'t made any bookings yet. Start by exploring our services.'
              }
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
              Browse Services
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold text-gray-900">{booking.serviceName}</h3>
                          <span className="ml-3 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {booking.bookingId}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                          {booking.urgency && (
                            <span className={`text-xs font-medium ${getUrgencyColor(booking.urgency)}`}>
                              {booking.urgency} priority
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                            <span>{new Date(booking.date).toLocaleDateString('en-IN', { 
                              weekday: 'short', 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-green-500" />
                            <span>{booking.time} ({booking.duration})</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-red-500" />
                            <span className="truncate">{booking.location}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {booking.technician && (
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="h-4 w-4 mr-2 text-purple-500" />
                              <span>{booking.technician}</span>
                              {booking.technicianRating && (
                                <div className="flex items-center ml-2">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-500 ml-1">{booking.technicianRating}</span>
                                </div>
                              )}
                            </div>
                          )}
                          <div className="flex items-center text-sm text-gray-600">
                            <Wrench className="h-4 w-4 mr-2 text-orange-500" />
                            <span>{booking.serviceType}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                              booking.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              Payment: {booking.paymentStatus}
                            </span>
                          </div>
                        </div>
                      </div>

                      {booking.serviceDetails && (
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-gray-700">{booking.serviceDetails}</p>
                        </div>
                      )}

                      {booking.notes && (
                        <div className="bg-blue-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-blue-700">📝 {booking.notes}</p>
                        </div>
                      )}

                      {booking.status === 'completed' && booking.review && (
                        <div className="bg-green-50 rounded-lg p-3 mb-4">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium text-green-800">Your Review:</span>
                            <div className="flex ml-2">
                              {[...Array(booking.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-green-700">{booking.review}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-6 text-right">
                      <p className="text-2xl font-bold text-gray-900">₹{booking.price}</p>
                      <p className="text-xs text-gray-500">Est: {booking.estimatedPrice}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-2">
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition-colors">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                      {booking.technician && booking.technicianPhone && (
                        <button
                          onClick={() => handleContactTechnician(booking.technicianPhone)}
                          className="flex items-center text-green-600 hover:text-green-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-green-50 transition-colors"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {booking.status === 'confirmed' && (
                        <>
                          <button
                            onClick={() => handleRescheduleBooking(booking._id)}
                            className="text-sm font-medium text-orange-600 hover:text-orange-800 px-3 py-1 border border-orange-200 rounded-md hover:bg-orange-50 transition-colors"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking._id)}
                            className="text-sm font-medium text-red-600 hover:text-red-800 px-3 py-1 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'completed' && !booking.review && (
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                          Write Review
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination could go here if needed */}
        {filteredBookings.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
          </div>
        )}
      </div>
    </div>
  );
}