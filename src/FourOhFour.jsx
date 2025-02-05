import React from 'react';
import { Link } from 'react-router-dom';
import './FourOhFour.css'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-200">404</h1>
        <p className="mt-2 text-lg text-gray-300">Page Not Found</p>
        <p className="mt-4">
          <Link to="/" className="text-gray-400 hover:text-gray-100 underline">
            Go back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
