import React from 'react';
import { 
  DollarSign, CheckCircle, Award, Activity, 
  Zap, Map, Camera, FileText, Navigation,
  Wind, Calendar, TrendingUp, Target, Star,
  Bell, Clock, MapPin
} from 'lucide-react';

const MiniChart = ({ data }) => (
  <div className="flex items-end gap-1 h-8">
    {data.map((value, index) => (
      <div
        key={index}
        className="bg-white/30 rounded-sm transition-all duration-300 hover:bg-white/50"
        style={{ 
          height: `${(value / Math.max(...data)) * 100}%`, 
          width: '8px' 
        }}
      />
    ))}
  </div>
);

const DashboardTab = ({ 
  todaysEarnings = 2500, 
  jobsCompleted = 12, 
  weeklyEarnings = 18500, 
  weeklyStats = [
    { earnings: 2200, jobs: 8 },
    { earnings: 2800, jobs: 12 },
    { earnings: 3100, jobs: 15 },
    { earnings: 2900, jobs: 11 },
    { earnings: 3200, jobs: 14 },
    { earnings: 2600, jobs: 10 },
    { earnings: 2500, jobs: 12 }
  ],
  currentTime = new Date()
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Service Provider Dashboard</h1>
          <p className="text-gray-600">Track your performance and manage your day</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today's Earnings Card */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-green-100 text-sm font-medium">Today's Earnings</p>
                <p className="text-3xl font-bold">₹{todaysEarnings.toLocaleString()}</p>
                <p className="text-green-100 text-xs mt-1 flex items-center gap-1">
                  <TrendingUp size={12} />
                  +12% from yesterday
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <DollarSign size={28} />
              </div>
            </div>
            <MiniChart data={weeklyStats.map(s => s.earnings)} />
          </div>
          
          {/* Jobs Completed Card */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-blue-100 text-sm font-medium">Jobs Completed</p>
                <p className="text-3xl font-bold">{jobsCompleted}</p>
                <p className="text-blue-100 text-xs mt-1 flex items-center gap-1">
                  <Target size={12} />
                  Goal: 30 jobs
                </p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <CheckCircle size={28} />
              </div>
            </div>
            <MiniChart data={weeklyStats.map(s => s.jobs)} />
          </div>
          
          {/* Average Rating Card */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Average Rating</p>
                <p className="text-3xl font-bold flex items-center gap-2">
                  4.8 <Star size={20} fill="currentColor" />
                </p>
                <p className="text-yellow-100 text-xs mt-1">From 156 reviews</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Award size={28} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" className="text-white/60" />
              ))}
            </div>
          </div>
          
          {/* Weekly Earnings Card */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-purple-100 text-sm font-medium">Weekly Earnings</p>
                <p className="text-3xl font-bold">₹{weeklyEarnings.toLocaleString()}</p>
                <p className="text-purple-100 text-xs mt-1">🔥 Best week yet!</p>
              </div>
              <div className="bg-white/20 p-3 rounded-xl">
                <Activity size={28} />
              </div>
            </div>
            <MiniChart data={weeklyStats.map(s => s.earnings)} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Zap className="text-yellow-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Bell, label: "View Requests", color: "from-blue-500 to-blue-600", count: 3 },
              { icon: Map, label: "Navigate", color: "from-green-500 to-green-600" },
              { icon: Camera, label: "Photo Upload", color: "from-purple-500 to-purple-600" },
              { icon: FileText, label: "Generate Report", color: "from-orange-500 to-red-500" }
            ].map((action, index) => (
              <button 
                key={index} 
                className={`group relative overflow-hidden bg-gradient-to-r ${action.color} p-6 rounded-2xl text-white transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative flex flex-col items-center gap-3">
                  <action.icon size={32} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="font-medium text-center text-sm">{action.label}</span>
                  {action.count && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {action.count}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <Calendar className="text-blue-500" />
            Today's Schedule
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              3 appointments
            </span>
            <span className="ml-auto text-sm text-gray-500">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <Wind size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">AC Service - Meera Apartments</h4>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <MapPin size={14} /> Kondapur • 
                  <Clock size={14} /> 2:00 PM • 
                  <DollarSign size={14} /> ₹800 • 
                  ⏱️ 2 hrs
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  In 3 hours
                </span>
                <button className="text-blue-500 hover:text-blue-700 transition-colors">
                  <Navigation size={16} />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500 hover:shadow-md transition-all duration-300">
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <Zap size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Electrical Work - Kumar Residence</h4>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <MapPin size={14} /> Gachibowli • 
                  <Clock size={14} /> 5:30 PM • 
                  <DollarSign size={14} /> ₹600 • 
                  ⏱️ 1.5 hrs
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  In 6 hours
                </span>
                <button className="text-green-500 hover:text-green-700 transition-colors">
                  <Navigation size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;