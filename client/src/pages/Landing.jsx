import React from 'react'
import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'

const Features = () => {
  const items = [
    { title: 'Secure Proctoring', desc: 'Advanced tab-switching and window-blur detection to prevent cheating.', icon: '🛡️' },
    { title: 'OMR Interface', desc: 'Real-time sync between question selection and the OMR bubble sheet.', icon: '📝' },
    { title: 'Deep Analytics', desc: 'Question-wise performance and candidate violation logs.', icon: '📊' },
  ]
  return (
    <section id="features" className="py-24 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <div key={i} className="space-y-4 p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="text-4xl">{item.icon}</div>
              <h3 className="text-xl font-bold font-outfit">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
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
      <Features />
    </div>
  )
}

export default Landing
