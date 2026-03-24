import React from 'react'
import { ArrowRight, Box } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="pt-24 pb-12 flex flex-col items-center text-center px-4 overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-3/4 bg-blue-50/50 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-24 -right-24 w-1/3 h-1/2 bg-slate-50 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold font-outfit text-slate-950 tracking-tight leading-[1.05]">
          Create <span className="text-slate-600">Secure</span> Exams <br />
          in Minutes.
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform for educators and recruiters to build, proctor, and analyze online assessments with ease.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/signup" className="btn-primary py-4 px-10 text-lg flex items-center gap-2 shadow-2xl shadow-slate-300">
            Start Building Now <ArrowRight size={20} strokeWidth={3} />
          </Link>
          <button className="btn-secondary py-4 px-10 text-lg flex items-center gap-2 font-semibold">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <Box size={16} />
             </div>
             Watch Demo
          </button>
        </div>
      </div>

      <div className="mt-20 w-full max-w-6xl relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-100 rounded-[2.5rem] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
         <div className="relative rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-2xl bg-white aspect-video md:aspect-[21/9]">
            <img 
              src="/exam-hero.png" 
              alt="Exam Interface Dashboard" 
              className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
            />
         </div>
      </div>
    </section>
  )
}

export default Hero
