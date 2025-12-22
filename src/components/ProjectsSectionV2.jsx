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
        { "--offset": "0deg" },
        {
          "--offset": "100deg",
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

  const handleProjectClick = (project, index) => {
    const anglePerProject = 360 / projects.length;

    const targetOffset = -index * anglePerProject;

    gsap.to(spinRef?.current, {
      duration: 1,
      "--offset": `${targetOffset}deg`,
      ease: "power1.inOut",
      onComplete: () => setActiveProject(project),
    });
  };

  return (
    <div
      ref={projectsWrapperRef}
      className="w-full h-[100vh] text-center relative opacity-0 [transform-style:preserve-3d] [transform:perspective(100000px)] mt-[400px]"
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
            className={`item cursor-pointer transition-transform duration-300 hover:border-1 
            hover:border-white hover:shadow-[0_0_20px_#fff] `}
            key={index}
            style={{ "--position": index + 1 }}
            onClick={() => handleProjectClick(project, index)}
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

      {activeProject &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
            onClick={() => setActiveProject(null)} // closes modal
          >
            <div
              className="bg-white p-6 rounded-lg max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside modal
            >
              <h2 className="text-2xl font-bold mb-4">{activeProject.title}</h2>
              <img
                src={activeProject.src}
                alt={activeProject.alt}
                className="w-full h-auto mb-4"
              />
              <p>{activeProject.description}</p>
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setActiveProject(null)}
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ProjectsSectionV2;
