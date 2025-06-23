// client/src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import EmployerLanding from './pages/EmployerLanding';
import Register from './pages/Register';
import BrowseJobs from './pages/BrowseJobs';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import SeekerDashboard from './pages/Seeker/SeekerDashboard';
import JobDetailsPage from './pages/JobDetailsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ApplyPage from './pages/Seeker/ApplyPage';
import PostJobPage from './pages/Employer/PostJobPage';
import { AuthProvider } from './context/AuthContext';
import EditJobPage from './pages/EditJobPage';
import MyApplicationsPage from './pages/MyApplicationPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/register' element={<Register/>} />
              <Route path='/employer-land' element={<EmployerLanding/>} />
              <Route path="/jobs" element={<BrowseJobs />} />
              <Route path='/employer/dashboard' element={<EmployerDashboard/>} />
              <Route path='/seeker/dashboard' element={<SeekerDashboard/>} />
              <Route path='/my-applications' element={<MyApplicationsPage/>} /> {/* Add this route */}
              <Route path='/jobs/:id' element={<JobDetailsPage/>}/>
              <Route path='/apply/:id' element={<ApplyPage/>}/>
              <Route path='/employer/post-job' element={<PostJobPage/>}/>
              <Route path="/edit-job/:id" element={<EditJobPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;