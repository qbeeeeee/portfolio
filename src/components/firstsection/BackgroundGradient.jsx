import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import figma from "../../assets/skills/figma.png";
import git from "../../assets/skills/git.png";
import javascript from "../../assets/skills/javascript.png";
import react from "../../assets/skills/react.png";
import sql from "../../assets/skills/sql.png";
import tailwind from "../../assets/skills/tailwind.png";
import pythonSvg from "../../assets/skills/python.svg";
import djangoSvg from "../../assets/skills/django.svg";
import gsapSvg from "../../assets/skills/gsap.svg";
import "./../../assets/css/custom.css";
import qrCode from "../../assets/qrCode2.png";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    label: "React",
    icon: react,
  },
  {
    label: "Javascript",
    icon: javascript,
  },
  {
    label: "TailwindCSS",
    icon: tailwind,
  },
  {
    label: "Figma",
    icon: figma,
  },
  {
    label: "Gsap",
    icon: gsapSvg,
  },
  {
    label: "Git",
    icon: git,
  },
  {
    label: "Python",
    icon: pythonSvg,
  },
  {
    label: "Sql",
    icon: sql,
  },
  {
    label: "Django",
    icon: djangoSvg,
  },
  {
    label: "Django",
    icon: djangoSvg,
  },
];

export default function BackgroundGradient() {
  const containerRef = useRef(null);
  const skillsWrapperRef = useRef(null);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const [gradient, setGradient] = useState({
    angle: 135,
    color1: "#2a0f7a",
    color2: "#e74292",
  });

  useGSAP(
    () => {
      const container = containerRef.current;
      const wrapper = skillsWrapperRef.current;
      if (!container || !wrapper) return;

      let tiltX = 0;
      let tiltY = 0;

      //-----------------------------
      // Mouse move: tilt container + move wrapper
      //-----------------------------
      const handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        tiltX = relX * 30;
        tiltY = relY * 30;

        tiltY = Math.max(Math.min(tiltY, 20), -20);

        // Tilt container (3D effect)
        gsap.to(container, {
          rotationY: tiltX,
          rotationX: -tiltY,
          transformPerspective: 800,
          duration: 1.2,
          ease: "power2.out",
        });

        // Move wrapper smoothly based on mouse position
        const offsetX = relX * 50; // adjust strength
        const offsetY = relY * 50;

        gsap.to(wrapper, {
          x: offsetX,
          y: offsetY,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { dependencies: [], revertOnUpdate: true }
  );

  useGSAP(() => {
    const items = skillsWrapperRef.current?.children;
    if (!items) return;

    // Entrance animation (y)
    gsap.from(items, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "back.inOut",
    });

    // Floating animation (yPercent)
    Array.from(items).forEach((item, index) => {
      gsap.to(item, {
        yPercent: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1.5, // identical durations
        delay: index * 0.2, // phase offset creates the wave effect
      });
    });
  });

  // useGSAP(
  //   () => {
  //     const container = containerRef.current;
  //     if (!container) return;

  //     const handleMouseMove = (e) => {
  //       const x = (e.clientX / window.innerWidth - 0.5) * 30;
  //       const y = (e.clientY / window.innerHeight - 0.5) * 30;

  //       gsap.to(container, {
  //         rotationY: x,
  //         rotationX: -y,
  //         transformPerspective: 800,
  //         ease: "power2.out",
  //         duration: 1.2,
  //       });
  //     };

  //     window.addEventListener("mousemove", handleMouseMove);

  //     // cleanup handled by GSAP context
  //     return () => {
  //       window.removeEventListener("mousemove", handleMouseMove);
  //     };
  //   },
  //   { dependencies: [], revertOnUpdate: true }
  // );

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
            backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`,
            backgroundSize: "100% 100%",
            filter: "blur(5px)",
            zIndex: 1,
          }}
        />

        <div className="h-full">
          <div className="relative z-10 pt-12 text-white h-[33%]">
            <div className="flex justify-between items-center px-20 text-[22px]">
              <div className="flex gap-14">
                <div>Contact Me</div>
                <div>Download CV</div>
              </div>

              {/* <div className="flex gap-14">
                <div>Home</div>
                <div>Projects</div>
              </div> */}
            </div>
          </div>

          <div className="flex items-end justify-between px-20 w-full h-[18%] gap-16 whitespace-nowrap z-[400] relative">
            <img
              src={qrCode}
              alt="QR Code"
              className="hover:cursor-pointer hover:bg-[#ffffff32] border border-[#ffffffc6] shadow-xl rounded-[10px] w-40 h-40"
            />

            <div className="grid grid-cols-5 gap-5" ref={skillsWrapperRef}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-item flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#ffffff32] gap-2 text-[1.2rem] text-white
      border border-[#ffffffc6] shadow-xl rounded-[10px] w-[150px] h-[100px]"
                >
                  <img
                    src={skill.icon}
                    alt=""
                    className="h-8 w-8 object-contain"
                  />
                  {skill.label}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="flex gap-4 p-4 text-white z-50 absolute right-1/2 bottom-[30%] transform -translate-y-1/2 translate-x-1/2">
            <div
              className={`
                  bg-white text-black border border-black border-opacity-30 flex items-center justify-between px-4 sm:px-5 h-[35px] w-[130px] 
       cursor-pointer rounded-[10px] text-[12px] sm:text-[14px]
       font-inter font-light transition-colors duration-300`}
              onClick={() => inputRef.current.click()}
            >
              <span>{gradient.color1}</span>

              <div
                className="w-6 h-6 rounded-full border border-black shadow-md"
                style={{ backgroundColor: gradient.color1 }}
              />

              <input
                ref={inputRef}
                type="color"
                value={gradient.color1}
                onChange={(e) =>
                  setGradient({ ...gradient, color1: e.target.value })
                }
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
              />
            </div>

            <div
              className={`
                  bg-white text-black border border-black border-opacity-30 flex items-center justify-between px-4 sm:px-5 h-[35px] w-[130px] 
       cursor-pointer rounded-[10px] text-[12px] sm:text-[14px]
       font-inter font-light transition-colors duration-300`}
              onClick={() => inputRef2.current.click()}
            >
              <span>{gradient.color2}</span>

              <div
                className="w-6 h-6 rounded-full border border-black shadow-md"
                style={{ backgroundColor: gradient.color2 }}
              />

              <input
                ref={inputRef2}
                type="color"
                value={gradient.color2}
                onChange={(e) =>
                  setGradient({ ...gradient, color2: e.target.value })
                }
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
              />
            </div>

            <div className="relative w-[130px]">
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={gradient.angle ?? 0}
                className="w-full range-slider border border-black border-opacity-30 range-slider-lg flex items-center justify-center"
                style={{
                  "--percentage": `${(gradient.angle / 360) * 100}%`,
                }}
                onChange={(e) =>
                  setGradient({ ...gradient, angle: Number(e.target.value) })
                }
              />

              <span className="absolute pointer-events-none left-4 top-1/2 -translate-y-1/2 text-[12px] sm:text-[14px] font-inter font-light text-gray-600">
                Angle
              </span>

              <span className="absolute pointer-events-none right-4 top-1/2 -translate-y-1/2 text-[12px] sm:text-[14px] font-inter font-light text-gray-600">
                {gradient.angle}°
              </span>
            </div>
          </div> */}

          <div className="relative flex justify-between items-end h-[48%] z-10 p-10 text-white px-20">
            <div>
              <h1 className="font-bold text-[52px]">Hey, I'm Konstantinos</h1>
              <h1 className="font-bold text-[52px]">Web Developer</h1>

              <div className="mt-4 text-[18px] font-normal text-white max-w-[500px]">
                I’m a 27-year-old fullstack web developer from Greece,
                passionate about building modern, interactive websites.
              </div>
            </div>

            <div className="flex flex-col items-end">
              <h2 className="font-bold text-[35px]">
                Papadokonst1998@gmail.com
              </h2>
              <h2 className="font-bold text-[35px]">+30 697 235 8102</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
