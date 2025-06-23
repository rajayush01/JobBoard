import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, MapPin, Clock, DollarSign, Building2, Filter, Heart, ExternalLink, Star, Users, Calendar, Loader2 } from 'lucide-react'

const BrowseJobs = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('title') || '')
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '')
  const [jobTypeFilter, setJobTypeFilter] = useState('')
  const [salaryFilter, setSalaryFilter] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [savedJobs, setSavedJobs] = useState(new Set())
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setJobs(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching jobs:', err)
        setError('Failed to load jobs. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
  const params = {};
  if (searchTerm) params.title = searchTerm;
  if (locationFilter) params.location = locationFilter;
  setSearchParams(params);
}, [searchTerm, locationFilter]);

  // Helper function to format salary
  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return 'Salary not specified'
    
    const formatAmount = (amount) => {
      if (amount >= 1000) {
        return `$${(amount / 1000).toFixed(0)}k`
      }
      return `$${amount}`
    }

    if (salary.min && salary.max) {
      return `${formatAmount(salary.min)} - ${formatAmount(salary.max)}`
    } else if (salary.min) {
      return `${formatAmount(salary.min)}+`
    } else if (salary.max) {
      return `Up to ${formatAmount(salary.max)}`
    }
    
    return 'Salary not specified'
  }

  // Helper function to format posted date
  const formatPostedDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 14) return '1 week ago'
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return `${Math.ceil(diffDays / 30)} months ago`
  }

  // Helper function to get company logo
  const getCompanyLogo = (company) => {
    const logoMap = {
      'TechCorp': '🚀',
      'InnovateLabs': '💡',
      'DesignStudio': '🎨',
      'DataDriven': '📊',
      'CloudTech': '☁️',
      'GrowthCo': '📈'
    }
    return logoMap[company] || '🏢'
  }

  // Helper function to get mock rating (since it's not in your schema)
  const getMockRating = () => {
    return (4.0 + Math.random() * 1.0).toFixed(1)
  }

  const filteredJobs = useMemo(() => {
    if (!jobs.length) return []
    
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())))
      
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesType = !jobTypeFilter || job.type === jobTypeFilter
      
      // Salary filter logic
      let matchesSalary = true
      if (salaryFilter) {
        const filterAmount = parseInt(salaryFilter.replace('k', '')) * 1000
        matchesSalary = job.salary && (job.salary.min >= filterAmount || job.salary.max >= filterAmount)
      }

      return matchesSearch && matchesLocation && matchesType && matchesSalary
    })
  }, [jobs, searchTerm, locationFilter, jobTypeFilter, salaryFilter])

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs)
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId)
    } else {
      newSavedJobs.add(jobId)
    }
    setSavedJobs(newSavedJobs)
  }

  // Navigation function to job details
  const handleViewJobDetails = (jobId) => {
    navigate(`/jobs/${jobId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Jobs...</h2>
          <p className="text-gray-600">Please wait while we fetch the latest opportunities</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Jobs</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JobFinder
              </h1>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {filteredJobs.length} jobs
              </span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6 text-gray-900">Search & Filter</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Jobs</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Job Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                <select
                  value={jobTypeFilter}
                  onChange={(e) => setJobTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select
                  value={salaryFilter}
                  onChange={(e) => setSalaryFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">All Ranges</option>
                  <option value="60k">$60k+</option>
                  <option value="80k">$80k+</option>
                  <option value="100k">$100k+</option>
                  <option value="120k">$120k+</option>
                  <option value="150k">$150k+</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchTerm('')
                  setLocationFilter('')
                  setJobTypeFilter('')
                  setSalaryFilter('')
                }}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                  onClick={() => handleViewJobDetails(job._id)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-3xl bg-gray-100 p-3 rounded-lg">
                          {job.logo || getCompanyLogo(job.company)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {job.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-gray-600 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Building2 className="w-4 h-4" />
                                  <span className="font-medium">{job.company}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{getMockRating()}</span>
                                </div>
                                {job.employeeCount && (
                                  <div className="flex items-center space-x-1">
                                    <Users className="w-4 h-4" />
                                    <span>{job.employeeCount}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleSaveJob(job._id)
                              }}
                              className={`p-2 rounded-lg transition-all ${
                                savedJobs.has(job._id)
                                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <Heart className={`w-5 h-5 ${savedJobs.has(job._id) ? 'fill-current' : ''}`} />
                            </button>
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span>{formatSalary(job.salary)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatPostedDate(job.postedAt || job.createdAt)}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {job.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {job.skills && job.skills.slice(0, 4).map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                                >
                                  {skill}
                                </span>
                              ))}
                              {job.skills && job.skills.length > 4 && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                                  +{job.skills.length - 4} more
                                </span>
                              )}
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewJobDetails(job._id)
                              }}
                              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-l from-blue-600 to-blue-800 text-white rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all transform hover:scale-105 shadow-lg"
                            >
                              <span className="font-medium">View Details</span>
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseJobs