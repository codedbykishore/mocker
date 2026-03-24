import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Box, Lock, Mail, User, ShieldCheck } from 'lucide-react'

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'candidate' 
    })
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const data = await signup(formData)
            if (data.user.role === 'creator') navigate('/dashboard')
            else navigate('/') 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
             {/* Decorative background elements */}
            <div className="absolute top-0 -left-1/4 w-3/4 h-3/4 bg-blue-100/40 rounded-full blur-3xl opacity-60" />
            <div className="absolute -bottom-24 -right-24 w-1/2 h-1/2 bg-slate-200/50 rounded-full blur-3xl opacity-60" />

            <div className="glass max-w-xl w-full p-10 md:p-12 rounded-[3rem] shadow-2xl relative z-10 border border-white transition-all">
                <div className="flex flex-col items-center mb-10">
                     <div className="w-14 h-14 bg-slate-900 rounded-[1.25rem] flex items-center justify-center text-white mb-6 shadow-xl shadow-slate-200 translate-y-[-10px]">
                        <Box size={28} />
                    </div>
                    <h2 className="text-4xl font-black font-outfit text-slate-950 tracking-tight">Create Account</h2>
                    <p className="text-slate-500 mt-3 font-medium text-center">Join the most secure online examination platform.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 flex items-center gap-3 text-sm font-bold animate-shake">
                        <ShieldCheck size={18} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                        <div className="relative group">
                             <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors" size={18} />
                             <input 
                                type="text" 
                                required 
                                className="w-full pl-14 pr-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-950 transition-all font-bold text-slate-900"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <div className="relative group">
                             <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors" size={18} />
                             <input 
                                type="email" 
                                required 
                                className="w-full pl-14 pr-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-950 transition-all font-bold text-slate-900"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                        <div className="relative group">
                             <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors" size={18} />
                             <input 
                                type="password" 
                                required 
                                className="w-full pl-14 pr-6 py-4 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-950 transition-all font-bold text-slate-900"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                            />
                        </div>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <label className="text-sm font-bold text-slate-700 ml-1 mb-2 block">I want to...</label>
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, role: 'candidate'})}
                                className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${
                                    formData.role === 'candidate' ? 'bg-slate-950 border-slate-950 text-white shadow-xl translate-y-[-2px]' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                Take Exams
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData({...formData, role: 'creator'})}
                                className={`py-4 rounded-2xl font-black text-xs uppercase tracking-widest border-2 transition-all ${
                                    formData.role === 'creator' ? 'bg-slate-950 border-slate-950 text-white shadow-xl translate-y-[-2px]' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                }`}
                            >
                                Create Exams
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full md:col-span-2 btn-primary py-5 text-lg mt-4 shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up Now'}
                    </button>
                </form>

                <p className="text-center mt-10 text-sm font-bold text-slate-500">
                    Already have an account? <Link to="/login" className="text-slate-950 font-black hover:underline underline-offset-4">Log In</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
