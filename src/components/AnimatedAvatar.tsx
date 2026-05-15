'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AnimatedAvatar({ compact = false }: { compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imgRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const rotateX = (clientY - innerHeight / 2) / 12;
      const rotateY = (innerWidth / 2 - clientX) / 12;
      imgRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-full p-1 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 shadow-2xl ${compact ? 'w-16 h-16' : 'w-full h-full'}`}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden bg-white dark:bg-gray-900">
        <Image
          ref={imgRef}
          src="/avatar.png"
          alt="Vincent Solon"
          fill
          className="object-cover transition-transform duration-200 ease-out"
          priority
          sizes="(max-width: 768px) 192px, 224px"
        />
      </div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-xl animate-pulse pointer-events-none -z-10" />
    </div>
  );
}
