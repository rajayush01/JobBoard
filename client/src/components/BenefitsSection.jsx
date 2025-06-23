import React from 'react'
import { Link } from 'react-router-dom';

const BenefitsSection = () => {

    const benefits = [
        {
            id: 1,
            icon: '🔍',
            title: 'Easy Job Search',
            description: 'Find your perfect job match using our powerful search and filtering tools.',
            color: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            id: 2,
            icon: '📋',
            title: 'Simple Application Process',
            description: 'Apply to jobs with just a few clicks and track your application status.',
            color: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            id: 3,
            icon: '🏢',
            title: 'Top Companies',
            description: 'Browse openings from leading employers across various industries.',
            color: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            id: 4,
            icon: '💻',
            title: 'Remote Opportunities',
            description: 'Discover a wide range of remote work options for flexible careers.',
            color: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
        },
    ];
    return (
        <div className='flex flex-col items-center justify-center gap-6 mx-auto py-16 bg-gray-50'>
            <div className='text-center mb-10'>
                <span className='text-base text-blue-600 font-semibold'>BENEFITS</span>
                <h2 className='font-bold text-4xl mb-4'>Why Choose JobBoard</h2>
                <div className='bg-blue-700 w-24 h-1 mx-auto mb-5'></div>
                <span className='text-xl text-gray-700'>We connect talented professionals with the best opportunities in the market.</span>
            </div>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 px-4 max-w-7xl'>
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.id}
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                        >
                            <div className={`${benefit.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                                <span className={`${benefit.iconColor} text-3xl`}>{benefit.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-center">{benefit.title}</h3>
                            <p className="text-gray-600 text-center">{benefit.description}</p>
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

export default BenefitsSection
