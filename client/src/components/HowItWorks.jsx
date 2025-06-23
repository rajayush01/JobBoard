import React from 'react'
import { Link } from 'react-router-dom'

const HowItWorks = () => {
    const jobseekerSteps = [
        {
            number: '01',
            title: 'Create Your Account',
            description: 'Sign up as a job seeker to access all features of our platform.',
            icon: '👤'
        },
        {
            number: '02',
            title: 'Browse Job Listings',
            description: 'Search and filter through thousands of job opportunities.',
            icon: '🔍'
        },
        {
            number: '03',
            title: 'Apply with Ease',
            description: 'Submit your application with just a few clicks.',
            icon: '📝'
        },
        {
            number: '04',
            title: 'Track Applications',
            description: 'Monitor the status of your applications in your dashboard.',
            icon: '📊'
        },
    ];
    return (
        <div className='flex flex-col items-center justify-center gap-6 mx-auto py-16 max-w-7xl bg-white'>
            <div className='text-center mb-10'>
                <span className='text-base text-blue-600 font-semibold'>SIMPLE PROCESS</span>
                <h2 className='font-bold text-4xl mb-4'>How It Works</h2>
                <div className='bg-blue-700 w-24 h-1 mx-auto mb-5'></div>
                <span className='text-xl text-gray-700'>For Job Seekers - Simple, Fast and Effective</span>
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 px-4'>
                    {jobseekerSteps.map((step, index) => (
                        <div key={index} className='bg-gray-100 shadow-lg rounded-lg p-6 px-8 flex flex-col max-w-lg transition-transform duration-300 transform hover:scale-105 hover:border-blue-500 border-2 group'>
                            <div className="flex flex-row justify-between items-center mb-4">
                                <div className="text-5xl mb-4">{step.icon}</div>
                                <div className="text-3xl font-bold text-blue-600 opacity-40 group-hover:opacity-100 transition-opacity">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className='text-xl font-bold mb-2 group-hover:text-blue-500'>{step.title}</h3>
                            <p className='text-gray-600'>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center gap-4'>
                <Link to="/jobs" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    SignUp Now
                </Link>
                <div>Already have an account? <Link className='text-blue-600 font-semibold'>Login</Link></div>
            </div>
        </div>
    )
}

export default HowItWorks
