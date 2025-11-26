import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Starfield() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const numStars = 220;

    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.2 + 0.6,
      glow: Math.random() * 8 + 8,
      parallax: Math.random() * 2 + 0.5,
      twinkleSpeed: Math.random() * 0.04 + 0.01,
      twinkle: Math.random() * Math.PI * 2,
      opacity: 1, // <-- add opacity for scroll animation
    }));

    starsRef.current = stars;

    let mouseX = w / 2;
    let mouseY = h / 2;

    const drawStar = (star, dx, dy) => {
      const x = star.x + dx;
      const y = star.y + dy;

      // Twinkle
      star.twinkle += star.twinkleSpeed;
      const scale = 0.6 + Math.sin(star.twinkle) * 0.4;

      ctx.shadowBlur = star.glow;
      ctx.shadowColor = "white";
      ctx.strokeStyle = `rgba(255,255,255,${star.opacity})`;
      ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
      ctx.lineWidth = 1;

      // Draw sparkle cross shape
      ctx.beginPath();
      ctx.moveTo(x - star.size * scale, y);
      ctx.lineTo(x + star.size * scale, y);
      ctx.moveTo(x, y - star.size * scale);
      ctx.lineTo(x, y + star.size * scale);
      ctx.stroke();

      // Core dot
      ctx.beginPath();
      ctx.arc(x, y, star.size * 0.3 * scale, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      stars.forEach((star) => {
        const dx = (mouseX - w / 2) * star.parallax * 0.03;
        const dy = (mouseY - h / 2) * star.parallax * 0.03;

        drawStar(star, dx, dy);
      });

      requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    draw();

    // GSAP ScrollTrigger: fade stars out as you scroll
    gsap.to(starsRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: document.body,
        start: "top -50%", // start after 100vh
        end: "+=500", // 500px further down
        scrub: true,
      },
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "black",
        zIndex: -1,
      }}
    />
  );
}
