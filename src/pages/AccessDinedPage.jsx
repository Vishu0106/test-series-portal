import React from 'react';
import { Link } from 'react-router-dom';
import HomeLayout from '../Layouts/HomeLayout';

const AccessDeniedPage = () => {
  return (
    <HomeLayout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">403</h1>
        <p className="text-xl text-gray-600 mb-6">Access Denied</p>
        <p className="text-gray-500 mb-8">
          You do not have permission to access this page. Please contact your administrator if you think this is a mistake.
        </p>
        <Link to="/" className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg shadow-lg transition duration-300">
          Go Home
        </Link>
      </div>
    </div>
    </HomeLayout>
  );
};

export default AccessDeniedPage;
