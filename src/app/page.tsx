'use client';

import { useState, useEffect, useRef } from 'react';
import AnimatedAvatar from '@/components/AnimatedAvatar';
import AnimatedBackground from '@/components/AnimatedBackground';
import CursorTrail from '@/components/CursorTrail';
import CursorGradient from '@/components/CursorGradient';
import Works from '@/components/Works';
import Testimonials from '@/components/Testimonials';

type ViewType = 'home' | 'projects' | 'testimonials' | 'skills' | 'about';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  view?: ViewType;
}

function formatMessage(text: string) {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/^[-•] (.+)/gm, '<li class="ml-4">$1</li>');
  text = text.replace(/(<li.*<\/li>)/g, '<ul class="list-disc my-2">$1</ul>');
  text = text.replace(/\n\n/g, '</p><p class="mt-3">');
  text = text.replace(/\n/g, '<br/>');
  return `<p>${text}</p>`;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-500 transition mt-2"
    >
      {copied ? (
        <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
      ) : (
        <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
      )}
    </button>
  );
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType | null>(null);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { label: 'About', view: 'about' as ViewType, emoji: '👤' },
    { label: 'Projects', view: 'projects' as ViewType, emoji: '💼' },
    { label: 'Skills', view: 'skills' as ViewType, emoji: '⚡' },
    { label: 'Testimonials', view: 'testimonials' as ViewType, emoji: '💬' },
    { label: 'Resume', view: null, emoji: '📄', href: 'https://drive.google.com/file/d/13cehIHqq-tKRD3pJF-odTw9IZdECiAnO/view?usp=drive_link' },
  ];

  const suggestions = [
    "What are Vincent's skills?",
    "Tell me about his projects",
    "Is he available for hire?",
    "Compose an inquiry email",
  ];

  const sendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const hasMessages = messages.length > 0;

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col">
      <AnimatedBackground />
      <CursorGradient />
      <CursorTrail />

      {/* Dark mode toggle */}
      <button onClick={toggleDarkMode}
        className="fixed top-5 right-5 z-50 p-2.5 glass rounded-full border border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition shadow-md">
        {isDark
          ? <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          : <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        }
      </button>

      <div className="relative z-10 flex flex-col min-h-screen max-w-2xl mx-auto w-full px-4">

        {/* Hero - shrinks when chatting */}
        <div className={`flex flex-col items-center transition-all duration-500 ${hasMessages ? 'pt-6 pb-2' : 'pt-16 pb-6'}`}>
          
          {/* Avatar - smaller when chatting */}
          <div className={`transition-all duration-500 ${hasMessages ? 'w-16 h-16' : 'w-40 h-40 md:w-48 md:h-48'} mb-4`}>
            <AnimatedAvatar compact={hasMessages} />
          </div>

          {!hasMessages && (
            <>
              <h1 className="text-3xl md:text-5xl font-extrabold text-center text-gradient mb-1">
                Vincent Solon
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-center text-sm md:text-base mb-6">
                IT Supervisor & Workflow Automation Specialist — Bay, Laguna 🇵🇭
              </p>

              {/* Nav icons */}
              <div className="flex gap-3 mb-6 flex-wrap justify-center">
                {navItems.map(({ label, view, emoji, href }) => (
                  href ? (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1 px-4 py-3 glass rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 transition shadow-sm hover:-translate-y-1 min-w-[64px]">
                      <span className="text-xl">{emoji}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{label}</span>
                    </a>
                  ) : (
                    <button key={label} onClick={() => setCurrentView(view)}
                      className={`flex flex-col items-center gap-1 px-4 py-3 glass rounded-2xl border transition shadow-sm hover:-translate-y-1 min-w-[64px] ${
                        currentView === view ? 'border-indigo-500 text-indigo-500' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                      }`}>
                      <span className="text-xl">{emoji}</span>
                      <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{label}</span>
                    </button>
                  )
                ))}
              </div>

              {/* Contact icons */}
              <div className="flex gap-3 mb-6">
                {/* Email */}
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
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/vincent-solon" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 glass rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-indigo-400 hover:text-indigo-500 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                {/* Phone */}
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
                {/* WhatsApp */}
                <a href="https://wa.me/639231786217" target="_blank" rel="noopener noreferrer"
                  className="p-2.5 glass rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:border-green-400 hover:text-green-500 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
              </div>
            </>
          )}

          {/* View content when nav selected */}
          {!hasMessages && currentView && (
            <div className="w-full mb-6 animate-fadeIn">
              <button onClick={() => setCurrentView(null)}
                className="mb-4 flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-500 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back
              </button>
              {currentView === 'about' && (
                <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gradient mb-3">About Me</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">IT Infrastructure Lead and Systems Administrator with 12+ years of experience across manufacturing, logistics, and service industries. Proven ability to build and run complete IT operations — from enterprise network deployments and server infrastructure to cloud administration and business process automation.</p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Track record of managing multi-site environments, leading vendor relationships, and aligning technology with business objectives. Adept at working as the primary technical authority while coordinating with cross-functional and international teams.</p>
                </div>
              )}
              {currentView === 'skills' && (
                <div className="glass rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gradient mb-4">Skills & Expertise</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['n8n', 'Zapier', 'Make', 'Power Automate', 'Fortinet', 'VMware', 'Proxmox', 'Microsoft 365', 'Google Workspace', 'Ubiquiti', 'Synology NAS', 'Ubuntu Server'].map(skill => (
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

        {/* Chat messages */}
        {hasMessages && (
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto py-4 space-y-6 mb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold ${
                  msg.role === 'user' ? 'bg-indigo-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                }`}>
                  {msg.role === 'user' ? 'You' : 'AI'}
                </div>
                <div className={`flex-1 flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%]'
                      : 'text-gray-800 dark:text-gray-100 max-w-full'
                  }`}>
                    {msg.role === 'user' ? msg.content : (
                      <>
                        <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }} />
                        <CopyButton text={msg.content} />
                      </>
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
        )}

        {/* Suggestion chips - show before first message */}
        {!hasMessages && !currentView && (
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {suggestions.map(s => (
              <button key={s} onClick={() => sendMessage(s)}
                className="text-xs px-4 py-2 glass rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-500 transition">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Chat input - always at bottom */}
        <div className="sticky bottom-0 pb-6 pt-2">
          <div className="glass rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg px-4 py-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'; }}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              rows={1}
              className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none resize-none"
              style={{ maxHeight: '120px' }}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-400">Press Enter to send · Shift+Enter for new line</span>
              <button onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </main>
  );
}
