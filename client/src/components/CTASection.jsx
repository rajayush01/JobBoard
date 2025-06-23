import React from 'react'
import { Link } from 'react-router-dom'

const CTASection = () => {
    return (
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500 rounded-full opacity-20 animate-float-fast"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 animate-float-fast"></div>
      </div>
            <div className='relative flex flex-col items-center justify-center gap-6 px-4 text-center'>
                <div className='flex flex-col justify-center items-center gap-7 mb-4'>
                    <span className='font-bold text-5xl text-white'>Ready to take the next step in your career?</span>
                    <div className='w-24 bg-blue-300 h-1'></div>
                </div>
                <div className='text-lg text-center text-gray-200 max-w-2xl'>Whether you're looking for your dream job or searching for top talent, we've got you covered.</div>
                <div>
                    <Link to="/signup">
                        <button className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Create Account
                        </button>
                    </Link>
                    <Link to="/login">
                        <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ml-4">
                            Login
                        </button>

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CTASection
