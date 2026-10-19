import React, { useState } from 'react';
import { FileText, ArrowRight, Activity, CheckCircle2, Eye, ShieldAlert, Heart, FileCheck, Lock, Mail, User, Check, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Disclaimer from './Disclaimer';

export default function LandingPage({ onLogin, onNavigate }: { onLogin: (name?: string, email?: string) => void; onNavigate: (page: string) => void }) {
  const [activeTeaser, setActiveTeaser] = useState<'prescription' | 'lab' | 'signin' | 'signup'>('prescription');
  const [authMode, setAuthMode] = useState<'none' | 'login' | 'signup'>('none');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(true);

  const prescriptionTeaser = {
    original: "Lisinopril 10mg PO QD. Refills x3. Pt has mild HTN. Monitor K+ and serum Cr. Avoid OTC NSAIDs.",
    translated: {
      title: "Lisinopril (10 mg tablet)",
      frequency: "Take 1 pill by mouth once daily.",
      purpose: "Prescribed for blood pressure control and kidney support.",
      flags: [
        {
          type: "warning",
          text: "Check Potassium levels. Ask your doctor if routine blood tests are scheduled."
        },
        {
          type: "caution",
          text: "Avoid over-the-counter pain relievers like Ibuprofen (Advil/Motrin) without checking first."
        }
      ]
    }
  };

  const labTeaser = {
    original: "HbA1c: 6.8% (H) [Ref: < 5.7%]. Chol Panel: LDL 145 mg/dL (H) [Ref: < 100]. Fasting Gluc: 128 (H).",
    translated: {
      title: "Routine Lab Results Breakdown",
      details: [
        { name: "HbA1c (Average blood sugar)", value: "6.8%", range: "High (Normal is under 5.7%)", explain: "Shows your average blood sugar over the last 3 months. 6.8% is considered in the diabetes range." },
        { name: "LDL Cholesterol", value: "145 mg/dL", range: "High (Normal is under 100)", explain: "Known as 'bad' cholesterol. Elevates cardiovascular risks over time." }
      ],
      flags: [
        {
          type: "danger",
          text: "HbA1c is above standard targets. Ask your doctor: 'Is it time to adjust my medication dose or dietary plan?'"
        }
      ]
    }
  };

  return (
    <div id="landing-page" className="min-h-screen bg-warm-cream-50 font-sans text-stone-800 flex flex-col">
      {/* Top Navigation Header */}
      <nav className="h-16 px-6 md:px-8 border-b border-warm-cream-200 flex items-center justify-between bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-medical-teal-600 rounded-lg flex items-center justify-center text-white">
            <Heart className="w-4 h-4 fill-white" />
          </div>
          <span className="font-serif text-lg text-medical-teal-950 font-bold tracking-tight">Aesculo</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setAuthMode('login'); setActiveTeaser('signin'); }} 
            className="text-xs font-semibold text-stone-500 hover:text-stone-850 transition cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => { setAuthMode('signup'); setActiveTeaser('signup'); }} 
            className="px-3.5 py-1.5 bg-medical-teal-600 hover:bg-medical-teal-700 text-white rounded-lg text-xs font-semibold transition shadow-sm cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 w-full">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-medical-teal-100/70 border border-medical-teal-600/20 rounded-full text-medical-teal-800 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-medical-teal-600/20 text-medical-teal-700" />
              Empowering Patients with Clarity
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-medical-teal-950 leading-tight font-bold">
              Understand your medical documents in plain language.
            </h1>
            <p className="text-base md:text-lg text-stone-600 leading-relaxed max-w-xl">
              Medical papers are written in clinical shorthand, Latin abbreviations, and confusing jargon. Aesculo translates your prescriptions and lab reports so you can play an active role in your own care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="landing-cta-guest"
                onClick={() => onLogin("Guest Patient", "guest@example.com")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-medical-teal-700 hover:bg-medical-teal-800 text-white font-medium rounded-xl shadow-md shadow-medical-teal-900/10 transition duration-200 cursor-pointer"
              >
                Enter Demo Guest Mode
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="landing-cta-signup"
                onClick={() => { setAuthMode('signup'); setActiveTeaser('signup'); }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-warm-cream-100 text-medical-teal-800 border border-medical-teal-600/30 font-medium rounded-xl transition duration-200 cursor-pointer"
              >
                Create Account
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-warm-cream-200">
              <div>
                <span className="block text-2xl font-bold font-serif text-medical-teal-800">100%</span>
                <span className="text-xs text-stone-500">Plain translation</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-serif text-medical-teal-800">FDA label</span>
                <span className="text-xs text-stone-500">Connected database</span>
              </div>
              <div>
                <span className="block text-2xl font-bold font-serif text-medical-teal-800">Zero</span>
                <span className="text-xs text-stone-500">Medical diagnostic assumptions</span>
              </div>
            </div>
          </div>

          {/* Dynamic Interactive / Auth Column */}
          <div className="md:col-span-5 bg-white p-6 rounded-2xl shadow-xl border border-warm-cream-200/80 relative min-h-[460px] flex flex-col justify-between">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-stone-900 font-serif">
                    {activeTeaser === 'signin' && "Sign In"}
                    {activeTeaser === 'signup' && "Create Account"}
                    {(activeTeaser === 'prescription' || activeTeaser === 'lab') && "See how it works"}
                  </h3>
                  <div className="flex items-center gap-1 bg-medical-teal-50 text-medical-teal-800 px-2.5 py-1 rounded-md text-[10px] font-mono border border-medical-teal-100">
                    <Eye className="w-3 h-3 text-medical-teal-600" />
                    Interactive
                  </div>
                </div>

                {/* Tab controls */}
                <div className="flex bg-warm-cream-100 p-1 rounded-lg mb-4">
                  <button
                    onClick={() => { setActiveTeaser('prescription'); setAuthMode('none'); }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${activeTeaser === 'prescription' ? 'bg-white text-medical-teal-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    Prescription
                  </button>
                  <button
                    onClick={() => { setActiveTeaser('lab'); setAuthMode('none'); }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${activeTeaser === 'lab' ? 'bg-white text-medical-teal-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    Lab Report
                  </button>
                  <button
                    onClick={() => { setActiveTeaser('signin'); setAuthMode('login'); }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${activeTeaser === 'signin' ? 'bg-white text-medical-teal-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setActiveTeaser('signup'); setAuthMode('signup'); }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition cursor-pointer ${activeTeaser === 'signup' ? 'bg-white text-medical-teal-800 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Content display depending on activeTeaser */}
                {activeTeaser === 'prescription' && (
                  <div>
                    {/* original clinical code */}
                    <div className="mb-4">
                      <label className="block text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-1.5">What the document says:</label>
                      <div className="bg-stone-50 font-mono text-xs p-3 rounded-lg border border-stone-200/60 text-stone-600 whitespace-pre-wrap leading-relaxed">
                        {prescriptionTeaser.original}
                      </div>
                    </div>

                    {/* translated */}
                    <div className="space-y-3 pt-3 border-t border-warm-cream-100">
                      <label className="block text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-0.5">Aesculo translation:</label>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-bold text-medical-teal-800">{prescriptionTeaser.translated.title}</h4>
                          <p className="text-xs text-stone-600 mt-1">{prescriptionTeaser.translated.frequency}</p>
                          <p className="text-xs text-stone-500 italic mt-0.5">{prescriptionTeaser.translated.purpose}</p>
                        </div>
                        
                        <div className="space-y-1.5">
                          {prescriptionTeaser.translated.flags.map((flag, idx) => (
                            <div key={idx} className="flex gap-2 items-start bg-amber-50 border border-amber-200/50 p-2 rounded-lg text-xs">
                              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0 mt-1.5" />
                              <p className="text-stone-700 leading-tight">{flag.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTeaser === 'lab' && (
                  <div>
                    {/* original clinical code */}
                    <div className="mb-4">
                      <label className="block text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-1.5">What the document says:</label>
                      <div className="bg-stone-50 font-mono text-xs p-3 rounded-lg border border-stone-200/60 text-stone-600 whitespace-pre-wrap leading-relaxed">
                        {labTeaser.original}
                      </div>
                    </div>

                    {/* translated */}
                    <div className="space-y-3 pt-3 border-t border-warm-cream-100">
                      <label className="block text-[10px] uppercase font-semibold text-stone-400 tracking-wider mb-0.5">Aesculo translation:</label>
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-medical-teal-800">{labTeaser.translated.title}</h4>
                        
                        <div className="space-y-2">
                          {labTeaser.translated.details.map((item, idx) => (
                            <div key={idx} className="text-xs border-b border-stone-100 pb-2 last:border-b-0 last:pb-0">
                              <div className="flex justify-between">
                                <span className="font-medium text-stone-700">{item.name}</span>
                                <span className="font-mono font-bold text-red-600 bg-red-50 px-1 rounded">{item.value}</span>
                              </div>
                              <p className="text-[11px] text-stone-400 mt-0.5">{item.range}</p>
                              <p className="text-stone-500 text-[11px] leading-tight mt-1">{item.explain}</p>
                            </div>
                          ))}
                        </div>

                        <div className="bg-red-50 border border-red-100/80 p-2 rounded-lg text-[11px] text-red-800 leading-tight">
                          {labTeaser.translated.flags[0].text}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTeaser === 'signin' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setError('');
                      if (!email || !password) {
                        setError('Please enter your email and password.');
                        return;
                      }
                      onLogin(email.split('@')[0] || "Patient", email);
                    }} className="space-y-4">
                      
                      {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-800 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                          <input
                            type="email"
                            placeholder="alex.miller@healthcare.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-warm-cream-50/50 border border-warm-cream-200 focus:border-medical-teal-600 focus:ring-1 focus:ring-medical-teal-600/30 rounded-xl text-stone-850 placeholder-stone-400 text-sm w-full transition"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-warm-cream-50/50 border border-warm-cream-200 focus:border-medical-teal-600 focus:ring-1 focus:ring-medical-teal-600/30 rounded-xl text-stone-850 placeholder-stone-400 text-sm w-full transition"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1">
                        <input
                          type="checkbox"
                          id="terms-check-in"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 accent-medical-teal-700 rounded cursor-pointer"
                        />
                        <label htmlFor="terms-check-in" className="text-[11px] text-stone-500 leading-normal select-none cursor-pointer">
                          I understand this tool is for educational summary purposes and does not replace medical advice.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-medical-teal-700 hover:bg-medical-teal-800 text-white font-semibold rounded-xl text-xs tracking-wide shadow-sm transition mt-2 cursor-pointer"
                      >
                        Sign In
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex py-4 items-center">
                      <div className="flex-grow border-t border-stone-100"></div>
                      <span className="flex-shrink mx-3 text-[10px] text-stone-400 uppercase tracking-widest font-bold">Or Explore</span>
                      <div className="flex-grow border-t border-stone-100"></div>
                    </div>

                    <button
                      onClick={() => onLogin("Guest Patient", "guest@example.com")}
                      className="w-full py-2 bg-warm-cream-100 hover:bg-warm-cream-200/80 text-medical-teal-900 border border-warm-cream-200 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer"
                    >
                      Quick Guest Demo Access
                    </button>
                  </motion.div>
                )}

                {activeTeaser === 'signup' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      setError('');
                      if (!email || !password) {
                        setError('Please enter your email and password.');
                        return;
                      }
                      if (!name) {
                        setError('Please enter your full name.');
                        return;
                      }
                      onLogin(name, email);
                    }} className="space-y-4">
                      
                      {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-800 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                          <input
                            type="text"
                            placeholder="Alex Miller"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-warm-cream-50/50 border border-warm-cream-200 focus:border-medical-teal-600 focus:ring-1 focus:ring-medical-teal-600/30 rounded-xl text-stone-850 placeholder-stone-400 text-sm w-full transition"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                          <input
                            type="email"
                            placeholder="alex.miller@healthcare.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-warm-cream-50/50 border border-warm-cream-200 focus:border-medical-teal-600 focus:ring-1 focus:ring-medical-teal-600/30 rounded-xl text-stone-850 placeholder-stone-400 text-sm w-full transition"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-warm-cream-50/50 border border-warm-cream-200 focus:border-medical-teal-600 focus:ring-1 focus:ring-medical-teal-600/30 rounded-xl text-stone-850 placeholder-stone-400 text-sm w-full transition"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1">
                        <input
                          type="checkbox"
                          id="terms-check-up"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="mt-1 accent-medical-teal-700 rounded cursor-pointer"
                        />
                        <label htmlFor="terms-check-up" className="text-[11px] text-stone-500 leading-normal select-none cursor-pointer">
                          I understand this tool is for educational summary purposes and does not replace medical advice.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 bg-medical-teal-700 hover:bg-medical-teal-800 text-white font-semibold rounded-xl text-xs tracking-wide shadow-sm transition mt-2 cursor-pointer"
                      >
                        Create Patient Account
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative flex py-4 items-center">
                      <div className="flex-grow border-t border-stone-100"></div>
                      <span className="flex-shrink mx-3 text-[10px] text-stone-400 uppercase tracking-widest font-bold">Or Explore</span>
                      <div className="flex-grow border-t border-stone-100"></div>
                    </div>

                    <button
                      onClick={() => onLogin("Guest Patient", "guest@example.com")}
                      className="w-full py-2 bg-warm-cream-100 hover:bg-warm-cream-200/80 text-medical-teal-900 border border-warm-cream-200 rounded-xl text-xs font-semibold tracking-wide transition cursor-pointer"
                    >
                      Quick Guest Demo Access
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="bg-white border-t border-warm-cream-100/80 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-medical-teal-950 font-bold mb-12">Designed for trust, built for clarity</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 bg-warm-cream-50/50 rounded-xl border border-warm-cream-100">
              <div className="p-2.5 bg-medical-teal-100 w-fit rounded-lg text-medical-teal-800">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-serif text-stone-900">1. Plain language translation</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                No complex clinical terminology. We translate complex abbreviations like "PO BID" into "By mouth twice daily," and "CrCl" into "Kidney clearance filter indicator."
              </p>
            </div>

            <div className="space-y-3 p-6 bg-warm-cream-50/50 rounded-xl border border-warm-cream-100">
              <div className="p-2.5 bg-amber-100 w-fit rounded-lg text-amber-800">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-serif text-stone-900">2. Precautionary talking points</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Rather than prescribing changes, the tool generates actionable questions you should ask your pharmacist or doctor about potential interactions or out-of-range parameters.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-warm-cream-50/50 rounded-xl border border-warm-cream-100">
              <div className="p-2.5 bg-blue-100 w-fit rounded-lg text-blue-800">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-serif text-stone-900">3. Multi-visit Trend Analysis</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Store past laboratory metrics in our system to instantly plot vital parameters over time. Instantly visualize whether your blood markers are trending in the right direction.
              </p>
            </div>
          </div>

          {/* Centralized disclaimer statement */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Disclaimer />
          </div>
        </div>
      </div>
    </div>
  );
}
