'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

    const orbs = [
      { x: 200, y: 300, radius: 300, lightColor: 'rgba(99,102,241,0.18)', darkColor: 'rgba(99,102,241,0.25)', vx: 0.5, vy: 0.3 },
      { x: 800, y: 200, radius: 250, lightColor: 'rgba(168,85,247,0.15)', darkColor: 'rgba(168,85,247,0.22)', vx: -0.4, vy: 0.5 },
      { x: 400, y: 600, radius: 280, lightColor: 'rgba(236,72,153,0.12)', darkColor: 'rgba(236,72,153,0.20)', vx: 0.3, vy: -0.4 },
      { x: 1000, y: 500, radius: 320, lightColor: 'rgba(59,130,246,0.15)', darkColor: 'rgba(59,130,246,0.22)', vx: -0.3, vy: 0.4 },
    ];

    const render = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background color based on dark mode
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, 'rgb(17,24,39)');
        gradient.addColorStop(1, 'rgb(11,17,32)');
      } else {
        gradient.addColorStop(0, 'rgb(249,250,251)');
        gradient.addColorStop(1, 'rgb(243,244,246)');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 300) {
          const force = (300 - distance) / 300;
          orb.x -= dx * force * 0.02;
          orb.y -= dy * force * 0.02;
        }

        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) orb.vx *= -1;
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) orb.vy *= -1;

        const color = isDark ? orb.darkColor : orb.lightColor;
        const orbGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        orbGradient.addColorStop(0, color);
        orbGradient.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = orbGradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
