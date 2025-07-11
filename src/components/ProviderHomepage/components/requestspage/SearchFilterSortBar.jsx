import {React,useState} from 'react';
import { Search, RefreshCw, CheckCircle, Star,DollarSign, Award,Clock, XCircle ,Filter,ArrowUp, ArrowDown} from 'lucide-react';

const SearchFilterSortBar = ({ 
  searchQuery, setSearchQuery,
  activeTab, setActiveTab,
  filterStatus, setFilterStatus,
  sortBy, setSortBy,
  stats
})  => {

  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

   const handleSortChange = (criteria) => {
    if (sortBy === criteria) 
    {
      setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortBy(criteria === 'date' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
        
        {/* Search */}
        <div className="w-full lg:w-1/4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="w-full lg:w-2/4 flex gap-1.5 border border-gray-300 rounded-lg">
          {['completed', 'confirmed','pending', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => {
                setActiveTab(status);
                setFilterStatus(status);
              }}
              className={`flex-1 px-3 py-2 rounded-md font-medium transition-all duration-200 flex items-center justify-center gap-1.5 text-sm ${
                activeTab === status
                  ? `bg-${getColor(status)}-500 text-white shadow-sm`
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {getIcon(status)}
              {capitalize(status)}
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-xs">{(stats[`${status}`]) ?? 0}</span>
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="w-full lg:w-1/4 flex items-center gap-2">
          <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)} 
                  className="flex items-center gap-1.5 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all hover:shadow-md"
                >
                  <Filter size={14} className="text-indigo-600" /> 
                  Sort by: {sortBy} {sortBy === 'asc' ? <ArrowUp size={12} className="text-indigo-600" /> : <ArrowDown size={12} className="text-indigo-600" />}
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                    <button onClick={() => handleSortChange('date')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-indigo-50 flex items-center justify-between transition-colors">
                      <span className="flex items-center"><Star size={14} className="mr-2 text-indigo-600" /> Date</span>
                      {sortBy === 'date' && (sortBy === 'asc' ? <ArrowUp size={12} className="text-indigo-600" /> : <ArrowDown size={12} className="text-indigo-600" />)}
                    </button>
                    <button onClick={() => handleSortChange('price')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-indigo-50 flex items-center justify-between transition-colors">
                      <span className="flex items-center"><DollarSign size={14} className="mr-2 text-indigo-600" /> Price</span>
                      {sortBy === 'price' && (sortBy === 'asc' ? <ArrowUp size={12} className="text-indigo-600" /> : <ArrowDown size={12} className="text-indigo-600" />)}
                    </button>
                    <button onClick={() => handleSortChange('status')} className="w-full px-4 py-2.5 text-left text-sm hover:bg-indigo-50 flex items-center justify-between transition-colors">
                      <span className="flex items-center"><Award size={14} className="mr-2 text-indigo-600" /> Status</span>
                      {sortBy === 'status' && (sortBy === 'asc' ? <ArrowUp size={12} className="text-indigo-600" /> : <ArrowDown size={12} className="text-indigo-600" />)}
                    </button>
                  </div>
                )}
              </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function getColor(status) {
  return {
    completed: 'green',
    confirmed: 'blue',
    cancelled: 'red',
    pending : 'yellow'
  }[status];
}

function getIcon(status) {
  return {
    completed: <CheckCircle className="w-3 h-3" />,
    confirmed: <Clock className="w-3 h-3" />,
    cancelled: <XCircle className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />
  }[status];
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default SearchFilterSortBar;