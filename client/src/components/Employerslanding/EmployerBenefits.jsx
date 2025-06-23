import React from 'react'
import { Link } from 'react-router-dom';

const EmployerBenefits = () => {

    const benefits = [
        {
            id: 1,
            icon: '🎯',
            title: 'Precise Talent Matching',
            description: 'Our AI-powered algorithm finds candidates that perfectly match your job requirements and company culture.',
            color: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            id: 2,
            icon: '⚡',
            title: 'Faster Hiring Process',
            description: 'Streamline your recruitment with automated screening and reduce time-to-hire by up to 60%.',
            color: 'bg-green-100',
            iconColor: 'text-green-600',
        },
        {
            id: 3,
            icon: '💰',
            title: 'Cost-Effective Recruitment',
            description: 'Reduce hiring costs with our efficient platform and transparent pricing structure.',
            color: 'bg-purple-100',
            iconColor: 'text-purple-600',
        },
        {
            id: 4,
            icon: '📊',
            title: 'Advanced Analytics',
            description: 'Track recruitment metrics, analyze hiring performance, and make data-driven decisions.',
            color: 'bg-indigo-100',
            iconColor: 'text-indigo-600',
        },
    ];
    return (
        <div className='flex flex-col items-center justify-center gap-6 mx-auto py-16 bg-gray-50'>
            <div className='text-center mb-10'>
                <span className='text-base text-blue-600 font-semibold'>BENEFITS</span>
                <h2 className='font-bold text-4xl mb-4'>Why Choose Our Platform</h2>
                <div className='bg-blue-700 w-24 h-1 mx-auto mb-5'></div>
                <span className='text-xl text-gray-700'>Empowering employers to build exceptional teams with smart recruitment solutions.</span>
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
                <Link
                    to="/register" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Start Hiring Today
                </Link>
                <div>Already have an account? <Link to="/login" className='text-blue-600 font-semibold hover:underline'>Login</Link></div>
            </div>
        </div>
    )
}

export default EmployerBenefits;