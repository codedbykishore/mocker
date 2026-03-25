import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-[#050914] text-slate-400 py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#050914] transition-transform group-hover:rotate-12">
                                <Box size={18} />
                            </div>
                            <span className="text-xl font-bold tracking-tight font-outfit text-white">Mocker</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-[200px]">
                            Empowering educators and organizations with smart, reliable proctoring solutions.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Github size={18} /></a>
                        </div>
                    </div>

                    {/* Product Column */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest">Product</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#proctoring" className="hover:text-white transition-colors">Smart Proctoring</a></li>
                            <li><a href="#analytics" className="hover:text-white transition-colors">Deep Analytics</a></li>
                            <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div className="space-y-6">
                        <h4 className="text-white font-bold text-sm uppercase tracking-widest">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                            <li className="flex items-center gap-2">
                                <Mail size={14} />
                                <a href="mailto:support@mocker.ai" className="hover:text-white transition-colors">support@mocker.ai</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs">
                        &copy; {new Date().getFullYear()} Mocker AI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs">
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
