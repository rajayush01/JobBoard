import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    MapPin, Clock, DollarSign, Users,
    Star, Send, Briefcase, Building2, UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Adjust the import path as needed

const JobDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [error, setError] = useState('');
    const { user, isAuthenticated, isJobseeker, isEmployer } = useAuth();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
                setJob(res.data);
            } catch (err) {
                setError('Failed to load job details.');
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = () => {
        if (!isAuthenticated) {
            // Redirect to login/register page for unregistered users
            navigate('/login', { 
                state: { 
                    from: `/job/${id}`,
                    message: 'Please login or register to apply for this job'
                }
            });
            return;
        }
        
        // Navigate to application page for authenticated job seekers
        navigate(`/apply/${id}`);
    };

    const handleLogin = () => {
        navigate('/login', { 
            state: { 
                from: `/job/${id}`,
                message: 'Login to apply for this job'
            }
        });
    };

    const handleRegister = () => {
        navigate('/register', { 
            state: { 
                from: `/job/${id}`,
                message: 'Create an account to apply for this job'
            }
        });
    };

    if (error) {
        return <div className="text-center mt-16 text-red-600">{error}</div>;
    }

    if (!job) {
        return <div className="text-center mt-16 text-gray-500">Loading job details...</div>;
    }

    // Helper function to render the appropriate action button
    const renderActionButton = () => {
        if (isEmployer) {
            return (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="text-center">
                        <Building2 className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-900 mb-2">Employer Account</h3>
                        <p className="text-sm text-gray-600 mb-4">You're logged in as an employer. Switch to a job seeker account to apply for positions.</p>
                        <button
                            onClick={() => navigate('/employer/dashboard')}
                            className="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Go to Employer Dashboard
                        </button>
                    </div>
                </div>
            );
        }

        if (isJobseeker) {
            return (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <button
                        onClick={handleApply}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Send className="w-5 h-5" />
                        Apply Now
                    </button>
                    <p className="text-center text-sm text-gray-500 mt-3">Quick and easy application process</p>
                </div>
            );
        }

        // For unregistered users
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-center mb-4">
                    <UserCheck className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Ready to Apply?</h3>
                    <p className="text-sm text-gray-600 mb-6">Join thousands of job seekers and start your career journey today</p>
                </div>
                
                <div className="space-y-3">
                    <button
                        onClick={handleApply}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-900 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <Send className="w-5 h-5" />
                        Apply Now
                    </button>
                    
                    <div className="flex gap-2">
                        <button
                            onClick={handleLogin}
                            className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                        >
                            Login
                        </button>
                        <button
                            onClick={handleRegister}
                            className="flex-1 bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg hover:bg-green-200 transition-colors text-sm"
                        >
                            Register
                        </button>
                    </div>
                </div>
                
                <p className="text-center text-xs text-gray-500 mt-3">
                    {isAuthenticated ? 'Continue as guest' : 'Create account for better experience'}
                </p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 mt-12">
            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Header Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                            {job.logo || '🏢'}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <div className="flex items-center gap-4 mb-4">
                                <h2 className="text-xl text-indigo-600 font-semibold">{job.company}</h2>
                                {job.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium text-gray-700">{job.rating}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                    <Users className="w-4 h-4" />
                                    <span>{job.employeeCount} employees</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin className="w-4 h-4 text-indigo-500" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Briefcase className="w-4 h-4 text-green-500" />
                                    <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <DollarSign className="w-4 h-4 text-emerald-500" />
                                    <span>
                                        {job.salary?.min && job.salary?.max 
                                            ? `${job.salary.min} - ${job.salary.max} ${job.salary?.currency || 'USD'}`
                                            : 'Salary not specified'
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">About this role</h3>
                            {job.longDescription && (
                                <p className="text-gray-700 leading-relaxed break-words whitespace-pre-wrap mb-4">
                                    {job.longDescription}
                                </p>
                            )}
                            <p className="text-gray-600 break-words whitespace-pre-wrap">{job.description}</p>
                        </div>

                        {/* Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                                <ul className="space-y-3">
                                    {job.requirements.map((req, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700 break-words">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Benefits */}
                        {job.benefits && job.benefits.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
                                <ul className="space-y-3">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700 break-words">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Apply Button - Conditional Rendering */}
                        {renderActionButton()}

                        {/* Skills */}
                        {job.skills && job.skills.length > 0 && (
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">Required Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Company Info */}
                        {job.companyDescription && (
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4">About {job.company}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed break-words whitespace-pre-wrap">
                                    {job.companyDescription}
                                </p>
                            </div>
                        )}

                        {/* User Status Info */}
                        {isAuthenticated && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                <div className="flex items-center gap-2 text-blue-700">
                                    <UserCheck className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        Logged in as {isEmployer ? 'Employer' : 'Job Seeker'}
                                    </span>
                                </div>
                                <p className="text-xs text-blue-600 mt-1">
                                    {user?.email}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;