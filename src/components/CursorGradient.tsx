'use client';

import { useEffect, useRef } from 'react';

export default function CursorGradient() {
  const orbRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    const animate = () => {
      if (!orbRef.current) return;
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.1;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.1;
      orbRef.current.style.transform = `translate(${currentRef.current.x - 400}px, ${currentRef.current.y - 400}px)`;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className="fixed w-[800px] h-[800px] rounded-full pointer-events-none blur-3xl"
      style={{
        left: 0,
        top: 0,
        zIndex: 1,
        transform: 'translate(-400px, -400px)',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.1) 40%, transparent 70%)',
      }}
    />
  );
}
