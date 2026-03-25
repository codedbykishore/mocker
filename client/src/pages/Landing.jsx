import React from 'react'
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import CompanySlider from '../components/landing/CompanySlider'
import Pricing from '../components/landing/Pricing'
import About from '../components/landing/About'
import Feedback from '../components/landing/Feedback'
import Footer from '../components/landing/Footer'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { ShieldCheck, FileEdit, BarChart3 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Features = () => {
  const container = React.useRef()
  const items = [
    { 
      title: 'Secure Proctoring', 
      desc: 'Advanced tab-switching and window-blur detection to prevent cheating.', 
      icon: <ShieldCheck size={42} strokeWidth={1.5} className="text-slate-900" />
    },
    { 
      title: 'OMR Interface', 
      desc: 'Real-time sync between question selection and the OMR bubble sheet.', 
      icon: <FileEdit size={42} strokeWidth={1.5} className="text-slate-900" />
    },
    { 
      title: 'Deep Analytics', 
      desc: 'Question-wise performance and candidate violation logs.', 
      icon: <BarChart3 size={42} strokeWidth={1.5} className="text-slate-900" />
    },
  ]

  return (
    <section id="features" ref={container} className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <div key={i} className="feature-card group space-y-6 p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50/30 hover:bg-slate-900 hover:border-slate-800 transition-all duration-500 cursor-default">
              <div className="group-hover:scale-110 group-hover:text-white transition-all transform origin-left duration-500">
                {typeof item.icon === 'string' ? item.icon : React.cloneElement(item.icon, { 
                  className: `${item.icon.props.className} group-hover:text-white` 
                })}
              </div>
              <h3 className="text-2xl font-bold font-outfit text-slate-900 group-hover:text-white transition-colors duration-500">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg group-hover:text-slate-300 transition-colors duration-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Landing = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <CompanySlider />
      <Features />
      <Feedback />
      <Pricing />
      <About />
      <Footer />
    </div>
  )
}

export default Landing
