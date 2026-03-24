import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/dashboard/Sidebar'
import OverviewTab from '../components/dashboard/Tabs/OverviewTab'
import TestsTab from '../components/dashboard/Tabs/TestsTab'
import AnalyticsTab from '../components/dashboard/Tabs/AnalyticsTab'
import SettingsTab from '../components/dashboard/Tabs/SettingsTab'
import { Plus } from 'lucide-react'

const CreatorDashboard = () => {
    const [tests, setTests] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const activeTab = queryParams.get('tab') || 'overview'

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tests')
                setTests(res.data)
            } catch (err) {
                console.error('Failed to fetch tests', err)
            } finally {
                setLoading(false)
            }
        }
        fetchTests()
    }, [])

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab tests={tests} />
            case 'tests': return <TestsTab tests={tests} />
            case 'analytics': return <AnalyticsTab />
            case 'settings': return <SettingsTab />
            default: return <OverviewTab tests={tests} />
        }
    }

    if (loading) return <div className="h-screen flex items-center justify-center font-bold">Synchronizing Dashboard...</div>

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans selection:bg-slate-900 selection:text-white">
            <Sidebar />
            <main className="flex-1 p-12 overflow-y-auto max-w-7xl mx-auto w-full">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="space-y-2">
                        <h2 className="text-5xl font-black font-outfit text-slate-950 tracking-tight capitalize leading-none">{activeTab} Dashboard</h2>
                        <p className="text-slate-500 font-medium text-sm border-l-2 border-slate-200 pl-4">Premium real-time command center for exam creators.</p>
                    </div>
                    {activeTab === 'overview' || activeTab === 'tests' ? (
                        <Link to="/builder" className="btn-primary py-5 px-10 flex items-center gap-3 text-lg shadow-2xl shadow-slate-200 active:scale-95 transition-all">
                            <Plus size={24} /> New Assessment
                        </Link>
                    ) : null}
                </header>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    {renderContent()}
                </div>
            </main>
        </div>
    )
}

export default CreatorDashboard
