import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { OMRSheet } from '../components/exam/OMRSheet'
import { Timer } from '../components/exam/Timer'
import { useProctor } from '../hooks/useProctor'
import { ChevronLeft, ChevronRight, Send, AlertCircle } from 'lucide-react'

export default function ExamPage() {
    const { uniqueLink } = useParams()
    const navigate = useNavigate()
    const [test, setTest] = useState(null)
    const [questions, setQuestions] = useState([])
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState({})
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)

    useEffect(() => {
        const startSession = async () => {
            try {
                // In a real app, we'd find the test by uniqueLink first
                // For this demo, we'll assume the link directly maps to a test ID or slug
                const res = await axios.get(`http://localhost:5000/api/tests/link/${uniqueLink}`)
                setTest(res.data.test)
                setQuestions(res.data.questions)
                
                // Start session API call
                const sessionRes = await axios.post('http://localhost:5000/api/sessions/start', { testId: res.data.test._id })
                setSession(sessionRes.data.session)
            } catch (err) {
                console.error('Failed to start exam', err)
            } finally {
                setLoading(false)
            }
        }
        startSession()
    }, [uniqueLink])

    useProctor({
        onViolation: (violation) => {
            console.warn('Violation detected:', violation.type)
            // Log violation to backend
            if (session) {
                axios.post(`http://localhost:5000/api/sessions/${session._id}/violation`, violation)
            }
        }
    })

    const handleSelect = (idx, opt) => {
        setAnswers({ ...answers, [idx]: opt })
    }

    const handleSubmit = async () => {
        if (window.confirm('Are you sure you want to submit the exam?')) {
            try {
                const res = await axios.post(`http://localhost:5000/api/sessions/${session._id}/submit`, { answers })
                navigate(`/result/${session._id}`)
            } catch (err) {
                console.error('Submission failed', err)
            }
        }
    }

    if (loading) return <div className="h-screen flex items-center justify-center font-bold">Loading Exam Environment...</div>

    const currentQuestion = questions[currentQ]

    return (
        <div className="h-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
            <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between shrink-0">
                <div className="flex flex-col">
                    <h1 className="text-xl font-black font-outfit uppercase tracking-wider text-slate-900">{test?.title}</h1>
                    <span className="text-xs font-bold text-slate-400">SESSION ID: {session?._id.slice(-8)}</span>
                </div>
                <div className="flex items-center gap-6">
                    <Timer durationMinutes={test?.duration || 30} onTimeUp={handleSubmit} onWarning={(msg) => alert(msg)} />
                    <button onClick={handleSubmit} className="btn-primary py-3 px-8 flex items-center gap-2 font-bold shadow-lg shadow-slate-200">
                        Submit Exam <Send size={18} />
                    </button>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden p-8 gap-8">
                {/* LEFT: Question Panel */}
                <div className="flex-1 flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="flex-1 p-12 overflow-y-auto">
                        {questions.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                    <AlertCircle size={40} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900">No Questions Found</h2>
                                <p className="text-slate-500 max-w-xs">This assessment doesn't have any questions yet. Please contact the administrator.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-4">
                                     <div className="bg-slate-900 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Question {currentQ + 1}</div>
                                     <div className="text-slate-400 font-bold text-sm">Marks: {currentQuestion?.marks}</div>
                                </div>
                                <h2 className="text-3xl font-extrabold font-outfit text-slate-900 mb-10 leading-tight">{currentQuestion?.questionText}</h2>
                                
                                <div className="space-y-4">
                                    {currentQuestion?.options.map((opt) => (
                                        <button 
                                            key={opt.label}
                                            onClick={() => handleSelect(currentQ, opt.label)}
                                            className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 group
                                                ${answers[currentQ] === opt.label ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-x-1' : 'bg-slate-50 border-slate-50 hover:border-slate-200 text-slate-700'}`}
                                        >
                                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-sm transition-all
                                                ${answers[currentQ] === opt.label ? 'bg-white border-white text-slate-900 rotate-12' : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900'}`}>
                                                {opt.label}
                                            </div>
                                            <span className="text-lg font-bold">{opt.text}</span>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    
                    <div className="h-24 bg-slate-50 border-t border-slate-100 px-10 flex items-center justify-between shrink-0">
                        <button 
                            disabled={currentQ === 0}
                            onClick={() => setCurrentQ(prev => prev - 1)}
                            className="flex items-center gap-2 font-bold text-slate-500 disabled:opacity-30 hover:text-slate-900 transition-all"
                        >
                            <ChevronLeft size={20} /> Previous
                        </button>
                        <div className="flex items-center gap-2">
                            {questions.map((_, i) => (
                                <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentQ ? 'w-8 bg-slate-900' : (answers[i] ? 'bg-emerald-500' : 'bg-slate-200')}`} />
                            ))}
                        </div>
                        <button 
                            disabled={currentQ === questions.length - 1}
                            onClick={() => setCurrentQ(prev => prev + 1)}
                            className="flex items-center gap-2 font-bold text-slate-500 disabled:opacity-30 hover:text-slate-900 transition-all"
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* RIGHT: OMR & Stats */}
                <div className="w-80 flex flex-col gap-6 shrink-0">
                    <OMRSheet questions={questions} answers={answers} currentQ={currentQ} onSelect={(idx, opt) => {
                        handleSelect(idx, opt);
                        setCurrentQ(idx);
                    }} />
                    
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 space-y-4">
                        <div className="flex items-center gap-3 text-emerald-400">
                            <AlertCircle size={20} />
                            <span className="text-xs font-black uppercase tracking-widest leading-none">Proctoring Active</span>
                        </div>
                        <p className="text-sm font-medium text-slate-400 leading-relaxed">
                            Webcam and Screen recording are enabled. Any suspicious activity will be logged.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
