import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout, isEmployer, isJobseeker } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <nav className={`fixed top-0 left-0 w-full z-50 font-medium transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent shadow-md'}`}>
                <div className='flex flex-row justify-between items-center p-6 px-10 bg-gradient-to-r from-gray-100 to-white text-gray-500 max-w-screen mx-auto'>
                    {/* Left Side */}
                    <div className='flex items-center space-x-9'>
                        <Link
                            to="/"
                            className='bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-extrabold text-2xl'>
                            JobBoard
                        </Link>

                        <Link
                            to="/jobs"
                            className={`hidden md:block hover:cursor-pointer text-base ${isActive('/jobs') ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                            Browse Job
                        </Link>

                        {isAuthenticated && isEmployer && (
                            <>
                                <Link
                                    to="/employer/dashboard"
                                    className={`hidden md:block hover:cursor-pointer text-base ${isActive('/employer/dashboard') ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                                    Employer Dashboard
                                </Link>
                                <Link
                                    to="/employer/post-job"
                                    className={`hidden md:block hover:cursor-pointer text-base ${isActive('/employer/post-job') ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                                    Post Job
                                </Link>
                            </>
                        )}

                        {isAuthenticated && isJobseeker && (
                            <Link
                                to="/seeker/dashboard"
                                className={`hidden md:block hover:cursor-pointer text-base ${isActive('/seeker/dashboard') ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                                My Applications
                            </Link>
                        )}
                    </div>

                    {/* Right Side - Auth Buttons */}
                    <div className='hidden md:flex items-center space-x-6'>
                        {isAuthenticated ? (
                            <>
                                <span className='text-sm text-gray-700'>Hi, <span className='font-semibold text-blue-600'>{user?.name}</span></span>
                                <button
                                    onClick={handleLogout}
                                    className='bg-gradient-to-l from-red-600 to-red-500 text-white px-3 py-1 rounded hover:-translate-y-1 transition-all duration-300'>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`hover:cursor-pointer text-base ${isActive('/login') ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                                    <button className='hover:cursor-pointer hover:text-blue-500'>Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className='bg-gradient-to-l from-blue-700 to-blue-500 text-white p-1 px-3 rounded hover:-translate-y-1 transition-all duration-300'>
                                        Register
                                    </button>
                                </Link>
                                <Link to="/employer-land">
                                    <div className='text-blue-500 hover:scale-105 transition-all duration-300'>
                                        For Employers <span className='text-lg'>→</span>
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className='md:hidden flex flex-col space-y-1 p-2'
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className='px-6 py-4 space-y-5'>
                        <Link to="/jobs" className={`block hover:cursor-pointer text-base ${isActive('/jobs') ? 'text-blue-500' : 'hover:text-blue-500'}`} onClick={closeMenu}>
                            Browse Job
                        </Link>

                        {isAuthenticated && isEmployer && (
                            <>
                                <Link to="/employer/dashboard" className='block hover:cursor-pointer text-base text-gray-700 hover:text-blue-500' onClick={closeMenu}>
                                    Employer Dashboard
                                </Link>
                                <Link to="/employer/post-job" className='block hover:cursor-pointer text-base text-gray-700 hover:text-blue-500' onClick={closeMenu}>
                                    Post Job
                                </Link>
                            </>
                        )}

                        {isAuthenticated && isJobseeker && (
                            <Link to="/seeker/dashboard" className='block hover:cursor-pointer text-base text-gray-700 hover:text-blue-500' onClick={closeMenu}>
                                My Applications
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMenu();
                                }}
                                className='block w-full bg-gradient-to-l from-red-600 to-red-500 text-white p-2 rounded hover:scale-105 transition-all duration-300'
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" onClick={closeMenu} className={`block hover:cursor-pointer text-base ${isActive('/login') ? 'text-blue-500' : 'hover:text-blue-500'}`}>
                                    Login
                                </Link>
                                <Link to="/register" onClick={closeMenu}>
                                    <button className='block w-full bg-gradient-to-l from-blue-700 to-blue-500 text-white p-2 rounded hover:scale-105 transition-all duration-300 mb-4'>
                                        Register (JobSeeker)
                                    </button>
                                </Link>
                                <Link to="/employers" onClick={closeMenu}>
                                    <button className='block w-full bg-gradient-to-l from-blue-700 to-blue-500 text-white p-2 rounded hover:scale-105 transition-all duration-300'>
                                        Register (Employer)
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
