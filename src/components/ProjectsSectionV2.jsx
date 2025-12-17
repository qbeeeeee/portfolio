import React, { useRef } from "react";
import test from "./../assets/test.jpg";
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

gsap.registerPlugin(ScrollTrigger);

const ProjectsSectionV2 = () => {
  const projectsWrapperRef = useRef(null);

  useGSAP(
    () => {
      const menuTrigger = ScrollTrigger.getById("keepme-sections-scroll");
      const projectsWrapper = projectsWrapperRef?.current;

      gsap.to(projectsWrapper, {
        opacity: 1,
        duration: 0.8,
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

  return (
    <div
      ref={projectsWrapperRef}
      className="w-full h-[100vh] text-center relative opacity-0"
    >
      <div
        className="spin-animation absolute top-[10%] z-[2] [transform-style:preserve-3d] [transform:perspective(1000px)]
        w-[300px] h-[150px] left-[calc(50%-150px)]
        max-lg:w-[160px] max-lg:h-[200px] max-lg:left-[calc(50%-80px)]
        max-md:w-[100px] max-md:h-[150px] max-md:left-[calc(50%-50px)]
      "
        style={{ "--quantity": 8 }}
      >
        <div className="item" style={{ "--position": 1 }}>
          <img
            className="w-full h-full object-fill"
            src={livingLifeApartment}
            alt="Living Life Apartment"
          />
        </div>
        <div className="item" style={{ "--position": 2 }}>
          <img
            className="w-full h-full object-fill"
            src={spotify}
            alt="Spotify Clone"
          />
        </div>
        <div className="item" style={{ "--position": 3 }}>
          <img
            className="w-full h-full object-fill"
            src={happyFarm}
            alt="Happy Farm"
          />
        </div>
        <div className="item" style={{ "--position": 4 }}>
          <img
            className="w-full h-full object-fill"
            src={googlePixel}
            alt="Google Pixel"
          />
        </div>
        <div className="item" style={{ "--position": 5 }}>
          <img
            className="w-full h-full object-fill"
            src={webGymApp}
            alt="Web Gym App"
          />
        </div>
        <div className="item" style={{ "--position": 6 }}>
          <img className="w-full h-full object-fill" src={blog} alt="Blog" />
        </div>
        <div className="item" style={{ "--position": 7 }}>
          <img
            className="w-full h-full object-fill"
            src={stratego3D}
            alt="Stratego 3D"
          />
        </div>
        <div className="item" style={{ "--position": 8 }}>
          <img
            className="w-full h-full object-fill"
            src={airplane}
            alt="Airplane 3D"
          />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(1500px,100vw)] h-max pb-[100px] 
      flex flex-wrap justify-between items-center z-[1] px-10"
      >
        <h1
          data-content="PROJECTS"
          className="font-ica-rubrik
            relative text-[16em] leading-[1em] text-[#3b1f3d]
            after:content-[attr(data-content)] after:absolute after:inset-0 after:z-[2] after:text-transparent after:[-webkit-text-stroke:2px_#d2d2d2]
            max-lg:text-center max-lg:w-full max-lg:text-[7em] max-lg:[text-shadow:0_10px_20px_#000] max-md:text-[5em]
          "
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
          className="absolute -bottom-[50%] left-0 w-full h-[100vh] z-[1]
            bg-[url('/src/assets/otherProjects/earthPurpleAndBlue.png')]
            bg-[length:auto_110%] bg-no-repeat bg-center"
        />
      </div>
    </div>
  );
};

export default ProjectsSectionV2;
