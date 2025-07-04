import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorBanner({ message }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg">
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
        <div className="ml-3">
          <p className="text-sm text-amber-700">{message}</p>
        </div>
      </div>
    </div>
  );
}
