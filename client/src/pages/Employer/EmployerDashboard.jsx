import { useEffect, useState } from 'react';
import {
  Users,
  Briefcase,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Plus,
  Search,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`);
        setJobs(res.data);

        // Sum up applications if the job schema includes an applications array or count
        const total = res.data.reduce((acc, job) => acc + (job.applicationCount || 0), 0);
        setTotalApplications(total);
      } catch (err) {
        setError('Failed to load job data');
      }
    };

    fetchJobs();
  }, []);

  const stats = [
    {
      icon: Briefcase,
      label: 'Active Jobs',
      value: jobs.length.toString(),
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Users,
      label: 'Total Applications',
      value: totalApplications.toString(),
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Calendar,
      label: 'Last Updated',
      value: jobs.length ? new Date(jobs[0].postedAt).toLocaleDateString() : 'N/A',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const handleNewJobPostClick = () => {
    navigate('/employer/post-job');
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-24">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg mx-5">
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-blue-100">Welcome back, Ayush! Manage your job postings and review applications.</p>
      </div>

      <div className="mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Job Postings Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your Job Postings</h2>
            <button onClick={handleNewJobPostClick} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:-translate-y-1">
              <Plus className="w-4 h-4" />
              <span>Post New Job</span>
            </button>
          </div>

          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">TITLE</div>
            <div className="col-span-3">LOCATION</div>
            <div className="col-span-2">DATE POSTED</div>
            <div className="col-span-2">APPLICATIONS</div>
            <div className="col-span-2">ACTIONS</div>
          </div>

          <div className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <div key={job._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 font-medium text-gray-900">{job.title}</div>
                  <div className="col-span-3 flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="col-span-2 text-gray-600">{new Date(job.postedAt).toLocaleDateString()}</div>
                  <div className="col-span-2 text-blue-600 font-medium">{job.applicationCount || 0}</div>
                  <div className="col-span-2 flex items-center space-x-3">
                    <button
                      onClick={() => navigate(`/jobs/${job._id}`)}
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </button>

                    <button
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                      className="text-green-600 hover:text-green-800 flex items-center space-x-1 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>

                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this job?')) {
                          try {
                            const token = localStorage.getItem('token'); // or get from context
                            await axios.delete(`${process.env.REACT_APP_API_URL}/api/jobs/${job._id}`, {
                              headers: {
                                Authorization: `Bearer ${token}`
                              }
                            });
                            setJobs(jobs.filter(j => j._id !== job._id));
                          } catch (err) {
                            console.error('Delete error:', err.response?.data || err.message);
                            setError('Failed to delete job.');
                          }
                        }
                      }}
                      className="text-red-600 hover:text-red-800 flex items-center space-x-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications section (static for now) */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
            <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
              <span>View All Applications</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-500 mb-4">Once candidates apply, they will show up here.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1">
              Post Your First Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
