import React, { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ExamCard from './ExamCard'

const omrExams = [
  { name: 'NEET', image: '/neet_thumbnail.png' },
  { name: 'UPSC', image: '/upsc_thumbnail.png' },
  { name: 'TNPSC', image: '/tnpsc_thumbnail.png' },
  { name: 'TRB', image: '/trb_thumbnail.png' },
  { name: 'TET', image: '/tet_thumbnail.png' },
];

const cbtExams = [
  { name: 'GATE', image: '/gate_thumbnail.png' },
  { name: 'JEE', image: '/jee_thumbnail.png' },
  { name: 'IBPS', image: '/ibps_thumbnail.png' },
  { name: 'CSIR NET', image: '/csir_net_thumbnail.png' },
  { name: 'RRB', image: '/rrb_thumbnail.png' },
  { name: 'SSC', image: '/ssc_thumbnail.png' },
];

const Hero = () => {
  const { user } = useAuth();
  const container = useRef();

  const getStartedPath = () => {
    if (!user) return '/signup';
    return user.role === 'creator' ? '/dashboard' : '/candidate-dashboard';
  };

  useGSAP(() => {
    // Entrance for Page 1
    gsap.fromTo('.brand-title', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' });
    gsap.fromTo('.exam-section', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.3, ease: 'power3.out', delay: 0.5 });
    gsap.fromTo('.hero-buttons', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 1.4 });

    // Section 2 Background Animation
    gsap.to('.hero-bg-img', {
      scale: 1.15,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: container });

  return (
    <div ref={container} className="w-full">
      {/* Page 1: Exam Dashboard & Actions */}
      <section className="relative flex flex-col items-center justify-start px-4 pt-20 pb-32 overflow-hidden bg-white min-h-screen">
        {/* Big Mocker Brand Title */}
        <div className="brand-title w-full text-center mb-16 relative z-10">
          <h1 className="text-7xl md:text-9xl font-black font-outfit text-[#0F172A] tracking-tighter">
            Mocker
          </h1>
        </div>

        {/* Exam Dashboard Grids - Maximum width for ultra-large thumbnails */}
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-6 mb-16 relative z-10 px-2 md:px-6">
          {/* Section 1: OMR Exams */}
          <div className="exam-section flex-1 space-y-8 bg-slate-50/50 p-4 md:p-8 rounded-[3rem] border border-slate-200 shadow-sm h-full">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] font-outfit">OMR</h2>
              <span className="text-slate-500 font-semibold text-lg md:text-2xl pb-0.5">Pen & Paper</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {omrExams.map((exam, idx) => (
                <div key={`omr-${idx}`} className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]">
                  <ExamCard key={`omr-${idx}`} image={exam.image} />
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: CBT Exams */}
          <div className="exam-section flex-1 space-y-8 bg-slate-50/50 p-4 md:p-8 rounded-[3rem] border border-slate-200 shadow-sm h-full">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-2">
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] font-outfit">CBT</h2>
              <span className="text-slate-500 font-semibold text-lg md:text-2xl pb-0.5">Computer-Based</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {cbtExams.map((exam, idx) => (
                <div key={`cbt-${idx}`} className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]">
                  <ExamCard key={`cbt-${idx}`} image={exam.image} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons - Now right after the grids */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 pt-4">
          {!user ? (
            <>
              <Link to="/signup" className="bg-[#0F172A] text-white py-5 px-14 rounded-full text-xl font-bold flex items-center gap-3 hover:scale-105 hover:shadow-2xl hover:bg-slate-900 transition-all shadow-xl shadow-slate-200">
                Sign Up <ArrowRight size={22} strokeWidth={3} />
              </Link>
              <Link to="/login" className="py-5 px-14 text-xl font-bold text-[#0F172A] bg-white border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-full transition-all shadow-sm">
                Log In
              </Link>
            </>
          ) : (
            <Link to={getStartedPath()} className="bg-[#0F172A] text-white py-5 px-14 rounded-full text-xl font-bold flex items-center gap-3 hover:scale-105 hover:shadow-2xl hover:bg-slate-900 transition-all shadow-xl shadow-slate-200">
              Go to Dashboard <ArrowRight size={22} strokeWidth={3} />
            </Link>
          )}
        </div>
      </section>

      {/* Page 2: Marketing with Background Image */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-slate-900">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/landing-hero.png"
            alt="Hero background"
            className="hero-bg-img w-full h-full object-cover opacity-60 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/10" />
        </div>

        <div className="hero-text-content max-w-5xl mx-auto space-y-10 relative z-10 py-20">
          <h1 className="hero-title text-5xl md:text-8xl font-black font-outfit text-white tracking-tight leading-[1] mb-6 drop-shadow-lg">
            Smart Exams. <br />
            Seamless Experience.
          </h1>
          <p className="hero-subtext text-lg md:text-xl text-white font-bold max-w-3xl mx-auto leading-relaxed bg-black/30 backdrop-blur-xl rounded-[2rem] px-10 py-8 inline-block border border-white/20 shadow-2xl">
            The most reliable and intuitive proctoring platform <br className="hidden md:block" />
            for building and delivering high-stakes assessments.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Hero
