import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (title) queryParams.set('title', title);
    if (location) queryParams.set('location', location);
    navigate(`/jobs?${queryParams.toString()}`);
  };
  return (
    <div>
      <div className='bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 py-24 mt-20'>
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-0 -left-16 w-96 h-96 bg-white rounded-full animate-float-slow"></div>
          <div className="absolute top-1/4 right-1 w-64 h-64 bg-blue-300 rounded-full animate-float-medium delay-200"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-300 rounded-full animate-float-fast delay-500"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className='max-w-4xl mx-auto px-4 text-center'>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
              Find Your <span className="text-blue-200">Dream Job</span> Today
            </h1>
            <p className="text-lg md:text-2xl mb-10 font-thin text-gray-200 ">
              Discover thousands of job opportunities with all the information you need.
            </p>
            <form onSubmit={handleSearch} className='bg-white/95 mx-auto rounded-xl shadow-2xl p-6 backdrop-blur-sm transform transition-all '>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='flex-1'>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner transition-all"
                />
              </div>
              <div className='flex-1'>
                <input
                  type="text"
                  placeholder="City, state, or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner transition-all"
                />
              </div>
              <div>
                <button className=" bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Search Jobs
                </button>
              </div>
              </div>
            </form>
            <div className="mt-10 text-center text-gray-100">
            <p className="text-lg">
              Popular searches: 
              <span className="ml-2 space-x-4 inline-flex flex-wrap justify-center gap-2 mt-2">
                <button 
                  onClick={() => navigate('/jobs?title=React')}
                  className="text-blue-200 hover:text-white hover:underline transition-colors px-3 py-1 rounded-full border border-blue-400/30 hover:border-blue-300"
                >
                  React
                </button>
                <button 
                  onClick={() => navigate('/jobs?title=Marketing')}
                  className="text-blue-200 hover:text-white hover:underline transition-colors px-3 py-1 rounded-full border border-blue-400/30 hover:border-blue-300"
                >
                  Marketing
                </button>
                <button 
                  onClick={() => navigate('/jobs?location=Remote')}
                  className="text-blue-200 hover:text-white hover:underline transition-colors px-3 py-1 rounded-full border border-blue-400/30 hover:border-blue-300"
                >
                  Remote
                </button>
              </span>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
