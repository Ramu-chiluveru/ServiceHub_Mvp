import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Bell, ClipboardList, CheckCircle as CheckCircleIcon, BarChart3, 
  Calendar, Home, Droplets, Zap, Sparkles, Wrench, PaintBucket, Bug, TreePalm, Shield, Sofa
} from 'lucide-react';
import Cookies from 'js-cookie';

// Import tab components
import DashboardTab from './components/DashboardTab';
import RequestsTab from './components/RequestsTab';
import MyProposals from './components/requestspage/Myrequests2';
import CompletedJobsTab from './components/CompletedJobsTab';
import AnalyticsTab from './components/Analytics';
import ScheduleTab from './components/schedule';
import ProfileTab from './components/profile';
import useUserLocation from '../../hooks/UserLocation';

const ServiceProviderDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [proposalData, setProposalData] = useState({ price: '', estimatedTime: '', description: '', availableDate: '', availableTime: '' });
  const [scheduleTimings, setScheduleTimings] = useState({ startTime: '09:00', endTime: '18:00', workingDays: [1, 2, 3, 4, 5] });
  const [todaysEarnings, setTodaysEarnings] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(0);
  const [weeklyEarnings, setWeeklyEarnings] = useState(0);
  const [proposals, setProposals] = useState([]);
  const [jobRequests, setJobRequests] = useState([]);

  const token = Cookies.get("token");
  const { location, loading } = useUserLocation();
  const hasSentLocation = useRef(false);

  const completedJobs = [
    { id: 1, customer: "Amit Patel", service: "Plumbing", amount: "₹1,200", rating: 5, date: "Today", time: "2:30 PM", duration: "2.5 hrs" },
    { id: 2, customer: "Sunita Reddy", service: "Painting", amount: "₹2,500", rating: 4, date: "Yesterday", time: "4:15 PM", duration: "4 hrs" },
    { id: 3, customer: "Kiran Singh", service: "AC Service", amount: "₹900", rating: 5, date: "2 days ago", time: "11:00 AM", duration: "1.5 hrs" },
    { id: 4, customer: "Meera Iyer", service: "Electrical", amount: "₹650", rating: 4, date: "3 days ago", time: "3:20 PM", duration: "1 hr" },
    { id: 5, customer: "Rohit Gupta", service: "AC Repair", amount: "₹1,100", rating: 5, date: "4 days ago", time: "10:45 AM", duration: "3 hrs" }
  ];

  const weeklyStats = [
    { day: 'Mon', earnings: 2100, jobs: 3 },
    { day: 'Tue', earnings: 1800, jobs: 2 },
    { day: 'Wed', earnings: 2800, jobs: 4 },
    { day: 'Thu', earnings: 2300, jobs: 3 },
    { day: 'Fri', earnings: 3200, jobs: 5 },
    { day: 'Sat', earnings: 2600, jobs: 4 },
    { day: 'Sun', earnings: 1900, jobs: 2 }
  ];

  const serviceIcons = {
    "plumbing": { icon: Droplets, color: "from-blue-500 to-blue-700", lightColor: "bg-blue-50" },
    "ac-repair": { icon: Droplets, color: "from-cyan-500 to-blue-600", lightColor: "bg-cyan-50" },
    "furniture": { icon: Sofa, color: "from-orange-500 to-orange-700", lightColor: "bg-orange-50" },
    "electrical": { icon: Zap, color: "from-yellow-500 to-orange-600", lightColor: "bg-yellow-50" },
    "cleaning": { icon: Sparkles, color: "from-teal-500 to-emerald-600", lightColor: "bg-teal-50" },
    "carpentry": { icon: Wrench, color: "from-amber-600 to-yellow-700", lightColor: "bg-amber-50" },
    "painting": { icon: PaintBucket, color: "from-purple-500 to-purple-700", lightColor: "bg-purple-50" },
    "pest-control": { icon: Bug, color: "from-red-500 to-red-700", lightColor: "bg-red-50" },
    "landscaping": { icon: TreePalm, color: "from-green-500 to-lime-600", lightColor: "bg-green-50" },
    "home-security": { icon: Shield, color: "from-indigo-500 to-indigo-700", lightColor: "bg-indigo-50" },
  };

  const daysOfWeek = [
    { id: 0, name: 'Sun' }, { id: 1, name: 'Mon' }, { id: 2, name: 'Tue' },
    { id: 3, name: 'Wed' }, { id: 4, name: 'Thu' }, { id: 5, name: 'Fri' }, { id: 6, name: 'Sat' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const earningsInterval = setInterval(() => setTodaysEarnings(prev => prev < 3700 ? prev + 100 : 3700), 50);
    const weeklyInterval = setInterval(() => setWeeklyEarnings(prev => prev < 16800 ? prev + 200 : 16800), 30);
    const jobsInterval = setInterval(() => setJobsCompleted(prev => prev < 23 ? prev + 1 : 23), 100);
    setTimeout(() => {
      clearInterval(earningsInterval);
      clearInterval(weeklyInterval);
      clearInterval(jobsInterval);
    }, 2000);
    return () => {
      clearInterval(timer);
      clearInterval(earningsInterval);
      clearInterval(weeklyInterval);
      clearInterval(jobsInterval);
    };
  }, []);

  useEffect(() => {
    if (!token) return;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const endpoint = `${BASE_URL}/api/provider/jobs`;
    fetch(endpoint, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.ok ? res.json() : [])
      .then(data => setJobRequests(data))
      .catch(err => console.error("Error fetching jobs", err));
  }, [token]);

  useEffect(() => {
    if (!loading && location?.lat && location?.lng && !hasSentLocation.current) 
      {

        console.log(`location: ${JSON.stringify(location)}`);
      hasSentLocation.current = true;
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const endpoint = `${BASE_URL}/api/user/location`;
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ latitude: location.lat, longitude: location.lng })
      })
        .then(res => res.text())
        .then(data => console.log("Saved location:", data))
        .catch(err => {
          console.error("Failed to save location", err);
          hasSentLocation.current = false;
        });
    }
  }, [location, loading, token]);

  const filteredJobs = jobRequests.filter(job => {
    const matchesSearch = job.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.priority?.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const openProposalModal = (job) => {
    setSelectedJob(job);
    setProposalData({
      price: job.price.replace('₹', ''),
      estimatedTime: job.estimatedDuration,
      description: `Professional ${job.service.toLowerCase()} service with quality guarantee`,
      availableDate: new Date().toISOString().split('T')[0],
      availableTime: '10:00'
    });
    setShowProposalModal(true);
  };

  const submitProposal = () => {
    if (!proposalData.price || !proposalData.estimatedTime || !proposalData.description) {
      alert('Please fill in all required fields');
      return;
    }
    const newProposal = {
      id: proposals.length + 1,
      jobId: selectedJob.id,
      customer: selectedJob.customer,
      service: selectedJob.service,
      proposedPrice: `₹${proposalData.price}`,
      status: "Pending",
      submittedDate: new Date().toISOString().split('T')[0],
      details: proposalData
    };
    setProposals([...proposals, newProposal]);
    setJobRequests(prev => prev.filter(job => job.id !== selectedJob.id));
    setShowProposalModal(false);
    setSelectedJob(null);
    alert('Proposal sent successfully!');
  };

  const closeProposalModal = () => {
    setShowProposalModal(false);
    setSelectedJob(null);
    setProposalData({ price: '', estimatedTime: '', description: '', availableDate: '', availableTime: '' });
  };

  const handleScheduleChange = (field, value) => setScheduleTimings(prev => ({ ...prev, [field]: value }));
  const toggleWorkingDay = (day) => setScheduleTimings(prev => ({
    ...prev,
    workingDays: prev.workingDays.includes(day)
      ? prev.workingDays.filter(d => d !== day)
      : [...prev.workingDays, day]
  }));

  const TabButton = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`relative flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
        activeTab === id ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
      }`}
    >
      <div className="relative">
        <Icon size={20} />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </div>
      <span className="hidden sm:inline text-sm">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 my-20">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <TabButton id="dashboard" label="Dashboard" icon={Home} />
          <TabButton id="requests" label="Job Requests" icon={Bell} count={jobRequests.length} />
          <TabButton id="proposals" label="My Order" icon={ClipboardList} count={proposals.filter(p => p.status === "Pending").length} />
          <TabButton id="completed" label="Completed" icon={CheckCircleIcon} />
          <TabButton id="analytics" label="Analytics" icon={BarChart3} />
          <TabButton id="schedule" label="Schedule" icon={Calendar} />
          <TabButton id="profile" label="Profile" icon={User} />
        </div>

        {activeTab === 'dashboard' && <DashboardTab todaysEarnings={todaysEarnings} jobsCompleted={jobsCompleted} weeklyEarnings={weeklyEarnings} weeklyStats={weeklyStats} currentTime={currentTime} />}
        {activeTab === 'requests' && <RequestsTab jobRequests={jobRequests} setJobRequests={setJobRequests} filteredJobs={filteredJobs} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterStatus={filterStatus} setFilterStatus={setFilterStatus} showProposalModal={showProposalModal} setShowProposalModal={setShowProposalModal} selectedJob={selectedJob} setSelectedJob={setSelectedJob} proposalData={proposalData} setProposalData={setProposalData} openProposalModal={openProposalModal} closeProposalModal={closeProposalModal} submitProposal={submitProposal} />}
        {activeTab === 'proposals' && <MyProposals proposals={proposals} />}
        {activeTab === 'completed' && <CompletedJobsTab completedJobs={completedJobs} />}
        {activeTab === 'analytics' && <AnalyticsTab weeklyStats={weeklyStats} todaysEarnings={todaysEarnings} jobsCompleted={jobsCompleted} weeklyEarnings={weeklyEarnings} />}
        {activeTab === 'schedule' && <ScheduleTab scheduleTimings={scheduleTimings} handleScheduleChange={handleScheduleChange} toggleWorkingDay={toggleWorkingDay} daysOfWeek={daysOfWeek} />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </div>
  );
};

export default ServiceProviderDashboard;
