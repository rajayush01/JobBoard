// server/routes/jobs.js
import express from 'express';
import { createJob, getJobs, getJobById, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect, isEmployer } from '../middleware/authMiddleware.js';


const router = express.Router();

// Routes
// Public routes
router.get('/', getJobs);           // Anyone can view jobs
router.get('/:id', getJobById);     // Anyone can view job details

// Protected routes - Employer only
router.post('/', protect, isEmployer, createJob);        // Only employers can create jobs
router.put('/:id', protect, isEmployer, updateJob);      // Only employers can update jobs
router.delete('/:id', protect, isEmployer, deleteJob);

export default router;
