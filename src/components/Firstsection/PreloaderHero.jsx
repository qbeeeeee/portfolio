// Hero.jsx
import { useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import topHero from "./../../assets/spaceBackground/top.png";
import bottomHero from "./../../assets/spaceBackground/bottom.png";
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
import awsSvg from "../../assets/skills/aws.svg";
import qrCode from "../../assets/qrCode.png";
import "../../assets/css/custom.css";
import "../../assets/css/preloader.css";
import { useAppContext } from "../../AppContext";

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
  { label: "Gsap", icon: gsapSvg },
  {
    label: "Figma",
    icon: figma,
  },
  {
    label: "AWS",
    icon: awsSvg,
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
    label: "Git",
    icon: git,
  },
];

export default function Hero({ setAnimationFinished, animationFinished }) {
  const { isPhone } = useAppContext();

  const containerRef = useRef(null);
  const skillsWrapperRef = useRef(null);
  const contentRef = useRef(null);
  const scrollDownRef = useRef(null);
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.to(".mouse-icon", {
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "400px top",
          scrub: true,
        },
        opacity: 0,
        y: 50,
        ease: "none",
      });

      // The cool split effect
      gsap.to(".scroll-left", {
        scrollTrigger: { scrub: true, end: "400px top" },
        x: -40,
        opacity: 0,
      });

      gsap.to(".scroll-right", {
        scrollTrigger: { scrub: true, end: "400px top" },
        x: 40,
        opacity: 0,
      });
    },
    { scope: scrollDownRef },
  );

  useGSAP(
    () => {
      if (!isPhone) return;

      const ctx = gsap.context(() => {
        document.fonts.ready.then(() => {
          if (ctx.reverted) return;
          gsap.killTweensOf([
            ".preloader-progress-bar",
            ".preloader-progress",
            ".preloader-mask",
            ".hero-img",
            // ".top-hero-image",
            // ".bottom-hero-image",
            ".hover-bg",
            skillsWrapperRef.current,
            skillsWrapperRef.current?.children,
          ]);

          function createSplitTexts(elements) {
            const splits = {};

            elements.forEach(({ key, selector, type }) => {
              const config = { type, mask: type };

              // Find the element in the DOM
              const el = document.querySelector(selector);
              if (el) {
                // Add a role to make the aria-label valid for Lighthouse
                el.setAttribute("role", "text");
              }

              if (type === "chars") config.charsClass = "char";
              if (type === "lines") config.linesClass = "line";
              splits[key] = SplitText.create(selector, config);
            });

            return splits;
          }

          setAnimationFinished(false);

          gsap.set(".preloader-progress-bar", { scaleX: 0 });
          gsap.set(".preloader-progress", {
            backgroundColor: "var(--base-200)",
          });
          gsap.set(".preloader-progress", { opacity: 1 });
          gsap.set(".preloader-mask", { scale: 1 });
          gsap.set(".hero-img", { scale: 1.75 });

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

            if (isPhone <= 640) {
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
            if (!wrapper) return;

            gsap.fromTo(
              wrapper,
              { x: (-wrapper.scrollWidth - 8) / 2 },
              {
                x: 0,
                duration: 15,
                ease: "none",
                repeat: -1,
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
                scale: isPhone <= 640 ? 10 : 7,
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
            .add(() => setAnimationFinished(true))
            .to(scrollDownRef?.current, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
            });
        });
      }, root);

      return () => ctx.revert();
    },
    { dependencies: [isPhone], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!isPhone) return;
      const container = containerRef.current;
      const wrapper = skillsWrapperRef.current;

      if (!container || !wrapper) return;

      if (isPhone <= 640) {
        gsap.to([container, wrapper, ".top-hero-image-wrapper"], {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        return;
      }

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
    { dependencies: [isPhone], revertOnUpdate: true },
  );

  const HoverButton = () => {
    const container = useRef();
    const tl = useRef();

    useGSAP(
      () => {
        if (!isPhone || !animationFinished) return;

        // Split the text into characters
        const splitA = SplitText.create(".name-top", { type: "chars" });
        const splitB = SplitText.create(".name-bottom", { type: "chars" });

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
                isPhone > 1536
                  ? -65
                  : isPhone <= 640
                    ? -40
                    : isPhone <= 1024
                      ? -42
                      : -58,
              duration: 0.33,
              stagger: 0.02,
              ease: "sine.inOut",
            },
            "<",
          );
      },
      { scope: container },
    );

    const handleMouseEnter = () => tl.current?.play();
    const handleMouseLeave = () => tl.current?.reverse();

    return (
      <span
        ref={container}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex flex-col relative text-[#230322] cursor-pointer rounded-[15px] ml-1.5 sm:ml-2 lg:ml-3 
         px-2 sm:px-4 h-[40px] sm:h-[52px] lg:h-[67px] 2xl:h-[78px] overflow-hidden font-bold hover-button"
      >
        <span className="absolute inset-0 bg-white z-0 origin-left hover-bg" />

        <div className="name-top" role="heading" aria-level="1">
          Papadopoulos
        </div>
        <div className="name-bottom" role="heading" aria-level="1">
          Konstaninos
        </div>
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

  const duplicatedSkills = isPhone <= 640 ? [...skills, ...skills] : skills;

  return (
    <div ref={root} className="max-w-[1920px] mx-auto">
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
          <div className="relative rounded-[4rem] w-full sm:w-[90%] h-full sm:h-[90%] max-h-[1000px]">
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

                  <div
                    ref={contentRef}
                    className="h-full relative flex flex-col justify-between"
                  >
                    <div
                      className="top-hero-content h-full lg:h-auto mt-[10dvh] sm:mt-[5vh] md:mt-[8vh] w-full flex flex-col-reverse lg:flex-row items-center lg:items-end 
                    justify-around lg:justify-between px-5 sm:px-8 lg:px-16 2xl:px-20 gap-[0dvh] sm:gap-[4vh] lg:gap-16 whitespace-nowrap z-[400] [perspective:800px]"
                    >
                      <div className="flex flex-col items-center justify-center header-qr-code">
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="hover:cursor-pointer hover:bg-[#ffffff32] mx-auto border border-[#ffffffc6] shadow-xl rounded-[10px] w-auto h-[clamp(90px,15dvh,120px)] sm:h-[clamp(120px,10vw,160px)]"
                        />
                        <h2 className="mt-[1.5dvh] sm:mt-4 text-[14px] sm:text-[16px] text-white font-inter font-bold text-center">
                          My KeepMe Card
                        </h2>
                      </div>

                      <div className="w-full sm:w-max">
                        <div
                          className="flex flex-nowrap sm:grid sm:grid-cols-5 gap-[8px]"
                          ref={skillsWrapperRef}
                        >
                          {duplicatedSkills.map((skill, index) => (
                            <div
                              key={index}
                              className="skill-item flex-shrink-0 flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#ffffff32] 
                              gap-1 sm:gap-[8px] font-inter font-light text-[12px] lg:text-[14px] text-white bg-[#d6266b]/10
      border border-[#ffffffc6] shadow-xl rounded-[10px] w-[clamp(90px,7vw,140px)] sm:w-[clamp(100px,7.8vw,150px)] h-[clamp(60px,5.25vw,90px)] sm:h-[clamp(66px,5.25vw,100px)] font-inter"
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

                    <div className="bottom-hero-content h-full lg:h-auto mb-24 sm:mb-4 lg:mb-[5vh] w-full flex flex-col xl:flex-row gap-[0dvh] sm:gap-3 xl:gap-[4vh] justify-around lg:justify-between xl:items-end z-10 text-white px-5 sm:px-8 lg:px-16 2xl:px-20">
                      <div className="header-dev">
                        <h1
                          className="text-[30px] sm:text-[40px] lg:text-[54px] 2xl:text-[60px] flex items-center
                              leading-[40px] sm:leading-[44px] lg:leading-[60px] 2xl:leading-[70px] font-ica-rubrik font-bold"
                        >
                          Hey, I'm <HoverButton />
                        </h1>
                        <h1
                          className="text-[1.875rem] sm:text-[2.5rem] lg:text-[3.375rem] 2xl:text-[3.75rem]
                              leading-[2.5rem] sm:leading-[2.75rem] lg:leading-[3.75rem] 2xl:leading-[4.375rem] font-ica-rubrik font-bold"
                        >
                          Web Developer
                        </h1>

                        <p
                          className="mt-1 sm:mt-4 text-[14px] sm:text-[16px] lg:text-[18px] 2xl:text-[20px]
                         leading-[18px] sm:leading-[20px] lg:leading-[22px] 2xl:leading-[24px] text-white max-w-[500px] font-inter font-light"
                        >
                          I’m a 27-year-old Full-stack web developer from
                          Greece, passionate about building modern, interactive
                          websites.
                        </p>
                      </div>

                      <div className="flex flex-col items-end hero-footer-right opacity-100 lg:opacity-100">
                        <h1
                          className="font-bold text-[18px] sm:text-[24px] lg:text-[32px] 2xl:text-[35px]
                        leading-[22px] sm:leading-[28px] lg:leading-[36px] 2xl:leading-[39px] font-inter mb-1 sm:mb-2"
                        >
                          Experience
                        </h1>

                        <div
                          className="flex flex-col gap-1 text-[14px] sm:text-[16px] lg:text-[18px] 2xl:text-[20px]
                        leading-[18px] sm:leading-[20px] lg:leading-[22px] 2xl:leading-[24px] text-white font-inter font-light"
                        >
                          <div className="flex gap-6">
                            <div className="hover:cursor-pointer">
                              B.Sc. Computer Science
                            </div>
                            <div className="hover:cursor-pointer">
                              GPA: 7.5 / 10
                            </div>
                          </div>

                          <div className="flex gap-6">
                            <div className="hover:cursor-pointer">
                              1.5 Years Industry
                            </div>
                            <div className="hover:cursor-pointer">
                              4+ Years Coding
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={scrollDownRef}
            className="absolute bottom-[4dvh] sm:bottom-14 flex flex-col items-center gap-3 opacity-0 translate-y-10"
          >
            {/* The Mouse Outline */}
            <div className="mouse-icon w-[22px] h-[36px] border-2 border-white/50 rounded-full flex justify-center p-1">
              <div className="w-1 h-2 bg-white rounded-full animate-scroll-dot"></div>
            </div>

            {/* Split Text */}
            <div className="scroll-text-container flex gap-2 text-white/50 font-inter font-light text-[10px] tracking-[0.4em] uppercase">
              <span className="scroll-left">Scroll</span>
              <span className="scroll-right">Down</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
