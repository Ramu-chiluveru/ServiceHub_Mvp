import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, X, MessageSquare, DollarSign, User, Star, Calendar, Eye, ChevronDown, ChevronUp, ArrowRight, Users, Sparkles, TrendingUp } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const MyRequests = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const userEmail = Cookies.get('token');
  const [activeTab, setActiveTab] = useState('pending');
  const [requests, setRequests] = useState([]);
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Mock data for demonstration
  const mockRequests = [
    {
      id: 1,
      category: 'Web Development',
      description: 'Need a responsive website for my small business with modern design and contact forms.',
      customerPrice: 15000,
      status: 'pending',
      createdAt: '2024-12-01T10:00:00Z',
      completedAt: null,
      proposals: [
        {
          id: 1,
          providerId: 1,
          providerName: 'John Doe',
          providerRating: 4.5,
          proposedPrice: 12000,
          message: 'I can create a modern, responsive website using React and Tailwind CSS.',
          submittedAt: '2024-12-02T09:00:00Z'
        },
        {
          id: 2,
          providerId: 2,
          providerName: 'Jane Smith',
          providerRating: 4.8,
          proposedPrice: 14000,
          message: 'Professional web development with SEO optimization included.',
          submittedAt: '2024-12-02T11:00:00Z'
        }
      ]
    },
    {
      id: 2,
      category: 'Content Writing',
      description: 'Looking for blog content writing services for my technology blog.',
      customerPrice: 5000,
      status: 'completed',
      createdAt: '2024-11-20T14:00:00Z',
      completedAt: '2024-11-25T16:00:00Z',
      proposals: [
        {
          id: 3,
          providerId: 3,
          providerName: 'Mike Johnson',
          providerRating: 4.2,
          proposedPrice: 4500,
          message: 'I specialize in tech content writing with SEO optimization.',
          submittedAt: '2024-11-21T10:00:00Z'
        }
      ],
      acceptedProposal: {
        providerId: 3,
        providerName: 'Mike Johnson',
        finalPrice: 4500
      }
    }
  ];

  // Use mock data instead of API call for demo
  if (!userEmail) {
    navigate('/login');
    return null;
  }

  // Fetch requests from API
  // useEffect(() => {
  //   setIsLoading(true);
  //   const getJobs = async () => {
  //     setIsLoading(true);
  //     try {
  //       const endpoint = `${BASE_URL}/api/customer/jobs`;
  //       const response = await fetch(endpoint, {
  //         headers: {
  //           'Authorization': `Bearer ${Cookies.get('token')}`
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch requests');
  //       }

  //       const data = await response.json();
  //       console.log(`api response data: ${JSON.stringify(data)}`);
  //       const transformedData = transformApiData(data);
  //       console.log(`tranformed data: ${JSON.stringify(transformedData)}`);
  //       setRequests(transformedData);
  //     } catch (error) {
  //       console.error('Error fetching requests:', error);
  //       toast.error("Error fetching your requests");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getJobs();
  // }, [userEmail, navigate]);

  useEffect(() => {
    setTimeout(() => {
      setRequests(mockRequests);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Close a request
  const closeRequest = async (requestId, event) => {
    event.stopPropagation();
    toast.success("Request closed successfully");
    console.log("Request closed:", requestId);
    setRefresh(!refresh);
  };

  // Accept a proposal
  const acceptProposal = async (requestId, proposalId, event) => {
    event.stopPropagation();
    toast.success("Proposal accepted successfully");
    console.log("Proposal accepted:", proposalId);
    setRefresh(!refresh);
  };

  // Filter requests based on active tab
  const filteredRequests = requests.filter(req => 
    activeTab === 'pending' ? req.status === 'pending' : req.status === 'completed'
  );

    const transformApiData = (apiData) => 
    {
      return apiData.map(item => ({
      id: item.id,
      category: item.category,
      description: item.description,
      customerPrice: item.price,
      status: item.status.toLowerCase(),
      createdAt: item.createdAt,
      completedAt: item.completedAt,
      proposals: item.proposals ? item.proposals.map(proposal => ({
        id: proposal.id,
        providerId: proposal.provider?.id,
        providerName: `${proposal.provider?.firstName || ''} ${proposal.provider?.lastName || ''}`.trim(),
        providerRating: proposal.provider?.rating || 0,
        proposedPrice: proposal.proposedPrice,
        message: proposal.message,
        submittedAt: proposal.submittedAt
      })) : [],
      ...(item.status === 'COMPLETED' && item.acceptedProposal && {
        acceptedProposal: {
          providerId: item.acceptedProposal.provider?.id,
          providerName: `${item.acceptedProposal.provider?.firstName || ''} ${item.acceptedProposal.provider?.lastName || ''}`.trim(),
          finalPrice: item.acceptedProposal.proposedPrice
        }
      })
    }));
  };
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Toggle request expansion
  const toggleRequestExpansion = (requestId, event) => {
    event.stopPropagation();
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  // Navigate to job details
  const viewAllProposals = (request, event) => {
    event.stopPropagation();
    navigate(`/job/${request.id}`, { state: { job: request } });
    console.log('Navigate to job details:', request.id);
  };

  // Get top 3 most recent proposals
  const getTopProposals = (proposals) => {
    return proposals
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 3);
  };

  // Calculate statistics
  const stats = {
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    completedRequests: requests.filter(r => r.status === 'completed').length,
    totalProposals: requests.reduce((acc, req) => acc + req.proposals.length, 0)
  };

  // Loading state
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'bg-white text-gray-800 border border-gray-200',
          duration: 4000,
        }}
      />
      
      <div className="p-4 max-w-6xl mx-auto my-10">
        {/* Header */}
        <div className="mb-8 my-10">
          <h1 className="top-left text-4xl font-bold text-gray-900 mb-2">My Requests</h1>
          <p className="text-center text-gray-600 max-w-xl mx-auto">
            Track and manage your service requests efficiently
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedRequests}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs font-medium">Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProposals}</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 border border-gray-200 inline-flex">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                activeTab === 'pending'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Pending</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {stats.pendingRequests}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 text-sm ${
                activeTab === 'completed'
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                {stats.completedRequests}
              </span>
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="text-gray-300 mb-4">
                {activeTab === 'pending' ? (
                  <Clock size={48} className="mx-auto" />
                ) : (
                  <CheckCircle size={48} className="mx-auto" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {activeTab} requests found
              </h3>
              <p className="text-gray-500">
                {activeTab === 'pending' 
                  ? 'All your requests have been completed!' 
                  : 'Start creating requests to see them here'}
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div 
                key={request.id} 
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={(e) => viewAllProposals(request, e)}
              >
                {/* Main Card Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                          {request.category?.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{request.category}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
                            request.status === 'pending' 
                              ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                              : 'bg-green-100 text-green-700 border border-green-200'
                          }`}>
                            {request.status === 'pending' ? (
                              <Clock className="w-3 h-3" />
                            ) : (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            {request.status === 'pending' ? 'Pending' : 'Completed'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{request.description}</p>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Calendar className="w-3 h-3" />
                            Created
                          </div>
                          <p className="text-gray-900 font-medium text-sm">{formatDate(request.createdAt)}</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <DollarSign className="w-3 h-3" />
                            Budget
                          </div>
                          <p className="text-gray-900 font-semibold">₹{request.customerPrice}</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Users className="w-3 h-3" />
                            Proposals
                          </div>
                          <p className="text-gray-900 font-semibold">{request.proposals.length}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-6">
                      {request.status === 'completed' && request.acceptedProposal && (
                        <div className="text-right bg-green-50 rounded-lg p-3 border border-green-200">
                          <p className="text-green-600 text-xs mb-1">Final Price</p>
                          <p className="text-lg font-bold text-green-700">₹{request.acceptedProposal.finalPrice}</p>
                        </div>
                      )}
                      
                      {request.status === 'pending' && (
                        <button
                          onClick={(e) => closeRequest(request.id, e)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-1 text-sm"
                        >
                          <X className="w-4 h-4" />
                          Close
                        </button>
                      )}

                      {request.proposals.length > 0 && (
                        <button
                          onClick={(e) => toggleRequestExpansion(request.id, e)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-1 text-sm"
                        >
                          <MessageSquare className="w-4 h-4" />
                          {expandedRequest === request.id ? (
                            <>
                              <span>Hide</span>
                              <ChevronUp className="w-3 h-3" />
                            </>
                          ) : (
                            <>
                              <span>View</span>
                              <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Proposals Section */}
                {expandedRequest === request.id && request.proposals.length > 0 && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-3 h-3 text-white" />
                          </div>
                          Proposals ({request.proposals.length})
                        </h4>
                      </div>
                      
                      <div className="space-y-4">
                        {getTopProposals(request.proposals).map((proposal, index) => (
                          <div key={proposal.id} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-semibold text-xs">
                                  {proposal.providerName.charAt(0)}
                                </div>
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-900">{proposal.providerName}</h5>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-3 h-3 ${
                                          i < Math.floor(proposal.providerRating) 
                                            ? 'fill-yellow-400 text-yellow-400' 
                                            : 'text-gray-300'
                                        }`} 
                                      />
                                    ))}
                                    <span className="text-gray-500 text-xs ml-1">({proposal.providerRating})</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="text-gray-500 text-xs">Price</p>
                                <p className="text-lg font-bold text-green-600">₹{proposal.proposedPrice}</p>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
                              <p className="text-gray-700 text-sm">{proposal.message}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500 text-xs">
                                {formatDate(proposal.submittedAt)}
                              </span>
                              {request.status === 'pending' && (
                                <button
                                  onClick={(e) => acceptProposal(request.id, proposal.id, e)}
                                  className="bg-green-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-green-600 transition-colors text-xs flex items-center gap-1"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Accept
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* View More Button */}
                      {request.proposals.length  && (
                        <div className="mt-4 text-center">
                          <button
                            onClick={(e) => viewAllProposals(request, e)}
                            className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors text-sm flex items-center gap-2 mx-auto"
                          >
                            <Eye className="w-4 h-4" />
                            <span>View All {request.proposals.length} Proposals</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Completed Request Footer */}
                {request.status === 'completed' && request.acceptedProposal && (
                  <div className="border-t border-gray-200 bg-green-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-green-700 font-medium text-sm">
                              Completed by {request.acceptedProposal.providerName}
                            </p>
                            <p className="text-green-600 text-xs">Job finished successfully</p>
                          </div>
                        </div>
                        <span className="text-green-600 font-medium text-sm">
                          {formatDate(request.completedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRequests;