import React from 'react'
import { TrendingUp, Users, Target, Clock, Star, Zap } from 'lucide-react'

const AnalyticsCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
        <div className="flex justify-between items-start">
             <div className={`w-14 h-14 ${color} rounded-[1.5rem] flex items-center justify-center text-white shadow-xl`}>
                <Icon size={32} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full`}>
                +{trend}%
            </span>
        </div>
        <div>
            <h3 className="text-5xl font-black font-outfit text-slate-950">{value}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mt-2">{title}</p>
        </div>
        <p className="text-xs text-slate-400 font-medium">Real-time aggregate performance insights.</p>
    </div>
)

const AnalyticsTab = () => {
    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-10">
                <AnalyticsCard title="Total Candidates" value="2.4k" icon={Users} color="bg-slate-950" trend="12" />
                <AnalyticsCard title="Global Average" value="76%" icon={Target} color="bg-blue-600" trend="8" />
                <AnalyticsCard title="Avg. Time" value="42m" icon={Clock} color="bg-emerald-500" trend="5" />
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-sm">
                    <h3 className="text-2xl font-black font-outfit text-slate-950 mb-8 flex items-center gap-3">
                        <TrendingUp size={28} className="text-slate-400" /> Topic Performance Distribution
                    </h3>
                    <div className="space-y-8">
                        {['JavaScript Fundamentals', 'System Design', 'React Hooks', 'Operating Systems'].map((topic, idx) => (
                             <div key={topic} className="space-y-3">
                                <div className="flex justify-between text-sm font-black uppercase tracking-tighter">
                                    <span className="text-slate-950">{topic}</span>
                                    <span className="text-slate-400">{85 - idx * 10}%</span>
                                </div>
                                <div className="h-2.5 bg-slate-50 rounded-full overflow-hidden">
                                     <div className="h-full bg-slate-950 rounded-full" style={{ width: `${85 - idx * 10}%` }} />
                                </div>
                             </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-sm flex flex-col justify-center items-center text-center space-y-6">
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shadow-xl shadow-amber-50">
                        <Zap size={40} />
                    </div>
                    <h3 className="text-2xl font-black font-outfit text-slate-950">Unlock Deep Insights</h3>
                    <p className="text-slate-500 font-medium">Get heatmaps, detailed proctoring logs, and candidate-level session replays to maximize exam outcomes.</p>
                    <button className="btn-primary py-4 px-10 rounded-2xl shadow-xl shadow-slate-200 uppercase tracking-widest text-xs font-black">
                        Upgrade To Pro
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsTab
