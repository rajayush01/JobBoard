import { useState } from 'react';
import { Building, MapPin, DollarSign, Clock, Briefcase, FileText, Star, Send, Plus, X, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PostJobPage = () => {
  const { token } = useAuth();

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
    logo: '🚀',
    requirements: [''],
    benefits: [''],
    tags: [''],
    experience: '',
    employees: ''
  });

  

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleArrayChange = (index, value, field) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const addArrayItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Transform data to match backend schema
      const jobData = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        experience: formData.experience,
        employeeCount: formData.employees,
        salary: {
          min: formData.salaryMin ? parseFloat(formData.salaryMin.replace(/[^\d.]/g, '')) || 0 : 0,
          max: formData.salaryMax ? parseFloat(formData.salaryMax.replace(/[^\d.]/g, '')) || 0 : 0,
          currency: 'USD'
        },
        description: formData.description,
        longDescription: formData.longDescription,
        companyDescription: formData.companyDescription,
        logo: formData.logo,
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== ''),
        skills: formData.tags.filter(tag => tag.trim() !== '')
      };

      console.log('Sending job data:', jobData);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
          // Add authorization header if you have auth token
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(jobData),
      });

      const responseData = await response.json();
      console.log('Response:', responseData);

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert(responseData.error || responseData.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit job. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'];
  const experienceLevels = ['Entry Level', '1-2 years', '3-5 years', '5-8 years', '8+ years'];
  const companySizes = ['1-10', '11-50', '51-200', '201-500', '500-1000', '1000+'];
  const logoOptions = ['🚀', '💼', '🏢', '💻', '🔧', '🎯', '⚡', '🌟', '🔥', '💡'];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Posted Successfully! 🎉</h2>
            <p className="text-gray-600 mb-6">Your job posting has been submitted and will be reviewed within 24 hours.</p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  title: '',
                  company: '',
                  location: '',
                  type: 'Full-time',
                  salaryMin: '',
                  salaryMax: '',
                  description: '',
                  longDescription: '',
                  companyDescription: '',
                  logo: '🚀',
                  requirements: [''],
                  benefits: [''],
                  tags: [''],
                  experience: '',
                  employees: ''
                });
              }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Post Another Job
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post a New Job</h1>
          <p className="text-gray-600 text-lg">Find the perfect candidate for your team</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= step 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-4 transition-all ${
                    currentStep > step ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-24">
            <span className="text-sm font-medium text-gray-600">Basic Info</span>
            <span className="text-sm font-medium text-gray-600">Details</span>
            <span className="text-sm font-medium text-gray-600">Review</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-indigo-600" />
                Basic Job Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g. Senior Frontend Developer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="e.g. TechCorp"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select level</option>
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                    <select
                      name="employees"
                      value={formData.employees}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select size</option>
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size} employees</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Salary Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="salaryMin"
                        value={formData.salaryMin}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Min (e.g. 120000)"
                      />
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="salaryMax"
                        value={formData.salaryMax}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Max (e.g. 160000)"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Logo</label>
                  <div className="flex flex-wrap gap-2">
                    {logoOptions.map(logo => (
                      <button
                        key={logo}
                        type="button"
                        onClick={() => setFormData({...formData, logo})}
                        className={`w-12 h-12 rounded-xl text-xl transition-all ${
                          formData.logo === logo
                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transform scale-110'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {logo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Detailed Information */}
          {currentStep === 2 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                Job Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Brief description of the role (1-2 sentences)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description *</label>
                  <textarea
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Detailed job description, responsibilities, and what you're looking for in a candidate..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Description</label>
                  <textarea
                    name="companyDescription"
                    value={formData.companyDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell candidates about your company culture, mission, and values..."
                  />
                </div>

                {/* Requirements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Requirements</label>
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'requirements')}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="e.g. 5+ years of React experience"
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'requirements')}
                          className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Requirement
                  </button>
                </div>

                {/* Benefits */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Benefits & Perks</label>
                  {formData.benefits.map((benefit, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'benefits')}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="e.g. Competitive salary and equity"
                      />
                      {formData.benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'benefits')}
                          className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('benefits')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Benefit
                  </button>
                </div>

                {/* Skills/Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Required Skills</label>
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="e.g. React, TypeScript, CSS"
                      />
                      {formData.tags.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem(index, 'tags')}
                          className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('tags')}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Skill
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview */}
          {currentStep === 3 && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-indigo-600" />
                Preview Your Job Posting
              </h2>

              {/* Job Preview */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                    {formData.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{formData.title || 'Job Title'}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <h4 className="text-lg text-indigo-600 font-semibold">{formData.company || 'Company Name'}</h4>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        <span>{formData.location || 'Location'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-4 h-4 text-green-500" />
                        <span>{formData.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <span>{formData.salaryMin && formData.salaryMax ? `$${formData.salaryMin} - $${formData.salaryMax}` : 'Salary TBD'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>Just posted</span>
                      </div>
                    </div>
                  </div>
                </div>

                {formData.description && (
                  <div className="mb-4">
                    <p className="text-gray-700">{formData.description}</p>
                  </div>
                )}

                {formData.tags.filter(tag => tag.trim()).length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.filter(tag => tag.trim()).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">Ready to post your job? This is how it will appear to candidates.</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="border-t border-gray-200 px-8 py-6">
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Post Job
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;