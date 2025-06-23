import express from 'express'
import {
  applyForJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  getApplicationById,
  deleteApplication,
  upload
} from '../controllers/applicationController.js'

import { protect, isEmployer, isJobseeker } from '../middleware/authMiddleware.js'

const router = express.Router()

// Apply for a job (jobseeker only)
router.post('/apply/:jobId', protect, isJobseeker, upload.single('resume'), applyForJob)

// Get all applications for current user (jobseeker)
router.get('/my-applications', protect, isJobseeker, getUserApplications)

// Get all applications for a specific job (employer only)
router.get('/job/:jobId', protect, isEmployer, getJobApplications)

// Update application status (employer only)
router.patch('/:applicationId/status', protect, isEmployer, updateApplicationStatus)

// Get single application details (jobseeker or employer)
router.get('/:applicationId', protect, getApplicationById)

// Delete application (jobseeker only, within 24hrs)
router.delete('/:applicationId', protect, isJobseeker, deleteApplication)

export default router
