import { Calendar, Clock, Activity, Info, Wind, Zap, Navigation } from "lucide-react";
import { useState } from "react";

const daysOfWeek = [
  { id: 0, name: 'Sun' },
  { id: 1, name: 'Mon' },
  { id: 2, name: 'Tue' },
  { id: 3, name: 'Wed' },
  { id: 4, name: 'Thu' },
  { id: 5, name: 'Fri' },
  { id: 6, name: 'Sat' },
];

const Schedule = () => {
  const [scheduleTimings, setScheduleTimings] = useState({
    startTime: '09:00',
    endTime: '17:00',
    workingDays: [1, 2, 3, 4, 5], // Default to weekdays
  });

  const [isAvailable, setIsAvailable] = useState(true);

  const handleScheduleChange = (field, value) => {
    setScheduleTimings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleWorkingDay = (dayId) => {
    setScheduleTimings(prev => {
      if (prev.workingDays.includes(dayId)) {
        return {
          ...prev,
          workingDays: prev.workingDays.filter(id => id !== dayId)
        };
      } else {
        return {
          ...prev,
          workingDays: [...prev.workingDays, dayId]
        };
      }
    });
  };

  return (
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
  );
};

export default Schedule;