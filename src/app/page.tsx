'use client';

import { useState, useEffect } from 'react';
import AIChat from '@/components/AIChat';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import AnimatedBackground from '@/components/AnimatedBackground';
import Works from '@/components/Works';
import Testimonials from '@/components/Testimonials';
import CursorTrail from '@/components/CursorTrail';
import CursorGradient from '@/components/CursorGradient';

type ViewType = 'home' | 'projects' | 'testimonials' | 'skills' | 'about';

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isDark, setIsDark] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'projects': return <Works />;
      case 'testimonials': return <Testimonials />;
      case 'skills':
        return (
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-gradient">Skills & Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['n8n', 'Zapier', 'Make', 'Power Automate', 'Fortinet', 'VMware', 'Proxmox', 'Microsoft 365', 'Google Workspace'].map((skill) => (
                  <div key={skill} className="p-4 glass rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition">
                    <span className="font-semibold text-gray-900 dark:text-white">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      case 'about':
        return (
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-gradient">About Me</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">IT Infrastructure Lead and Systems Administrator with 12+ years of experience across manufacturing, logistics, and service industries. Proven ability to build and run complete IT operations from enterprise network deployments and server infrastructure to cloud administration and business process automation.</p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Track record of managing multi-site environments, leading vendor relationships, and aligning technology with business objectives. Adept at working as the primary technical authority while coordinating with cross-functional and international teams.</p>
            </div>
          </section>
        );
      default: return null;
    }
  };

  return (
    <main className="min-h-screen text-foreground relative overflow-hidden transition-colors duration-300">
      <AnimatedBackground />
      <CursorGradient />
      <CursorTrail />

      {/* Dark Mode Toggle */}
      <button onClick={toggleDarkMode} className="fixed top-6 right-6 z-50 p-3 glass rounded-full border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition shadow-lg" aria-label="Toggle dark mode">
        {isDark ? (
          <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        ) : (
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        )}
      </button>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">

        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            <div className="mb-6"><AnimatedAvatar /></div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-2 text-center text-gradient">Vincent Solon</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 text-center">IT Supervisor & Workflow Automation Specialist</p>

            {/* Nav Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { label: 'About', view: 'about', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
                { label: 'Projects', view: 'projects', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
                { label: 'Skills', view: 'skills', icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></> },
                { label: 'Testimonials', view: 'testimonials', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
              ].map(({ label, view, icon }) => (
                <button key={label} onClick={() => setCurrentView(view as ViewType)}
                  className="flex items-center gap-2 px-6 py-3 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition group shadow-md hover:shadow-lg hover:-translate-y-1">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
                </button>
              ))}
              <a href="https://drive.google.com/file/d/13cehIHqq-tKRD3pJF-odTw9IZdECiAnO/view" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition group shadow-md hover:shadow-lg hover:-translate-y-1">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span className="font-medium text-gray-800 dark:text-gray-200">Resume</span>
              </a>
            </div>

            {/* Contact Row - Icons only, click to reveal */}
            <div className="flex flex-wrap justify-center gap-3 text-sm">

              {/* Email - click to toggle */}
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => { setShowEmail(!showEmail); setShowPhone(false); }}
                  className={`p-3 glass rounded-xl border transition shadow-md hover:shadow-lg hover:-translate-y-1 ${showEmail ? 'border-indigo-500 text-indigo-500' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-500'}`}
                  title="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </button>
                {showEmail && (
                  <a href="mailto:vincentsolon8514@gmail.com"
                    className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 glass rounded-xl border border-indigo-400 text-indigo-600 dark:text-indigo-300 text-xs font-medium shadow-lg z-10 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition">
                    vincentsolon8514@gmail.com
                  </a>
                )}
              </div>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/vincent-solon" target="_blank" rel="noopener noreferrer"
                className="p-3 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition shadow-md hover:shadow-lg hover:-translate-y-1"
                title="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>

              {/* Phone - click to toggle */}
              <div className="relative flex items-center gap-2">
                <button
                  onClick={() => { setShowPhone(!showPhone); setShowEmail(false); }}
                  className={`p-3 glass rounded-xl border transition shadow-md hover:shadow-lg hover:-translate-y-1 ${showPhone ? 'border-green-500 text-green-500' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-500 hover:text-green-500'}`}
                  title="Call Me"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </button>
                {showPhone && (
                  <a href="tel:+639231786217"
                    className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 glass rounded-xl border border-green-400 text-green-600 dark:text-green-300 text-xs font-medium shadow-lg z-10 hover:bg-green-50 dark:hover:bg-green-900/30 transition">
                    +63-923-178-6217
                  </a>
                )}
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/639231786217" target="_blank" rel="noopener noreferrer"
                className="p-3 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 text-gray-600 dark:text-gray-300 hover:text-green-500 transition shadow-md hover:shadow-lg hover:-translate-y-1"
                title="WhatsApp">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>

            </div>
          </div>
        )}

        {currentView !== 'home' && (
          <div className="w-full max-w-6xl mx-auto animate-fadeIn">
            <button onClick={() => setCurrentView('home')} className="mb-6 px-6 py-3 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition flex items-center gap-2 shadow-md text-gray-800 dark:text-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Home
            </button>
            {renderContent()}
          </div>
        )}
      </div>

      <AIChat />

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </main>
  );
}
