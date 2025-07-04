import React from 'react';
import { Activity, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';

export default function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card icon={<Activity className="h-5 w-5 text-blue-600" />} label="Total Bookings" value={stats.total} bg="blue" />
      <Card icon={<CheckCircle2 className="h-5 w-5 text-green-600" />} label="Confirmed" value={stats.confirmed} bg="green" />
      <Card icon={<TrendingUp className="h-5 w-5 text-purple-600" />} label="Completed" value={stats.completed} bg="purple" />
      <Card icon={<DollarSign className="h-5 w-5 text-emerald-600" />} label="Total Spent" value={`₹${stats.totalSpent}`} bg="emerald" />
    </div>
  );
}

const Card = ({ icon, label, value, bg }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
    <div className="flex items-center">
      <div className={`p-2 bg-${bg}-100 rounded-lg`}>{icon}</div>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);
