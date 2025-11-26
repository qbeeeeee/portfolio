import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../test/css.css";
import testImage from "./../assets/test.jpg";
import earth from "./../assets/saturn2.png";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const slidesRef = useRef(null);
  const earthRef = useRef(null);

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
    ScrollTrigger.create({
      trigger: ".projects-container",
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        gsap.to([slidesRef.current], {
          opacity: 1,
          duration: 0.8,
          pointerEvents: "auto",
        });
      },
      onLeaveBack: () => {
        gsap.to([slidesRef.current], {
          opacity: 0,
          duration: 0.5,
          pointerEvents: "none",
        });
      },
      onLeave: () => {
        gsap.to([slidesRef.current], {
          opacity: 0,
          duration: 0.5,
          pointerEvents: "none",
        });
      },
      onEnterBack: () => {
        gsap.to([slidesRef.current], {
          opacity: 1,
          duration: 0.8,
          pointerEvents: "auto",
        });
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  useGSAP(
    () => {
      const glowLayer = earthRef.current.querySelectorAll("div")[1];
      gsap.to(glowLayer, {
        WebkitMaskImage:
          "linear-gradient(to bottom, black var(--line-pos), transparent calc(var(--line-pos) + 1%))",
        ease: "none",
        scrollTrigger: {
          trigger: slidesRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            glowLayer.style.setProperty("--line-pos", `${progress}%`);
          },
        },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <div className="projects-container">
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

        <div
          ref={earthRef}
          className="fixed right-1/2 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] flex items-center justify-center"
        >
          {/* White base image (always visible) */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${earth})`,
              backgroundSize: "contain",
              filter: "brightness(1.5)",
            }}
          />

          {/* Blue glow overlay (hidden at first, revealed top→bottom) */}
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${earth})`,
              backgroundSize: "contain",
              filter:
                "drop-shadow(0 0 4px #00bfff) drop-shadow(0 0 4px #00ffff)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 0%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 0%)",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
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
