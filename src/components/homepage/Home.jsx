import React, { useState } from 'react';
import { Search, MapPin, Star, User, Plus, Menu, X, Filter, ChevronDown } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filteredServices, setFilteredServices] = useState([]);

  const serviceCategories = [
    { name: 'Crafts', icon: '🎨' },
    { name: 'Plumbers', icon: '🔧' },
    { name: 'Electricians', icon: '⚡' },
    { name: 'Cleaners', icon: '🧹' },
    { name: 'Gardeners', icon: '🌱' },
    { name: 'Painters', icon: '🎨' },
  ];

  const featuredServices = [
    {
      id: 1,
      title: 'Professional House Cleaning',
      provider: 'CleanPro Services',
      rating: 4.8,
      price: 50,
      priceDisplay: '$50/hour',
      image: '🏠',
      category: 'Cleaners',
      location: 'Downtown',
      reviews: 156
    },
    {
      id: 2,
      title: 'Emergency Plumbing Repair',
      provider: 'QuickFix Plumbing',
      rating: 4.9,
      price: 80,
      priceDisplay: '$80/hour',
      image: '🔧',
      category: 'Plumbers',
      location: 'Midtown',
      reviews: 203
    },
    {
      id: 3,
      title: 'Electrical Installation',
      provider: 'PowerPro Electric',
      rating: 4.7,
      price: 65,
      priceDisplay: '$65/hour',
      image: '⚡',
      category: 'Electricians',
      location: 'Uptown',
      reviews: 89
    },
    {
      id: 4,
      title: 'Garden Landscaping',
      provider: 'Green Thumb Gardens',
      rating: 4.6,
      price: 45,
      priceDisplay: '$45/hour',
      image: '🌱',
      category: 'Gardeners',
      location: 'Suburbs',
      reviews: 134
    },
    {
      id: 5,
      title: 'Interior Painting',
      provider: 'ColorCraft Painters',
      rating: 4.5,
      price: 40,
      priceDisplay: '$40/hour',
      image: '🎨',
      category: 'Painters',
      location: 'Downtown',
      reviews: 76
    },
    {
      id: 6,
      title: 'Carpet Cleaning',
      provider: 'FreshStart Cleaners',
      rating: 4.8,
      price: 35,
      priceDisplay: '$35/hour',
      image: '🧽',
      category: 'Cleaners',
      location: 'Midtown',
      reviews: 112
    },
    {
      id: 7,
      title: 'Custom Woodwork',
      provider: 'Artisan Wood Co.',
      rating: 4.9,
      price: 75,
      priceDisplay: '$75/hour',
      image: '🪵',
      category: 'Crafts',
      location: 'Workshop District',
      reviews: 67
    },
    {
      id: 8,
      title: 'HVAC Maintenance',
      provider: 'CoolAir Systems',
      rating: 4.4,
      price: 85,
      priceDisplay: '$85/hour',
      image: '❄️',
      category: 'Electricians',
      location: 'Industrial Area',
      reviews: 98
    }
  ];

  // Filter and sort services
  const getFilteredAndSortedServices = () => {
    let filtered = featuredServices.filter(service => {
      const matchesSearch = searchQuery === '' || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = selectedLocation === '' || 
        service.location.toLowerCase().includes(selectedLocation.toLowerCase());
      
      const matchesServiceType = selectedServiceType === '' || 
        service.category === selectedServiceType;
      
      const matchesRating = selectedRating === '' || 
        (selectedRating === '4.5+' && service.rating >= 4.5) ||
        (selectedRating === '4.0+' && service.rating >= 4.0) ||
        (selectedRating === '3.5+' && service.rating >= 3.5);
      
      return matchesSearch && matchesLocation && matchesServiceType && matchesRating;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'reviews':
          comparison = a.reviews - b.reviews;
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = a.rating - b.rating;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  };

  const sortedServices = getFilteredAndSortedServices();

  return (
    <div className="min-h-screen bg-white mt-10">
      {/* Search and Filters Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find the Perfect Service Provider
            </h1>
            <p className="text-xl text-gray-600">
              Connect with trusted professionals in your area
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Main search input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filter dropdowns */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <select
                      value={selectedServiceType}
                      onChange={(e) => setSelectedServiceType(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Service Type</option>
                      {serviceCategories.map((category) => (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
              {searchQuery || selectedLocation || selectedServiceType || selectedRating ? 
                `Search Results (${sortedServices.length})` : 
                'Featured Services'}
            </h2>
            
            {/* Sorting Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                  <option value="reviews">Reviews</option>
                  <option value="name">Name</option>
                </select>
              </div>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="flex w-30 items-center space-x-1 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
              </button>
            </div>
          </div>

          {sortedServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">{service.image}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{service.provider}</p>
                    <p className="text-sm text-gray-500 mb-3 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.location}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900 ml-1">{service.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{service.priceDisplay}</span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Search & Filter</h3>
              <p className="text-gray-600">
                Find the right service provider using our advanced search and filtering options
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect & Book</h3>
              <p className="text-gray-600">
                Connect with verified professionals and book your service instantly
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Rate & Review</h3>
              <p className="text-gray-600">
                Share your experience and help others find the best service providers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Home;