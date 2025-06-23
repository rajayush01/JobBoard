// Application API service
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const applicationApi = {
  // Apply for a job
  applyForJob: async (jobId, formData, token) => {
    const response = await fetch(`${API_BASE_URL}/applications/apply/${jobId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData // FormData object
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit application');
    }
    
    return response.json();
  },

  // Get user's applications
  getUserApplications: async (token, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/applications/my-applications${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch applications');
    }
    
    return response.json();
  },

  // Get applications for a job (employer)
  getJobApplications: async (jobId, token, params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/applications/job/${jobId}${queryParams ? `?${queryParams}` : ''}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch job applications');
    }
    
    return response.json();
  },

  // Update application status
  updateApplicationStatus: async (applicationId, status, token) => {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update application status');
    }
    
    return response.json();
  },

  // Get single application details
  getApplicationById: async (applicationId, token) => {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch application details');
    }
    
    return response.json();
  },

  // Delete application
  deleteApplication: async (applicationId, token) => {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete application');
    }
    
    return response.json();
  }
};