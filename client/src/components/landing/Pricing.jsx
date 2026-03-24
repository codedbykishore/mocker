import React from 'react'
import { Check } from 'lucide-react'

const Pricing = () => {
  const plans = [
    { name: 'Basic', price: 'Free', features: ['10 Tests/month', 'Basic Proctoring', 'Email Support'] },
    { name: 'Pro', price: '$29', features: ['Unlimited Tests', 'AI Proctoring', 'Advanced Analytics', 'Priority Support'], popular: true },
    { name: 'Enterprise', price: 'Custom', features: ['Dedicated Server', 'SLA', 'Custom Integrations', '24/7 Support'] },
  ]

  return (
    <section id="pricing" className="py-24 bg-slate-50 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-black font-outfit text-slate-900 mb-4">Simple, Transparent Pricing</h2>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">Choose the plan that fits your needs. No hidden fees.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={`p-10 rounded-[2.5rem] bg-white border ${plan.popular ? 'border-slate-900 shadow-2xl relative scale-105' : 'border-slate-100 shadow-sm'}`}>
            {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Most Popular</span>}
            <h3 className="text-xl font-bold font-outfit text-slate-900 mb-2">{plan.name}</h3>
            <div className="text-4xl font-black text-slate-900 mb-6">{plan.price} <span className="text-sm font-bold text-slate-400">/mo</span></div>
            <ul className="space-y-4 mb-10 text-left">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                  <Check size={16} className="text-emerald-500" /> {feat}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-2xl font-black transition-all ${plan.popular ? 'bg-slate-900 text-white shadow-xl hover:shadow-2xl' : 'bg-slate-50 text-slate-900 hover:bg-slate-100'}`}>
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing
