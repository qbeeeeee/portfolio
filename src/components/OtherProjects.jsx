import React, { useCallback, useRef, useState } from "react";
import "./../assets/css/projectsSectionCss.css";
import "./../assets/css/custom.css";
import livingLifeApartment from "./../assets/otherProjects/livingLifeApartment.PNG";
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
import { faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

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

const OtherProjects = ({ stopScroll, resumeScroll, animationFinished }) => {
  const projectsWrapperRef = useRef(null);
  const planetRef = useRef(null);
  const projectInfoRef = useRef(null);

  const [activeProject, setActiveProject] = useState(null);
  const spinTweenRef = useRef(null);

  useGSAP(
    () => {
      if (!animationFinished) return;

      const menuTrigger = ScrollTrigger.getById("keepme-components");
      const projectsWrapper = projectsWrapperRef?.current;

      gsap.to(projectsWrapper, {
        opacity: 1,
        duration: 0.1,
        pointerEvents: "auto",
        scrollTrigger: {
          trigger: ".projects-container",

          // THIS is the key line
          start: () => menuTrigger?.end + 200,

          toggleActions: "play reverse play reverse",
        },
      });
    },
    { dependencies: [animationFinished], revertOnUpdate: true },
  );

  useGSAP(
    () => {
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

      // Planet entrance animation
      gsap.fromTo(
        planet,
        { y: "-220vh", scale: 0.6 },
        {
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: projectsWrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      // Scroll rotation offset
      gsap.to(projectsWrapper, {
        "--offset": "0deg",
        scrollTrigger: {
          trigger: projectsWrapper,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Tilt animation
      gsap.fromTo(
        projectsWrapper,
        { "--tilt": "5deg" },
        {
          "--tilt": "-24deg",
          scrollTrigger: {
            trigger: projectsWrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      // Additional scroll spin
      gsap.fromTo(
        spin,
        { "--scrollSpin": "0deg" },
        {
          "--scrollSpin": "100deg",
          scrollTrigger: {
            trigger: projectsWrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );

      // Z axis depth
      gsap.fromTo(
        projectRefs?.current,
        { "--zaxis": "350px" },
        {
          "--zaxis": "530px",
          scrollTrigger: {
            id: "projectsScroll",
            trigger: projectsWrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    },
    { dependencies: [], revertOnUpdate: true },
  );

  const spinRef = useRef(null);
  const projectRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(null);

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
      (currentScrollSpin - 98.95)
    );

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveProject(project);
        showProjectInfo();
      },
    });

    tl.to(
      spinRef.current,
      {
        duration: 1,
        top: "40%",
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
        "--zaxis": "650px",
        ease: "power1.inOut",
      },
      0.6,
    );
  };

  const handleCloseProject = () => {
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
      },
    });

    tl.add(hideProjectInfo(), 0.1);

    tl.to(
      projectRefs.current[currentIndex],
      {
        duration: 1,
        "--zaxis": "530px",
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
      projectInfoRef?.current,
      {
        width: "80vw",
        height: "80vh",
      },
      0,
    );
  };

  const hideProjectInfo = () => {
    return gsap.to(projectInfoRef.current, {
      duration: 0.6,
      width: "0vw",
      height: "0vh",
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
      "--zaxis": "530px",
      ease: "power1.inOut",
    });

    tl.to(
      projectRefs.current[nextIndex],
      {
        duration: 0.5,
        "--zaxis": "650px",
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
        top: "40%",
        "--offset2": `${targetOffset2 + rotation}deg`,
        ease: "power1.inOut",
      },
      0,
    );
  };

  return (
    <div
      ref={projectsWrapperRef}
      className="w-full h-[100vh] flex items-center justify-center text-center relative opacity-0 [transform-style:preserve-3d] [transform:perspective(1200px)] mt-[0vh] z-10"
    >
      <div
        ref={spinRef}
        className={`spin-container absolute top-[10%] z-[2]
          w-[300px] h-auto left-[calc(50%-150px)]
          max-lg:w-[160px] max-lg:h-[200px] max-lg:left-[calc(50%-80px)]
          max-md:w-[20vh] max-md:h-[12vh] max-md:left-[calc(50%-70px)]
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

      <div className="absolute bottom-[40%] sm:bottom-0 left-1/2 -translate-x-1/2 w-[min(1500px,100vw)] h-max pb-[9vh] z-[1]">
        <div className="flex flex-col items-center justify-center w-full">
          <h1
            data-content="PROJECTS"
            className="font-ica-rubrik galaxy-header relative text-[9vh] sm:text-[27.5vh] leading-[1em]"
          >
            PROJECTS
          </h1>

          <div className="font-inter text-white z-[100]">
            Select a project to view more details.
          </div>
        </div>

        <div
          ref={planetRef}
          className="absolute -bottom-[40%] left-0 w-full h-[70vh] sm:h-[100vh] z-[1]
            bg-[url('/src/assets/otherProjects/earthPurpleAndBlue.png')]
            bg-[length:auto_110%] bg-no-repeat bg-center"
        />
      </div>

      <div
        ref={projectInfoRef}
        style={{ transform: "translateZ(600px)", scale: 0.55 }}
        className="flex flex-col items-center justify-center h-0 w-0 bg-[#d6266b] rounded-[40px] relative overflow-hidden"
      >
        <h2 className="absolute top-[5%] text-4xl font-bold font-ica-rubrik text-black">
          {activeProject?.alt}
        </h2>

        <p className="absolute bottom-[5%] text-center max-w-[60vw] font-inter font-semibold text-[18px] text-black">
          {activeProject?.description}
        </p>

        <div className="absolute bottom-1/2 flex justify-between w-full px-[5%]">
          <div className="flex flex-col gap-5">
            {activeProject?.github && (
              <a
                href={activeProject?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="projectViewButton"
              >
                View Code
              </a>
            )}
            <button
              onClick={() => nextProject(true)}
              className="projectViewButton"
            >
              Prev Project
            </button>
          </div>

          <div className="flex flex-col gap-5">
            <a
              href={activeProject?.live || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="projectViewButton"
              style={{ visibility: activeProject?.live ? "visible" : "hidden" }}
            >
              Visit Site
            </a>
            <button onClick={() => nextProject()} className="projectViewButton">
              Next Project
            </button>
          </div>
        </div>

        <button
          className="absolute top-[5%] right-[2%] text-black"
          onClick={() => handleCloseProject()}
        >
          <FontAwesomeIcon icon={faXmarkCircle} className="w-7 h-auto" />
        </button>
      </div>
    </div>
  );
};

export default OtherProjects;
