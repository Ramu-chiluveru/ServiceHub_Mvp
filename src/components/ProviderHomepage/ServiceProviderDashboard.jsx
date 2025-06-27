import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Clock, DollarSign, Star, CheckCircle, XCircle, 
  Settings, Bell, Calendar, Wrench, Zap, Droplets, PaintBucket, 
  Wind, Home, TrendingUp, Award, Target, Phone, MessageCircle, 
  Navigation, Battery, Wifi, Signal, BarChart3, Filter, Search, 
  Menu, X, Map, Camera, FileText, Download, Upload, Eye, Edit, 
  Plus, Minus, RefreshCw, AlertCircle, ThumbsUp, Shield, Truck, 
  Timer, Activity
} from 'lucide-react';

// Import your separate tab components
import AnalyticsTab from './components/Analytics';
import CompletedJobsTab from './components/CompletedJobsTab';
import ScheduleTab from './components/schedule';
import ProfileTab from './components/profile';

const ServiceProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAvailable, setIsAvailable] = useState(true);
  const [animateStats, setAnimateStats] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMap, setShowMap] = useState(false);
  const [scheduleTimings, setScheduleTimings] = useState({
    startTime: '09:00',
    endTime: '18:00',
    workingDays: [1, 2, 3, 4, 5] // Monday to Friday
  });
  
  const [jobRequests, setJobRequests] = useState([
    {
      id: 1,
      customer: "Rajesh Kumar",
      customerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      service: "AC Repair",
      location: "Banjara Hills, Hyderabad",
      distance: "2.3 km",
      price: "₹800",
      urgency: "High",
      description: "AC not cooling properly, making strange noise",
      time: "2 hours ago",
      rating: 4.8,
      previousJobs: 12,
      estimatedDuration: "2-3 hours",
      customerPhone: "+91 9876543210",
      photos: ["https://images.unsplash.com/photo-1631889993959-41b4e9c938c7?w=100&h=100&fit=crop"]
    },
    {
      id: 2,
      customer: "Priya Sharma",
      customerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b069?w=50&h=50&fit=crop&crop=face",
      service: "Electrical Work",
      location: "Jubilee Hills, Hyderabad",
      distance: "4.1 km",
      price: "₹600",
      urgency: "Medium",
      description: "Power socket replacement in kitchen",
      time: "45 minutes ago",
      rating: 4.5,
      previousJobs: 8,
      estimatedDuration: "1-2 hours",
      customerPhone: "+91 9876543211",
      photos: ["https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=100&h=100&fit=crop"]
    },
    {
      id: 3,
      customer: "Amit Patel",
      customerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      service: "Plumbing",
      location: "Madhapur, Hyderabad",
      distance: "1.8 km",
      price: "₹1200",
      urgency: "High",
      description: "Kitchen sink leakage, urgent repair needed",
      time: "30 minutes ago",
      rating: 4.9,
      previousJobs: 15,
      estimatedDuration: "1-2 hours",
      customerPhone: "+91 9876543212",
      photos: ["https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=100&h=100&fit=crop"]
    }
  ]);

  const [completedJobs] = useState([
    { id: 1, customer: "Amit Patel", service: "Plumbing", amount: "₹1,200", rating: 5, date: "Today", time: "2:30 PM", duration: "2.5 hrs" },
    { id: 2, customer: "Sunita Reddy", service: "Painting", amount: "₹2,500", rating: 4, date: "Yesterday", time: "4:15 PM", duration: "4 hrs" },
    { id: 3, customer: "Kiran Singh", service: "AC Service", amount: "₹900", rating: 5, date: "2 days ago", time: "11:00 AM", duration: "1.5 hrs" },
    { id: 4, customer: "Meera Iyer", service: "Electrical", amount: "₹650", rating: 4, date: "3 days ago", time: "3:20 PM", duration: "1 hr" },
    { id: 5, customer: "Rohit Gupta", service: "AC Repair", amount: "₹1,100", rating: 5, date: "4 days ago", time: "10:45 AM", duration: "3 hrs" }
  ]);

  const [weeklyStats] = useState([
    { day: 'Mon', earnings: 2100, jobs: 3 },
    { day: 'Tue', earnings: 1800, jobs: 2 },
    { day: 'Wed', earnings: 2800, jobs: 4 },
    { day: 'Thu', earnings: 2300, jobs: 3 },
    { day: 'Fri', earnings: 3200, jobs: 5 },
    { day: 'Sat', earnings: 2600, jobs: 4 },
    { day: 'Sun', earnings: 1900, jobs: 2 }
  ]);

  const [todaysEarnings, setTodaysEarnings] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [weeklyEarnings, setWeeklyEarnings] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setAnimateStats(true);
    
    const earningsInterval = setInterval(() => {
      setTodaysEarnings(prev => prev < 3700 ? prev + 100 : 3700);
    }, 50);
    
    const weeklyInterval = setInterval(() => {
      setWeeklyEarnings(prev => prev < 16800 ? prev + 200 : 16800);
    }, 30);
    
    const jobsInterval = setInterval(() => {
      setJobsCompleted(prev => prev < 23 ? prev + 1 : 23);
    }, 100);

    setTimeout(() => {
      clearInterval(earningsInterval);
      clearInterval(jobsInterval);
      clearInterval(weeklyInterval);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(earningsInterval);
      clearInterval(jobsInterval);
      clearInterval(weeklyInterval);
    };
  }, []);

  const serviceIcons = {
    "AC Repair": { icon: Wind, color: "from-cyan-500 to-blue-600", lightColor: "bg-cyan-50" },
    "Electrical Work": { icon: Zap, color: "from-yellow-500 to-orange-600", lightColor: "bg-yellow-50" },
    "Plumbing": { icon: Droplets, color: "from-blue-500 to-blue-700", lightColor: "bg-blue-50" },
    "Painting": { icon: PaintBucket, color: "from-purple-500 to-purple-700", lightColor: "bg-purple-50" },
    "General Repair": { icon: Wrench, color: "from-gray-500 to-gray-700", lightColor: "bg-gray-50" }
  };

  const acceptJob = (jobId) => {
    setJobRequests(prev => prev.filter(job => job.id !== jobId));
    setNotifications(prev => prev - 1);
  };

  const declineJob = (jobId) => {
    setJobRequests(prev => prev.filter(job => job.id !== jobId));
    setNotifications(prev => prev - 1);
  };

  const filteredJobs = jobRequests.filter(job => {
    const matchesSearch = job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.urgency.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleScheduleChange = (field, value) => {
    setScheduleTimings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleWorkingDay = (day) => {
    setScheduleTimings(prev => {
      const newDays = prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day];
      return {
        ...prev,
        workingDays: newDays
      };
    });
  };

  const daysOfWeek = [
    { id: 0, name: 'Sun' },
    { id: 1, name: 'Mon' },
    { id: 2, name: 'Tue' },
    { id: 3, name: 'Wed' },
    { id: 4, name: 'Thu' },
    { id: 5, name: 'Fri' },
    { id: 6, name: 'Sat' }
  ];

  const TabButton = ({ id, label, icon: Icon, count }) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      activeTab === id 
        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
    }`}
  >
    <div className="relative">
      <Icon size={20} />
      {count > 0 && (
        <span className={`
          absolute -top-2 -right-2 
          bg-red-500 text-white text-xs 
          rounded-full w-5 h-5 flex items-center justify-center
          ${activeTab === id ? 'ring-2 ring-white' : 'ring-2 ring-gray-100'}
          ${count > 9 ? 'px-1 text-[0.65rem]' : ''}
        `}>
          {count > 9 ? '9+' : count}
        </span>
      )}
    </div>
    <span className="hidden sm:inline text-sm">{label}</span>
  </button>
);

  const MiniChart = ({ data }) => (
    <div className="flex items-end gap-1 h-8">
      {data.map((value, index) => (
        <div
          key={index}
          className="bg-white/30 rounded-sm transition-all duration-300 hover:bg-white/50"
          style={{ height: `${(value / Math.max(...data)) * 100}%`, width: '8px' }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 my-20">
      <div className="max-w-6xl mx-auto px-4 pt-2">
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <TabButton id="dashboard" label="Dashboard" icon={Home} />
          <TabButton id="requests" label="Job Requests" icon={Bell} count={jobRequests.length} />
          <TabButton id="completed" label="Completed" icon={CheckCircle} />
          <TabButton id="analytics" label="Analytics" icon={BarChart3} />
          <TabButton id="schedule" label="Schedule" icon={Calendar} />
          <TabButton id="profile" label="Profile" icon={User} />
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
              
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Weekly Earnings</p>
                    <p className="text-3xl font-bold">₹{weeklyEarnings.toLocaleString()}</p>
                    <p className="text-purple-100 text-xs mt-1 animate-pulse">🔥 Best week yet!</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl animate-bounce">
                    <Activity size={28} />
                  </div>
                </div>
                <MiniChart data={weeklyStats.map(s => s.earnings)} />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Zap className="text-yellow-500" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Bell, label: "View Requests", color: "from-blue-500 to-blue-600", count: jobRequests.length },
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

            <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Calendar className="text-blue-500" />
                Today's Schedule
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  3 appointments
                </span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-300">
                  <div className="bg-blue-500 text-white p-2 rounded-lg">
                    <Wind size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">AC Service - Meera Apartments</h4>
                    <p className="text-sm text-gray-600">📍 Kondapur • ⏰ 2:00 PM • 💰 ₹800 • ⏱️ 2 hrs</p>
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
                    <p className="text-sm text-gray-600">📍 Gachibowli • ⏰ 5:30 PM • 💰 ₹600 • ⏱️ 1.5 hrs</p>
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
        )}

        {activeTab === 'requests' && (
          <div className="space-y-6 animate-fadeIn">
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
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      showMap ? 'bg-blue-500 text-white' : 'bg-white/50 text-gray-600 hover:bg-white/70'
                    }`}
                  >
                    <Map size={20} />
                  </button>
                </div>
              </div>
            </div>

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
                    const ServiceIcon = serviceIcons[job.service]?.icon || Wrench;
                    const gradientClass = serviceIcons[job.service]?.color || "from-gray-500 to-gray-700";
                    const bgClass = serviceIcons[job.service]?.lightColor || "bg-gray-50";
                    
                    return (
                      <div key={job.id} className={`p-6 rounded-2xl ${bgClass} border-l-4 ${job.urgency === 'High' ? 'border-red-500' : job.urgency === 'Medium' ? 'border-yellow-500' : 'border-green-500'} shadow-sm hover:shadow-md transition-all duration-300`}>
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-shrink-0">
                            <div className={`bg-gradient-to-r ${gradientClass} text-white p-4 rounded-xl w-14 h-14 flex items-center justify-center`}>
                              <ServiceIcon size={24} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                              <div>
                                <h4 className="text-lg font-bold text-gray-800">{job.service}</h4>
                                <p className="text-gray-600">{job.description}</p>
                              </div>
                              <div className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                  job.urgency === 'High' ? 'bg-red-500' : job.urgency === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                                }`}></span>
                                {job.urgency} Priority
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User size={16} className="text-gray-400" />
                                <span>{job.customer}</span>
                                <span className="flex items-center gap-1 text-yellow-600">
                                  <Star size={14} fill="currentColor" />
                                  {job.rating}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin size={16} className="text-gray-400" />
                                <span>{job.location}</span>
                                <span className="text-gray-400">({job.distance} away)</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock size={16} className="text-gray-400" />
                                <span>{job.time}</span>
                                <span className="text-gray-400">• {job.estimatedDuration}</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                                  <DollarSign size={14} className="text-green-500" />
                                  <span className="font-bold text-gray-800">{job.price}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <span>Previous jobs:</span>
                                  <span className="font-medium">{job.previousJobs}</span>
                                </div>
                              </div>
                              
                              <div className="flex gap-3">
                                <button
                                  onClick={() => declineJob(job.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-white text-red-500 rounded-xl font-medium border border-red-100 hover:bg-red-50 transition-colors duration-300"
                                >
                                  <XCircle size={18} />
                                  Decline
                                </button>
                                <button
                                  onClick={() => acceptJob(job.id)}
                                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                  <CheckCircle size={18} />
                                  Accept Job
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'completed' && (
          <CompletedJobsTab completedJobs={completedJobs} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsTab 
            weeklyStats={weeklyStats} 
            todaysEarnings={todaysEarnings}
            jobsCompleted={jobsCompleted}
            weeklyEarnings={weeklyEarnings}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleTab 
            scheduleTimings={scheduleTimings}
            handleScheduleChange={handleScheduleChange}
            toggleWorkingDay={toggleWorkingDay}
            daysOfWeek={daysOfWeek}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileTab />
        )}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;