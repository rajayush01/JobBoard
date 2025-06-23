import { useState, useEffect } from 'react';
import { 
  FileText, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { applicationApi } from '../services/applicationApi';

const MyApplicationsPage = () => {
  const { token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchApplications();
  }, [currentPage, statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 10,
        ...(statusFilter && { status: statusFilter })
      };
      
      const data = await applicationApi.getUserApplications(token, params);
      setApplications(data.applications);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      return;
    }

    try {
      await applicationApi.deleteApplication(applicationId, token);
      fetchApplications(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  // Helper function to format salary
  const formatSalary = (salary) => {
    if (!salary) return 'Not specified';
    
    // If salary is a string, return it as is
    if (typeof salary === 'string') {
      return salary;
    }
    
    // If salary is an object with min, max, currency
    if (typeof salary === 'object') {
      const { min, max, currency = '$' } = salary;
      
      if (min && max) {
        return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
      } else if (min) {
        return `${currency}${min.toLocaleString()}+`;
      } else if (max) {
        return `Up to ${currency}${max.toLocaleString()}`;
      }
    }
    
    return 'Not specified';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'reviewed':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'interviewed':
        return <AlertCircle className="w-4 h-4 text-purple-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-rose-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'reviewed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'interviewed':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'accepted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const canDeleteApplication = (application) => {
    const applicationDate = new Date(application.appliedAt);
    const now = new Date();
    const hoursDiff = (now - applicationDate) / (1000 * 60 * 60);
    return hoursDiff <= 24 && application.status === 'pending';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-indigo-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 opacity-20 animate-pulse"></div>
          </div>
          <p className="mt-6 text-slate-600 font-medium">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-slate-50 via-white to-slate-100">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-3">
              My Applications
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Track the status of your job applications and stay updated on your career journey
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8">
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex-1 min-w-64">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Filter by Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200 rounded-2xl shadow-sm">
              <p className="text-rose-800 font-medium">{error}</p>
            </div>
          )}

          {/* Applications List */}
          {applications.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-16 text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl mb-8">
                <FileText className="w-12 h-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">No Applications Found</h3>
              <p className="text-slate-600 mb-8 text-lg">You haven't applied to any jobs yet. Start your journey today!</p>
              <button 
                onClick={() => window.location.href = '/jobs'}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {applications.map((application) => (
                <div key={application._id} className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
                        {application.jobId?.title}
                      </h3>
                      <p className="text-xl text-slate-700 mb-4 font-medium">{application.jobId?.company}</p>
                      
                      <div className="flex flex-wrap gap-6 text-slate-600 mb-6">
                        {application.jobId?.location && (
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-slate-100 rounded-lg">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{application.jobId.location}</span>
                          </div>
                        )}
                        {application.jobId?.salary && (
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-100 rounded-lg">
                              <DollarSign className="w-4 h-4 text-emerald-600" />
                            </div>
                            <span className="font-medium">{formatSalary(application.jobId.salary)}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-blue-100 rounded-lg">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium">Applied on {formatDate(application.appliedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 border ${getStatusColor(application.status)} shadow-sm`}>
                        {getStatusIcon(application.status)}
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </div>
                      
                      {canDeleteApplication(application) && (
                        <button
                          onClick={() => handleDeleteApplication(application._id)}
                          className="p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 hover:shadow-md group"
                          title="Delete application (available for 24 hours)"
                        >
                          <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Application Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-slate-50/50 rounded-xl p-4">
                      <span className="font-semibold text-slate-700 block mb-2">Experience:</span>
                      <p className="text-slate-600 font-medium">{application.experience} years</p>
                    </div>
                    {application.education && (
                      <div className="bg-slate-50/50 rounded-xl p-4">
                        <span className="font-semibold text-slate-700 block mb-2">Education:</span>
                        <p className="text-slate-600 font-medium capitalize">{application.education.replace('-', ' ')}</p>
                      </div>
                    )}
                    <div className="bg-slate-50/50 rounded-xl p-4">
                      <span className="font-semibold text-slate-700 block mb-2">Contact:</span>
                      <p className="text-slate-600 font-medium">{application.email}</p>
                      {application.phone && <p className="text-slate-600 font-medium">{application.phone}</p>}
                    </div>
                  </div>

                  {application.coverLetter && (
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                      <span className="font-semibold text-slate-700 block mb-3">Cover Letter:</span>
                      <p className="text-slate-600 leading-relaxed break-words">
                        {application.coverLetter.length > 200 
                          ? `${application.coverLetter.substring(0, 200)}...` 
                          : application.coverLetter}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex gap-3 bg-white/70 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-white/50">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-200 font-medium text-slate-700 hover:shadow-md disabled:hover:shadow-none disabled:hover:bg-transparent"
                >
                  Previous
                </button>
                
                <span className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg">
                  {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 border border-slate-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-all duration-200 font-medium text-slate-700 hover:shadow-md disabled:hover:shadow-none disabled:hover:bg-transparent"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplicationsPage;