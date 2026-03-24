import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Box, Lock, Mail } from 'lucide-react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, loginWithGoogle } = useAuth()
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

    const handleGoogleLogin = async () => {
        try {
            const data = await loginWithGoogle()
            if (data.user?.role === 'creator') navigate('/dashboard')
            else navigate('/') 
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Google Login failed')
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
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-50 text-slate-500 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <button 
                        type="button" 
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors font-bold text-slate-700 shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Sign in with Google
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
