import React, { useRef, useState } from "react";
import "./../assets/css/projectsSectionCss.css";
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
import { createPortal } from "react-dom";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    src: livingLifeApartment,
    alt: "Living Life Apartment",
    title: "Project One",
    description: "This is a detailed description for Project One.",
  },
  {
    src: spotify,
    alt: "Spotify Clone",
    title: "Project One",
    description: "This is a detailed description for Project One.",
  },
  { src: happyFarm, alt: "Happy Farm" },
  { src: googlePixel, alt: "Google Pixel" },
  { src: webGymApp, alt: "Web Gym App" },
  { src: blog, alt: "Blog" },
  { src: stratego3D, alt: "Stratego 3D" },
  { src: airplane, alt: "Airplane 3D" },
];

const ProjectsSectionV2 = () => {
  const projectsWrapperRef = useRef(null);
  const planetRef = useRef(null);
  const projectInfoRef = useRef(null);

  useGSAP(
    () => {
      const menuTrigger = ScrollTrigger.getById("keepme-sections-scroll");
      const projectsWrapper = projectsWrapperRef?.current;

      gsap.to(projectsWrapper, {
        opacity: 1,
        duration: 0.1,
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

  useGSAP(
    () => {
      const planet = planetRef?.current;
      const projectsWrapper = projectsWrapperRef?.current;

      if (!planet || !projectsWrapper) return;

      // Get the final Y position from the element's current bottom
      const finalY = 0; // You can adjust if needed; Tailwind already positions it at -50% bottom

      gsap.fromTo(
        planet,
        { y: "-220vh", scale: 0.6 }, // start completely off-screen top
        {
          y: finalY, // end at your defined bottom position
          scale: 1,
          scrollTrigger: {
            trigger: projectsWrapper,
            start: "top bottom", // when projectsWrapper bottom hits viewport bottom
            end: "bottom bottom", // scroll distance over which animation occurs
            scrub: true, // ties animation to scroll
          },
        }
      );

      gsap.to(projectsWrapper, {
        "--offset": "0deg",
        "--offset2": "360deg",
        scrollTrigger: {
          trigger: projectsWrapper,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.fromTo(
        projectsWrapper,
        { "--tilt": "10deg" },
        {
          "--tilt": "-14deg",
          scrollTrigger: {
            trigger: projectsWrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        spinRef?.current,
        { "--scrollSpin": "0deg" },
        {
          "--scrollSpin": "100deg",
          scrollTrigger: {
            trigger: projectsWrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        projectRefs?.current,
        { "--zaxis": "350px" },
        {
          "--zaxis": "530px",
          scrollTrigger: {
            trigger: projectsWrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    },
    { dependencies: [], revertOnUpdate: true }
  );

  const [activeProject, setActiveProject] = useState(null);

  const spinRef = useRef(null);
  const projectRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState("");

  const handleProjectClick = (project, index) => {
    const anglePerProject = 360 / projects.length;

    const targetOffset = -index * anglePerProject;

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
        "--offset": `${targetOffset - 100}deg`,
        "--offset2": `${targetOffset - 100}deg`,
        "--tilt2": "14deg",
        // "--scrollSpin": "0deg",
        ease: "power1.inOut",
      },
      0
    );

    tl.to(
      projectRefs.current[index],
      {
        duration: 1,
        "--zaxis": "650px",
        ease: "power1.inOut",
      },
      0.6
    );
  };

  const handleCloseProject = () => {
    const tl = gsap.timeline({
      onComplete: () => setActiveProject(null),
    });

    tl.to(
      projectRefs.current[currentIndex],
      {
        duration: 1,
        "--zaxis": "530px",
        ease: "power1.inOut",
      },
      0
    );

    tl.to(
      spinRef.current,
      {
        duration: 1,
        top: "10%",
        "--offset": `0deg`,
        "--offset2": `360deg`,
        "--tilt2": "0deg",
        ease: "power1.inOut",
      },
      0.1
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
      0
    );
  };

  return (
    <div
      ref={projectsWrapperRef}
      className="w-full h-[100vh] text-center relative opacity-0 [transform-style:preserve-3d] [transform:perspective(100000px)] mt-[1000px]"
    >
      <div
        ref={spinRef}
        className={`spin-animation absolute top-[10%] z-[2] [transform-style:preserve-3d] [transform:perspective(1000px)]
          w-[300px] h-[150px] left-[calc(50%-150px)]
          max-lg:w-[160px] max-lg:h-[200px] max-lg:left-[calc(50%-80px)]
          max-md:w-[100px] max-md:h-[150px] max-md:left-[calc(50%-50px)]
        ${activeProject ? "pause-animation" : ""}
      `}
        style={{ "--quantity": 8 }}
      >
        {projects.map((project, index) => (
          <div
            ref={(el) => (projectRefs.current[index] = el)}
            className={`item cursor-pointer hover:border-2 
            hover:border-[#ff5ec7]`}
            key={index}
            style={{ "--position": index + 1 }}
            onClick={() => {
              setCurrentIndex(index);
              handleProjectClick(project, index);
            }}
          >
            <img
              className="w-full h-full object-fill"
              src={project.src}
              alt={project.alt}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(1500px,100vw)] h-max pb-[100px] 
      flex flex-wrap justify-between items-center z-[1] px-10"
      >
        <h1
          data-content="PROJECTS"
          className="font-ica-rubrik galaxy-header relative text-[16em] leading-[1em]"
        >
          PROJECTS
        </h1>

        <div
          className="font-poppins text-right max-w-[200px] text-white
            max-lg:z-[2] max-lg:w-full max-lg:max-w-none max-lg:text-center max-lg:px-[30px] max-lg:[text-shadow:0_10px_20px_#000]
          "
        >
          <h2 className="text-[3em]">LUN DEV</h2>
          <p>
            <b>Web Design</b>
          </p>
          <p>Subscribe to the channel to watch many interesting videos</p>
        </div>

        <div
          ref={planetRef}
          className="absolute -bottom-[40%] left-0 w-full h-[100vh] z-[1]
            bg-[url('/src/assets/otherProjects/earthPurpleAndBlue.png')]
            bg-[length:auto_110%] bg-no-repeat bg-center"
        />
      </div>

      <div
        ref={projectInfoRef}
        className="fixed left-1/2 top-[48%] transform -translate-x-1/2 -translate-y-1/2 z-[1000000000]
             inset-0 flex flex-col items-center justify-center bg-white h-0 w-0"
        onClick={(e) => {
          e.stopPropagation();
          setActiveProject(null);
        }}
      >
        <h2 className="text-2xl font-bold">{activeProject?.title}</h2>
        <img
          src={activeProject?.src}
          alt={activeProject?.alt}
          className="w-[600px] h-auto"
        />
        <p>{activeProject?.description}</p>
        <button
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900"
          onClick={() => handleCloseProject()}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ProjectsSectionV2;
