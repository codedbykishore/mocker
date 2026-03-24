import React from 'react'
import { useAuth } from '../context/AuthContext'
import { LogOut, User, BookOpen, Clock, Award, ShieldAlert } from 'lucide-react'

const CandidateDashboard = () => {
    const { user, logout } = useAuth()

    const stats = [
        { label: 'Exams Taken', value: '0', icon: <BookOpen className="text-blue-600" /> },
        { label: 'Avg. Score', value: '0%', icon: <Award className="text-emerald-600" /> },
        { label: 'Time Spent', value: '0h', icon: <Clock className="text-amber-600" /> },
    ]

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Simple */}
            <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between">
                <div className="space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                            <User size={20} />
                        </div>
                        <span className="font-bold text-slate-900">My Profile</span>
                    </div>

                    <nav className="space-y-4">
                        <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-100 text-slate-900 rounded-xl font-bold transition-all">
                           <BookOpen size={18} /> My Exams
                        </button>
                    </nav>
                </div>

                <button 
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 font-bold transition-colors"
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black font-outfit text-slate-900 tracking-tight">Welcome, {user?.name}!</h1>
                    <p className="text-slate-500 mt-2 font-medium">Ready for your next challenge?</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm text-center">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 font-outfit">No Exams Assigned</h2>
                    <p className="text-slate-500 mt-3 max-w-sm mx-auto font-medium leading-relaxed">
                        You don't have any pending examinations. Please use the unique link shared by your examiner to start a test.
                    </p>
                </div>
            </main>
        </div>
    )
}

export default CandidateDashboard
