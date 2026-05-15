'use client';

import { useState, useEffect, useRef } from 'react';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorTrail from '@/components/CursorTrail';
import CursorGradient from '@/components/CursorGradient';
import Works from '@/components/Works';
import Testimonials from '@/components/Testimonials';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
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
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'chat' | 'about' | 'projects' | 'skills' | 'testimonials'>('home');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    // Auto-close sidebar on mobile
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, isLoading]);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const activeSession = sessions.find(s => s.id === activeSessionId);
  const activeMessages = activeSession?.messages || [];

  const newChat = () => {
    const id = Date.now().toString();
    const session: ChatSession = { id, title: 'New Chat', messages: [], createdAt: new Date() };
    setSessions(prev => [session, ...prev]);
    setActiveSessionId(id);
    setCurrentView('chat');
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    let sessionId = activeSessionId;
    if (!sessionId || currentView !== 'chat') {
      const id = Date.now().toString();
      const session: ChatSession = { id, title: messageText.slice(0, 40), messages: [], createdAt: new Date() };
      setSessions(prev => [session, ...prev]);
      sessionId = id;
      setActiveSessionId(id);
      setCurrentView('chat');
    }

    const userMsg: Message = { role: 'user', content: messageText };
    setSessions(prev => prev.map(s => s.id === sessionId
      ? { ...s, title: s.messages.length === 0 ? messageText.slice(0, 40) : s.title, messages: [...s.messages, userMsg] }
      : s
    ));
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });
      const data = await res.json();
      const aiMsg: Message = { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' };
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, aiMsg] } : s));
    } catch {
      setSessions(prev => prev.map(s => s.id === sessionId
        ? { ...s, messages: [...s.messages, { role: 'assistant', content: 'Error connecting to AI.' }] }
        : s
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) { setActiveSessionId(null); setCurrentView('home'); }
  };

  const suggestions = [
    "What are Vincent's skills?",
    "Tell me about his projects",
    "Is he available for hire?",
    "Compose an inquiry email",
  ];

  const navItems = [
    { label: 'About', view: 'about' as const, emoji: '👤' },
    { label: 'Projects', view: 'projects' as const, emoji: '💼' },
    { label: 'Skills', view: 'skills' as const, emoji: '⚡' },
    { label: 'Testimonials', view: 'testimonials' as const, emoji: '💬' },
  ];

  return (
    <div className="flex h-screen overflow-hidden relative">
      <AnimatedBackground />
      <CursorGradient />
      <CursorTrail />

      {/* ===== SIDEBAR ===== */}
      <aside className={`relative z-20 flex flex-col border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex-shrink-0
        ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
        style={{ backgroundColor: 'var(--card-bg)' }}>
        
        <div className="flex flex-col h-full min-w-[256px]">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">VS</span>
              </div>
              <span className="font-semibold text-sm text-gray-800 dark:text-white">Vincent's AI</span>
            </div>
          </div>

          {/* New chat button */}
          <div className="p-3">
            <button onClick={newChat}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition text-sm text-gray-700 dark:text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              New Chat
            </button>
          </div>

          {/* Nav items */}
          <div className="px-3 pb-2">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">Portfolio</p>
            <button onClick={() => setCurrentView('home')}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition mb-1 ${currentView === 'home' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <span>🏠</span> Home
            </button>
            {navItems.map(({ label, view, emoji }) => (
              <button key={label} onClick={() => setCurrentView(view)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition mb-1 ${currentView === view ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <span>{emoji}</span> {label}
              </button>
            ))}
            <a href="https://drive.google.com/file/d/13cehIHqq-tKRD3pJF-odTw9IZdECiAnO/view?usp=drive_link"
              target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition mb-1">
              <span>📄</span> Resume
            </a>
          </div>

          {/* Chat history */}
          {sessions.length > 0 && (
            <div className="px-3 flex-1 overflow-y-auto">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">Recent Chats</p>
              {sessions.map(session => (
                <div key={session.id}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-xl text-sm cursor-pointer transition mb-1 ${activeSessionId === session.id && currentView === 'chat' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                  onClick={() => { setActiveSessionId(session.id); setCurrentView('chat'); }}>
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  <span className="truncate flex-1">{session.title}</span>
                  <button onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sidebar footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-r from-indigo-400 to-purple-500">
              <img src="/avatar.png" alt="VS" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 dark:text-white truncate">Vincent Solon</p>
              <p className="text-xs text-gray-400 truncate">IT Supervisor</p>
            </div>
            <button onClick={toggleDark} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {isDark
                ? <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                : <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              }
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        
        {/* Top bar */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0"
          style={{ backgroundColor: 'var(--card-bg)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <button onClick={() => setCurrentView('home')}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-500 dark:text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </button>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentView === 'home' && 'Home'}
            {currentView === 'chat' && (activeSession?.title || 'Chat')}
            {currentView === 'about' && 'About'}
            {currentView === 'projects' && 'Projects'}
            {currentView === 'skills' && 'Skills'}
            {currentView === 'testimonials' && 'Testimonials'}
          </span>
        </header>

        {/* ===== HOME VIEW ===== */}
        {currentView === 'home' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto w-full">
              
              {/* Avatar */}
              <div className="w-32 h-32 md:w-40 md:h-40 mb-5">
                <AnimatedAvatar />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gradient text-center mb-1">Vincent Solon</h1>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm mb-6">
                IT Infrastructure Lead & Workflow Automation Specialist — Bay, Laguna 🇵🇭
              </p>

              {/* Contact icons */}
              <div className="flex gap-3 mb-8 flex-wrap justify-center">
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
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Ask me anything or explore:</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {suggestions.map(s => (
                  <button key={s} onClick={() => sendMessage(s)}
                    className="text-xs px-4 py-2 glass rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-500 transition">
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat input on home */}
            <div className="px-4 pb-6 max-w-2xl mx-auto w-full">
              <div className="glass rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg px-4 py-3">
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
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full space-y-6">
              {activeMessages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-12">
                  <p className="text-gray-400 text-sm">Start a conversation</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map(s => (
                      <button key={s} onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 glass rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-500 transition">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {activeMessages.map((msg, idx) => (
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
            <div className="px-4 pb-6 max-w-2xl mx-auto w-full flex-shrink-0">
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
          <div className="flex-1 overflow-y-auto px-4 py-6">
            {currentView === 'about' && (
              <div className="max-w-2xl mx-auto glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gradient mb-4">About Me</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">IT Infrastructure Lead and Systems Administrator with 12+ years of experience across manufacturing, logistics, and service industries. Proven ability to build and run complete IT operations — from enterprise network deployments and server infrastructure to cloud administration and business process automation.</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Track record of managing multi-site environments, leading vendor relationships, and aligning technology with business objectives. Adept at working as the primary technical authority while coordinating with cross-functional and international teams.</p>
              </div>
            )}
            {currentView === 'skills' && (
              <div className="max-w-2xl mx-auto glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
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

      <style jsx>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}
