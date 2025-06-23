// controllers/applicationController.js
import Application from '../models/Application.js';
import Jobs from '../models/Jobs.js';
import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/resumes';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const fileExt = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, and DOCX files are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { fullName, email, phone, experience, education, coverLetter } = req.body;
    const applicantId = req.user.id;

    console.log('Apply for job request:', {
      jobId,
      applicantId,
      body: req.body,
      file: req.file ? req.file.filename : 'No file'
    });

    // Validate required fields
    if (!fullName || !email || !experience) {
      return res.status(400).json({ 
        message: 'Full name, email, and experience are required' 
      });
    }

    // Check if job exists
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user already applied for this job
    const existingApplication = await Application.findOne({
      jobId,
      applicantId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Check if resume file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    // Create new application
    const application = new Application({
      jobId,
      applicantId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      experience,
      education: education || '',
      coverLetter: coverLetter ? coverLetter.trim() : '',
      resumeUrl: req.file.path
    });

    await application.save();

    // Populate job and applicant details for response
    await application.populate([
      { path: 'jobId', select: 'title company' },
      { path: 'applicantId', select: 'name email' }
    ]);

    console.log('Application created successfully:', application._id);

    res.status(201).json({
      message: 'Application submitted successfully!',
      application: {
        _id: application._id,
        status: application.status,
        appliedAt: application.appliedAt,
        job: application.jobId,
        applicant: application.applicantId
      }
    });

  } catch (error) {
    console.error('Apply for job error:', error);
    
    // Delete uploaded file if application creation fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error while processing application', 
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get all applications for a user (jobseeker)
export const getUserApplications = async (req, res) => {
  try {
    const applicantId = req.user.id;
    const { page = 1, limit = 10, status } = req.query;

    const query = { applicantId };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate('jobId', 'title company location salary status')
      .sort({ appliedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Application.countDocuments(query);

    res.json({
      applications,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalApplications: total
    });

  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all applications for a job (employer)
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { page = 1, limit = 10, status } = req.query;

    // Check if job exists and belongs to the employer
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const query = { jobId };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate('applicantId', 'name email')
      .sort({ appliedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Application.countDocuments(query);

    res.json({
      applications,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalApplications: total
    });

  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update application status (employer only)
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'reviewed', 'interviewed', 'accepted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(applicationId)
      .populate('jobId', 'employer');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the job belongs to the current employer
    if (application.jobId.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    application.status = status;
    await application.save();

    res.json({
      message: 'Application status updated successfully',
      application: {
        _id: application._id,
        status: application.status,
        lastUpdated: application.lastUpdated
      }
    });

  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single application details
export const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('jobId', 'title company location salary employer')
      .populate('applicantId', 'name email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check access rights
    const isApplicant = application.applicantId._id.toString() === req.user.id;
    const isEmployer = application.jobId.employer?.toString() === req.user.id;

    if (!isApplicant && !isEmployer) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ application });

  } catch (error) {
    console.error('Get application by ID error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete application (applicant only, within 24 hours)
export const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the application belongs to the current user
    if (application.applicantId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if application is within 24 hours (optional rule)
    const applicationAge = Date.now() - application.appliedAt.getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    
    if (applicationAge > oneDayInMs) {
      return res.status(400).json({ 
        message: 'Applications can only be deleted within 24 hours of submission' 
      });
    }

    // Delete resume file
    if (application.resumeUrl && fs.existsSync(application.resumeUrl)) {
      fs.unlinkSync(application.resumeUrl);
    }

    await Application.findByIdAndDelete(applicationId);

    res.json({ message: 'Application deleted successfully' });

  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};