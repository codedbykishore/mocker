import React from 'react'
import { Plus, Users, ClipboardList, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-slate-500 font-semibold mb-1">{title}</p>
            <h3 className="text-3xl font-bold font-outfit text-slate-900">{value}</h3>
        </div>
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
            <Icon size={28} />
        </div>
    </div>
)

const OverviewTab = ({ tests }) => {
    return (
        <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-8">
                <StatsCard title="Total Tests" value={tests.length} icon={ClipboardList} color="bg-slate-900" />
                <StatsCard title="Active Candidates" value="1,248" icon={Users} color="bg-blue-600" />
                <StatsCard title="Completed Exams" value="854" icon={CheckCircle} color="bg-emerald-500" />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h3 className="text-2xl font-bold font-outfit text-slate-900">Recent Tests</h3>
                    <button className="text-sm font-bold text-slate-500 hover:text-slate-900">View All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-slate-400 font-bold border-b border-slate-50 uppercase text-xs tracking-widest">
                                <th className="pb-4 px-4 font-semibold">Test Title</th>
                                <th className="pb-4 px-4 font-semibold">Status</th>
                                <th className="pb-4 px-4 font-semibold">Participants</th>
                                <th className="pb-4 px-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {tests.slice(0, 5).map(test => (
                                <tr key={test._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="py-5 px-4 font-bold text-slate-900">{test.title}</td>
                                    <td className="py-5 px-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                                            test.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 
                                            test.status === 'draft' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
                                        }`}>
                                            {test.status}
                                        </span>
                                    </td>
                                    <td className="py-5 px-4 font-semibold text-slate-500">{test.currentParticipants}/{test.maxParticipants}</td>
                                    <td className="py-5 px-4">
                                        <Link to={`/builder/${test._id}`} className="text-slate-900 font-bold hover:underline">Edit</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OverviewTab
