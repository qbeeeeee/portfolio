import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Starfield() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let w;
      let h;
      let rafId;

      const resizeCanvas = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        w = window.innerWidth;
        h = window.innerHeight;

        canvas.width = w * dpr;
        canvas.height = h * dpr;

        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resizeCanvas();

      const numStars = window.innerWidth < 768 ? 120 : 250;

      const stars = Array.from({ length: numStars }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          baseX: Math.random() * Math.PI * 2,
          baseY: Math.random() * Math.PI * 2,
          size: depth * 1.4 + 0.6,
          glow: depth * 12 + 6,
          parallax: depth * 2 + 0.4,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinkle: Math.random() * Math.PI * 2,
          driftSpeed: Math.random() * 0.0006 + 0.0003,
          opacity: 1,
          depth,
        };
      }).sort((a, b) => a.depth - b.depth);

      starsRef.current = stars;

      let mouseX = w / 2;
      let mouseY = h / 2;
      let smoothX = mouseX;
      let smoothY = mouseY;

      const lerp = (a, b, t) => a + (b - a) * t;

      const drawStar = (star, dx, dy, time) => {
        const driftX = Math.sin(time * star.driftSpeed + star.baseX) * 6;
        const driftY = Math.cos(time * star.driftSpeed + star.baseY) * 6;

        const x = star.x + dx + driftX;
        const y = star.y + dy + driftY;

        star.twinkle += star.twinkleSpeed;
        const scale = 0.7 + Math.sin(star.twinkle) * 0.3;

        ctx.shadowBlur = star.glow;
        ctx.strokeStyle = `rgba(235,240,255,${star.opacity * star.depth})`;
        ctx.fillStyle = ctx.strokeStyle;

        ctx.beginPath();
        ctx.moveTo(x - star.size * scale, y);
        ctx.lineTo(x + star.size * scale, y);
        ctx.moveTo(x, y - star.size * scale);
        ctx.lineTo(x, y + star.size * scale);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, star.size * 0.35 * scale, 0, Math.PI * 2);
        ctx.fill();
      };

      const draw = (time) => {
        ctx.clearRect(0, 0, w, h);
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.lineWidth = 1;

        smoothX = lerp(smoothX, mouseX, 0.05);
        smoothY = lerp(smoothY, mouseY, 0.05);

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const dx = (smoothX - w / 2) * star.parallax * 0.01;
          const dy = (smoothY - h / 2) * star.parallax * 0.01;
          drawStar(star, dx, dy, time);
        }

        rafId = requestAnimationFrame(draw);
      };

      let mouseRaf = false;
      const onMouseMove = (e) => {
        if (mouseRaf) return;

        mouseRaf = true;
        requestAnimationFrame(() => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          mouseRaf = false;
        });
      };

      let resizeRaf = null;
      const onResize = () => {
        if (resizeRaf) return;

        resizeRaf = requestAnimationFrame(() => {
          resizeCanvas();
          resizeRaf = null;
        });
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });

      draw(0);

      gsap.to(canvas, {
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: document.body,
            start: "top -50%",
            end: "top -300%",
            scrub: true,
          },
        })
        .to(starsRef.current, { opacity: 0 })
        .to(starsRef.current, { opacity: 1 }, 0.8);

      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
      };
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
