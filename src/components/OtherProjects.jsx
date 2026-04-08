import React, { useCallback, useRef, useState } from "react";
import "./../assets/css/projectsSectionCss.css";
import "./../assets/css/custom.css";
import livingLifeApartment from "./../assets/otherProjects/LivingLifeApartment.PNG";
import spotify from "./../assets/otherProjects/spotifyHome.png";
import happyFarm from "./../assets/otherProjects/happyFarm.png";
import googlePixel from "./../assets/otherProjects/googlePixel3D.PNG";
import webGymApp from "./../assets/otherProjects/webGymApp.png";
import blog from "./../assets/otherProjects/blog.PNG";
import stratego3D from "./../assets/otherProjects/stratego3D.PNG";
import airplane from "./../assets/otherProjects/airplaneGame.PNG";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../AppContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const projects = [
  {
    src: livingLifeApartment,
    alt: "Living Life Apartment",
    description:
      "Website for a house rental where you can view details, address, Google Maps location, phone and socials of the owner. It supports 3 languages.",
    github: "https://github.com/qbeeeeee/HouseRental",
    live: "https://www.livinglifeapartment.com/",
  },
  {
    src: spotify,
    alt: "Spotify Clone",
    description:
      "A music streaming application built using React.js, Express, Node.js, and MongoDB. This project replicates the core functionalities of Spotify, allowing users to search for songs, play music, manage playlists, and explore artists.",
    github: "https://github.com/qbeeeeee/Spotify-clone",
  },
  {
    src: happyFarm,
    alt: "Happy Farm (E-Commerce)",
    description:
      "This project is a full-featured online store for pet foods and accessories. Built using React.js, Express, Node.js, MongoDB, and Stripe, this application provides a seamless shopping experience for users.",
    github: "https://github.com/qbeeeeee/E-Commerce-HappyFarm",
  },
  {
    src: googlePixel,
    alt: "Google Pixel",
    description:
      "Google Pixel 8 Pro Showcase, an interactive 3D website designed to highlight the cutting-edge features of the Pixel 8 Pro. Built with GSAP and ScrollTrigger, this immersive experience combines smooth scrolling animations with 3D visuals.",
    github: "https://github.com/qbeeeeee/3D-Pixel-Phone-Showcase",
  },
  {
    src: webGymApp,
    alt: "Web Gym App",
    description:
      "A workout management tool built with React.js, Tailwind CSS, Express, Node.js, and MongoDB. This application allows you to add exercises to your routine. Track your progress over time by viewing previous workouts, and analyze your improvement through detailed diagrams and graphs.",
    github: "https://github.com/qbeeeeee/WebGymApp",
  },
  {
    src: blog,
    alt: "Blog",
    description:
      "A blogging platform where users can create an account and publish their own blog posts. Posts can be managed and updated through a personal dashboard, allowing users to edit or modify their content at any time. Other users can view posts, like them, and leave comments.",
    github: "https://github.com/qbeeeeee/Blog",
  },
  {
    src: stratego3D,
    alt: "Stratego 3D",
    description:
      "A Unity-made version of the classic Stratego board game presented in a 3D environment. Players first build and arrange their army, then start the match and move their pawns across the board. The game also includes a settings menu where players can adjust graphics, audio, and resolution.",
    github: "https://github.com/qbeeeeee/Stratego-3D",
  },
  {
    src: airplane,
    alt: "Airplane 3D",
    description:
      "A Unity-made airplane game built with a custom terrain and an airplane model created in Blender. The world includes roads, trees, grass, and houses. It features particle systems for snowfall, clouds, and explosions, sound effects, and physics-based airplane movement allowing directional control and speed adjustments.",
    github: "https://github.com/qbeeeeee/Airplane-Game",
  },
];

const OtherProjects = ({ animationFinished }) => {
  const { isPhone, stopScroll, resumeScroll } = useAppContext();

  const projectsWrapperRef = useRef(null);
  const planetRef = useRef(null);
  const projectInfoRef = useRef(null);

  const [activeProject, setActiveProject] = useState(null);
  const spinTweenRef = useRef(null);

  const spinRef = useRef(null);
  const projectRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const isAnimating = useRef(false);

  useGSAP(
    () => {
      if (!animationFinished) return;
      const projectsWrapper = projectsWrapperRef?.current;

      gsap.to(projectsWrapper, {
        opacity: 1,
        duration: 0.1,
        pointerEvents: "auto",
        scrollTrigger: {
          trigger: projectsWrapper,
          start: () => {
            const menuTrigger = ScrollTrigger.getById("keepme-components");
            return menuTrigger?.end + 150 || 0;
          },
          toggleActions: "play reverse play reverse",
        },
      });
    },
    { dependencies: [animationFinished], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (!isPhone) return;

      const planet = planetRef?.current;
      const projectsWrapper = projectsWrapperRef?.current;
      const spin = spinRef?.current;

      if (!planet || !projectsWrapper || !spin) return;

      spinTweenRef.current = gsap.to(spin, {
        "--offset": "+=360deg",
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projectsScroll",
          trigger: projectsWrapper,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Planet entrance
      tl.fromTo(planet, { y: "-220vh", scale: 0.6 }, { y: 0, scale: 1 }, 0);

      // Projects wrapper scroll rotation
      tl.to(projectsWrapper, { "--offset": "0deg" }, 0);

      // Tilt animation
      tl.fromTo(
        projectsWrapper,
        { "--tilt": "5deg" },
        { "--tilt": "-24deg" },
        0,
      );

      // Scroll spin
      tl.fromTo(
        spin,
        { "--scrollSpin": "0deg" },
        { "--scrollSpin": "100deg" },
        0,
      );

      // Z-axis depth
      tl.fromTo(
        projectRefs.current,
        {
          "--zaxis":
            isPhone <= 640 ? "150px" : isPhone <= 1024 ? "200px" : "350px",
        },
        {
          "--zaxis":
            isPhone <= 640 ? "300px" : isPhone <= 1024 ? "400px" : "530px",
        },
        0,
      );
    },
    { dependencies: [isPhone], revertOnUpdate: true },
  );

  const { contextSafe } = useGSAP();

  const scrollToComponent = useCallback(
    contextSafe(() => {
      const st = ScrollTrigger.getById("projectsScroll");
      if (!st) return;

      stopScroll();

      gsap.to(window, {
        scrollTo: st.end,
        duration: 1,
        ease: "expo.inOut",
      });
    }),
    [contextSafe],
  );

  const handleProjectClick = (project, index) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    spinTweenRef.current?.pause();

    scrollToComponent();

    const anglePerProject = 360 / projects.length;

    // get current rotation from CSS variables
    const style = getComputedStyle(spinRef.current);
    const currentOffset = parseFloat(style.getPropertyValue("--offset")) || 0;
    const currentScrollSpin =
      parseFloat(style.getPropertyValue("--scrollSpin")) || 0;

    const currentRotation = currentOffset + currentScrollSpin;

    // target angle for the project
    const targetAngle = index * anglePerProject;

    // compute the offset2 needed to bring project to center
    const targetOffset2 = -(
      currentRotation +
      targetAngle -
      (currentScrollSpin - (isPhone <= 640 ? 101.6 : 100))
    );

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(project);
        showProjectInfo();

        isAnimating.current = false;
      },
    });

    tl.to(
      spinRef.current,
      {
        duration: 1,
        top: isPhone <= 640 ? "35%" : "40%",
        "--offset2": `${targetOffset2}deg`,
        "--tilt2": "25deg",
        ease: "power1.inOut",
      },
      0,
    );

    tl.to(
      projectRefs.current[index],
      {
        duration: 1,
        "--zaxis":
          isPhone <= 640 ? "400px" : isPhone <= 1024 ? "500px" : "650px",
        ease: "power1.inOut",
      },
      0.6,
    );
  };

  const handleCloseProject = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setCurrentIndex(null);

    const style = getComputedStyle(spinRef.current);
    const currentOffset2 = parseFloat(style.getPropertyValue("--offset2")) || 0;

    const normalized = ((currentOffset2 % 360) + 360) % 360;

    gsap.set(spinRef.current, {
      "--offset2": `${normalized}deg`,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(null);
        resumeScroll();

        spinTweenRef.current?.resume();
        isAnimating.current = false;
      },
    });

    tl.add(hideProjectInfo(), 0.1);

    tl.to(
      projectRefs.current[currentIndex],
      {
        duration: 1,
        "--zaxis":
          isPhone <= 640 ? "300px" : isPhone <= 1024 ? "400px" : "530px",
        ease: "power1.inOut",
      },
      0.6,
    );

    tl.to(
      spinRef.current,
      {
        duration: 1,
        top: "10%",
        "--tilt2": "0deg",
        "--offset2": "0deg",
        ease: "power1.inOut",
      },
      0.7,
    );
  };

  const showProjectInfo = () => {
    const tl = gsap.timeline({});

    tl.to(
      projectInfoRef.current,
      {
        width:
          isPhone <= 640
            ? "clamp(280px, 100dvw, 450px)"
            : isPhone <= 1024
              ? "clamp(1000px, 100vw, 1400px)"
              : "clamp(1150px, 80vw, 1400px)",
        height:
          isPhone <= 640
            ? "clamp(450px, 100dvh, 700px)"
            : isPhone <= 1024
              ? "clamp(600px, 70vh, 700px)"
              : "clamp(600px, 50vw, 700px)",
      },
      0,
    );
  };

  const hideProjectInfo = () => {
    return gsap.to(projectInfoRef.current, {
      duration: 0.6,
      width: "clamp(0px, 0vh, 0px)",
      height: "clamp(0px, 0vh, 0px)",
      ease: "power2.in",
    });
  };

  const nextProject = (isPrev) => {
    if (currentIndex === null) return;
    if (gsap.isTweening(spinRef.current)) return;

    const nextIndex =
      (currentIndex + (isPrev ? -1 : 1) + projects.length) % projects.length;

    const next = projects[nextIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(nextIndex);
        setActiveProject(next);
        showProjectInfo();
      },
    });

    tl.to(projectRefs.current[currentIndex], {
      duration: 0.5,
      "--zaxis": isPhone <= 640 ? "300px" : isPhone <= 1024 ? "400px" : "530px",
      ease: "power1.inOut",
    });

    tl.to(
      projectRefs.current[nextIndex],
      {
        duration: 0.5,
        "--zaxis":
          isPhone <= 640 ? "400px" : isPhone <= 1024 ? "500px" : "650px",
        ease: "power1.inOut",
      },
      "<",
    );

    const style = getComputedStyle(spinRef.current);
    const targetOffset2 = parseFloat(style.getPropertyValue("--offset2")) || 0;

    const rotation = isPrev ? 45 : -45;

    tl.to(
      spinRef.current,
      {
        duration: 1,
        top: isPhone <= 640 ? "35%" : "40%",
        "--offset2": `${targetOffset2 + rotation}deg`,
        ease: "power1.inOut",
      },
      0,
    );
  };

  return (
    <div
      ref={projectsWrapperRef}
      className="w-full h-[100vh] max-h-[800px] sm:max-h-[min(100vh,1000px)] flex items-center justify-center text-center relative opacity-0 [transform-style:preserve-3d] [transform:perspective(1200px)] mt-[35dvh] z-10"
    >
      <div
        ref={spinRef}
        className={`spin-container absolute top-[10%] z-[2]
          w-[300px] h-auto left-[calc(50%-150px)]
          max-lg:w-[200px] max-lg:left-[calc(50%-100px)]
          max-md:w-[180px] max-md:left-[calc(50%-80px)]
      `}
        style={{ "--quantity": 8 }}
      >
        {projects.map((project, index) => (
          <div
            ref={(el) => (projectRefs.current[index] = el)}
            className={`item ${
              !currentIndex &&
              "cursor-pointer hover:border-[1.5px] hover:border-[#ff5ec7]"
            }`}
            key={index}
            style={{ "--position": index + 1 }}
            onClick={() => {
              if (currentIndex) {
                return;
              }
              setCurrentIndex(index);
              handleProjectClick(project, index);
            }}
          >
            <img
              className="w-full h-full object-cover"
              src={project.src}
              alt={project.alt}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-[40%] sm:bottom-[20%] lg:bottom-0 left-1/2 -translate-x-1/2 w-[min(1500px,100vw)] h-max pb-[60px] z-[1]">
        <div className="flex flex-col items-center justify-center w-full">
          <h1
            data-content="PROJECTS"
            className="font-ica-rubrik galaxy-header relative text-[9vh] sm:text-[150px] lg:text-[200px] 2xl:text-[250px]"
          >
            PROJECTS
          </h1>

          <div className="font-inter sm:text-[18px] xl:text-[24px] text-white z-[100]">
            Select a project to view more details.
          </div>
        </div>

        <div
          ref={planetRef}
          className="absolute -bottom-[40%] left-0 w-full h-[400px] sm:h-[700px] lg:h-[100vh] max-h-[920px] z-[1]
            bg-[url('/src/assets/otherProjects/earthPurpleAndBlue.png')]
            bg-[length:auto_110%] bg-no-repeat bg-center"
        />
      </div>

      <div
        ref={projectInfoRef}
        style={{
          transform: `translateZ(${isPhone <= 640 ? 350 : isPhone <= 1024 ? 450 : 600}px)`,
          scale: isPhone <= 640 ? 0.62 : isPhone <= 1024 ? 0.6 : 0.55,
        }}
        className="flex flex-col items-center justify-center h-0 w-0 bg-[#d6266b] rounded-[40px] relative overflow-hidden"
      >
        <h2 className="absolute top-[5%] text-4xl font-bold font-ica-rubrik text-black">
          {activeProject?.alt}
        </h2>

        <p
          data-lenis-prevent
          className="absolute bottom-[5%] text-center max-w-[90vw] lg:max-w-[60vw] max-h-[20vh] overflow-y-auto overscroll-none font-inter font-semibold text-[18px] text-black"
        >
          {activeProject?.description}
        </p>

        <div className="absolute bottom-[30vh] sm:bottom-1/2 flex justify-between w-full px-[4%] sm:px-[5%]">
          <div className="flex flex-col gap-5">
            {activeProject?.github && (
              <a
                href={activeProject?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projectViewButton font-inter"
              >
                View Code
              </a>
            )}
            <button
              onClick={() => nextProject(true)}
              className="projectViewButton font-inter"
            >
              Prev Project
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <a
              href={activeProject?.live || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="projectViewButton font-inter"
              style={{ visibility: activeProject?.live ? "visible" : "hidden" }}
            >
              Visit Site
            </a>
            <button
              onClick={() => nextProject()}
              className="projectViewButton font-inter"
            >
              Next Project
            </button>
          </div>
        </div>

        <button
          className="absolute top-[5%] right-[2%] text-black"
          aria-label={`Close ${activeProject?.alt}`}
          onClick={() => handleCloseProject()}
        >
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="w-7 h-auto"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default OtherProjects;
