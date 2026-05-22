import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react'
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const VerifyPending = () => {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''

  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const maskedEmail = email ? email.charAt(0) + '***' + email.substring(email.indexOf('@')) : ''

  const handleResend = async () => {
    setSending(true)
    setError(null)
    try {
      await axios.post(`${API}/auth/send-otp`, { email })
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-outfit p-6">
      <Link
        to="/login"
        className="absolute top-8 left-8 z-[100] group flex items-center gap-3 bg-white hover:bg-slate-900 p-2 pr-5 rounded-full shadow-lg transition-all active:scale-95 border border-slate-200"
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white group-hover:bg-indigo-500 transition-colors">
          <ArrowLeft size={16} />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-white">Back to Login</span>
      </Link>

      <div className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full border border-white/50 overflow-hidden">
        <div className="bg-[#0F172A] px-10 py-8 text-center">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-black text-white leading-tight">Verify Your Email</h1>
          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mt-1">
            Account pending verification
          </p>
        </div>

        <div className="px-10 py-8 text-center">
          <p className="text-sm text-slate-600 leading-relaxed mb-2">
            Your account requires email verification before you can log in.
          </p>
          <p className="text-xs text-slate-500 mb-8">
            We sent a verification code to <br />
            <strong className="text-slate-800">{maskedEmail || email}</strong>
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-2 rounded-xl mb-4 text-[10px] font-bold border border-red-100 flex items-center gap-2">
              <AlertCircle size={12} /> {error}
            </div>
          )}

          {sent && (
            <div className="bg-green-50 text-green-700 p-2 rounded-xl mb-4 text-[10px] font-bold border border-green-100">
              OTP sent! Check your inbox.
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={sending}
            className="w-full bg-[#0F172A] text-white py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[.2em] hover:bg-slate-800 transition-all disabled:opacity-50 mb-4"
          >
            {sending ? 'Sending...' : 'Send OTP'}
          </button>

          <Link
            to={`/verify-otp?email=${encodeURIComponent(email)}`}
            className="block text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-wider transition-colors mb-4"
          >
            I have a code — Go to Verify
          </Link>

          <Link
            to="/login"
            className="block text-[10px] font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyPending
