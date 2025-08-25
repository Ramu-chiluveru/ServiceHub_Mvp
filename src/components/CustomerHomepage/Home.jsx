import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  User,
  Plus,
  Menu,
  X,
  Filter,
  ChevronDown,
  Check,
  AlertCircle,
} from "lucide-react";
import PopupForm from "./requestspage/PopupForm";
import useUserLocation from "../../hooks/UserLocation";
import Cookies from "js-cookie";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filteredServices, setFilteredServices] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [plusClicked, setPlusClicked] = useState(false);

  // Booking confirmation states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("idle"); // idle, loading, success, error

  const serviceCategories = [
    { name: "Crafts", icon: "🎨" },
    { name: "Plumbers", icon: "🔧" },
    { name: "Electricians", icon: "⚡" },
    { name: "Cleaners", icon: "🧹" },
    { name: "Gardeners", icon: "🌱" },
    { name: "Painters", icon: "🎨" },
  ];

  const categoryIcons = {
    plumbing: "🔧",
    "ac-repair": "❄️",
    furniture: "🪑",
    electrical: "⚡",
    cleaning: "🧹",
    carpentry: "🪚",
    painting: "🎨",
    appliance: "🔌",
    "pest-control": "🐜",
    landscaping: "🌱",
    "home-security": "🔒",
    other: "🛠️",
  };

  const { location, loading, error } = useUserLocation();
  console.log(`location: ${JSON.stringify(location)}`);
  const token = Cookies.get("token");

  // Booking handlers
  const handleBookNow = (service) => {
    setSelectedService(service);
    setShowConfirmModal(true);
    setBookingStatus("idle");
  };

  const handleConfirmBooking = async () => {
    setBookingStatus("loading");

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const response = await fetch(`${BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: selectedService.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingStatus("success");
        console.log("Booking confirmed:", result);
        // Close modal after 2 seconds
        setTimeout(() => {
          setShowConfirmModal(false);
          setBookingStatus("idle");
        }, 2000);
      } else {
        throw new Error("Booking failed");
      }
    } catch (error) {
      console.error("Error booking service:", error);
      setBookingStatus("error");
    }
  };

  const handleCancelBooking = () => {
    setShowConfirmModal(false);
    setSelectedService(null);
    setBookingStatus("idle");
  };

  useEffect(() => {
    if (!loading && location.lat && location.lng) {
      const saveLocation = async () => {
        try {
          const BASE_URL = import.meta.env.VITE_BASE_URL;
          const endpoint = `${BASE_URL}/api/user/location`;

          const res = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              latitude: location.lat,
              longitude: location.lng,
            }),
          });
          const data = await res.text();
          console.log("Saved location:", data);
        } catch (err) {
          console.error("Failed to save location", err);
        }
      };

      saveLocation();
    }
  }, [location, loading]);

  useEffect(() => {
    const fetchRequests = async () => {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const endpoint = `${BASE_URL}/api/provider/services/all`;
      try {
        setLoading(true);
        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("services:", data);
        setFeaturedServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [token]);

  // Filter and sort services
  const getFilteredAndSortedServices = () => {
    let filtered = featuredServices?.filter((service) => {
      const matchesSearch =
        searchQuery === "" ||
        (service.title &&
          service.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (service.provider &&
          service.provider.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (service.category &&
          service.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLocation =
        selectedLocation === "" ||
        (service.location &&
          service.location
            .toLowerCase()
            .includes(selectedLocation.toLowerCase()));

      const matchesServiceType =
        selectedServiceType === "" || service.category === selectedServiceType;

      const matchesRating =
        selectedRating === "" ||
        (selectedRating === "4.5+" && service.rating >= 4.5) ||
        (selectedRating === "4.0+" && service.rating >= 4.0) ||
        (selectedRating === "3.5+" && service.rating >= 3.5);

      return (
        matchesSearch && matchesLocation && matchesServiceType && matchesRating
      );
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "price":
          comparison = (a.price || 0) - (b.price || 0);
          break;
        case "rating":
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
        case "reviews":
          comparison = (a.reviews || 0) - (b.reviews || 0);
          break;
        case "name":
          comparison = (a.title || "").localeCompare(b.title || "");
          break;
        default:
          comparison = (a.rating || 0) - (b.rating || 0);
      }

      return sortOrder === "desc" ? -comparison : comparison;
    });

    return filtered;
  };

  const sortedServices = getFilteredAndSortedServices();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-b-3 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

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
              {searchQuery ||
              selectedLocation ||
              selectedServiceType ||
              selectedRating
                ? `Search Results (${sortedServices.length})`
                : "Featured Services"}
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
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="flex w-30 items-center space-x-1 px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
              >
                <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                <span>{sortOrder === "asc" ? "Ascending" : "Descending"}</span>
              </button>
            </div>
          </div>

          {sortedServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No services found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200"
                >
                  <div className="p-6">
                    <div className="text-4xl mb-4 text-center">
                      {categoryIcons[service.category?.toLowerCase()] || "🛠️"}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {service.title || service.servicename}
                    </h3>
                    <p className="text-gray-600 mb-2">{service.description}</p>
                    <p className="text-sm text-gray-500 mb-3 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {service.location || "Region"}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-900 ml-1">
                            {service.rating || service.ratings || "N/A"}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          ({service.reviews || 0} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        {service.priceDisplay ||
                          service.price ||
                          "Contact for price"}
                      </span>
                      <button
                        onClick={() => handleBookNow(service)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      >
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

      {/* Booking Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl max-w-md w-full mx-auto my-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm Booking
                </h3>
                <button
                  onClick={handleCancelBooking}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {bookingStatus === "idle" && (
                <>
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <div className="text-2xl mr-3">
                        {categoryIcons[
                          selectedService?.category?.toLowerCase()
                        ] || "🛠️"}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {selectedService?.title ||
                            selectedService?.servicename}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {selectedService?.description}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Price:</span>
                        <span className="font-semibold text-blue-600">
                          {selectedService?.priceDisplay ||
                            selectedService?.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">
                            {selectedService?.rating ||
                              selectedService?.ratings}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">
                    Are you sure you want to book this service? You will be
                    contacted by the service provider to confirm the details.
                  </p>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancelBooking}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </>
              )}

              {bookingStatus === "loading" && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Processing your booking...</p>
                </div>
              )}

              {bookingStatus === "success" && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Booking Confirmed!
                  </h4>
                  <p className="text-gray-600">
                    Your booking request has been sent successfully. The service
                    provider will contact you soon.
                  </p>
                </div>
              )}

              {bookingStatus === "error" && (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Booking Failed
                  </h4>
                  <p className="text-gray-600 mb-4">
                    There was an error processing your booking. Please try
                    again.
                  </p>
                  <button
                    onClick={() => setBookingStatus("idle")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search & Filter
              </h3>
              <p className="text-gray-600">
                Find the right service provider using our advanced search and
                filtering options
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect & Book
              </h3>
              <p className="text-gray-600">
                Connect with verified professionals and book your service
                instantly
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Rate & Review
              </h3>
              <p className="text-gray-600">
                Share your experience and help others find the best service
                providers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Form */}
      {plusClicked && (
        <div onClick={() => setPlusClicked(false)}>
          <PopupForm onClose={() => setPlusClicked(false)} reqId={null} />
        </div>
      )}

      {/* Add Service Button */}
      <button
        onClick={() => setPlusClicked(true)}
        className={`fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-40 transform hover:scale-110 active:scale-95 ${
          plusClicked ? "rotate-45 bg-red-500" : "rotate-0"
        }`}
      >
        <Plus className="h-6 w-6 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default Home;
