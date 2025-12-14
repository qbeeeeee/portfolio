import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../test/css.css";
import testImage from "./../assets/test.jpg";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const slidesRef = useRef(null);

  useGSAP(
    () => {
      const menuTrigger = ScrollTrigger.getById("keepme-sections-scroll");
      if (!menuTrigger) return;

      const slides = gsap.utils.toArray(".slide");

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

      slides.forEach((slide) => {
        const initialZ = getInitialTranslateZ(slide);

        gsap.to(slide, {
          scrollTrigger: {
            trigger: ".projects-container",
            start: () => menuTrigger.end,
            end: "+=4000",
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
              slide.style.transform = `
              translateX(-50%)
              translateY(-50%)
              translateZ(${currentZ}px)
            `;
            },
          },
        });
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  const slides = Array.from({ length: 10 });

  useGSAP(
    () => {
      const menuTrigger = ScrollTrigger.getById("keepme-sections-scroll");

      gsap.to(slidesRef.current, {
        opacity: 1,
        duration: 0.8,
        pointerEvents: "auto",
        scrollTrigger: {
          trigger: ".projects-container",

          // THIS is the key line
          start: () => menuTrigger.end,

          toggleActions: "play reverse play reverse",
        },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <div className="projects-container overflow-hidden">
      <div
        className="w-full h-[2000vh] opacity-0 pointer-events-none relative"
        ref={slidesRef}
      >
        {/* <div className="fixed top-0 left-0 w-full h-full overflow-hidden bg-[#000] opacity-[0.35] z-[-1] active-slide">
          {slides.map((_, i) => (
            <img
              className="absolute blur-[50px] scale-[1.125]"
              key={i}
              src={testImage}
              alt={`bg-${i}`}
            />
          ))}
        </div> */}

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
