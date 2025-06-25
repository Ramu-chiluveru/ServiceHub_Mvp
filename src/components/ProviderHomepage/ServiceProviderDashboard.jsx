import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle, 
  XCircle, 
  Settings, 
  Bell, 
  Calendar,
  Wrench,
  Zap,
  Droplets,
  PaintBucket,
  Wind,
  Home,
  TrendingUp,
  Award,
  Target,
  Phone,
  MessageCircle,
  Navigation,
  Battery,
  Wifi,
  Signal,
  BarChart3,
  Filter,
  Search,
  Menu,
  X,
  Map,
  Camera,
  FileText,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Minus,
  RefreshCw,
  AlertCircle,
  ThumbsUp,
  Shield,
  Truck,
  Timer,
  Activity
} from 'lucide-react';

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
    
    // Animate earnings counter
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

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
        activeTab === id 
          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105' 
          : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md'
      }`}
    >
      <Icon size={18} />
      <span className="hidden sm:inline">{label}</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {count}
        </span>
      )}
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

  const daysOfWeek = [
    { id: 0, name: 'Sun' },
    { id: 1, name: 'Mon' },
    { id: 2, name: 'Tue' },
    { id: 3, name: 'Wed' },
    { id: 4, name: 'Thu' },
    { id: 5, name: 'Fri' },
    { id: 6, name: 'Sat' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 my-20">
      {/* Status Bar */}
      <div className="max-w-6xl mx-auto px-4 pt-2">
      </div>

      {/* Enhanced Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <TabButton id="dashboard" label="Dashboard" icon={Home} />
          <TabButton id="requests" label="Job Requests" icon={Bell} count={jobRequests.length} />
          <TabButton id="completed" label="Completed" icon={CheckCircle} />
          <TabButton id="analytics" label="Analytics" icon={BarChart3} />
          <TabButton id="schedule" label="Schedule" icon={Calendar} />
          <TabButton id="profile" label="Profile" icon={User} />
        </div>

        {/* Enhanced Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Enhanced Stats Cards with Mini Charts */}
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

            {/* Enhanced Quick Actions */}
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

            {/* Enhanced Today's Schedule */}
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

        {/* Enhanced Job Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Enhanced Search and Filter */}
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

        {/* Completed Jobs Tab */}
        {activeTab === 'completed' && (
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
                                fill={i < job.rating ? "currentColor" : "none"}
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
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <BarChart3 className="text-purple-500" />
                Performance Analytics
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4">Weekly Earnings</h4>
                  <div className="h-64">
                    <div className="flex items-end h-48 gap-2">
                      {weeklyStats.map((day, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-sm transition-all duration-300 hover:from-purple-600 hover:to-purple-400"
                            style={{ height: `${(day.earnings / 4000) * 100}%` }}
                          />
                          <span className="text-xs text-gray-500 mt-2">{day.day}</span>
                          <span className="text-xs font-medium text-gray-700">₹{day.earnings}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4">Service Distribution</h4>
                  <div className="h-64 flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      {[
                        { value: 35, color: "bg-blue-500", label: "AC Repair" },
                        { value: 25, color: "bg-green-500", label: "Electrical" },
                        { value: 20, color: "bg-yellow-500", label: "Plumbing" },
                        { value: 15, color: "bg-purple-500", label: "Painting" },
                        { value: 5, color: "bg-gray-500", label: "Other" }
                      ].map((item, index, array) => {
                        const total = array.reduce((sum, i) => sum + i.value, 0);
                        const percent = (item.value / total) * 100;
                        const offset = array.slice(0, index).reduce((sum, i) => sum + (i.value / total) * 360, 0);
                        
                        return (
                          <div
                            key={index}
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `conic-gradient(${item.color} 0deg ${offset + percent * 3.6}deg, transparent ${offset + percent * 3.6}deg 360deg)`
                            }}
                          />
                        );
                      })}
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center shadow-inner">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">156</div>
                          <div className="text-xs text-gray-500">Total Jobs</div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-8 space-y-3">
                      {[
                        { color: "bg-blue-500", label: "AC Repair", value: "35%" },
                        { color: "bg-green-500", label: "Electrical", value: "25%" },
                        { color: "bg-yellow-500", label: "Plumbing", value: "20%" },
                        { color: "bg-purple-500", label: "Painting", value: "15%" },
                        { color: "bg-gray-500", label: "Other", value: "5%" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-sm ${item.color}`} />
                          <span className="text-sm text-gray-700">{item.label}</span>
                          <span className="text-sm font-medium text-gray-800 ml-auto">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Customer Ratings</h4>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-gray-800 mb-2">4.8</div>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < 4 ? "currentColor" : "none"} className="text-yellow-500" />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">156 reviews</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="w-8 text-right text-sm font-medium text-gray-700">{stars}</div>
                        <Star size={16} fill="currentColor" className="text-yellow-500" />
                        <div className="flex-1 bg-gray-100 rounded-full h-3">
                          <div
                            className="bg-yellow-500 h-3 rounded-full"
                            style={{ width: `${(stars === 5 ? 120 : stars === 4 ? 30 : stars === 3 ? 5 : stars === 2 ? 3 : 2) / 1.6}%` }}
                          />
                        </div>
                        <div className="w-8 text-left text-sm text-gray-500">
                          {stars === 5 ? 120 : stars === 4 ? 30 : stars === 3 ? 5 : stars === 2 ? 3 : 2}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Calendar className="text-blue-500" />
                My Schedule
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Working Hours */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock size={20} className="text-blue-500" />
                    Working Hours
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                        <div className="relative">
                          <input
                            type="time"
                            value={scheduleTimings.startTime}
                            onChange={(e) => handleScheduleChange('startTime', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                        <div className="relative">
                          <input
                            type="time"
                            value={scheduleTimings.endTime}
                            onChange={(e) => handleScheduleChange('endTime', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                          <button
                            key={day.id}
                            onClick={() => toggleWorkingDay(day.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              scheduleTimings.workingDays.includes(day.id)
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {day.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Availability Status */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Activity size={20} className="text-green-500" />
                    Availability Status
                  </h4>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 font-medium">Current Status</p>
                        <p className="text-sm text-gray-500">
                          {isAvailable ? 'You are currently accepting new jobs' : 'You are not accepting new jobs'}
                        </p>
                      </div>
                      <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`relative w-16 h-8 rounded-full transition-all duration-300 transform hover:scale-105 ${
                          isAvailable 
                            ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-lg' 
                            : 'bg-gray-300'
                        }`}
                      >
                        <div className={`absolute w-7 h-7 bg-white rounded-full top-0.5 transition-all duration-300 shadow-md ${
                          isAvailable ? 'translate-x-8' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-3">
                        <Info className="text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-blue-800 font-medium">
                            Your current schedule: {scheduleTimings.startTime} - {scheduleTimings.endTime}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">
                            {scheduleTimings.workingDays.length === 7 
                              ? 'All days' 
                              : scheduleTimings.workingDays.length === 5 && 
                                scheduleTimings.workingDays.includes(1) && 
                                scheduleTimings.workingDays.includes(2) && 
                                scheduleTimings.workingDays.includes(3) && 
                                scheduleTimings.workingDays.includes(4) && 
                                scheduleTimings.workingDays.includes(5)
                                ? 'Weekdays'
                                : daysOfWeek
                                    .filter(day => scheduleTimings.workingDays.includes(day.id))
                                    .map(day => day.name)
                                    .join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Upcoming Appointments */}
              <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-purple-500" />
                  Upcoming Appointments
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                    <div className="bg-blue-500 text-white p-3 rounded-lg">
                      <Wind size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">AC Service - Meera Apartments</h4>
                      <p className="text-sm text-gray-600">📍 Kondapur • ⏰ Tomorrow, 2:00 PM • ⏱️ 2 hrs</p>
                    </div>
                    <button className="text-blue-500 hover:text-blue-700 transition-colors">
                      <Navigation size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                    <div className="bg-green-500 text-white p-3 rounded-lg">
                      <Zap size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">Electrical Work - Kumar Residence</h4>
                      <p className="text-sm text-gray-600">📍 Gachibowli • ⏰ Friday, 5:30 PM • ⏱️ 1.5 hrs</p>
                    </div>
                    <button className="text-green-500 hover:text-green-700 transition-colors">
                      <Navigation size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <User className="text-blue-500" />
                My Profile
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <img
                          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
                          alt="Profile"
                          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors">
                          <Edit size={16} />
                        </button>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">Ravi Kumar</h4>
                      <p className="text-gray-600 mb-2">⚡ Verified Electrician</p>
                      <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                        <Star size={14} fill="currentColor" />
                        <span>4.8 (156 reviews)</span>
                      </div>
                      
                      <div className="w-full space-y-3">
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                          <Edit size={16} />
                          Edit Profile
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
                          <Settings size={16} />
                          Account Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          value="Ravi Kumar"
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value="+91 9876543210"
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value="ravi.kumar@example.com"
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                          type="text"
                          value="Hyderabad, Telangana"
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4">Professional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
                        <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>Electrical Work</option>
                          <option>AC Repair</option>
                          <option>Plumbing</option>
                          <option>Painting</option>
                          <option>General Repair</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                        <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>5+ years</option>
                          <option>3-5 years</option>
                          <option>1-3 years</option>
                          <option>Less than 1 year</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skills & Specializations</label>
                        <textarea
                          rows={3}
                          value="Electrical wiring, Switchboard installation, Circuit breaker repair, Home automation, Lighting installation, Electrical safety inspection"
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-4">Verification & Documents</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-500" size={20} />
                          <div>
                            <p className="font-medium text-gray-800">ID Proof Verified</p>
                            <p className="text-sm text-gray-600">Aadhaar Card • Uploaded on 15 Jan 2023</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                          View
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="text-green-500" size={20} />
                          <div>
                            <p className="font-medium text-gray-800">Address Proof Verified</p>
                            <p className="text-sm text-gray-600">Electricity Bill • Uploaded on 15 Jan 2023</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                          View
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="text-yellow-500" size={20} />
                          <div>
                            <p className="font-medium text-gray-800">Professional Certificate</p>
                            <p className="text-sm text-gray-600">ITI Electrician • Pending verification</p>
                          </div>
                        </div>
                        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;