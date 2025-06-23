import React from 'react'
import { ChevronRight, Users, Trophy, Clock, ArrowRight } from 'lucide-react'

const EmployerCTA = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 opacity-10 animate-bounce">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div className="absolute top-1/3 right-1/5 opacity-10 animate-bounce animation-delay-1000">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-10 animate-bounce animation-delay-3000">
          <Clock className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-blue-200 border border-blue-400/30 mb-6">
            🚀 Ready to Transform Your Hiring?
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Start Building Your
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
              Dream Team Today
            </span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful companies who have revolutionized their hiring process. 
            Get access to top talent, reduce hiring time, and build exceptional teams.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">60%</div>
            <div className="text-blue-200">Faster Hiring Process</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">500K+</div>
            <div className="text-blue-200">Qualified Candidates</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">98%</div>
            <div className="text-blue-200">Success Rate</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <button className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center">
            Get Started Free
            <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <p className="text-blue-200 mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <span className="text-white font-semibold">Fortune 500</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <span className="text-white font-semibold">Startups</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <span className="text-white font-semibold">Tech Giants</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
              <span className="text-white font-semibold">SMBs</span>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">No Setup Fees</h4>
              <p className="text-blue-200">Start hiring immediately with zero upfront costs and transparent pricing.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">24/7 Support</h4>
              <p className="text-blue-200">Get expert assistance whenever you need it with our dedicated support team.</p>
            </div>
          </div>
        </div>
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

export default EmployerCTA;