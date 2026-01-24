import React, { use, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import keepme from "./../../assets/keepme/KeepMe_logo_fullcolor_rgb.svg";
import keepMeProfilePage from "./../../assets/keepme/ProfilePage.mp4";
import KeepMeComponents from "./KeepMeComponents";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const logoPaths = [
  "M0,.89685h17.84739v77.09546l-4.28337-1.78474,36.76562-31.4114c2.0157-1.90022,4.33587-2.88183,6.96048-2.94482,2.61412-.05774,4.7558.86612,6.42506,2.76634,1.78474,1.90547,2.51963,4.1049,2.22567,6.60353-.29396,2.49863-1.51178,4.76105-3.65346,6.78201l-30.87598,26.23566,31.58987,26.59261c2.14169,2.0262,3.32801,4.34636,3.56948,6.96048.23097,2.61937-.59841,4.88179-2.49863,6.78201-1.91072,2.02095-4.16789,3.0918-6.78201,3.21253-2.62462.11548-4.94478-.83463-6.96048-2.85558l-36.76562-31.4114,4.28337-1.78474v34.08851H0V.89685Z",
  "M147.18676,62.25235c-3.45399-6.36207-8.24129-11.35934-14.3724-14.9918-6.1311-3.62722-13.11258-5.44345-20.96543-5.44345h-.35695c-7.85285,0-14.84483,1.81623-20.97593,5.44345-6.1206,3.63247-10.88691,8.65598-14.27791,15.08104-3.391,6.42506-5.08126,13.627-5.08126,21.59534,0,7.97358,1.86873,15.14403,5.61668,21.5061,3.74795,6.36732,9.01818,11.33309,15.80019,14.90257,6.78201,3.56948,14.50888,5.35422,23.2016,5.35422h29.26971v-16.77654h-29.44819c-9.16516,0-15.88417-2.46714-20.16755-7.40667-2.3989-2.76503-4.05503-5.97756-5.11013-9.54835h62.04329v-8.2098c0-7.96833-1.73225-15.13878-5.17574-21.5061ZM91.76538,69.92673c1.84773-3.74795,4.46185-6.69277,7.85285-8.83446s7.28593-3.21253,11.69529-3.21253h.53542c4.39886,0,8.32528,1.07084,11.77928,3.21253,3.4435,2.14169,6.1206,5.29647,8.03132,9.45911.69027,1.51506,1.11546,3.26305,1.5564,4.99727h-43.3744c.45668-1.98683,1.06822-3.87984,1.92384-5.62193Z",
  "M240.56015,62.25235c-3.45399-6.36207-8.24129-11.35934-14.3724-14.9918-6.1311-3.62722-13.11258-5.44345-20.96543-5.44345h-.35695c-7.85285,0-14.84483,1.81623-20.97593,5.44345-6.1206,3.63247-10.88691,8.65598-14.27791,15.08104-3.391,6.42506-5.08126,13.627-5.08126,21.59534,0,7.97358,1.86873,15.14403,5.61668,21.5061,3.74795,6.36732,9.01818,11.33309,15.80019,14.90257,6.78201,3.56948,14.50888,5.35422,23.2016,5.35422h29.26971v-16.77654h-29.44819c-9.16516,0-15.88417-2.46714-20.16755-7.40667-2.3989-2.76503-4.05503-5.97756-5.11013-9.54835h62.04329v-8.2098c0-7.96833-1.73225-15.13878-5.17574-21.5061ZM185.13877,69.92673c1.84773-3.74795,4.46185-6.69277,7.85285-8.83446,3.391-2.14169,7.28593-3.21253,11.69529-3.21253h.53542c4.39886,0,8.32528,1.07084,11.77928,3.21253,3.4435,2.14169,6.1206,5.29647,8.03132,9.45911.69027,1.51506,1.11546,3.26305,1.5564,4.99727h-43.3744c.45668-1.98683,1.06822-3.87984,1.92384-5.62193Z",
  "M257.93744,43.53704h41.04899c7.36992,0,14.21492,1.84773,20.52449,5.53269,6.29908,3.69021,11.29635,8.68748,14.9918,14.9918,3.68496,6.30958,5.53269,13.14932,5.53269,20.52449,0,7.38042-1.84773,14.22017-5.53269,20.52449-3.69546,6.30958-8.69273,11.30684-14.9918,14.9918-6.30958,3.69021-13.15457,5.53269-20.52449,5.53269h-23.2016v42.83373h-17.84739V43.53704ZM286.8502,64.24001c-3.56948,2.14169-6.39356,5.02876-8.48276,8.65598-2.0787,3.63247-3.11804,7.5274-3.11804,11.69004,0,4.28337,1.03935,8.24129,3.11804,11.86851,2.08919,3.63247,4.91328,6.48805,8.48276,8.56675,3.56948,2.08394,7.43291,3.12329,11.6008,3.12329,4.15739,0,7.99983-1.03935,11.50632-3.12329,3.50649-2.0787,6.30958-4.93428,8.38827-8.56675,2.0787-3.62722,3.12854-7.58514,3.12854-11.86851,0-4.16264-1.04985-8.05757-3.12854-11.69004-2.0787-3.62722-4.88179-6.5143-8.38827-8.65598-3.50649-2.14169-7.34892-3.21253-11.50632-3.21253-4.16789,0-8.03132,1.07084-11.6008,3.21253Z",
  "M357.41926,1.78474h82.81187c6.54054,0,12.33569,1.33855,17.39595,4.01566,5.06026,2.67711,9.01818,6.42506,11.87376,11.24385,2.85558,4.81879,4.28337,10.38298,4.28337,16.68731v50.15116h-17.84739v-50.15116c0-4.39886-1.52228-8.14681-4.55633-11.24385-3.03406-3.0918-6.75051-4.64032-11.14937-4.64032-4.28337,0-7.97883,1.54852-11.06538,4.64032-3.09705,3.09705-4.64032,6.845-4.64032,11.24385v50.15116h-17.84739v-50.15116c0-4.39886-1.52228-8.14681-4.55633-11.24385-3.03406-3.0918-6.75051-4.64032-11.14937-4.64032-4.28337,0-7.97883,1.54852-11.06538,4.64032-3.09705,3.09705-4.64032,6.845-4.64032,11.24385v50.15116h-17.84739V1.78474Z",
  "M561.75339,20.43526c-3.45399-6.36207-8.24129-11.35934-14.3724-14.9918-6.1311-3.62722-13.11258-5.44345-20.96543-5.44345h-.35695c-7.85285,0-14.84483,1.81623-20.97593,5.44345-6.1206,3.63247-10.88691,8.65598-14.27791,15.08104-3.391,6.42506-5.08126,13.627-5.08126,21.59534,0,7.97358,1.86873,15.14403,5.61668,21.5061,3.74795,6.36732,9.01818,11.33309,15.80019,14.90257,6.78201,3.56948,14.50888,5.35422,23.2016,5.35422h29.26971v-16.77654h-29.44819c-9.16516,0-15.88417-2.46714-20.16755-7.40667-2.3989-2.76503-4.05503-5.97756-5.11013-9.54835h62.04329v-8.2098c0-7.96833-1.73225-15.13878-5.17574-21.5061ZM506.33201,28.10963c1.84773-3.74795,4.46185-6.69277,7.85285-8.83446,3.391-2.14169,7.28593-3.21253,11.69529-3.21253h.53542c4.39886,0,8.32528,1.07084,11.77928,3.21253,3.4435,2.14169,6.1206,5.29647,8.03132,9.45911.69027,1.51506,1.11546,3.26305,1.5564,4.99727h-43.3744c.45668-1.98683,1.06822-3.87984,1.92384-5.62193Z",
];

const KeepMeSection = () => {
  const videoWrapperRef = useRef(null);
  const svgOutterWrapperRef = useRef(null);
  const svgOriginRef = useRef(null);
  const circleWrapperRef = useRef(null);
  const circleRefs = useRef([]);
  const rectRefs = useRef([]);
  const logoPathRefs = useRef([]);
  const mySvgRef = useRef(null);
  const selectedProjectRef = useRef(null);
  const menuRef = useRef(null);
  const keepmeWrapperRef = useRef(null);

  const [playKeepMeHomepage, setPlayKeepMeHomepage] = useState(false);

  useGSAP(
    () => {
      const videoWrapper = videoWrapperRef?.current;
      const circleWrapper = circleWrapperRef?.current;
      const svgOrigin = svgOriginRef?.current;
      const svgOutterWrapper = svgOutterWrapperRef?.current;
      const mySvg = mySvgRef?.current;

      const circles = circleRefs?.current;
      const logoPaths = logoPathRefs?.current;
      const rects = rectRefs?.current;

      const totalRects = 6;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "keepme-finish-rectangle",
          trigger: document.body,
          start: "top -90%",
          end: "+=1500",
          scrub: true,
          onUpdate: (self) => {
            setPlayKeepMeHomepage(self.progress >= 0.8);
          },
          onLeave: () => {
            gsap.to(svgOutterWrapper, { autoAlpha: 0, duration: 0.3 });
          },
          onEnterBack: () => {
            gsap.to(svgOutterWrapper, { autoAlpha: 1, duration: 0.3 });
          },
        },
      });

      tl.addLabel("circleToLogo", 0);
      tl.addLabel("logoToRect", 0.7);
      tl.addLabel("showVideo", 0.96);

      // Circle -> Logo (first 30% of timeline)
      const svgWidth = window.innerWidth * 0.8;
      const baseLogoWidth = window.innerWidth > 650 ? 570 : 600;
      const rawScale = svgWidth / baseLogoWidth;
      const scaleFactor = rawScale > 1 ? 1 : rawScale;

      if (circles && logoPaths) {
        for (let i = 0; i < totalRects; i++) {
          const circle = circles[i];
          const logoPath = logoPaths[i];

          if (!circle || !logoPath) continue;

          tl.to(
            circle,
            {
              morphSVG: logoPath,
              fill: "#efa8c4",
              stroke: "#efa8c4",
            },
            "circleToLogo",
          );
        }
      }

      if (circleWrapper) {
        tl.to(
          circleWrapper,
          {
            scale: scaleFactor,
          },
          "circleToLogo",
        );
      }

      const newWidth = baseLogoWidth * scaleFactor + "px";

      if (svgOrigin) {
        tl.to(
          svgOrigin,
          {
            width: newWidth,
          },
          "circleToLogo",
        );
      }

      const menu = menuRef?.current;

      if (menu) {
        tl.to(
          menu,
          {
            "--line-pos": "100%",
            ease: "none",
          },
          "logoToRect",
        );
      }

      if (circles && rects) {
        // Logo -> Rectangle (last 30% of timeline)
        for (let i = 0; i < totalRects; i++) {
          const circle = circles[i];
          const rect = rects[i];

          if (!circle || !rect) continue;

          tl.to(
            circle,
            {
              morphSVG: {
                shape: rect,
                shapeIndex: "auto",
              },
              x: 0,
            },
            "logoToRect",
          );
        }
      }

      if (mySvg) {
        tl.to(
          mySvg,
          {
            borderRadius: "40px",
          },
          "logoToRect",
        );
      }

      if (svgOutterWrapper) {
        tl.to(
          svgOutterWrapper,
          {
            top: "55%",
            left: "50%",
          },
          "logoToRect",
        );
      }

      if (svgOrigin) {
        tl.to(
          svgOrigin,
          {
            height: "80vh",
            width: "80vw",
          },
          "logoToRect",
        );
      }

      if (circleWrapper) {
        tl.to(
          circleWrapper,
          {
            scale: 1,
          },
          "logoToRect",
        );
      }

      tl.to(
        videoWrapper,
        {
          opacity: 1,
        },
        "showVideo",
      );
    },
    { dependencies: [playKeepMeHomepage], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const selectedProject = selectedProjectRef?.current;
      const keepmeFinish = ScrollTrigger.getById("keepme-finish-rectangle");

      if (selectedProject) {
        const tl = gsap.timeline({
          scrollTrigger: {
            id: "keepme-selected-project",
            trigger: document.body,
            start: () => (keepmeFinish?.end ?? 0) - 100,
            end: "+=1300", // total scroll distance
            scrub: true,
          },
        });

        tl.to(selectedProject, {
          scale: 1,
          transformOrigin: "center center",
          ease: "power3.inOut",
          duration: 1, // normalized duration within timeline
        })
          // Pause at scale=1 for ~100px scroll
          .to(selectedProject, {
            scale: 1,
            duration: 0.15, // small duration = pause
          })
          // Continue zoom to 100
          .to(selectedProject, {
            scale: 120,
            transformOrigin: "center center",
            ease: "power3.inOut",
            duration: 0.8,
          });
      }
    },
    { dependencies: [playKeepMeHomepage], revertOnUpdate: true },
  );

  return (
    <div className="relative">
      <div
        ref={keepmeWrapperRef}
        className="fixed z-10 w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
      >
        <div
          ref={svgOutterWrapperRef}
          className="flex items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div ref={svgOriginRef} className="relative w-[70vw] min-h-[200px]">
            <svg
              ref={mySvgRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-[100]"
            >
              <g ref={circleWrapperRef}>
                {[...Array(6)].map((_, i) => {
                  const size = 15;
                  const svgWidth = window.innerWidth * 0.7;
                  const cx = ((i + 0.5) * svgWidth) / 6;
                  const cy = 80;

                  const shapes = [
                    `
                        M ${cx}, ${cy - size}
                        A ${size},${size} 0 1,1 ${cx}, ${cy + size}
                        A ${size * 0.6},${size} 0 1,0 ${cx}, ${cy - size}
                      `,
                    `
                        M ${cx}, ${cy - size}
                        A ${size},${size} 0 0,1 ${cx}, ${cy + size}
                        L ${cx}, ${cy}
                        Z
                      `,
                    `
                        M ${cx}, ${cy - size}
                        A ${size},${size} 0 0,1 ${cx}, ${cy + size}
                        A ${size * 0.6},${size} 0 0,1 ${cx}, ${cy - size}
                      `,
                    ` 
                        M ${cx}, ${cy - size}
                        A ${size},${size} 0 0,0 ${cx}, ${cy + size}
                        A ${size * 0.6},${size} 0 0,0 ${cx}, ${cy - size}
                      `,
                    `
                        M ${cx}, ${cy - size}
                        A ${size},${size} 0 0,0 ${cx}, ${cy + size}
                        L ${cx}, ${cy}
                        Z
                      `,
                    `
                        M ${cx}, ${cy - size}
                        A ${size},${size} 0 0,0 ${cx}, ${cy + size}
                        A ${size * 0.6},${size} 0 0,1 ${cx}, ${cy - size}
                      `,
                  ];

                  return (
                    <path
                      key={i}
                      ref={(el) => (circleRefs.current[i] = el)}
                      d={shapes[i]}
                      fill="#d6266b"
                      stroke="#d6266b"
                      strokeWidth="0.5"
                    />
                  );
                })}
              </g>

              {[...Array(6)].map((_, i) => {
                const svgWidth = window.innerWidth * 0.8;
                const rectWidth = svgWidth / 6;

                return (
                  <path
                    key={i}
                    style={{ visibility: "hidden" }}
                    ref={(el) => (rectRefs.current[i] = el)}
                    d={`
                    M${i * rectWidth} 0
                    L${(i + 1) * rectWidth} 0
                    L${(i + 1) * rectWidth} 800
                    L${i * rectWidth} 800
                    Z
                  `}
                  />
                );
              })}

              {logoPaths.map((d, i) => (
                <path
                  key={i}
                  ref={(el) => (logoPathRefs.current[i] = el)}
                  fill="#17ff27"
                  style={{ visibility: "hidden" }}
                  d={d}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="relative">
        <KeepMeComponents
          playKeepMeHomepage={playKeepMeHomepage}
          selectedProjectRef={selectedProjectRef}
          videoWrapperRef={videoWrapperRef}
        />
      </div>
    </div>
  );
};

export default KeepMeSection;
