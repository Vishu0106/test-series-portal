import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link to="/" className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg shadow-lg transition duration-300">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
