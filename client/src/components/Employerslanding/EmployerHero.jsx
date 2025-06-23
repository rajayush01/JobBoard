import React from 'react'
import { ChevronRight, Users, Award, TrendingUp, Briefcase, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmployerHero = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="absolute -bottom-20 left-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 opacity-10 animate-bounce">
                    <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-1/3 right-1/4 opacity-10 animate-bounce animation-delay-1000">
                    <Award className="w-6 h-6 text-white" />
                </div>
                <div className="absolute bottom-1/3 left-1/3 opacity-10 animate-bounce animation-delay-2000">
                    <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div className="absolute top-1/2 right-1/3 opacity-10 animate-bounce animation-delay-3000">
                    <Briefcase className="w-6 h-6 text-white" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen">
                    {/* Left Content */}
                    <div className="flex-1 text-white mb-12 lg:mb-0 lg:pr-12">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-blue-200 border border-blue-400/30 mb-6">
                                🚀 Transform Your Hiring Process
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                            Find Your
                            <span className="block bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                                Perfect Team
                            </span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
                            Connect with top talent effortlessly. Our AI-powered platform streamlines recruitment,
                            reduces hiring time by 60%, and helps you build exceptional teams.
                        </p>

                        {/* Key Features */}
                        <div className="flex flex-wrap gap-6 mb-10">
                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-blue-400/20">
                                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span className="text-blue-100 font-medium">AI-Powered Matching</span>
                            </div>

                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-blue-400/20">
                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                    </svg>
                                </div>
                                <span className="text-blue-100 font-medium">Global Talent Pool</span>
                            </div>

                            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-blue-400/20">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                    </svg>
                                </div>
                                <span className="text-blue-100 font-medium">Smart Analytics</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-start gap-6 mb-12">
                            <Link
                                to="/register"
                                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center">
                                Get Started Free
                                <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Visual Element */}
                    <div className="flex-1 relative">
                        <div className="relative max-w-lg mx-auto">
                            {/* Main Card */}
                            <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Users className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">Smart Matching</h3>
                                    <p className="text-blue-200 text-sm">AI-powered candidate recommendations</p>
                                </div>

                                {/* Mock Interface */}
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            JD
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium text-sm">John Doe</div>
                                            <div className="text-blue-200 text-xs">Senior Developer • 98% Match</div>
                                        </div>
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            AS
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium text-sm">Alice Smith</div>
                                            <div className="text-blue-200 text-xs">Product Manager • 95% Match</div>
                                        </div>
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-1000"></div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                            MJ
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-medium text-sm">Mike Johnson</div>
                                            <div className="text-blue-200 text-xs">UX Designer • 92% Match</div>
                                        </div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-2000"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                <Award className="w-8 h-8 text-white" />
                            </div>

                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                                <TrendingUp className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1200 120" className="w-full h-auto">
                    <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.1)"></path>
                </svg>
            </div>

            <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    )
}

export default EmployerHero