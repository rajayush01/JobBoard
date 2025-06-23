import { useEffect, useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  Save, 
  ArrowLeft,
  Building2,
  FileText,
  Tag,
  Gift
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    description: '',
    longDescription: '',
    companyDescription: '',
    logo: '',
    requirements: [],
    benefits: [],
    tags: [],
    employees: '1-10',
    rating: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const job = res.data;
        setFormData({
          ...job,
          salaryMin: job.salary?.min || '',
          salaryMax: job.salary?.max || '',
          tags: job.skills || [],
          employees: job.employeeCount || '1-10',
          rating: job.rating || ''
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load job data');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      [field]: value.split(',').map(v => v.trim()).filter(v => v !== '') 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/jobs/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/employer/dashboard');
    } catch (err) {
      setError('Failed to update job');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/employer/dashboard')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Job Posting</h1>
          <p className="text-gray-600">Update your job posting details</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title*</label>
                <input 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="e.g. Senior Software Engineer" 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company*</label>
                <input 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Company name" 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location*</label>
                <input 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="e.g. New York, NY" 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type*</label>
                <select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Freelance</option>
                  <option>Internship</option>
                  <option>Remote</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Logo/Emoji</label>
                <input 
                  name="logo" 
                  value={formData.logo} 
                  onChange={handleChange} 
                  placeholder="🏢 or logo URL" 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Rating</label>
                <input 
                  name="rating" 
                  value={formData.rating} 
                  onChange={handleChange} 
                  placeholder="4.5" 
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Salary & Company Size */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Compensation & Company Size</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Salary</label>
                <input 
                  name="salaryMin" 
                  value={formData.salaryMin} 
                  onChange={handleChange} 
                  placeholder="50000" 
                  type="number" 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Maximum Salary</label>
                <input 
                  name="salaryMax" 
                  value={formData.salaryMax} 
                  onChange={handleChange} 
                  placeholder="80000" 
                  type="number" 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                <select 
                  name="employees" 
                  value={formData.employees} 
                  onChange={handleChange} 
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>201-500</option>
                  <option>500-1000</option>
                  <option>1000+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Brief overview of the role..."
                  rows="3"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Job Description*</label>
                <textarea 
                  name="longDescription" 
                  value={formData.longDescription} 
                  onChange={handleChange} 
                  placeholder="Detailed description of responsibilities, qualifications, and what you're looking for..."
                  rows="6"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Description</label>
                <textarea 
                  name="companyDescription" 
                  value={formData.companyDescription} 
                  onChange={handleChange} 
                  placeholder="Tell candidates about your company culture, mission, and values..."
                  rows="4"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
              </div>
            </div>
          </div>

          {/* Requirements, Benefits & Skills */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Additional Details</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
                <textarea 
                  value={formData.requirements.join(', ')} 
                  onChange={(e) => handleArrayChange('requirements', e.target.value)} 
                  placeholder="Bachelor's degree in Computer Science, 3+ years experience, Proficiency in React..."
                  rows="3"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
                <p className="text-sm text-gray-500 mt-1">Separate each requirement with a comma</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Benefits & Perks</label>
                <textarea 
                  value={formData.benefits.join(', ')} 
                  onChange={(e) => handleArrayChange('benefits', e.target.value)} 
                  placeholder="Health insurance, 401k matching, Flexible work hours, Remote work options..."
                  rows="3"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
                <p className="text-sm text-gray-500 mt-1">Separate each benefit with a comma</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Required Skills/Technologies</label>
                <textarea 
                  value={formData.tags.join(', ')} 
                  onChange={(e) => handleArrayChange('tags', e.target.value)} 
                  placeholder="React, Node.js, JavaScript, TypeScript, AWS..."
                  rows="2"
                  className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                />
                <p className="text-sm text-gray-500 mt-1">Separate each skill with a comma</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button 
              type="button"
              onClick={() => navigate('/employer/dashboard')}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={submitting}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Update Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPage;