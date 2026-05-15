'use client';

import { useState } from 'react';

export default function HireMe({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 p-8"
        style={{ backgroundColor: 'var(--card-bg)' }}
        onClick={e => e.stopPropagation()}>

        {/* Close button */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Let's Work Together</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Choose how you'd like to reach out</p>
        </div>

        {/* Contact options */}
        <div className="space-y-3">

          {/* Email */}
          <a href="mailto:vincentsolon8514@gmail.com"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition group">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">Email</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">vincentsolon8514@gmail.com</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/639231786217" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition group">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition">WhatsApp</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">+63-923-178-6217</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Viber */}
          <a href="viber://chat?number=+639231786217" 
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition group">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.4 0C5.5.1 1.2 2.5.1 7.8c-.5 2.5-.5 4.9.2 7.3.9 3.2 3.3 5.2 6.4 6.2.3.1.5.2.5.6-.1.8-.2 1.7-.3 2.5 0 .2-.1.4 0 .6.1.3.4.3.6.1l3.2-2.3c.3-.2.5-.2.9-.2 2.2.1 4.3-.2 6.3-1.1 3.5-1.6 5.4-4.4 5.7-8.2.5-5.8-2.6-10.8-8.2-12.7C13.8.1 12.6 0 11.4 0zm4.4 15.6c-.4.5-.9.9-1.5 1.1-.3.1-.6.1-.8-.1-.6-.4-1.1-.8-1.6-1.3-1.7-1.6-3.1-3.4-4-5.5-.2-.5-.4-1-.3-1.6.1-.6.5-1 1-1.3.4-.2.8-.2 1.1.1.5.5 1 1.1 1.4 1.7.2.3.2.7-.1.9-.3.2-.5.5-.7.7-.1.2-.1.4 0 .5.7 1.3 1.6 2.4 2.8 3.2.2.1.4.1.6 0 .3-.2.5-.5.8-.7.3-.3.7-.3 1 0 .5.5 1.1.9 1.6 1.4.3.3.3.6.1.9h-.4z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">Viber</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">+63-923-178-6217</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Microsoft Teams */}
          <a href="https://teams.microsoft.com/l/chat/0/0?users=vincentsolon8514@gmail.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition group">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-700 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.625 5.4h-6.375V0L6 1.8v20.4L14.25 24V18.6h6.375C21.825 18.6 24 17.4 24 15V9c0-2.4-2.175-3.6-3.375-3.6zM9 12.6c0 .825-.675 1.5-1.5 1.5S6 13.425 6 12.6V11.4c0-.825.675-1.5 1.5-1.5S9 10.575 9 11.4v1.2zm13.5 2.4c0 .825-.675 1.5-1.5 1.5h-6.75v-7.5h6.75c.825 0 1.5.675 1.5 1.5v4.5z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">Microsoft Teams</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">vincentsolon8514@gmail.com</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/vincent-solon" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition group">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-700 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">LinkedIn</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">linkedin.com/in/vincent-solon</p>
            </div>
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

        </div>
      </div>
    </div>
  );
}
