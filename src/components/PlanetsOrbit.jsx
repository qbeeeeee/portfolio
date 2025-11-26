import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import moon from "./../assets/solarTextures/earth.jpg";
import sun from "./../assets/solarTextures/sun.jpg";
import jupiter from "./../assets/solarTextures/jupiter.jpg";
import mars from "./../assets/solarTextures/mars.jpg";
import neptune from "./../assets/solarTextures/neptune.jpg";
import uranus from "./../assets/solarTextures/uranus.jpg";
import venus from "./../assets/solarTextures/venus.jpg";

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const SolarSystem = () => {
  const wrappersRef = useRef([]);
  const tlRefs = useRef([]);
  const planetRefs = useRef([]);
  const containerRef = useRef(null);

  const planets = [
    {
      size: 20,
      color: "bg-blue-400",
      colorHex: "#60a5fa",
      radius: 80,
      speed: 0.02,
      icon: mars,
    },
    {
      size: 25,
      color: "bg-red-400",
      colorHex: "#f87171",
      radius: 120,
      speed: 0.015,
      icon: mars,
    },
    {
      size: 30,
      color: "bg-green-400",
      colorHex: "#4ade80",
      radius: 160,
      speed: 0.01,
      icon: neptune,
    },
    {
      size: 35,
      color: "bg-purple-400",
      colorHex: "#c084fc",
      radius: 200,
      speed: 0.007,
      icon: uranus,
    },
    {
      size: 40,
      color: "bg-orange-400",
      colorHex: "#fb923c",
      radius: 240,
      speed: 0.005,
      icon: jupiter,
    },
  ];

  useGSAP(
    () => {
      wrappersRef.current = wrappersRef.current.slice(0, planets.length);
      tlRefs.current.forEach((t) => t && t.kill()); // cleanup

      const speeds = planets.map((p) => p.speed);
      const maxSpeed = Math.max(...speeds);
      const baseDuration = 6;

      // Create planet motion timelines
      planets.forEach((p, i) => {
        const planet = planetRefs.current[i];
        if (!planet) return;

        const duration = (maxSpeed / p.speed) * baseDuration;

        const xScale = 2;
        const yScale = 1.0;

        const a = p.radius * xScale;
        const b = p.radius * yScale;

        const ellipse = new Array(360).fill(0).map((_, deg) => {
          const rad = (deg * Math.PI) / 180;
          return { x: a * Math.cos(rad), y: b * Math.sin(rad) };
        });

        gsap.set(planet, { x: a * Math.cos(0), y: b * Math.sin(0) });

        const tl = gsap.to(planet, {
          motionPath: { path: ellipse, align: false, autoRotate: false },
          duration,
          repeat: -1,
          ease: "none",
        });

        tlRefs.current[i] = tl;
      });
    },
    { dependencies: [planets], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        {
          x: 800,
          y: 600,
          z: -10000,
          opacity: 0,
        },
        {
          motionPath: {
            path: [
              { x: 800, y: 600, z: -10000 },
              { x: 0, y: 0, z: 200 },
            ],
            curviness: 5,
          },
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top-=500",
            end: "+=1500",
            scrub: true,
          },
        }
      );
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        perspective: "1000px",
      }}
    >
      <div className="text-white text-[52px] mt-10 absolute top-[5%]">
        Selected Projects
      </div>

      <div
        className="bg-white rounded-[40px] w-[300px] h-[300px] 
      absolute top-1/2 left-[3%] transform -translate-y-1/2"
      ></div>

      <div
        ref={containerRef}
        className="relative w-[800px] h-[800px]"
        style={{
          transform: "rotateX(50deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Sun */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "96px",
            height: "110px",
            borderRadius: "50%",
            overflow: "hidden",
            position: "absolute",

            boxShadow: `
              inset -12px -12px 24px rgba(0,0,0,0.4),
              inset 10px 10px 20px rgba(255,255,255,0.2),
              0 0 24px rgba(255,200,0,0.8)
            `,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background: `url(${sun})`,
              backgroundSize: "200% 200%",
              backgroundPosition: "0 0",
              animation: "spin-sun 60s linear infinite",
            }}
          ></div>
        </div>

        {/* Orbits + planets: each planet sits inside a wrapper equal to orbit diameter */}
        {planets.map((p, i) => {
          const xScale = 2; // wider orbit
          const yScale = 1.0; // default height

          const orbitWidth = p.radius * 2 * xScale;
          const orbitHeight = p.radius * 2 * yScale;

          return (
            <React.Fragment key={i}>
              {/* Orbit (NOT spinning) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   border border-dashed border-white/15 pointer-events-none"
                style={{
                  width: `${orbitWidth}px`,
                  height: `${orbitHeight}px`,
                  borderRadius: "50% / 50%",
                }}
              ></div>

              {/* Wrapper (spins planet only) */}
              <div
                ref={(el) => (wrappersRef.current[i] = el)}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: `${p.radius * 2}px`, // keep circle for rotation
                  height: `${p.radius * 2}px`,
                  position: "absolute",
                  transformOrigin: "50% 50%",
                }}
              >
                {/* Planet */}
                <div
                  ref={(el) => (planetRefs.current[i] = el)}
                  className="absolute"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    left: `calc(50% - ${p.size / 2}px)`,
                    top: `calc(50% - ${p.size / 2}px)`,
                    borderRadius: "50%",
                    overflow: "hidden", // ⭐ important so child stays circular
                    position: "absolute",

                    // lighting/shading to make it look spherical
                    boxShadow: `
                      inset -8px -8px 16px rgba(0,0,0,0.55),
                      inset 10px 10px 20px rgba(255,255,255,0.35),
                      0 0 8px rgba(0,0,0,0.6)
                    `,
                  }}
                >
                  {/* ⭐ Inner rotating texture layer */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: `url(${p.icon})`,
                      backgroundSize: "200% 100%", // makes texture rotate more visibly
                      backgroundPosition: "0 0",
                      animation: "spin-map 20s linear infinite",
                    }}
                  ></div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default SolarSystem;
