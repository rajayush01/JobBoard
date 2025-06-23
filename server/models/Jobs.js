import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'],
        required: true
    },
    experience: {
        type: String,
        enum: ['Entry Level', '1-2 years', '3-5 years', '5-8 years', '8+ years'],
        default: 'Entry Level'
    },
    employeeCount: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '500-1000', '1000+'],
        default: '1-10'
    },
    salary: {
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
        currency: {
            type: String,
            default: 'USD',
            enum: ['USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD']
        }
    },
    description: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    companyDescription: {
        type: String,
        default: ''
    },
    logo: String,
    requirements: [{
        type: String,
        trim: true
    }],
    benefits: [{
        type: String,
        trim: true
    }],
    skills: [{
        type: String,
        trim: true
    }],
    postedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

export default mongoose.model('Jobs', jobSchema);