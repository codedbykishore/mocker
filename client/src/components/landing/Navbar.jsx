import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Box } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="h-20 flex items-center justify-between px-6 md:px-12 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
          <Box size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight font-outfit text-slate-900">Software Mocker</span>
      </div>
      
      <ul className="hidden md:flex items-center gap-10">
        <li><a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors">Features</a></li>
        <li><a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors">Pricing</a></li>
        <li><a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-950 transition-colors">About</a></li>
      </ul>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-semibold text-slate-900 hover:underline">Login</Link>
        <Link to="/signup" className="btn-primary flex items-center gap-2 text-sm shadow-lg shadow-slate-200">
          Try for Free <ArrowRight size={14} strokeWidth={3} />
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
