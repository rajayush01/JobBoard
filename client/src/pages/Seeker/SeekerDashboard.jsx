import React, { useState, useEffect } from 'react';
import { Search, User, Star, CheckCircle, FileText, Filter, ChevronDown, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { applicationApi } from '../../services/applicationApi';

const SeekerDashboard = () => {
  const { user, token, isJobseeker } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalApplications: 0
  });

  // Fetch applications from backend
  const fetchApplications = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await applicationApi.getUserApplications(token, params);
      
      setApplications(response.applications || []);
      setPagination({
        currentPage: response.currentPage || 1,
        totalPages: response.totalPages || 1,
        totalApplications: response.totalApplications || 0
      });
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.message || 'Failed to fetch applications');
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (token && isJobseeker) {
      fetchApplications();
    }
  }, [token, isJobseeker]);

  // Handle filter changes
  const handleFilterChange = () => {
    const params = {};
    
    if (statusFilter !== 'All Statuses') {
      params.status = statusFilter.toLowerCase();
    }
    
    fetchApplications(params);
  };

  useEffect(() => {
    if (token && isJobseeker) {
      handleFilterChange();
    }
  }, [statusFilter]);

  // Map backend status to display status and type
  const getStatusInfo = (status) => {
    const statusMap = {
      'pending': { display: 'Applied', type: 'applied' },
      'reviewed': { display: 'Under Review', type: 'applied' },
      'interviewed': { display: 'Interview Scheduled', type: 'shortlisted' },
      'accepted': { display: 'Accepted', type: 'accepted' },
      'rejected': { display: 'Rejected', type: 'rejected' }
    };
    
    return statusMap[status] || { display: status, type: 'applied' };
  };

  const getStatusColor = (statusType) => {
    switch (statusType) {
      case 'accepted':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'shortlisted':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  // Calculate stats from applications
  const totalApplications = applications.length;
  const shortlistedCount = applications.filter(app => {
    const statusInfo = getStatusInfo(app.status);
    return statusInfo.type === 'shortlisted';
  }).length;
  const acceptedCount = applications.filter(app => {
    const statusInfo = getStatusInfo(app.status);
    return statusInfo.type === 'accepted';
  }).length;

  // Filter applications based on search query
  const filteredApplications = applications.filter(app => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    const jobTitle = app.jobId?.title?.toLowerCase() || '';
    const company = app.jobId?.company?.toLowerCase() || '';
    
    return jobTitle.includes(searchLower) || company.includes(searchLower);
  });

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isJobseeker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">This page is only accessible to job seekers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-l from-blue-400 to-blue-700 rounded-xl shadow-lg p-6 mb-4 text-white mt-24 mx-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Applications</h1>
            <p className="text-indigo-100">Track and manage your job applications</p>
          </div>
          <button
            onClick={() => window.location.href = '/jobs'}
            className="mt-4 md:mt-0 bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-300 hover:-translate-y-1 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Jobs
          </button>
        </div>
      </div>

      <div className="mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Welcome, {user?.name || 'User'}</h2>
              <p className="text-gray-500">Here's a summary of your application journey</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg shadow-lg p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Total Applications</span>
              </div>
              <div className="text-3xl font-bold text-blue-600">{totalApplications}</div>
            </div>

            <div className="bg-yellow-50 rounded-lg shadow-lg p-6 border border-yellow-100">
              <div className="flex items-center gap-3 mb-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">Shortlisted</span>
              </div>
              <div className="text-3xl font-bold text-yellow-600">{shortlistedCount}</div>
            </div>

            <div className="bg-green-50 rounded-lg shadow-lg p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">Accepted</span>
              </div>
              <div className="text-3xl font-bold text-green-600">{acceptedCount}</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filter Applications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                  disabled={loading}
                >
                  <option>All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-red-800 font-medium">Error loading applications</p>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
            <button
              onClick={() => fetchApplications()}
              className="mt-2 text-red-600 hover:text-red-700 font-medium underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Applications List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Applications ({filteredApplications.length})
            </h3>
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || statusFilter !== 'All Statuses'
                  ? "Try adjusting your filters or search terms"
                  : "Start applying to jobs to see them here"
                }
              </p>
              <button
                onClick={() => window.location.href = '/jobs'}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 font-medium inline-block"
              >
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredApplications.map((application) => {
                const statusInfo = getStatusInfo(application.status);
                return (
                  <div key={application._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {application.jobId?.company?.charAt(0) || 'J'}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {application.jobId?.title || 'Job Title'}
                            </h4>
                            <p className="text-gray-600">
                              {application.jobId?.company || 'Company Name'}
                            </p>
                            <p className="text-sm text-gray-500">
                              Applied on {formatDate(application.appliedAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(statusInfo.type)}`}>
                          {statusInfo.display}
                        </span>
                        <button 
                          onClick={() => window.location.href = '/my-applications'}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchApplications({ page: pagination.currentPage - 1 })}
                disabled={pagination.currentPage === 1 || loading}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm text-gray-600">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchApplications({ page: pagination.currentPage + 1 })}
                disabled={pagination.currentPage === pagination.totalPages || loading}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeekerDashboard;