// client/src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-300 relative">
              About JobBoard
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500 mt-1 -mb-3"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Connecting talented professionals with their dream careers and helping employers find the perfect candidates.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-xl">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-300 relative">
              For Job Seekers
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500 mt-1 -mb-3"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Create Account
                </Link>
              </li>
              <li>
                <Link to="/seeker/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Manage Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-300 relative">
              For Employers
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500 mt-1 -mb-3"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/employer/dashboard" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer/applications" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Manage Applications
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <span className="mr-2">→</span> Create Employer Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-300 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-blue-500 mt-1 -mb-3"></span>
            </h3>
            <p className="text-gray-300 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              support@jobboard.com
            </p>
            <p className="text-gray-300 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              (123) 456-7890
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} JobBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;