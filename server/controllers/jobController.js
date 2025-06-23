import Job from '../models/Jobs.js';

// POST /api/jobs
export const createJob = async (req, res) => {
  try {
    const { salaryMin, salaryMax, skills, employees, ...rest } = req.body;

    const job = new Job({
      ...rest,
      salary: {
        min: parseInt(salaryMin) || 0,
        max: parseInt(salaryMax) || 0,
        currency: 'USD'
      },
      skills,
      employeeCount: employees
    });

    await job.save();
    res.status(201).json({ message: 'Job posted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to post job' });
  }
};

// GET /api/jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.aggregate([
      {
        $lookup: {
          from: 'applications',          // name of the collection
          localField: '_id',
          foreignField: 'jobId',
          as: 'applications'
        }
      },
      {
        $addFields: {
          applicationCount: { $size: '$applications' }
        }
      },
      {
        $project: {
          applications: 0 // exclude full application docs
        }
      },
      {
        $sort: {
          postedAt: -1
        }
      }
    ]);

    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// GET /api/jobs/:id
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

// PUT /api/jobs/:id
export const updateJob = async (req, res) => {
  try {
    const { salaryMin, salaryMax, tags, employees, ...rest } = req.body;

    const updated = {
      ...rest,
      salary: {
        min: parseInt(salaryMin) || 0,
        max: parseInt(salaryMax) || 0,
        currency: 'USD'
      },
      skills: tags,
      employeeCount: employees
    };

    const job = await Job.findByIdAndUpdate(req.params.id, updated, { new: true });
    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json({ message: 'Job updated successfully', job });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
};
