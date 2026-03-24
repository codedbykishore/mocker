import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Box, Lock, Mail } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await login(email, password)
            if (data.user.role === 'creator') navigate('/dashboard')
            else navigate('/') 
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
             {/* Decorative circles */}
            <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-1/4 w-1/2 h-1/2 bg-slate-200/50 rounded-full blur-3xl" />

            <div className="glass max-w-md w-full p-10 rounded-[2.5rem] shadow-2xl relative z-10 border border-white">
                <div className="flex flex-col items-center mb-8">
                     <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-4">
                        <Box size={24} />
                    </div>
                    <h2 className="text-3xl font-bold font-outfit text-slate-900">Welcome Back</h2>
                    <p className="text-slate-500 mt-2">Log in to manage your exams</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-medium">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                        <div className="relative group">
                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
                             <input 
                                type="email" 
                                required 
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-medium"
                                placeholder="name@example.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                        <div className="relative group">
                             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
                             <input 
                                type="password" 
                                required 
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-100/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-medium"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-xs font-bold text-slate-500 hover:text-slate-950 transition-colors">Forgot Password?</a>
                    </div>

                    <button type="submit" className="w-full btn-primary py-4 text-lg mt-2 shadow-xl shadow-slate-200">
                        Log In
                    </button>
                </form>

                <p className="text-center mt-8 text-sm font-medium text-slate-600">
                    Don't have an account? <Link to="/signup" className="text-slate-950 font-bold hover:underline">Create Account</Link>
                </p>
            </div>
        </div>
    )
}

export default Login
