import { useLocation, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { toast, Toaster } from "react-hot-toast";
import Cookies from 'js-cookie';
import {
  Star, Clock, DollarSign, MapPin, Calendar,
  Filter, ArrowUp, ArrowDown, ChevronLeft, ChevronRight,
  User, Award, MessageSquare, Heart, Share2, Briefcase,
  TrendingUp, CheckCircle, Eye, Send
} from 'lucide-react';


const JobDetails = () => {
  const { jobid } = useParams();
  const location = useLocation();
  const jobId = location.state?.job;
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual props/params
  const job = {
    serviceName: "Professional Wedding Photography & Videography",
    description: "Looking for an experienced photographer and videographer to capture our special wedding day. We need someone who can handle both traditional and candid shots, with expertise in low-light photography and drone videography for outdoor ceremonies.",
    customerPrice: 25000,
    location: "Mumbai, Maharashtra",
    status: "Active",
    createdAt: "2024-12-15T10:30:00Z",
    category: "Photography & Video",
    urgency: "Medium",
    duration: "1 day"
  };

  const [proposals, setProposals] = useState([]);
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [likedProposals, setLikedProposals] = useState(new Set());
  const [acceptedProposals, setAcceptedProposals] = useState(new Set());
  const proposalsPerPage = 3;


  const dummyProposals = [
      {
        id: 1,
        proposedPrice: 22000,
        message: "Hello! I'm a professional wedding photographer with 8+ years of experience. I specialize in candid moments and have covered 200+ weddings. My package includes pre-wedding shoot, full day coverage, edited photos within 7 days, and a beautiful wedding album. I use top-notch equipment and have backup gear to ensure nothing goes wrong on your special day.",
        submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        provider: {
          firstName: "Anjali",
          lastName: "Sharma",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 4.9,
          completedJobs: 156,
          isTopRated: true,
          responseTime: "2 hours",
          skills: ["Wedding Photography", "Portrait Photography", "Photo Editing", "Drone Videography", "Lightroom", "Photoshop"],
          yearsExperience: 8,
          location: "Mumbai, MH"
        }
      },
      {
        id: 2,
        proposedPrice: 18500,
        message: "I'm excited to work on your wedding project! As a full-time photographer specializing in weddings and events, I bring creativity and professionalism to every shoot. My style focuses on natural, emotional moments that tell your unique story. I provide same-day highlights and full gallery within 5 days.",
        submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        provider: {
          firstName: "Ravi",
          lastName: "Kumar",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
          rating: 4.7,
          completedJobs: 89,
          isTopRated: true,
          responseTime: "1 hour",
          skills: ["Event Photography", "Candid Photography", "Video Editing", "Cinema Shooting"],
          yearsExperience: 5,
          location: "Navi Mumbai, MH"
        }
      },
      {
        id: 3,
        proposedPrice: 28000,
        message: "Congratulations on your upcoming wedding! I'm a premium wedding photographer with international experience. My work has been featured in top wedding magazines. I offer luxury packages with cinematic videography, same-day editing, and premium albums. Let's create magical memories together!",
        submittedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        provider: {
          firstName: "Priya",
          lastName: "Mehta",
          image: "https://randomuser.me/api/portraits/women/46.jpg",
          rating: 5.0,
          completedJobs: 234,
          isTopRated: true,
          responseTime: "30 mins",
          skills: ["Luxury Weddings", "Destination Photography", "Cinematic Videos", "Aerial Photography", "International Experience"],
          yearsExperience: 12,
          location: "Mumbai, MH"
        }
      },
      {
        id: 4,
        proposedPrice: 15000,
        message: "Hi! I'm a passionate photographer starting my wedding photography journey. Despite being new to weddings, I have strong portrait and event photography skills. I offer competitive rates and will give 100% dedication to make your day perfect. References available upon request.",
        submittedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        provider: {
          firstName: "Arjun",
          lastName: "Singh",
          image: "https://randomuser.me/api/portraits/men/47.jpg",
          rating: 4.2,
          completedJobs: 23,
          isTopRated: false,
          responseTime: "4 hours",
          skills: ["Portrait Photography", "Event Coverage", "Basic Editing", "Creative Angles"],
          yearsExperience: 2,
          location: "Thane, MH"
        }
      }
    ];

  useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
        setProposals(dummyProposals);
        setIsLoading(false);
      }, 1000);
    }, []);
 

  const sortedProposals = [...proposals].sort((a, b) => {
    if (sortBy === 'proposedPrice') {
      return sortOrder === 'asc' ? a.proposedPrice - b.proposedPrice : b.proposedPrice - a.proposedPrice;
    }
    if (sortBy === 'rating') {
      return sortOrder === 'asc' ? a.provider.rating - b.provider.rating : b.provider.rating - a.provider.rating;
    }
    if (sortBy === 'experience') {
      return sortOrder === 'asc' ? a.provider.yearsExperience - b.provider.yearsExperience : b.provider.yearsExperience - a.provider.yearsExperience;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedProposals.length / proposalsPerPage);
  const startIndex = (currentPage - 1) * proposalsPerPage;
  const currentProposals = sortedProposals.slice(startIndex, startIndex + proposalsPerPage);

  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder(criteria === 'rating' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  const handleLikeProposal = (proposalId) => {
    setLikedProposals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(proposalId)) {
        newSet.delete(proposalId);
      } else {
        newSet.add(proposalId);
      }
      return newSet;
    });
  };

  const handleAcceptProposal = (proposalId) => {
    setAcceptedProposals(prev => new Set([...prev, proposalId]));
    // You can also add API call here to accept the proposal on the backend
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} 
      />
    ));
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>

    {isLoading && 
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your requests...</p>
        </div>
      </div>
  }

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 my-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Job Header */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-100 mb-8 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex justify-between items-start">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Briefcase size={24} />
                  <span className="text-sm font-medium opacity-90">{job.category}</span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{job.serviceName}</h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    Posted {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={16} />
                    24 views
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors">
                  <Heart size={20} />
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{job.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <DollarSign size={18} />
                  <span className="font-medium">Budget</span>
                </div>
                <div className="text-2xl font-bold text-green-800">₹{job.customerPrice.toLocaleString()}</div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 text-blue-700 mb-1">
                  <MapPin size={18} />
                  <span className="font-medium">Location</span>
                </div>
                <div className="text-lg font-semibold text-blue-800">{job.location}</div>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 text-purple-700 mb-1">
                  <Clock size={18} />
                  <span className="font-medium">Duration</span>
                </div>
                <div className="text-lg font-semibold text-purple-800">{job.duration}</div>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-2 text-orange-700 mb-1">
                  <TrendingUp size={18} />
                  <span className="font-medium">Priority</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(job.urgency)}`}>
                  {job.urgency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Proposals Section */}
        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-indigo-100 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Received Proposals</h2>
                <p className="text-gray-600 mt-1">{sortedProposals.length} professionals interested in your project</p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)} 
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 px-6 py-3 rounded-xl text-sm font-medium shadow-sm transition-all hover:shadow-md"
                >
                  <Filter size={16} className="text-indigo-600" /> 
                  Sort by: {sortBy} {sortOrder === 'asc' ? <ArrowUp size={14} className="text-indigo-600" /> : <ArrowDown size={14} className="text-indigo-600" />}
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                    <button onClick={() => handleSortChange('rating')} className="w-full px-4 py-3 text-left text-sm hover:bg-indigo-50 flex items-center justify-between transition-colors">
                      <span className="flex items-center"><Star size={16} className="mr-2 text-indigo-600" /> Highest Rated</span>
                      {sortBy === 'rating' && (sortOrder === 'asc' ? <ArrowUp size={14} className="text-indigo-600" /> : <ArrowDown size={14} className="text-indigo-600" />)}
                    </button>
                    <button onClick={() => handleSortChange('proposedPrice')} className="w-full px-4 py-3 text-left text-sm hover:bg-indigo-50 flex items-center justify-between transition-colors">
                      <span className="flex items-center"><DollarSign size={16} className="mr-2 text-indigo-600" /> Price</span>
                      {sortBy === 'proposedPrice' && (sortOrder === 'asc' ? <ArrowUp size={14} className="text-indigo-600" /> : <ArrowDown size={14} className="text-indigo-600" />)}
                    </button>
                    <button onClick={() => handleSortChange('experience')} className="w-full px-4 py-3 text-left text-sm hover:bg-indigo-50 flex items-center justify-between transition-colors">
                      <span className="flex items-center"><Award size={16} className="mr-2 text-indigo-600" /> Experience</span>
                      {sortBy === 'experience' && (sortOrder === 'asc' ? <ArrowUp size={14} className="text-indigo-600" /> : <ArrowDown size={14} className="text-indigo-600" />)}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {currentProposals.map((proposal) => (
              <div key={proposal.id} className="p-8 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-300">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 relative">
                    <div className="relative">
                      <img 
                        src={proposal.provider.image} 
                        alt="provider" 
                        className="w-20 h-20 rounded-2xl border-2 border-white shadow-lg object-cover" 
                      />
                      {proposal.provider.isTopRated && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-1.5 shadow-md">
                          <Award size={14} className="text-white" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-6 h-6 border-2 border-white"></div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">
                            {proposal.provider.firstName} {proposal.provider.lastName}
                          </h3>
                          {proposal.provider.isTopRated && (
                            <span className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-200">
                              Top Rated
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            {renderStars(proposal.provider.rating)}
                            <span className="ml-1 font-semibold text-gray-900">{proposal.provider.rating}</span>
                            <span className="text-gray-500">({proposal.provider.completedJobs} jobs)</span>
                          </div>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {proposal.provider.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Responds in {proposal.provider.responseTime}
                          </span>
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                            {proposal.provider.yearsExperience} years exp.
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleLikeProposal(proposal.id)}
                        className={`p-2 rounded-lg transition-all ${
                          likedProposals.has(proposal.id) 
                            ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-500'
                        }`}
                      >
                        <Heart size={18} className={likedProposals.has(proposal.id) ? 'fill-current' : ''} />
                      </button>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {proposal.message}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {proposal.provider.skills?.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium border border-indigo-200 hover:bg-indigo-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Submitted {new Date(proposal.submittedAt).toLocaleString()}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-3xl font-bold text-green-600">₹{proposal.proposedPrice.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">Total project cost</div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg flex items-center gap-2 transform hover:scale-105">
                            <Send size={16} />
                            Message
                          </button>
                          {acceptedProposals.has(proposal.id) ? (
                            <button className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 cursor-default">
                              <CheckCircle size={16} />
                              Accepted
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleAcceptProposal(proposal.id)}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg flex items-center gap-2 transform hover:scale-105"
                            >
                              <CheckCircle size={16} />
                              Accept
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Pagination */}
          <div className="bg-gradient-to-r from-slate-50 to-indigo-50 px-8 py-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Showing <span className="font-semibold">{startIndex + 1}</span> to <span className="font-semibold">{Math.min(startIndex + proposalsPerPage, sortedProposals.length)}</span> of <span className="font-semibold">{sortedProposals.length}</span> proposals
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
    </div>
  </>
  );
};

export default JobDetails;
