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
import qrCode from "../../assets/qrCode.png";

import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

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
  const contentRef = useRef(null);

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

        tiltX = relX * 28;
        tiltY = relY * 28;

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
    { dependencies: [], revertOnUpdate: true },
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

  const HoverButton = () => {
    const container = useRef();
    const tl = useRef();

    useGSAP(
      () => {
        // Split the text into characters
        const splitA = new SplitText("#name-top", { type: "chars" });
        const splitB = new SplitText("#name-bottom", { type: "chars" });

        // Set initial position of the second name
        gsap.set(splitB.chars, { y: 15 });

        // Create the timeline
        tl.current = gsap
          .timeline({ paused: true })
          .to(splitA.chars, {
            y: -80,
            duration: 0.33,
            stagger: 0.02,
            ease: "sine.inOut",
          })
          .to(
            splitB.chars,
            {
              y: -90,
              duration: 0.33,
              stagger: 0.02,
              ease: "sine.inOut",
            },
            "<",
          );
      },
      { scope: container },
    );

    const handleMouseEnter = () => tl.current.play();
    const handleMouseLeave = () => tl.current.reverse();

    return (
      <span
        ref={container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex flex-col bg-[#fafafa] text-[#7b2584] cursor-pointer rounded-[15px] px-4 h-[85px] overflow-hidden font-bold"
      >
        <div id="name-top">Papadopoulos</div>
        <div id="name-bottom">Konstaninos</div>
      </span>
    );
  };

  // useEffect(() => {
  //   const container = containerRef.current;
  //   const content = contentRef.current;

  //   // Hide inner content initially
  //   gsap.set(content.children, {
  //     opacity: 0,
  //     y: 40,
  //   });

  //   // Set container far away in Z space
  //   gsap.set(container, {
  //     height: 0,
  //     width: 0,
  //   });

  //   const tl = gsap.timeline({ defaults: { ease: "sine.inOut" } });

  //   // SPACE TRAVEL INTRO
  //   tl.to(container, {
  //     height: "80vh",
  //     width: "80vw",
  //     duration: 2,
  //   })

  //     // REVEAL INNER CONTENT
  //     .to(
  //       content.children,
  //       {
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.9,
  //         stagger: 0.12,
  //         ease: "power3.out",
  //       },
  //       "+=0.6"
  //     );
  // }, []);

  return (
    <div className="absolute inset-0 flex justify-center items-center z-20 [transform-style:preserve-3d] [transform:perspective(1200px)]">
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
            filter: "blur(3px)",
            zIndex: 1,
          }}
        />

        <div ref={contentRef} className="h-full relative">
          <div className="flex items-end justify-between px-20 w-full h-[40%] gap-16 whitespace-nowrap z-[400] relative [perspective:800px]">
            <div className="flex flex-col items-center">
              <img
                src={qrCode}
                alt="QR Code"
                className="hover:cursor-pointer hover:bg-[#ffffff32] border border-[#ffffffc6] shadow-xl rounded-[10px] w-40 h-40"
              />
              <h2 className="mt-4 text-[16px] text-white font-inter font-bold">
                My KeepMe Card
              </h2>
            </div>

            <div className="grid grid-cols-5 gap-5" ref={skillsWrapperRef}>
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-item flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#ffffff32] gap-2 text-[1.2rem] text-white
      border border-[#ffffffc6] shadow-xl rounded-[10px] w-[150px] h-[100px] font-inter"
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

          <div className="relative flex justify-between items-end h-[52%] z-10 text-white px-20">
            <div>
              <h1 className="font-bold text-[60px] font-ica-rubrik">
                Hey, I'm <HoverButton />
              </h1>
              <h1 className="font-bold text-[60px] font-ica-rubrik">
                Web Developer
              </h1>

              <div className="mt-4 text-[20px] text-white max-w-[500px] font-inter font-light">
                I’m a 27-year-old Full-stack web developer from Greece,
                passionate about building modern, interactive websites.
              </div>
            </div>

            <div className="flex flex-col items-end">
              <h1 className="font-bold text-[35px] font-inter mb-2">
                Contact Me:
              </h1>

              <h2 className="font-bold text-[25px] font-inter">
                papadokonst1998@gmail.com
              </h2>
              <h2 className="font-bold text-[25px] font-inter">
                +30 697 235 8102
              </h2>

              <div className="flex gap-10 text-[20px] text-white font-inter">
                <div className="hover:underline hover:underline-offset-4 hover:cursor-pointer">
                  GitHub
                </div>
                <div className="hover:underline hover:underline-offset-4 hover:cursor-pointer">
                  LinkedIn
                </div>

                <div className="hover:underline hover:underline-offset-4 hover:cursor-pointer">
                  Download CV
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
