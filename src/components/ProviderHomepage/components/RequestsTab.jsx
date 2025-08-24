import React, { useState, useEffect } from 'react';
import {
  User, Bell, Search, Map, X, Send, DollarSign, Wrench, Droplets, Wind, Sofa,
  Zap, Sparkles, PaintBucket, Bug, TreePalm, Shield, MapPin, CheckCircle, AlertCircle
} from 'lucide-react';
import Cookies from "js-cookie";

const RequestsTab = ({
  jobRequests,
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  showProposalModal,
  selectedJob,
  proposalData,
  setProposalData,
  openProposalModal,
  closeProposalModal,
  submitProposal,
  filteredJobs,
  setJobRequests
}) => {
  const [showMap, setShowMap] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({ isOpen: false, job: null });
  const token = Cookies.get("token");

  const serviceIcons = {
    "plumbing": { icon: Droplets, color: "from-blue-500 to-blue-700", lightColor: "bg-blue-50" },
    "ac-repair": { icon: Wind, color: "from-cyan-500 to-blue-600", lightColor: "bg-cyan-50" },
    "furniture": { icon: Sofa, color: "from-orange-500 to-orange-700", lightColor: "bg-orange-50" },
    "electrical": { icon: Zap, color: "from-yellow-500 to-orange-600", lightColor: "bg-yellow-50" },
    "cleaning": { icon: Sparkles, color: "from-teal-500 to-emerald-600", lightColor: "bg-teal-50" },
    "carpentry": { icon: Wrench, color: "from-amber-600 to-yellow-700", lightColor: "bg-amber-50" },
    "painting": { icon: PaintBucket, color: "from-purple-500 to-purple-700", lightColor: "bg-purple-50" },
    "appliance": { icon: Wrench, color: "from-gray-500 to-gray-700", lightColor: "bg-gray-50" },
    "pest-control": { icon: Bug, color: "from-red-500 to-red-700", lightColor: "bg-red-50" },
    "landscaping": { icon: TreePalm, color: "from-green-500 to-lime-600", lightColor: "bg-green-50" },
    "home-security": { icon: Shield, color: "from-indigo-500 to-indigo-700", lightColor: "bg-indigo-50" },
    "other": { icon: Wrench, color: "from-slate-400 to-slate-600", lightColor: "bg-slate-50" }
  };

  // Handle confirmation modal
  const handleRaiseProposal = (job) => {
    setConfirmationModal({ isOpen: true, job });
  };

  const handleConfirmProposal = async () => {
    if (!confirmationModal.job?.id) return;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const endpoint = `${BASE_URL}/api/provider/raiseproposal/${confirmationModal.job.id}`; 
    try {
      const response = await fetch(endpoint , {
        method: 'POST',
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.ok) {
        console.log("Proposal raised successfully");
        handleCancelConfirmation();
      } else {
        console.error("Failed to raise proposal");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleCancelConfirmation = () => {
    setConfirmationModal({ isOpen: false, job: null });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Filter Section */}
      <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs, customers, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="all">All Priority</option>
              <option value="high">High Priority</option>
              <option value="normal">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            <button
              onClick={() => setShowMap(!showMap)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${showMap ? 'bg-blue-500 text-white' : 'bg-white/50 text-gray-600 hover:bg-white/70'
                }`}
            >
              <Map size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Job Requests List */}
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Bell className="text-blue-500" />
          New Job Requests
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {filteredJobs.length} requests
          </span>
        </h3>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Bell className="text-blue-400" size={40} />
            </div>
            <h4 className="text-xl font-medium text-gray-700 mb-2">No job requests found</h4>
            <p className="text-gray-500">You're all caught up! New requests will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => {
              const { icon: Icon, color, lightColor } = serviceIcons[job.category] || serviceIcons["other"];
              const borderColor =
                job.priority === 'High' ? 'border-red-500' :
                  job.priority === 'Medium' ? 'border-yellow-500' :
                    'border-green-500';

              return (
                <div key={job.id} className={`p-6 rounded-2xl ${lightColor} border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-all duration-300`}>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className={`bg-gradient-to-r ${color} text-white p-4 rounded-xl w-14 h-14 flex items-center justify-center`}>
                        <Icon size={24} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{job.category}</h4>
                          <p className="text-gray-600">{job.description}</p>
                        </div>
                        <div className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${job.priority === 'High' ? 'bg-red-500' : job.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`}></span>
                          {job.priority} Priority
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User size={16} className="text-gray-400" />
                          <span>{job.customer}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            <DollarSign size={14} className="text-green-500" />
                            <span className="font-bold text-gray-800">{job.price}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRaiseProposal(job)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <Send size={18} />
                          Raise Proposal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmationModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <AlertCircle className="text-blue-600" size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Confirm Proposal</h3>
              </div>
              <button
                onClick={handleCancelConfirmation}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Are you sure you want to raise a proposal for this job?
                </p>

                {confirmationModal.job && (
                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`bg-gradient-to-r ${serviceIcons[confirmationModal.job.category]?.color || "from-gray-500 to-gray-700"} text-white p-2 rounded-lg`}>
                        {React.createElement(serviceIcons[confirmationModal.job.category]?.icon || Wrench, { size: 20 })}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{confirmationModal.job.category}</h4>
                        <p className="text-sm text-gray-600">{confirmationModal.job.description}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-gray-400" />
                        <span className="text-gray-700">{confirmationModal.job.customer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-gray-700">{confirmationModal.job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-green-500" />
                        <span className="text-gray-700 font-semibold">{confirmationModal.job.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${confirmationModal.job.priority === 'High' ? 'bg-red-500' :
                            confirmationModal.job.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        <span className="text-gray-700">{confirmationModal.job.priority} Priority</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleCancelConfirmation}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmProposal}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Proposal Modal */}
      {showProposalModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Service Proposal</h3>
                <button onClick={closeProposalModal} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`bg-gradient-to-r ${serviceIcons[selectedJob.category]?.color || "from-gray-500 to-gray-700"} text-white p-3 rounded-lg`}>
                    {React.createElement(serviceIcons[selectedJob.category]?.icon || Wrench, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{selectedJob.category}</h4>
                    <p className="text-sm text-gray-600">{selectedJob.customer} • {selectedJob.location}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Proposed Price (₹)*</label>
                  <input
                    type="number"
                    value={proposalData.price}
                    onChange={(e) => setProposalData({ ...proposalData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time*</label>
                  <input
                    type="text"
                    value={proposalData.estimatedTime}
                    onChange={(e) => setProposalData({ ...proposalData, estimatedTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Date</label>
                    <input
                      type="date"
                      value={proposalData.availableDate}
                      onChange={(e) => setProposalData({ ...proposalData, availableDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Available Time</label>
                    <input
                      type="time"
                      value={proposalData.availableTime}
                      onChange={(e) => setProposalData({ ...proposalData, availableTime: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Description*</label>
                  <textarea
                    value={proposalData.description}
                    onChange={(e) => setProposalData({ ...proposalData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button onClick={closeProposalModal} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300">
                  Cancel
                </button>
                <button onClick={submitProposal} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg">
                  Send Proposal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestsTab;