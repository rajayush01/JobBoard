import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  // Reference to job and user
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
    required: true
  },
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Personal Information
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  
  // Professional Information
  experience: {
    type: String,
    required: true,
    enum: ['0-1', '2-3', '4-5', '6-8', '9+']
  },
  education: {
    type: String,
    enum: ['high-school', 'associate', 'bachelor', 'master', 'phd']
  },
  
  // Documents
  resumeUrl: {
    type: String,
    required: true
  },
  coverLetter: {
    type: String,
    maxlength: 2000
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  
  // Timestamps
  appliedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate applications
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

// Pre-save middleware to update lastUpdated
applicationSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

export default mongoose.model('Application', applicationSchema);;