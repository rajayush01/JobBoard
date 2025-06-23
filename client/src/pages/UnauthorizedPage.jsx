// client/src/pages/UnauthorizedPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-md w-full mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-500 hover:scale-105">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-3V9m6 10a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Access Denied</h1>
          
          <div className="w-16 h-1 bg-red-500 mx-auto mb-4"></div>
          
          <p className="text-gray-600 mb-8 text-lg">
            Sorry, you don't have permission to access this page.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Back to Home
            </Link>
            <Link 
              to="/login" 
              className="inline-flex items-center justify-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Log In
            </Link>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm">
            If you believe this is an error, please contact support.
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;