// Hero.jsx
import { useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import testImage from "./../../assets/test1233.jpg";
import testImage2 from "./../../assets/spaceBackground/11112.jpg";
import topHero from "./../../assets/spaceBackground/top.webp";
import bottomHero from "./../../assets/spaceBackground/bottom.webp";
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
import qrCode from "../../assets/qrCode.png";
import "../../assets/css/custom.css";
import "../../assets/css/preloader.css";

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

export default function Hero({ setAnimationFinished }) {
  const root = useRef(null);
  const isMobile = window.innerWidth < 640;

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
            y: -50,
            opacity: 0,
          });
          gsap.set(".hover-bg", { scaleX: 0 });

          gsap.set(".top-hero-image", {
            yPercent: 20,
          });

          gsap.set(".bottom-hero-image", {
            yPercent: -20,
          });

          gsap.set([".preloader-logo", ".preloader-footer"], {
            visibility: "visible",
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
            },
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
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 1,
              ease: "back.inOut",
            });
          }

          function startSkillsAnimation() {
            const items = skillsWrapperRef.current?.children;
            if (!items) return;

            if (isMobile) {
              startSkillsMarquee(items);
            } else {
              startSkillsFloating(items);
            }
          }

          function startSkillsFloating(items) {
            Array.from(items).forEach((item, index) => {
              gsap.to(item, {
                yPercent: window.innerWidth > 1536 ? 10 : 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                duration: 1.5,
                delay: index * 0.2,
              });
            });
          }

          function startSkillsMarquee() {
            const wrapper = skillsWrapperRef.current;
            if (!wrapper || wrapper.dataset.animated) return;
            wrapper.dataset.animated = "true";

            // 1. Force the layout to be a single horizontal line
            // This ensures clones stay on the RIGHT, not underneath
            wrapper.style.display = "flex";
            wrapper.style.flexWrap = "nowrap";
            wrapper.style.width = "max-content";

            // 2. Clone the inner HTML
            wrapper.innerHTML += wrapper.innerHTML;

            // 3. Animate the ENTIRE wrapper as one unit
            gsap.fromTo(
              wrapper,
              { xPercent: -50 },
              {
                xPercent: 0,
                repeat: -1,
                duration: 15,
                ease: "none",
              },
            );
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
              "0.25",
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
              "-=0.5",
            )
            .to(
              splits.footerLines.lines,
              {
                y: "-100%",
                stagger: 0.1,
                duration: 1,
                ease: "power4.inOut",
              },
              "<",
            )
            .to(
              ".preloader-progress",
              {
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.25",
            )
            .to(
              ".preloader-mask",
              {
                scale: 7,
                duration: 2.5,
                ease: "power3.out",
              },
              "<",
            )
            .to(
              ".hero-img",
              {
                scale: 1,
                duration: 1.5,
                ease: "power3.out",
              },
              "<",
            )
            .to(".top-hero-image", {
              yPercent: 0,
              duration: 2,
              ease: "power3.inOut",
              delay: -3.1,
            })
            .to(
              ".bottom-hero-image",
              {
                yPercent: 0,
                duration: 2,
                ease: "power3.inOut",
              },
              "<",
            )
            .to(splits.headerLine1.chars, {
              y: 0,
              stagger: 0.04,
              duration: 0.8,
              ease: "power4.out",
              delay: -1.8,
            })
            .to(
              splits.headerLine2.chars,
              {
                y: 0,
                stagger: 0.04,
                duration: 0.8,
                ease: "power4.out",
              },
              "<",
            )
            .to(
              ".hover-bg",
              {
                scaleX: 1,
                duration: 0.8,
                ease: "power2.inOut",
              },
              "<",
            )
            .to(
              splits.headerQrCode.lines,
              {
                y: 0,
                stagger: 0.04,
                duration: 0.8,
                ease: "power4.out",
              },
              "<",
            )
            .to(
              [splits.headerDevP.lines, splits.heroFooterP.lines],
              {
                y: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power4.out",
              },
              "-=1.5",
            )
            .add(playSkillsEntrance, "<")
            .add(startSkillsAnimation, ">")
            .add(() => setAnimationFinished(true));
        });
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [], revertOnUpdate: true },
  );

  const containerRef = useRef(null);
  const skillsWrapperRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      if (isMobile) return;

      const container = containerRef.current;
      const wrapper = skillsWrapperRef.current;
      if (!container || !wrapper) return;

      //-----------------------------
      // Mouse move: tilt container + move wrapper
      //-----------------------------
      const handleMouseMove = (e) => {
        const relX = e.clientX / window.innerWidth - 0.5;
        const relY = e.clientY / window.innerHeight - 0.5;

        const tiltX = relX * 5;
        const tiltY = relY * 5;

        // Tilt container (3D effect)
        gsap.to(container, {
          rotationY: tiltX,
          rotationX: -tiltY,
          transformPerspective: 800,
          duration: 0.8,
          ease: "power2.out",
        });

        gsap.to(wrapper, {
          x: relX * 30,
          y: relY * 30,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(".top-hero-image-wrapper", {
          x: relX * -50,
          y: relY * -50,
          duration: 0.8,
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
              y:
                window.innerWidth > 1536
                  ? -90
                  : isMobile
                    ? -window.innerHeight * 0.052
                    : -80,
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
        className="inline-flex flex-col relative text-[#230322] cursor-pointer rounded-[15px] px-2 sm:px-4 h-[5vh] sm:h-[79px] 2xl:h-[85px] overflow-hidden font-bold hover-button"
      >
        <span className="absolute inset-0 bg-white z-0 origin-left hover-bg" />

        <div id="name-top">Papadopoulos</div>
        <div id="name-bottom">Konstaninos</div>
      </span>
    );
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=700",
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Split images
      tl.to(
        [".top-hero-image", ".top-hero-content"],
        {
          y: "-80vh",
          ease: "power2.in",
        },
        0,
      );

      tl.to(
        [".bottom-hero-image", ".bottom-hero-content"],
        {
          y: "80vh",
          ease: "power2.in",
        },
        0,
      );
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <div ref={root}>
      <div className="preloader-progress">
        <div className="preloader-progress-bar"></div>
        <div className="preloader-logo invisible absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center z-2 mix-blend-difference">
          <h1 className="relative text-[#d7a2ff] text-[8vw] sm:text-[3rem] font-medium leading-[1]">
            Konstantinos
          </h1>
        </div>
      </div>

      <div className="preloader-mask"></div>

      <div className="preloader-content">
        <div className="preloader-footer text-[#d7a2ff] invisible text-[16px] font-inter font-light">
          <p>Portfolio by Qbeeeeee</p>
        </div>
      </div>

      <div className="w-full h-full">
        <section className="hero-section flex items-center justify-center relative w-full h-[100svh] overflow-hidden">
          <div className="relative rounded-[4rem] w-full sm:w-[90%] h-full sm:h-[90%]">
            <div className="hero-img absolute w-full h-full scale-[1.75] will-change-transform">
              <div className="absolute inset-0 flex justify-center items-center z-20 [transform-style:preserve-3d] [transform:perspective(1200px)]">
                <div
                  ref={containerRef}
                  className="w-full h-full rounded-[40px]"
                  style={{
                    transformStyle: "preserve-3d",
                    zIndex: 1,
                  }}
                >
                  <div className="top-hero-image-wrapper absolute w-full h-full">
                    <img
                      src={topHero}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover sm:rounded-[40px] top-hero-image"
                    />
                  </div>
                  <img
                    src={bottomHero}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover sm:rounded-[40px] bottom-hero-image"
                  />

                  <div ref={contentRef} className="h-full relative">
                    <div
                      className="top-hero-content absolute top-[10%] sm:top-[12%] w-full flex flex-col-reverse sm:flex-row items-center sm:items-end 
                    justify-between px-5 sm:px-16 2xl:px-20 gap-[15vh] sm:gap-16 whitespace-nowrap z-[400] [perspective:800px]"
                    >
                      <div className="flex flex-col items-center header-qr-code">
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="hover:cursor-pointer hover:bg-[#ffffff32] border border-[#ffffffc6] shadow-xl rounded-[10px] w-[16vh] sm:w-[clamp(120px,10vw,160px)] h-[16vh] sm:h-[clamp(120px,10vw,160px)]"
                        />
                        <h2 className="mt-4 text-[1.6vh] sm:text-[16px] text-white font-inter font-bold text-center">
                          My KeepMe Card
                        </h2>
                      </div>

                      <div className="w-full sm:w-max">
                        <div
                          className="flex flex-nowrap sm:grid sm:grid-cols-5 gap-[8px] sm:gap-[1vw]"
                          ref={skillsWrapperRef}
                        >
                          {skills.map((skill, index) => (
                            <div
                              key={index}
                              className="skill-item flex-shrink-0 flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#ffffff32] 
                              gap-1 sm:gap-[0.5vw] font-inter font-light text-[12px] sm:text-[1vw] text-white
      border border-[#ffffffc6] shadow-xl rounded-[10px] w-[11vh] sm:w-[clamp(100px,7.8vw,150px)] h-[7vh] sm:h-[clamp(66px,5.25vw,100px)] font-inter"
                            >
                              <img
                                src={skill.icon}
                                alt=""
                                className="w-[24px] sm:w-[clamp(16px,1.6vw,32px)] h-auto object-contain"
                              />
                              {skill.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bottom-hero-content absolute bottom-[5%] w-full flex flex-col sm:flex-row gap-[4vh] justify-between sm:items-end z-10 text-white px-5 sm:px-16 2xl:px-20">
                      <div className="header-dev">
                        <h1 className="text-[3.5vh] sm:text-[54px] 2xl:text-[60px] font-ica-rubrik font-bold">
                          Hey, I'm <HoverButton />
                        </h1>
                        <h1 className="text-[3.5vh] sm:text-[54px] 2xl:text-[60px] font-ica-rubrik font-bold">
                          Web Developer
                        </h1>

                        <p className="mt-[0.9vh] sm:mt-4 text-[1.8vh] sm:text-[18px] 2xl:text-[20px] text-white max-w-[500px] font-inter font-light">
                          I’m a 27-year-old Full-stack web developer from
                          Greece, passionate about building modern, interactive
                          websites.
                        </p>
                      </div>

                      <div className="flex flex-col items-end hero-footer-right">
                        <h1 className="font-bold text-[1.8vh] sm:text-[32px] 2xl:text-[35px] font-inter mb-1 sm:mb-2">
                          Contact Me:
                        </h1>

                        <h2 className="font-bold text-[1.6vh] sm:text-[23px] 2xl:text-[25px] font-inter">
                          papadokonst1998@gmail.com
                        </h2>
                        <h2 className="font-bold text-[1.6vh] sm:text-[23px] 2xl:text-[25px] font-inter">
                          +30 697 235 8102
                        </h2>

                        <div className="flex gap-[4.6vh] text-[1.4vh] sm:text-[18px] 2xl:text-[20px] text-white font-inter">
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
