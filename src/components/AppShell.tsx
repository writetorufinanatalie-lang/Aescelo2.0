import React, { useState } from 'react';
import { MOCK_REPORTS, INITIAL_PROFILE } from '../mockData';
import { DocumentReport, UserProfile } from '../types';
import { Pill, Activity, ShieldAlert, Heart, FileText, Menu, X, LogOut, User, FolderHeart, Info, TrendingUp, HelpCircle } from 'lucide-react';
import LandingPage from './LandingPage';
import DashboardPage from './DashboardPage';
import HistoryPage from './HistoryPage';
import ReportDetailPage from './ReportDetailPage';
import MedicationsPage from './MedicationsPage';
import TrendsPage from './TrendsPage';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';

export default function AppShell() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'history' | 'medications' | 'trends' | 'profile' | 'about'>('dashboard');
  const [selectedReport, setSelectedReport] = useState<DocumentReport | null>(null);
  
  // Real-time state that can be mutated in session
  const [reports, setReports] = useState<DocumentReport[]>(MOCK_REPORTS);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auth actions
  const handleLogin = (customName?: string, customEmail?: string) => {
    if (customName) {
      setProfile(prev => ({
        ...prev,
        name: customName,
        email: customEmail || prev.email
      }));
    }
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
    setSelectedReport(null);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setSelectedReport(null);
  };

  // Report actions
  const handleAddReport = (newReport: DocumentReport) => {
    setReports(prev => [newReport, ...prev]);
  };

  const handleDeleteReport = (id: string) => {
    if (confirm("Are you sure you want to delete this report from your history? This cannot be undone.")) {
      setReports(prev => prev.filter(r => r.id !== id));
      if (selectedReport?.id === id) {
        setSelectedReport(null);
      }
    }
  };

  const handleSelectReportFromDetail = (report: DocumentReport) => {
    setSelectedReport(report);
  };

  // Navigation action
  const handleNavigate = (pageName: any) => {
    setCurrentPage(pageName);
    setSelectedReport(null);
    setMobileMenuOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <LandingPage
        onLogin={handleLogin}
        onNavigate={(p) => {
          if (p === 'about') {
            handleLogin();
          }
        }}
      />
    );
  }

  // Sidebar links list
  const navLinks = [
    { id: 'dashboard', label: 'Health Desk', icon: FileText },
    { id: 'history', label: 'Documents History', icon: FolderHeart },
    { id: 'medications', label: 'Meds Locker', icon: Pill },
    { id: 'trends', label: 'Lab Trends', icon: TrendingUp },
    { id: 'profile', label: 'My Safety Profile', icon: User },
    { id: 'about', label: 'About & Disclaimer', icon: Info },
  ];

  return (
    <div id="app-root-shell" className="min-h-screen bg-warm-cream-50/50 flex flex-col font-sans text-stone-850">
      
      {/* Upper header */}
      <header className="bg-white border-b border-warm-cream-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo with Heart + File overlay */}
          <button
            onClick={() => handleNavigate('dashboard')}
            className="flex items-center gap-2 cursor-pointer text-left group"
          >
            <div className="p-2 bg-medical-teal-600 rounded-xl text-white shadow-sm shadow-medical-teal-800/10 group-hover:bg-medical-teal-700 transition">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="font-serif text-lg font-extrabold text-medical-teal-950 block tracking-tight leading-none">
                Aesculo
              </span>
              <span className="text-[10px] text-stone-400 font-mono tracking-wide uppercase font-semibold">
                Clinical Translation
              </span>
            </div>
          </button>

          {/* Desktop Navigation Link row */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = currentPage === link.id && !selectedReport;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
                    isActive
                      ? 'bg-medical-teal-100/70 text-medical-teal-850 border border-medical-teal-600/10'
                      : 'text-stone-500 hover:text-stone-800 hover:bg-warm-cream-100/50'
                  }`}
                >
                  <LinkIcon className={`w-4 h-4 ${isActive ? 'text-medical-teal-700' : 'text-stone-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* User profile capsule + Logout */}
          <div className="hidden md:flex items-center gap-4 border-l border-warm-cream-200 pl-4">
            <div className="text-right">
              <p className="text-xs font-bold text-stone-800">{profile.name}</p>
              <p className="text-[10px] text-stone-400 font-mono">Demo Session</p>
            </div>

            <button
              id="logout-btn"
              onClick={logout}
              className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Logout / Exit Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={logout}
              className="p-1.5 text-stone-400 hover:text-red-600 rounded-lg"
              title="Exit Demo"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-600 hover:bg-stone-50 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden bg-white border-b border-warm-cream-200 py-3 px-4 space-y-1 shadow-md z-30">
          {navLinks.map((link) => {
            const LinkIcon = link.icon;
            const isActive = currentPage === link.id && !selectedReport;
            return (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`w-full text-left px-3 py-2.5 text-xs font-semibold rounded-lg flex items-center gap-2.5 transition ${
                  isActive
                    ? 'bg-medical-teal-50 text-medical-teal-800 border-l-4 border-medical-teal-700'
                    : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                <LinkIcon className="w-4 h-4" />
                {link.label}
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-warm-cream-100 flex items-center justify-between text-xs text-stone-500 px-3">
            <span>Logged in as: <strong className="text-stone-700">{profile.name}</strong></span>
          </div>
        </div>
      )}

      {/* Main Core View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedReport ? (
          <ReportDetailPage
            report={selectedReport}
            profile={profile}
            onBack={() => setSelectedReport(null)}
          />
        ) : (
          <>
            {currentPage === 'dashboard' && (
              <DashboardPage
                reports={reports}
                profile={profile}
                onAddReport={handleAddReport}
                onSelectReport={handleSelectReportFromDetail}
              />
            )}
            {currentPage === 'history' && (
              <HistoryPage
                reports={reports}
                onSelectReport={handleSelectReportFromDetail}
                onDeleteReport={handleDeleteReport}
              />
            )}
            {currentPage === 'medications' && (
              <MedicationsPage />
            )}
            {currentPage === 'trends' && (
              <TrendsPage />
            )}
            {currentPage === 'profile' && (
              <ProfilePage
                profile={profile}
                onUpdateProfile={(updated) => setProfile(updated)}
              />
            )}
            {currentPage === 'about' && (
              <AboutPage />
            )}
          </>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-warm-cream-200/60 py-6 text-center text-xs text-stone-400 font-medium">
        <p>© 2026 Aesculo. Designed for clinical trust and warmth.</p>
        <p className="mt-1 font-mono text-[10px]">Reference frameworks: openFDA • RxNorm • LOINC</p>
      </footer>

    </div>
  );
}
