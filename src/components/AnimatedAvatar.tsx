'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AnimatedAvatar({ compact = false }: { compact?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imgRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate rotation for 3D effect - mas malakas ang effect
      const rotateX = (clientY - innerHeight / 2) / 12;
      const rotateY = (innerWidth / 2 - clientX) / 12;
      
      // Apply transform ONLY to the image, not the container
      imgRef.current.style.transform = 
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-full p-1 ${compact ? "w-16 h-16" : "w-full h-full"} 
                 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 
                 shadow-2xl"
    >
      <div className="relative w-full h-full rounded-full overflow-hidden 
                      bg-white dark:bg-gray-900">
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
      {/* Glow effect - separate from avatar */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r 
                      from-blue-500/30 via-purple-500/30 to-pink-500/30 
                      blur-xl animate-pulse pointer-events-none -z-10" />
    </div>
  );
}
