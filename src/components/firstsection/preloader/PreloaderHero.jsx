// Hero.jsx
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import testImage from "./../../../assets/test1233.jpg";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import figma from "../../../assets/skills/figma.png";
import git from "../../../assets/skills/git.png";
import javascript from "../../../assets/skills/javascript.png";
import react from "../../../assets/skills/react.png";
import sql from "../../../assets/skills/sql.png";
import tailwind from "../../../assets/skills/tailwind.png";
import pythonSvg from "../../../assets/skills/python.svg";
import djangoSvg from "../../../assets/skills/django.svg";
import gsapSvg from "../../../assets/skills/gsap.svg";
import qrCode from "../../../assets/qrCode.png";
import "../../../assets/css/custom.css";
import "../../../assets/css/preloader.css";

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

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        document.fonts.ready.then(() => {
          function createSplitTexts(elements) {
            const splits = {};

            elements.forEach(({ key, selector, type }) => {
              const config = { type, mask: type };

              if (type === "chars") config.charsClass = "char";
              if (type === "lines") config.linesClass = "line";
              splits[key] = SplitText.create(selector, config);
            });

            return splits;
          }

          gsap.set(skillsWrapperRef.current?.children, {
            opacity: 0,
          });

          const splitElements = [
            { key: "logoChars", selector: ".preloader-logo h1", type: "chars" },
            {
              key: "footerLines",
              selector: ".preloader-footer p",
              type: "lines",
            },
            {
              key: "headerLine1",
              selector: ".header-dev h1:nth-child(1)",
              type: "chars",
            },
            {
              key: "headerLine2",
              selector: ".header-dev h1:nth-child(2)",
              type: "chars",
            },
            {
              key: "headerQrCode",
              selector: ".header-qr-code",
              type: "lines",
            },
            {
              key: "headerDevP",
              selector: ".header-dev p",
              type: "lines",
            },
            {
              key: "heroFooterP",
              selector: ".hero-footer-right",
              type: "lines",
            },
          ];

          const splits = createSplitTexts(splitElements);

          gsap.set([splits.logoChars.chars], { x: "100%" });
          gsap.set(
            [
              splits.footerLines.lines,
              splits.headerLine1.chars,
              splits.headerLine2.chars,
              splits.headerDevP.lines,
              splits.heroFooterP.lines,
              splits.headerQrCode.lines,
            ],
            {
              y: "100%",
            }
          );

          function animateProgress(duration = 2.5) {
            return gsap.to(".preloader-progress-bar", {
              scaleX: 1,
              duration,
              ease: "none",
              keyframes: [
                { scaleX: 0.25, duration: duration * 0.2, ease: "power2.out" },
                { scaleX: 0.65, duration: duration * 0.25, ease: "power2.out" },
                { scaleX: 1, duration: duration * 0.1, ease: "power3.out" },
              ],
            });
          }

          let skillsStarted = false;
          function playSkillsEntrance() {
            if (skillsStarted) return;
            skillsStarted = true;

            const items = skillsWrapperRef.current?.children;
            if (!items) return;

            gsap.to(items, {
              y: 50,
              opacity: 1,
              stagger: 0.1,
              duration: 1,
              ease: "back.inOut",
            });
          }

          function startSkillsFloating() {
            const items = skillsWrapperRef.current?.children;
            if (!items) return;

            Array.from(items).forEach((item, index) => {
              gsap.to(item, {
                yPercent: 12,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 1.5,
                delay: index * 0.2,
              });
            });
          }

          const tl = gsap.timeline({ delay: 0.5 });

          tl.to(splits.logoChars.chars, {
            x: "0%",
            stagger: "0.05",
            duration: 1,
            ease: "power4.inOut",
          })
            .to(
              splits.footerLines.lines,
              {
                y: "0%",
                stagger: 0.1,
                duration: 1,
                ease: "power4.inOut",
              },
              "0.25"
            )
            .add(animateProgress(), "<")
            .set(".preloader-progress", { backgroundColor: "var(--base-300)" })
            .to(
              splits.logoChars.chars,
              {
                x: "-100%",
                stagger: "0.05",
                duration: 1,
                ease: "power4.inOut",
              },
              "-=0.5"
            )
            .to(
              splits.footerLines.lines,
              {
                y: "-100%",
                stagger: 0.1,
                duration: 1,
                ease: "power4.inOut",
              },
              "<"
            )
            .to(
              ".preloader-progress",
              {
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.25"
            )
            .to(
              ".preloader-mask",
              {
                scale: 5,
                duration: 2.5,
                ease: "power3.out",
              },
              "<"
            )
            .to(
              ".hero-img",
              {
                scale: 1,
                duration: 1.5,
                ease: "power3.out",
              },
              "<"
            )
            .to(splits.headerLine1.chars, {
              y: 0,
              stagger: 0.04,
              duration: 0.8,
              ease: "power4.out",
              delay: -2,
            })
            .to(
              splits.headerLine2.chars,
              {
                y: 0,
                stagger: 0.04,
                duration: 0.8,
                ease: "power4.out",
              },
              "<"
            )
            .to(
              ".hover-bg",
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.inOut",
              },
              "<"
            )
            .to(
              splits.headerQrCode.lines,
              {
                y: 0,
                stagger: 0.04,
                duration: 0.8,
                ease: "power4.out",
              },
              "<"
            )
            .to(
              [splits.headerDevP.lines, splits.heroFooterP.lines],
              {
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power4.out",
              },
              "-=1.5"
            )
            .add(playSkillsEntrance, "<")
            .add(startSkillsFloating, "<");
        });
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [], revertOnUpdate: true }
  );

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

        tiltX = relX * 15;
        tiltY = relY * 15;

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
            "<"
          );
      },
      { scope: container }
    );

    const handleMouseEnter = () => tl.current.play();
    const handleMouseLeave = () => tl.current.reverse();

    return (
      <span
        ref={container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex flex-col relative text-[#7b2584] cursor-pointer rounded-[15px] px-4 h-[85px] overflow-hidden font-bold hover-button"
      >
        <span className="absolute inset-0 bg-white z-0 origin-left scale-x-0 hover-bg" />

        <div id="name-top">Papadopoulos</div>
        <div id="name-bottom">Konstaninos</div>
      </span>
    );
  };

  return (
    <div ref={root}>
      <div className="preloader-progress">
        <div className="preloader-progress-bar"></div>
        <div className="preloader-logo absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-2 mix-blend-difference">
          <h1 className="relative text-[#d7a2ff] text-[3rem] font-medium leading-[1]">
            Konstantinos
          </h1>
        </div>
      </div>

      <div className="preloader-mask"></div>

      <div className="preloader-content">
        <div className="preloader-footer">
          <p>Portfolio by Qbeeeeee...</p>
        </div>
      </div>

      <div className="relative w-full h-full">
        <section className="flex items-center justify-center relative w-full h-[100svh] p-[1rem]">
          <div className="relative rounded-[4rem] w-[90%] h-[90%]">
            <div className="hero-img absolute w-full h-full scale-150 will-change-transform">
              <div className="absolute inset-0 flex justify-center items-center z-20 [transform-style:preserve-3d] [transform:perspective(1200px)]">
                <div
                  ref={containerRef}
                  className="w-full h-full rounded-[40px]"
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: 1,
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-[40px]"
                    style={{
                      // backgroundImage: `linear-gradient(${gradient.angle}deg, ${gradient.color1}, ${gradient.color2})`,
                      backgroundImage: `url(${testImage})`,
                      backgroundSize: "100% 100%",
                      // filter: "blur(3px)",
                      zIndex: 1,
                    }}
                  />

                  <div ref={contentRef} className="h-full relative">
                    <div className="flex items-end justify-between px-20 w-full h-[40%] gap-16 whitespace-nowrap z-[400] relative [perspective:800px]">
                      <div className="flex flex-col items-center header-qr-code">
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="hover:cursor-pointer hover:bg-[#ffffff32] border border-[#ffffffc6] shadow-xl rounded-[10px] w-40 h-40"
                        />
                        <h2 className="mt-4 text-[16px] text-white font-inter font-bold">
                          My KeepMe Card
                        </h2>
                      </div>

                      <div
                        className="grid grid-cols-5 gap-5"
                        ref={skillsWrapperRef}
                      >
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
                      <div className="header-dev">
                        <h1 className="font-bold text-[60px] font-ica-rubrik">
                          Hey, I'm <HoverButton />
                        </h1>
                        <h1 className="font-bold text-[60px] font-ica-rubrik">
                          Web Developer
                        </h1>

                        <p className="mt-4 text-[20px] text-white max-w-[500px] font-inter font-light">
                          I’m a 27-year-old Full-stack web developer from
                          Greece, passionate about building modern, interactive
                          websites.
                        </p>
                      </div>

                      <div className="flex flex-col items-end hero-footer-right">
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
