// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Contains { id, role }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Role-based middleware
export const isEmployer = (req, res, next) => {
    if (req.user?.role !== 'employer') {
        return res.status(403).json({ message: 'Access denied: Employers only' });
    }
    next();
};

export const isJobseeker = (req, res, next) => {
    if (req.user?.role !== 'jobseeker') {
        return res.status(403).json({ message: 'Access denied: Jobseekers only' });
    }
    next();
};