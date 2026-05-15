'use client';

import { useState, useEffect, useRef } from 'react';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorTrail from '@/components/CursorTrail';
import CursorGradient from '@/components/CursorGradient';
import Works from '@/components/Works';
import HireMe from '@/components/HireMe';
import Testimonials from '@/components/Testimonials';

type ViewType = 'home' | 'chat' | 'about' | 'projects' | 'skills' | 'testimonials';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function formatMessage(text: string) {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/^[-•] (.+)/gm, '<li class="ml-4 list-disc">$1</li>');
  text = text.replace(/\n\n/g, '</p><p class="mt-3">');
  text = text.replace(/\n/g, '<br/>');
  return `<p>${text}</p>`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-500 transition mt-2">
      {copied
        ? <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
        : <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
      }
    </button>
  );
}

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showHireMe, setShowHireMe] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setCurrentView('chat');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to AI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const suggestions = [
    "What are Vincent's skills?",
    "Tell me about his projects",
    "Is he available for hire?",
    "Compose an inquiry email",
  ];

  const navItems = [
    { label: 'About', view: 'about' as ViewType, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
    { label: 'Projects', view: 'projects' as ViewType, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
    { label: 'Skills', view: 'skills' as ViewType, icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></> },
    { label: 'Testimonials', view: 'testimonials' as ViewType, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /> },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <CursorGradient />
      <CursorTrail />

      {/* Dark mode toggle */}
      <button onClick={toggleDark}
        className="fixed top-5 right-5 z-50 p-2.5 glass rounded-full border border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition shadow-md">
        {isDark
          ? <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          : <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        }
      </button>

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ===== HOME VIEW ===== */}
        {currentView === 'home' && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
            <div className="flex flex-col items-center w-full max-w-2xl mx-auto">

              {/* Avatar */}
              <div className="w-36 h-36 md:w-44 md:h-44 mb-5">
                <AnimatedAvatar />
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-gradient text-center mb-2">
                Vincent Solon
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm md:text-base mb-8">
                IT Infrastructure Lead & Workflow Automation Specialist — Philippines
              </p>

              {/* Nav buttons */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {navItems.map(({ label, view, icon }) => (
                  <button key={label} onClick={() => setCurrentView(view)}
                    className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition group shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
                  </button>
                ))}

              </div>

              {/* Hire Me button */}
              <div className="mb-6">
                <button onClick={() => setShowHireMe(true)}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Hire Me
                </button>
              </div>

              {/* Contact icons */}
              <div className="flex gap-3 mb-8">
                <div className="relative">
                  <button onClick={() => { setShowEmail(!showEmail); setShowPhone(false); }}
                    className={`p-2.5 glass rounded-xl border transition ${showEmail ? 'border-indigo-400 text-indigo-500' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-400'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </button>
                  {showEmail && (
                    <a href="mailto:vincentsolon8514@gmail.com"
                      className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 glass rounded-xl border border-indigo-400 text-indigo-600 dark:text-indigo-300 text-xs shadow-lg z-10">
                      vincentsolon8514@gmail.com
                    </a>
                  )}
                </div>
                <a href="https://www.linkedin.com/in/vincent-solon" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 glass rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <div className="relative">
                  <button onClick={() => { setShowPhone(!showPhone); setShowEmail(false); }}
                    className={`p-2.5 glass rounded-xl border transition ${showPhone ? 'border-green-400 text-green-500' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-green-400'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </button>
                  {showPhone && (
                    <a href="tel:+639231786217"
                      className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 glass rounded-xl border border-green-400 text-green-600 dark:text-green-300 text-xs shadow-lg z-10">
                      +63-923-178-6217
                    </a>
                  )}
                </div>
                <a href="https://wa.me/639231786217" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 glass rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-green-400 hover:text-green-500 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>

              {/* Suggestion chips */}
              <p className="text-sm text-gray-400 mb-3">Ask me anything:</p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {suggestions.map(s => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-xs px-4 py-2 glass rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-500 transition">
                    {s}
                  </button>
                ))}
              </div>

              {/* Chat input */}
              <div className="w-full glass rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg px-4 py-3">
                <textarea ref={inputRef} value={input}
                  onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
                  onKeyDown={handleKeyDown} placeholder="Ask me anything..." disabled={isLoading} rows={1}
                  className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none"
                  style={{ maxHeight: '120px' }} />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">Enter to send · Shift+Enter for new line</span>
                  <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}
                    className="p-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== CHAT VIEW ===== */}
        {currentView === 'chat' && (
          <div className="flex flex-col min-h-screen max-w-2xl mx-auto w-full px-4">
            {/* Back button */}
            <div className="pt-5 pb-2">
              <button onClick={() => { setCurrentView('home'); setMessages([]); }}
                className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition text-sm text-gray-600 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Home
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 py-4 space-y-6">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}>
                    {msg.role === 'user' ? 'You' : 'AI'}
                  </div>
                  <div className={`flex-1 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`text-sm leading-relaxed ${msg.role === 'user' ? 'bg-indigo-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%]' : 'text-gray-800 dark:text-gray-100'}`}>
                      {msg.role === 'user' ? msg.content : (
                        <><div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} /><CopyButton text={msg.content} /></>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
                  <div className="flex items-center gap-1 pt-1">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="sticky bottom-0 pb-6 pt-2">
              <div className="glass rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg px-4 py-3">
                <textarea ref={inputRef} value={input}
                  onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
                  onKeyDown={handleKeyDown} placeholder="Message Vincent's AI..." disabled={isLoading} rows={1}
                  className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none"
                  style={{ maxHeight: '120px' }} />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-gray-400">Enter to send · Shift+Enter for new line</span>
                  <button onClick={() => sendMessage()} disabled={isLoading || !input.trim()}
                    className="p-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== OTHER VIEWS ===== */}
        {(currentView === 'about' || currentView === 'projects' || currentView === 'skills' || currentView === 'testimonials') && (
          <div className="min-h-screen px-6 py-8 max-w-5xl mx-auto w-full">
            <button onClick={() => setCurrentView('home')}
              className="mb-6 flex items-center gap-2 px-4 py-2 glass rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition text-sm text-gray-600 dark:text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Home
            </button>

            {currentView === 'about' && (
              <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gradient mb-4">About Me</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">IT Infrastructure Lead and Systems Administrator with 12+ years of experience across manufacturing, logistics, and service industries. Proven ability to build and run complete IT operations — from enterprise network deployments and server infrastructure to cloud administration and business process automation.</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Track record of managing multi-site environments, leading vendor relationships, and aligning technology with business objectives. Adept at working as the primary technical authority while coordinating with cross-functional and international teams.</p>
                <div className="mt-6">
                  <a href="https://drive.google.com/file/d/13cehIHqq-tKRD3pJF-odTw9IZdECiAnO/view?usp=drive_link"
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download CV
                  </a>
                </div>
              </div>
            )}
            {currentView === 'skills' && (
              <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gradient mb-4">Skills & Expertise</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['n8n','Zapier','Make.com','Power Automate','Fortinet','VMware ESXi','Proxmox','Microsoft 365','Google Workspace','Ubiquiti UniFi','Synology NAS','Ubuntu Server','pfSense','Azure AD','REST API / Webhooks'].map(skill => (
                    <div key={skill} className="p-3 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 text-center">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentView === 'projects' && <Works />}
            {currentView === 'testimonials' && <Testimonials />}
          </div>
        )}
      </div>

      {showHireMe && <HireMe onClose={() => setShowHireMe(false)} />}

      <style jsx>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </main>
  );
}
