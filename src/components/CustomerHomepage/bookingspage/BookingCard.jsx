import React from 'react';
import {
  Calendar, Clock, MapPin, User, Star, Wrench, Eye, Phone,
  XCircle, MoreVertical
} from 'lucide-react';

export default function BookingCard({ booking, onCancel }) {
  const {
    _id, serviceName, bookingId, date, time, duration, location, technician,
    technicianPhone, technicianRating, serviceType, serviceDetails, price,
    estimatedPrice, status, urgency, paymentStatus, notes, review, rating
  } = booking;

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold text-gray-900">{serviceName}</h3>
                <span className="ml-3 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {bookingId}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
                {urgency && (
                  <span className={`text-xs font-medium ${getUrgencyColor(urgency)}`}>
                    {urgency} priority
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  <span>{new Date(date).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-green-500" />
                  <span>{time} ({duration})</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-red-500" />
                  <span>{location}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                {technician && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-purple-500" />
                    <span>{technician}</span>
                    {technicianRating && (
                      <div className="flex items-center ml-2">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">{technicianRating}</span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex items-center">
                  <Wrench className="h-4 w-4 mr-2 text-orange-500" />
                  <span>{serviceType}</span>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    paymentStatus === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : paymentStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    Payment: {paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {serviceDetails && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm text-gray-700">
                {serviceDetails}
              </div>
            )}

            {notes && (
              <div className="bg-blue-50 rounded-lg p-3 mb-4 text-sm text-blue-700">
                📝 {notes}
              </div>
            )}

            {status === 'completed' && review && (
              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium text-green-800">Your Review:</span>
                  <div className="flex ml-2">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-green-700">{review}</p>
              </div>
            )}
          </div>

          <div className="ml-6 text-right">
            <p className="text-2xl font-bold text-gray-900">₹{price}</p>
            <p className="text-xs text-gray-500">Est: {estimatedPrice}</p>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition">
              <Eye className="h-4 w-4 mr-1" /> View Details
            </button>
            {technicianPhone && (
              <button
                onClick={() => window.open(`tel:${technicianPhone}`)}
                className="text-green-600 hover:text-green-800 text-sm px-3 py-1 rounded-md hover:bg-green-50 transition"
              >
                <Phone className="h-4 w-4 mr-1" /> Call
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {status === 'confirmed' && (
              <>
                <button className="text-sm text-orange-600 border border-orange-200 px-3 py-1 rounded-md hover:bg-orange-50 transition">
                  Reschedule
                </button>
                <button
                  onClick={() => onCancel(_id)}
                  className="text-sm text-red-600 border border-red-200 px-3 py-1 rounded-md hover:bg-red-50 transition"
                >
                  Cancel
                </button>
              </>
            )}
            {status === 'completed' && !review && (
              <button className="text-sm text-blue-600 border border-blue-200 px-3 py-1 rounded-md hover:bg-blue-50 transition">
                Write Review
              </button>
            )}
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
