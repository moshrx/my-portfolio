import { useRef, useEffect, useCallback } from "react";

const HeroScene = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const visibleRef = useRef(true);

  const PARTICLE_COUNT = 60;

  const initParticles = useCallback((w, h) => {
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.4 + 0.1,
        flickerSpeed: Math.random() * 0.02 + 0.005,
        flickerOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, []);

  const animate = useCallback((ctx, time) => {
    if (!visibleRef.current) {
      animationRef.current = requestAnimationFrame((t) => animate(ctx, t));
      return;
    }

    const { w, h } = dimensionsRef.current;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    ctx.clearRect(0, 0, w, h);

    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      /* subtle drift toward cursor */
      const dx = mx * w - p.x;
      const dy = my * h - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 300) {
        const force = (300 - dist) / 300 * 0.015;
        p.vx += dx * force * 0.01;
        p.vy += dy * force * 0.01;
      }

      p.x += p.vx;
      p.y += p.vy;

      /* dampen */
      p.vx *= 0.99;
      p.vy *= 0.99;

      /* wrap around */
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      /* flicker */
      const flicker = Math.sin(time * p.flickerSpeed + p.flickerOffset) * 0.5 + 0.5;
      const alpha = p.opacity * (0.5 + flicker * 0.5);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();
    }

    /* soft vignette glow at bottom center (complements the figure in the image) */
    const gradient = ctx.createRadialGradient(w * 0.5, h * 0.85, 0, w * 0.5, h * 0.85, w * 0.5);
    gradient.addColorStop(0, "rgba(0, 113, 227, 0.03)");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    animationRef.current = requestAnimationFrame((t) => animate(ctx, t));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimensionsRef.current = { w: rect.width, h: rect.height };
      initParticles(rect.width, rect.height);
    };

    const handlePointerMove = (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const handleVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };

    resize();
    handleVisibility();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    animationRef.current = requestAnimationFrame((t) => animate(ctx, t));

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default HeroScene;
