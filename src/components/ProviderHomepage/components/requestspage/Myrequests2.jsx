import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import StatsCards from './StatsCards';
import SearchFilterSortBar from './SearchFilterSortBar';
import ErrorBanner from './ErrorBanner';
import EmptyState from './EmptyState';
import UserRequestCard from "./ProposalCard";
import PopupForm from './PopupForm';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MyRequests2() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useSampleData, setUseSampleData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('completed');
  const [sortBy, setSortBy] = useState('date');
  const [activeTab, setActiveTab] = useState('completed');
  const token = Cookies.get("token");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const endpoint = `${BASE_URL}/api/provider/raisedjobs`;
    console.log(`endpoint: ${endpoint} with token: ${token}`)
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('res: ', response);
        const data = await response.json();
        console.log("Fetched jobs:", data);
        setRequests(data);
        console.log(`requests: `, requests);
      } catch (err) {
        setRequests(sampleRequests);
        setError('Could not connect to server. Showing sample requests.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [token]);

  const filteredRequests = requests
    .filter(b => {
      const matchesSearch = b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.providerName?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = b.status.toLowerCase() === filterStatus;
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

  // Pagination
  const requestsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const startIndex = (currentPage - 1) * requestsPerPage;
  const currentRequests = filteredRequests.slice(startIndex, startIndex + requestsPerPage);

  const stats = {
    total: requests.length,
    confirmed: requests?.filter(b => b.status === 'confirmed').length,
    completed: requests?.filter(b => b.status === 'completed').length,
    cancelled: requests?.filter(b => b.status === 'cancelled').length,
    pending: requests?.filter(b => b.status.toLowerCase() === 'pending').length,
    totalSpent: requests?.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0)
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setRequests(requests.map(booking =>
        booking._id === bookingId
          ? { ...booking, status: 'cancelled', cancelledAt: new Date().toISOString() }
          : booking
      ));
    }
  };

  const sampleRequests = [
    {
      _id: "req_001",
      requestId: "REQ-2024-001",
      category: "Plumbing",
      description: "Kitchen sink is leaking and the tap needs replacement.",
      price: 2500,
      location: "Banjara Hills, Hyderabad",
      createdAt: "2024-01-10T10:00:00Z",
      status: "pending",
      urgency: "high",
      proposals: [
        {
          id: "prop_1",
          providerName: "Suresh Plumbing",
          providerRating: 4.8,
          proposedPrice: 2200,
          message: "I have 15+ years experience in plumbing.",
          submittedAt: "2024-01-11T09:00:00Z"
        }
      ]
    },
    {
      _id: "req_002",
      requestId: "REQ-2024-002",
      category: "Electrical",
      description: "Need to install 3 ceiling fans",
      price: 3500,
      location: "Gachibowli, Hyderabad",
      createdAt: "2024-01-05T15:30:00Z",
      status: "completed",
      urgency: "normal",
      completedAt: "2024-01-08T18:00:00Z",
      acceptedProposal: {
        id: "prop_5",
        providerName: "PowerTech Electricals",
        providerRating: 4.7,
        finalPrice: 3200
      },
      proposals: [
        {
          id: "prop_5",
          providerName: "PowerTech Electricals",
          providerRating: 4.7,
          proposedPrice: 3200,
          message: "Licensed electrician with 10 years experience.",
          submittedAt: "2024-01-06T10:15:00Z"
        }
      ]
    }
  ];

  const handleEdit = (id) => {
    console.log('Edit request:', id);
  };

  const handleClose = (id) => {
    console.log('Close request:', id);
  };

  const handleAcceptProposal = (requestId, proposalId) => {
    console.log('Accept proposal:', proposalId, 'for request:', requestId);
  };

  const handleViewDetails = (id) => {
    console.log('View details for request:', id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your requests...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Requests</h1>
              <p className="text-gray-600">Manage and track all your service requests</p>
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

        {/* Requests */}
        <div className="space-y-6">
          {currentRequests.length > 0 ? (
            currentRequests.map((request) => (
              <UserRequestCard
                key={request._id}
                request={request}
                onEdit={handleEdit}
                onClose={handleClose}
                onAcceptProposal={handleAcceptProposal}
                onViewDetails={handleViewDetails}
                onCancel={handleCancelBooking}
                className="cancel-button-small"
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Pagination Footer */}
        {filteredRequests.length > 0 && (
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 px-8 py-6 border-t border-gray-100 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
                <span className="font-semibold">{Math.min(startIndex + requestsPerPage, filteredRequests.length)}</span> of{' '}
                <span className="font-semibold">{filteredRequests.length}</span> requests
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
        )}
      </div>
    </div>
  );
}