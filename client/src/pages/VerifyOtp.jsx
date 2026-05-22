import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const STATES = {
  READY: 'ready',
  SENDING: 'sending',
  VERIFYING: 'verifying',
  SUCCESS: 'success',
  ERROR: 'error',
}

const VerifyOtp = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const email = searchParams.get('email') || ''

  const [state, setState] = useState(STATES.READY)
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState(null)
  const [remaining, setRemaining] = useState(null)
  const [expired, setExpired] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const inputRefs = useRef([])

  const maskedEmail = email ? email.charAt(0) + '***' + email.substring(email.indexOf('@')) : ''

  const resetDigitState = useCallback(() => {
    setDigits(['', '', '', '', '', ''])
    setError(null)
    setRemaining(null)
    setExpired(false)
    setState(STATES.READY)
  }, [])

  useEffect(() => {
    if (!email) navigate('/signup', { replace: true })
  }, [email, navigate])

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown(c => c - 1), 1000)
      return () => clearInterval(timer)
    }
  }, [cooldown])

  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus()
  }, [])

  const handleDigitChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return
    const newDigits = [...digits]
    newDigits[index] = value
    setDigits(newDigits)
    setError(null)
    if (value && index < 5) inputRefs.current[index + 1].focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!paste) return
    const newDigits = ['', '', '', '', '', '']
    for (let i = 0; i < paste.length; i++) newDigits[i] = paste[i]
    setDigits(newDigits)
    setError(null)
    const nextIndex = Math.min(paste.length, 5)
    if (inputRefs.current[nextIndex]) inputRefs.current[nextIndex].focus()
  }

  const handleResend = async () => {
    if (cooldown > 0) return
    setState(STATES.SENDING)
    setError(null)
    try {
      await axios.post(`${API}/auth/send-otp`, { email })
      setCooldown(60)
      resetDigitState()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP')
      setState(STATES.ERROR)
    }
  }

  const handleVerify = async () => {
    const otp = digits.join('')
    if (otp.length !== 6) return
    setState(STATES.VERIFYING)
    setError(null)
    try {
      const res = await axios.post(`${API}/auth/verify-otp`, { email, otp })
      if (res.data.verified) {
        setState(STATES.SUCCESS)
        setTimeout(() => navigate('/login'), 3000)
      }
    } catch (err) {
      const data = err.response?.data || {}
      if (data.alreadyVerified) {
        setState(STATES.SUCCESS)
        setTimeout(() => navigate('/login'), 3000)
      } else if (data.expired) {
        setExpired(true)
        setError(data.message)
        setState(STATES.ERROR)
      } else if (data.maxAttempts) {
        setExpired(true)
        setError(data.message)
        setState(STATES.ERROR)
      } else {
        setRemaining(data.remaining != null ? data.remaining : null)
        setError(data.message || 'Invalid OTP')
        setState(STATES.ERROR)
        setDigits(['', '', '', '', '', ''])
        if (inputRefs.current[0]) inputRefs.current[0].focus()
      }
    }
  }

  const allFilled = digits.every(d => d !== '')

  if (state === STATES.SUCCESS) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center font-outfit p-6">
        <div className="bg-white rounded-[2rem] shadow-2xl p-12 max-w-md w-full text-center border border-white/50">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Email Verified!</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Your email <strong className="text-slate-800">{maskedEmail || email}</strong> has been verified.
          </p>
          <div className="w-8 h-8 mx-auto mb-6">
            <Loader2 size={32} className="text-indigo-600 animate-spin" />
          </div>
          <p className="text-xs text-slate-400">Redirecting to login...</p>
        </div>
      </div>
    )
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
          <h1 className="text-xl font-black text-white leading-tight">Verify Email</h1>
          <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="px-10 py-8">
          <div className="text-center mb-8">
            <p className="text-xs text-slate-500 mb-1">We sent a code to</p>
            <p className="text-sm font-bold text-slate-900">{maskedEmail || email}</p>
          </div>

          {error && (
            <div className={`p-3 rounded-xl mb-5 text-[10px] font-bold border flex items-center gap-2 ${expired ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
              <AlertCircle size={12} /> {error}
            </div>
          )}

          <div className="flex justify-center gap-2 mb-6">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => inputRefs.current[i] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleDigitChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className="w-11 h-14 text-center text-xl font-black bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/5 transition-all"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={!allFilled || state === STATES.VERIFYING}
            className={`w-full py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[.2em] transition-all flex items-center justify-center gap-2
              ${allFilled && state !== STATES.VERIFYING
                ? 'bg-[#0F172A] text-white hover:bg-slate-800 shadow-md shadow-slate-100'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
          >
            {state === STATES.VERIFYING ? 'Verifying...' : 'Verify'}
          </button>

          <div className="text-center mt-6">
            {cooldown > 0 ? (
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Resend in <span className="text-indigo-600">{cooldown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={state === STATES.SENDING}
                className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-wider transition-colors disabled:text-slate-300"
              >
                {state === STATES.SENDING ? 'Sending...' : 'Resend Code'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyOtp
