import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../test/css.css";
import testImage from "./../assets/test.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const slidesRef = useRef(null);

  useEffect(() => {
    const slides = gsap.utils.toArray(".slide");
    const activeSlideImages = gsap.utils.toArray(".active-slide img");

    function getInitialTranslateZ(slide) {
      const style = window.getComputedStyle(slide);
      const matrix = style.transform.match(/matrix3d\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(", ");
        return parseFloat(values[14] || 0);
      }
      return 0;
    }

    function mapRange(value, inMin, inMax, outMin, outMax) {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }

    slides.forEach((slide, index) => {
      const initialZ = getInitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: ".projects-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const zIncrement = progress * 22500;
          const currentZ = initialZ + zIncrement;

          let opacity;
          if (currentZ > -2500) {
            opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
          } else {
            opacity = mapRange(currentZ, -5000, -2500, 0, 0.5);
          }

          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

          gsap.to(activeSlideImages[index], {
            opacity: currentZ < 100 ? 1 : 0,
            duration: 1.5,
            ease: "power3.out",
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const slides = Array.from({ length: 10 });

  useEffect(() => {
    const nav = document.querySelector("nav");
    const footer = document.querySelector("footer");

    // fade in nav/footer when ProjectsSection starts
    ScrollTrigger.create({
      trigger: ".projects-container",
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        gsap.to([nav, footer, slidesRef.current], {
          opacity: 1,
          duration: 0.8,
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to([nav, footer, slidesRef.current], {
          opacity: 0,
          duration: 0.5,
          pointerEvents: "none",
        });
      },
      onLeave: () => {
        gsap.to([nav, footer, slidesRef.current], {
          opacity: 0,
          duration: 0.5,
          pointerEvents: "none",
        });
      },
      onEnterBack: () => {
        gsap.to([nav, footer, slidesRef.current], {
          opacity: 1,
          duration: 0.8,
          pointerEvents: "auto",
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className="projects-container">
      <nav className="fixed top-0 w-full px-[1.5em] py-[2em] flex items-center opacity-0 pointer-events-none">
        <div className="flex gap-[2em]">
          <a href="#">Works</a>
          <a href="#">Archive</a>
        </div>
        <div className="flex justify-center">
          <a className="font-bold text-[16px]" href="#">
            Modavate
          </a>
        </div>
        <div className="flex gap-[2em] justify-end">
          <a href="#">Works</a>
          <a href="#">Archive</a>
        </div>
      </nav>

      <footer className="fixed bottom-0 w-full px-[1.5em] py-[2em] flex justify-between items-center opacity-0 pointer-events-none">
        <p>Watch showreel</p>
        <p>Coming soon</p>
      </footer>

      <div
        className="w-full h-[2000vh] opacity-0 pointer-events-none"
        ref={slidesRef}
      >
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-[#000] opacity-[0.35] z-[-1] active-slide">
          {slides.map((_, i) => (
            <img
              className="absolute blur-[50px] scale-[1.125]"
              key={i}
              src={testImage}
              alt={`bg-${i}`}
            />
          ))}
        </div>

        <div className="fixed top-0 w-[100vw] h-[100vh] overflow-hidden [transform-style:preserve-3d] [perspective:750px]">
          {slides.map((_, i) => (
            <div
              key={i}
              className="absolute w-[400px] h-[500px] overflow-hidden slide"
              id={`slide-${i + 1}`}
            >
              <div className="slide-copy">
                <p className="upppercase text-center text-[13px] font-bold text-[#e6aa28]">
                  Neo Elegance
                </p>
                <p
                  className="upppercase text-center text-[13px] font-bold text-[#e6aa28]"
                  id="index"
                >
                  ( ES 942 42 42)
                </p>
              </div>
              <div className="slide-img">
                <img src={testImage} alt={`slide-${i + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
