import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundGradient() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;

        gsap.to(container, {
          rotationY: x,
          rotationX: -y,
          transformPerspective: 800,
          ease: "power2.out",
          duration: 1.2,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // cleanup handled by GSAP context
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { dependencies: [], revertOnUpdate: true }
  );

  // useGSAP(
  //   () => {
  //     const container = containerRef.current;
  //     if (!container) return;

  //     gsap.to(container, {
  //       z: 1200,
  //       opacity: 0,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: container,
  //         start: "top top",
  //         end: "bottom+=100% top",
  //         scrub: true,
  //       },
  //     });
  //   },
  //   { dependencies: [], revertOnUpdate: true }
  // );

  return (
    <div className="absolute inset-0 flex justify-center items-center z-20">
      <div
        ref={containerRef}
        className="w-[85%] h-[85%] rounded-[40px]"
        style={{
          transformStyle: "preserve-3d",
          zIndex: 1,
        }}
      >
        <div
          className="absolute inset-0 rounded-[40px]"
          style={{
            background: "linear-gradient(135deg, #2a0f7a, #e74292, #ffb347)",
            backgroundSize: "190% 190%",
            filter: "blur(5px)",
            zIndex: 1,
          }}
        />

        <div className="h-full">
          <div className="relative z-10 pt-12 text-white h-[50%]">
            <div className="flex justify-between items-center px-20 text-[22px]">
              <div className="flex gap-14">
                <div>Home</div>
                <div>Projects</div>
              </div>

              <div className="flex gap-14">
                <div>Contact Me</div>
                <div>Download CV</div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center flex-col h-[50%] z-10 p-10 text-white pl-20">
            <h1 className="font-bold text-[52px]">Hey, I'm Konstantinos</h1>
            <h1 className="font-bold text-[52px]">Web Developer</h1>

            <div className="mt-4 text-[18px] font-normal text-white max-w-[500px]">
              I’m a 27-year-old fullstack web developer from Greece, passionate
              about building modern, interactive websites.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
