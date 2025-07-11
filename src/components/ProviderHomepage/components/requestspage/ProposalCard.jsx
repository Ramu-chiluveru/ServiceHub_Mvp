import React, { useState } from 'react';
import {
  Calendar, Clock, MapPin, User, Star, Wrench, Eye, Phone,
  XCircle, MoreVertical, DollarSign, Users, CheckCircle,
  MessageSquare, ChevronUp, ChevronDown, ArrowRight, Edit3,
  AlertCircle, Package
} from 'lucide-react';
import {useNavigate} from 'react-router-dom';

// ProposalCard Component for displaying individual proposals
const ProposalCard = ({ proposal, onAccept, requestStatus, formatDate }) => {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-all duration-200">
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
                  className={`w-3 h-3 ${i < Math.floor(proposal.providerRating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'}`} 
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
        {requestStatus.toLowerCase() === 'pending' && (
          <button
            onClick={onAccept}
            className="bg-green-500 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-green-600 transition-colors text-xs flex items-center gap-1"
          >
            <CheckCircle className="w-3 h-3" />
            Accept
          </button>
        )}
      </div>
    </div>
  );
}

// Main UserRequestCard Component
const UserRequestCard = ({ 
  request, 
  onEdit, 
  onClose, 
  onAcceptProposal, 
  onViewDetails 
}) => {
  const [showProposals, setShowProposals] = useState(false);
  const navigate = useNavigate();
  const {
    id, category, description, price, location, createdAt, 
    status, urgency, proposals = [], acceptedProposal, 
    completedAt, requestId
  } = request;

  console.log(`request: ${JSON.stringify(request)}`);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN');
  };

  const getTopProposals = (proposals) => {
    return proposals
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 3);
  };

  const handleAcceptProposal = (proposalId, e) => {
    e.stopPropagation();
    onAcceptProposal && onAcceptProposal(_id, proposalId);
  };

  const handleViewDetails = ({e}) => {
    // e.stopPropagation();
    // onViewDetails && onViewDetails(_id);
    navigate(`/job/${request._id}`, { state: { job: request } });
    console.log('Navigate to job details:', request._id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm mr-3">
                  {category?.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{category}</h3>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {id}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </span>
                {urgency && (
                  <span className={`text-xs font-medium ${getUrgencyColor(urgency)}`}>
                    {urgency} priority
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{formatDate(createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-green-500" />
                  <span>{proposals.length} Proposals</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Budget: ₹{price}</span>
                </div>
                {status === 'completed' && acceptedProposal && (
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    <span>Final: ₹{acceptedProposal.finalPrice}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-orange-500" />
                  <span>{status === 'completed' ? 'Job Completed' : 'Active Request'}</span>
                </div>
              </div>
            </div>

            {description && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-700">
                {description}
              </div>
            )}

            {status === 'completed' && acceptedProposal && (
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium text-green-800">Completed by:</span>
                  <span className="text-sm text-green-700 ml-2">{acceptedProposal.providerName}</span>
                </div>
                <p className="text-xs text-green-600">Job finished on {formatDate(completedAt)}</p>
              </div>
            )}
          </div>

          <div className="ml-6 text-right">
            {status === 'completed' && acceptedProposal && (
              <p className="text-lg text-green-600 font-semibold mt-1">
                Final: ₹{acceptedProposal.finalPrice}
              </p>
            )}
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button 
              onClick={(e) => handleViewDetails(e)}
              className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition flex items-center"
            >
              <Eye className="h-4 w-4 mr-1" /> View Details
            </button>
            {proposals.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProposals(!showProposals);
                }}
                className="text-green-600 hover:text-green-800 text-sm px-3 py-1 rounded-md hover:bg-green-50 transition flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-1" /> 
                {showProposals ? 'Hide' : 'View'} Proposals
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {status === 'pending' && (
              <>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit && onEdit(_id);
                  }}
                  className="text-sm text-orange-600 border border-orange-200 px-3 py-1 rounded-md hover:bg-orange-50 transition flex items-center"
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose && onClose(_id);
                  }}
                  className="text-sm text-red-600 border border-red-200 px-3 py-1 rounded-md hover:bg-red-50 transition flex items-center"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Close
                </button>
              </>
            )}
            {status === 'completed' && (
              <button className="text-sm text-blue-600 border border-blue-200 px-3 py-1 rounded-md hover:bg-blue-50 transition">
                Download Invoice
              </button>
            )}
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Proposals Section */}
      {showProposals && proposals.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-3 h-3 text-white" />
                </div>
                Recent Proposals ({proposals.length})
              </h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProposals(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {getTopProposals(proposals).map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  requestStatus={status}
                  onAccept={(e) => handleAcceptProposal(proposal.id, e)}
                  formatDate={formatDate}
                />
              ))}
            </div>

            {/* View More */}
            {proposals.length > 3 && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleViewDetails}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors text-sm flex items-center gap-2 mx-auto"
                >
                  <Eye className="w-4 h-4" />
                  <span>View All {proposals.length} Proposals</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRequestCard;