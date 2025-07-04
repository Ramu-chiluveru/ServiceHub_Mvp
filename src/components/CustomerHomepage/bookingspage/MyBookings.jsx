import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import StatsCards from './StatsCards';
import SearchFilterSortBar from './SearchFilterSortBar';
import ErrorBanner from './ErrorBanner';
import EmptyState from './EmptyState';
import BookingCard from './BookingCard';

import { Calendar,ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useSampleData, setUseSampleData] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('completed');
  const userEmail = Cookies.get("token");

  // pagination
  const bookingsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);
  const startIndex = (currentPage - 1) * bookingsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + bookingsPerPage);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
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

  const filteredBookings = bookings
    .filter(b => {
      const matchesSearch = b.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.technician?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            b.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date': return new Date(b.date) - new Date(a.date);
        case 'price': return b.price - a.price;
        case 'status': return a.status.localeCompare(b.status);
        default: return 0;
      }
    });

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    totalSpent: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking =>
        booking._id === bookingId
          ? { ...booking, status: 'cancelled', cancelledAt: new Date().toISOString() }
          : booking
      ));
    }
  };

   if (isLoading) {
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

        {/* Header */}
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
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Book New Service
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Search + Filter + Sort */}
          <SearchFilterSortBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            stats={stats}
          />

          {/* Error Banner */}
          {error && <ErrorBanner error={error} />}
        </div>

        {/* No Bookings */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            filterStatus={filterStatus}
            icon={<Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />}
          />
        ) : (
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <BookingCard key={booking._id} booking={booking} onCancel={handleCancelBooking} />
            ))}
          </div>
        )}

        {/* Pagination Footer */}
        <div className="bg-gradient-to-r from-slate-50 to-indigo-50 px-8 py-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing <span className="font-semibold">{startIndex + 1}</span> to <span className="font-semibold">{Math.min(startIndex + bookingsPerPage, bookings.length)}</span> of <span className="font-semibold">{bookings.length}</span> bookings
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(currentPage - 1)} 
                  disabled={currentPage === 1} 
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button 
                    key={page} 
                    onClick={() => setCurrentPage(page)} 
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      page === currentPage 
                        ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
                        : 'hover:bg-white border border-gray-200 text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button 
                  onClick={() => setCurrentPage(currentPage + 1)} 
                  disabled={currentPage === totalPages} 
                  className="p-2 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
