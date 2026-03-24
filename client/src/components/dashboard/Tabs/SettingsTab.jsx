import React from 'react'
import { User, Shield, Bell, CreditCard, ChevronRight } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext'

const SettingsCard = ({ title, description, icon: Icon, children }) => (
    <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-10">
        <div className="flex justify-between items-start">
             <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-950 border border-slate-100 shadow-xl shadow-slate-50">
                <Icon size={32} />
            </div>
            <button className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors">Edit</button>
        </div>
        <div>
            <h3 className="text-3xl font-black font-outfit text-slate-950">{title}</h3>
            <p className="text-sm font-medium text-slate-500 mt-2">{description}</p>
        </div>
        <div className="space-y-6">
            {children}
        </div>
    </div>
)

const SettingsTab = () => {
    const { user } = useAuth()

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col gap-2">
                <h3 className="text-4xl font-black font-outfit text-slate-950">Settings & Account Control</h3>
                <p className="text-slate-500 font-medium">Fine-tune your workspace and security preferences.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-12 mt-12">
                <SettingsCard title="Profile Hub" description="Update your identity and workspace presence." icon={User}>
                    <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex items-center gap-6">
                        <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center text-white text-3xl font-black font-outfit">
                            {user?.name?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black text-slate-950">{user?.name}</span>
                            <span className="text-sm font-bold text-slate-400">{user?.email}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-4 py-2 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                        <span className="text-sm font-black uppercase tracking-widest text-slate-950">Organization Details</span>
                        <ChevronRight className="text-slate-400 group-hover:translate-x-1 transition-all" />
                    </div>
                </SettingsCard>

                <SettingsCard title="Mission Security" description="Secure your account and exam data." icon={Shield}>
                    <div className="space-y-6">
                         <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-[1.5rem] border border-emerald-100">
                             <div className="flex flex-col">
                                 <span className="text-sm font-black text-emerald-700 uppercase tracking-widest leading-none mb-1">Two-Factor Auth</span>
                                 <span className="text-xs font-bold text-emerald-600">Currently Active</span>
                             </div>
                             <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                                 <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                             </div>
                         </div>
                         <div className="flex justify-between items-center px-4 py-2 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                            <span className="text-sm font-black uppercase tracking-widest text-slate-950">Session Management</span>
                            <ChevronRight className="text-slate-400 group-hover:translate-x-1 transition-all" />
                        </div>
                        <div className="flex justify-between items-center px-4 py-2 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                            <span className="text-sm font-black uppercase tracking-widest text-slate-950 text-red-500">Deactivate Identity</span>
                            <ChevronRight className="text-red-400 group-hover:translate-x-1 transition-all" />
                        </div>
                    </div>
                </SettingsCard>
            </div>
        </div>
    )
}

export default SettingsTab
