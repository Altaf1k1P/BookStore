import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-white text-gray-800 px-4 text-center py-[6rem]">
      <AlertTriangle className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-[#594a47] text-white px-6 py-2 border border-[#594a47] rounded hover:bg-[#f5f5f5] hover:text-[#594a47] transition">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
