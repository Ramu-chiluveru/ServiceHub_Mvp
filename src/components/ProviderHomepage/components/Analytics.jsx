import { BarChart3, Star } from 'lucide-react';

const Analytics = ({ weeklyStats }) => {
  return (
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
  );
};

export default Analytics;