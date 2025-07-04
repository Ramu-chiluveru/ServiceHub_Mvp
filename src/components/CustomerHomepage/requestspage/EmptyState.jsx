import React from 'react';
import { Calendar } from 'lucide-react';

export default function EmptyState({ searchQuery, filterStatus }) {
  const hasFilters = searchQuery || filterStatus !== 'all';

  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
      <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        {hasFilters ? 'No matching bookings' : 'No bookings yet'}
      </h2>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        {hasFilters
          ? 'Try adjusting your search or filter criteria.'
          : "You haven't made any bookings yet. Start by exploring our services."}
      </p>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
        Browse Services
      </button>
    </div>
  );
}
