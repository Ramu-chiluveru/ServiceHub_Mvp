import React from 'react';
import { CheckCircle, Calendar, Clock, Star } from 'lucide-react';

const CompletedJobsTab = ({ completedJobs }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          Completed Jobs
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
            {completedJobs.length} this week
          </span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-4 font-medium">Customer</th>
                <th className="pb-4 font-medium">Service</th>
                <th className="pb-4 font-medium">Date & Time</th>
                <th className="pb-4 font-medium">Duration</th>
                <th className="pb-4 font-medium">Amount</th>
                <th className="pb-4 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {completedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 font-medium text-gray-800">{job.customer}</td>
                  <td className="py-4 text-gray-600">{job.service}</td>
                  <td className="py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{job.date}</span>
                      <span className="text-gray-400">•</span>
                      <Clock size={14} className="text-gray-400" />
                      <span>{job.time}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">{job.duration}</td>
                  <td className="py-4 font-medium text-gray-800">{job.amount}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={i < job.rating ? 'currentColor' : 'none'}
                          className={`${i < job.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedJobsTab;
