// import React, { useState } from 'react';
// import { Clock, CheckCircle, X, MessageSquare, DollarSign, User, Star, Calendar } from 'lucide-react';

// const MyRequests = () => {
//   const [activeTab, setActiveTab] = useState('pending');
//   const [requests, setRequests] = useState([
//     {
//       id: 1,
//       serviceName: 'Home Cleaning Service',
//       description: 'Need deep cleaning for 2BHK apartment including kitchen and bathrooms',
//       customerPrice: 2500,
//       status: 'pending',
//       createdAt: '2025-06-28T10:00:00Z',
//       proposals: [
//         {
//           id: 1,
//           providerId: 'p1',
//           providerName: 'CleanPro Services',
//           providerRating: 4.8,
//           proposedPrice: 2200,
//           message: 'We can provide complete deep cleaning with eco-friendly products. Available this weekend.',
//           submittedAt: '2025-06-28T12:30:00Z'
//         },
//         {
//           id: 2,
//           providerId: 'p2',
//           providerName: 'Sparkle Clean',
//           providerRating: 4.6,
//           proposedPrice: 2800,
//           message: 'Premium cleaning service with 24/7 support and satisfaction guarantee.',
//           submittedAt: '2025-06-28T14:15:00Z'
//         }
//       ]
//     },
//     {
//       id: 2,
//       serviceName: 'Plumbing Repair',
//       description: 'Kitchen sink leak repair and faucet replacement',
//       customerPrice: 1500,
//       status: 'pending',
//       createdAt: '2025-06-29T09:15:00Z',
//       proposals: [
//         {
//           id: 3,
//           providerId: 'p3',
//           providerName: 'Quick Fix Plumbing',
//           providerRating: 4.9,
//           proposedPrice: 1200,
//           message: 'Expert plumber with 10+ years experience. Can fix today itself.',
//           submittedAt: '2025-06-29T11:00:00Z'
//         }
//       ]
//     },
//     {
//       id: 3,
//       serviceName: 'Car Washing',
//       description: 'Complete car detailing including interior cleaning',
//       customerPrice: 800,
//       status: 'completed',
//       createdAt: '2025-06-25T08:00:00Z',
//       completedAt: '2025-06-26T16:00:00Z',
//       acceptedProposal: {
//         providerId: 'p4',
//         providerName: 'AutoShine Detailing',
//         finalPrice: 750
//       },
//       proposals: []
//     }
//   ]);

//   const [expandedRequest, setExpandedRequest] = useState(null);

//   const closeRequest = (requestId) => {
//     setRequests(prev => prev.map(req => 
//       req.id === requestId 
//         ? { ...req, status: 'completed', completedAt: new Date().toISOString() }
//         : req
//     ));
//   };

//   const acceptProposal = (requestId, proposalId) => {
//     setRequests(prev => prev.map(req => 
//       req.id === requestId 
//         ? { 
//             ...req, 
//             status: 'completed', 
//             completedAt: new Date().toISOString(),
//             acceptedProposal: {
//               ...req.proposals.find(p => p.id === proposalId),
//               finalPrice: req.proposals.find(p => p.id === proposalId).proposedPrice
//             }
//           }
//         : req
//     ));
//   };

//   const filteredRequests = requests.filter(req => req.status === activeTab);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const toggleRequestExpansion = (requestId) => {
//     setExpandedRequest(expandedRequest === requestId ? null : requestId);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 my-10">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">My Requests</h1>
//           <p className="text-gray-600">Manage your service requests and proposals</p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="flex justify-end mb-6">
//           <div className="bg-white rounded-xl shadow-lg p-1 border border-gray-200">
//             <button
//               onClick={() => setActiveTab('pending')}
//               className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                 activeTab === 'pending'
//                   ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
//                   : 'text-gray-600 hover:text-orange-500'
//               }`}
//             >
//               <Clock className="inline-block w-4 h-4 mr-2" />
//               Pending ({requests.filter(r => r.status === 'pending').length})
//             </button>
//             <button
//               onClick={() => setActiveTab('completed')}
//               className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
//                 activeTab === 'completed'
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
//                   : 'text-gray-600 hover:text-green-500'
//               }`}
//             >
//               <CheckCircle className="inline-block w-4 h-4 mr-2" />
//               Completed ({requests.filter(r => r.status === 'completed').length})
//             </button>
//           </div>
//         </div>

//         {/* Requests Grid */}
//         <div className="space-y-6">
//           {filteredRequests.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
//               <div className="text-gray-400 mb-4">
//                 {activeTab === 'pending' ? <Clock size={64} /> : <CheckCircle size={64} />}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-600 mb-2">
//                 No {activeTab} requests
//               </h3>
//               <p className="text-gray-500">
//                 {activeTab === 'pending' 
//                   ? 'All your requests have been completed!' 
//                   : 'You haven\'t completed any requests yet.'}
//               </p>
//             </div>
//           ) : (
//             filteredRequests.map((request) => (
//               <div key={request.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
//                 {/* Main Request Card */}
//                 <div className="p-6">
//                   <div className="flex items-start justify-between mb-4">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h3 className="text-xl font-bold text-gray-800">{request.serviceName}</h3>
//                         <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                           request.status === 'pending' 
//                             ? 'bg-orange-100 text-orange-600' 
//                             : 'bg-green-100 text-green-600'
//                         }`}>
//                           {request.status === 'pending' ? 'Pending' : 'Completed'}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 mb-3">{request.description}</p>
//                       <div className="flex items-center gap-4 text-sm text-gray-500">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           {formatDate(request.createdAt)}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <DollarSign className="w-4 h-4" />
//                           Your Budget: ₹{request.customerPrice}
//                         </div>
//                         {request.proposals.length > 0 && (
//                           <div className="flex items-center gap-1">
//                             <MessageSquare className="w-4 h-4" />
//                             {request.proposals.length} Proposal{request.proposals.length > 1 ? 's' : ''}
//                           </div>
//                         )}
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center gap-3">
//                       {request.status === 'completed' && request.acceptedProposal && (
//                         <div className="text-right">
//                           <p className="text-sm text-gray-500">Final Price</p>
//                           <p className="text-lg font-bold text-green-600">₹{request.acceptedProposal.finalPrice}</p>
//                         </div>
//                       )}
                      
//                       {request.status === 'pending' && (
//                         <button
//                           onClick={() => closeRequest(request.id)}
//                           className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
//                         >
//                           <X className="w-4 h-4" />
//                           Close Request
//                         </button>
//                       )}

//                       {request.proposals.length > 0 && (
//                         <button
//                           onClick={() => toggleRequestExpansion(request.id)}
//                           className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
//                         >
//                           <MessageSquare className="w-4 h-4" />
//                           {expandedRequest === request.id ? 'Hide' : 'View'} Proposals
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Proposals Section */}
//                 {expandedRequest === request.id && request.proposals.length > 0 && (
//                   <div className="border-t border-gray-100 bg-gray-50">
//                     <div className="p-6">
//                       <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                         <MessageSquare className="w-5 h-5" />
//                         Service Provider Proposals
//                       </h4>
//                       <div className="space-y-4">
//                         {request.proposals.map((proposal) => (
//                           <div key={proposal.id} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="flex items-center gap-3">
//                                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
//                                   {proposal.providerName.charAt(0)}
//                                 </div>
//                                 <div>
//                                   <h5 className="font-semibold text-gray-800">{proposal.providerName}</h5>
//                                   <div className="flex items-center gap-1">
//                                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                                     <span className="text-sm text-gray-600">{proposal.providerRating}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="text-right">
//                                 <p className="text-sm text-gray-500">Proposed Price</p>
//                                 <p className="text-xl font-bold text-green-600">₹{proposal.proposedPrice}</p>
//                               </div>
//                             </div>
                            
//                             <p className="text-gray-700 mb-3">{proposal.message}</p>
                            
//                             <div className="flex items-center justify-between">
//                               <span className="text-sm text-gray-500">
//                                 Submitted {formatDate(proposal.submittedAt)}
//                               </span>
//                               {request.status === 'pending' && (
//                                 <button
//                                   onClick={() => acceptProposal(request.id, proposal.id)}
//                                   className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg"
//                                 >
//                                   Accept Proposal
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Completed Request Info */}
//                 {request.status === 'completed' && request.acceptedProposal && (
//                   <div className="border-t border-gray-100 bg-green-50">
//                     <div className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <CheckCircle className="w-5 h-5 text-green-600" />
//                           <span className="text-green-800 font-semibold">
//                             Completed by {request.acceptedProposal.providerName}
//                           </span>
//                         </div>
//                         <span className="text-sm text-green-600">
//                           {formatDate(request.completedAt)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyRequests;
import React, { useState } from 'react';
import { Clock, CheckCircle, X, MessageSquare, DollarSign, User, Star, Calendar } from 'lucide-react';

const MyRequests = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [requests, setRequests] = useState([
    {
      id: 1,
      serviceName: 'Home Cleaning Service',
      description: 'Need deep cleaning for 2BHK apartment including kitchen and bathrooms',
      customerPrice: 2500,
      status: 'pending',
      createdAt: '2025-06-28T10:00:00Z',
      proposals: [
        {
          id: 1,
          providerId: 'p1',
          providerName: 'CleanPro Services',
          providerRating: 4.8,
          proposedPrice: 2200,
          message: 'We can provide complete deep cleaning with eco-friendly products. Available this weekend.',
          submittedAt: '2025-06-28T12:30:00Z'
        },
        {
          id: 2,
          providerId: 'p2',
          providerName: 'Sparkle Clean',
          providerRating: 4.6,
          proposedPrice: 2800,
          message: 'Premium cleaning service with 24/7 support and satisfaction guarantee.',
          submittedAt: '2025-06-28T14:15:00Z'
        }
      ]
    },
    {
      id: 2,
      serviceName: 'Plumbing Repair',
      description: 'Kitchen sink leak repair and faucet replacement',
      customerPrice: 1500,
      status: 'pending',
      createdAt: '2025-06-29T09:15:00Z',
      proposals: [
        {
          id: 3,
          providerId: 'p3',
          providerName: 'Quick Fix Plumbing',
          providerRating: 4.9,
          proposedPrice: 1200,
          message: 'Expert plumber with 10+ years experience. Can fix today itself.',
          submittedAt: '2025-06-29T11:00:00Z'
        }
      ]
    },
    {
      id: 3,
      serviceName: 'Car Washing',
      description: 'Complete car detailing including interior cleaning',
      customerPrice: 800,
      status: 'completed',
      createdAt: '2025-06-25T08:00:00Z',
      completedAt: '2025-06-26T16:00:00Z',
      acceptedProposal: {
        providerId: 'p4',
        providerName: 'AutoShine Detailing',
        finalPrice: 750
      },
      proposals: []
    }
  ]);

  const [expandedRequest, setExpandedRequest] = useState(null);

  const closeRequest = (requestId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'completed', completedAt: new Date().toISOString() }
        : req
    ));
  };

  const acceptProposal = (requestId, proposalId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: 'completed', 
            completedAt: new Date().toISOString(),
            acceptedProposal: {
              ...req.proposals.find(p => p.id === proposalId),
              finalPrice: req.proposals.find(p => p.id === proposalId).proposedPrice
            }
          }
        : req
    ));
  };

  const filteredRequests = requests.filter(req => req.status === activeTab);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleRequestExpansion = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col my-13">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
        {/* Header with Tabs */}
        <div className="mb-8 flex-shrink-0 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Requests</h1>
            <p className="text-gray-600">Manage your service requests and proposals</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg p-1 border border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Clock className="inline-block w-4 h-4 mr-2" />
              Pending ({requests.filter(r => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-green-500'
              }`}
            >
              <CheckCircle className="inline-block w-4 h-4 mr-2" />
              Completed ({requests.filter(r => r.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Scrollable Requests Container */}
        <div className="flex-1 overflow-hidden">
          <div className="h-[80%] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="space-y-6 pb-6">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-center items-center">
                  <div className="text-gray-400 mb-4">
                    {activeTab === 'pending' ? <Clock size={64} /> : <CheckCircle size={64} />}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No {activeTab} requests
                  </h3>
                  <p className="text-gray-500">
                    {activeTab === 'pending' 
                      ? 'All your requests have been completed!' 
                      : 'You haven\'t completed any requests yet.'}
                  </p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div key={request.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Main Request Card */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">{request.serviceName}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              request.status === 'pending' 
                                ? 'bg-orange-100 text-orange-600' 
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {request.status === 'pending' ? 'Pending' : 'Completed'}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-3">{request.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(request.createdAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              Your Budget: ₹{request.customerPrice}
                            </div>
                            {request.proposals.length > 0 && (
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                {request.proposals.length} Proposal{request.proposals.length > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {request.status === 'completed' && request.acceptedProposal && (
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Final Price</p>
                              <p className="text-lg font-bold text-green-600">₹{request.acceptedProposal.finalPrice}</p>
                            </div>
                          )}
                          
                          {request.status === 'pending' && (
                            <button
                              onClick={() => closeRequest(request.id)}
                              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
                            >
                              <X className="w-4 h-4" />
                              Close Request
                            </button>
                          )}

                          {request.proposals.length > 0 && (
                            <button
                              onClick={() => toggleRequestExpansion(request.id)}
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg"
                            >
                              <MessageSquare className="w-4 h-4" />
                              {expandedRequest === request.id ? 'Hide' : 'View'} Proposals
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Proposals Section */}
                    {expandedRequest === request.id && request.proposals.length > 0 && (
                      <div className="border-t border-gray-100 bg-gray-50">
                        <div className="p-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5" />
                            Service Provider Proposals
                          </h4>
                          <div className="space-y-4">
                            {request.proposals.map((proposal) => (
                              <div key={proposal.id} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                      {proposal.providerName.charAt(0)}
                                    </div>
                                    <div>
                                      <h5 className="font-semibold text-gray-800">{proposal.providerName}</h5>
                                      <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm text-gray-600">{proposal.providerRating}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-500">Proposed Price</p>
                                    <p className="text-xl font-bold text-green-600">₹{proposal.proposedPrice}</p>
                                  </div>
                                </div>
                                
                                <p className="text-gray-700 mb-3">{proposal.message}</p>
                                
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-500">
                                    Submitted {formatDate(proposal.submittedAt)}
                                  </span>
                                  {request.status === 'pending' && (
                                    <button
                                      onClick={() => acceptProposal(request.id, proposal.id)}
                                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg"
                                    >
                                      Accept Proposal
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Completed Request Info */}
                    {request.status === 'completed' && request.acceptedProposal && (
                      <div className="border-t border-gray-100 bg-green-50">
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-green-800 font-semibold">
                                Completed by {request.acceptedProposal.providerName}
                              </span>
                            </div>
                            <span className="text-sm text-green-600">
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
      </div>
    </div>
  );
};

export default MyRequests;