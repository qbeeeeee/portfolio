import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import keepmeHomepage from "./../assets/keepme/keepmeHomepage.mp4";
import VideoPlayer from "./videoPlayer/VideoPlayer";
import keepme from "./../assets/keepme/KeepMe_logo_fullcolor_rgb.svg";

gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

const KeepMeSection = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [playKeepMeHomepage, setPlayKeepMeHomepage] = useState(false);
  const [showSvgOrigin, setShowSvgOrigin] = useState(true);

  const titleRef = useRef(null);
  const menuRef = useRef(null);
  const menuInnerRef = useRef(null);

  useGSAP(
    () => {
      const el = sectionRef.current;

      const totalRects = 6;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top -110%",
          end: "+=1500",
          scrub: true,
          onUpdate: (self) => {
            if (self.progress >= 0.8) {
              setPlayKeepMeHomepage(true);
              setShowSvgOrigin(false);
            } else {
              setPlayKeepMeHomepage(false);
              setShowSvgOrigin(true);
            }
          },
        },
      });

      // Circle -> Logo (first 30% of timeline)
      const svgWidth = window.innerWidth * 0.8;
      const baseLogoWidth = window.innerWidth > 650 ? 570 : 600;
      const rawScale = svgWidth / baseLogoWidth;
      const scaleFactor = rawScale > 1 ? 1 : rawScale;

      for (let i = 1; i <= totalRects; i++) {
        tl.to(
          `#circle${i}`,
          {
            morphSVG: `#logoPath${i}`,
          },
          0
        );
      }

      tl.to(
        "#circleWrapper",
        {
          scale: scaleFactor,
        },
        0
      );

      const newWidth = baseLogoWidth * scaleFactor + "px";

      tl.to(
        "#svgOrigin",
        {
          width: newWidth,
        },
        0
      );

      // Logo -> Rectangle (last 30% of timeline)
      for (let i = 1; i <= totalRects; i++) {
        tl.to(
          `#circle${i}`,
          {
            morphSVG: { shape: `#rect${i}`, shapeIndex: "auto" },
            x: 0,
          },
          0.7 // start at 70% of timeline
        );
      }

      tl.to(
        "#mySvg",
        {
          borderRadius: "40px",
        },
        0.7
      );

      tl.to(
        "#svgOutterWrapper",
        {
          top: "55%",
          left: "58%",
        },
        0.7
      );

      tl.to(
        "#svgOrigin",
        {
          height: "70vh",
          width: "70vw",
        },
        0.7
      );

      tl.to(
        "#circleWrapper",
        {
          scale: 1,
        },
        0.7
      );

      tl.to(
        el,
        {
          opacity: 1,
        },
        0.9
      );

      // tl.to(
      //   el,
      //   {
      //     width: "80vw",
      //     height: "70vh",
      //     backgroundColor: "#E8E9E8",
      //   },
      //   0.9
      // );
    },
    { dependencies: [], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top -190%",
          end: "+=600",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            titleRef.current.style.setProperty("--line-pos", `${progress}%`);
          },
        },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      gsap.to(menuRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top -190%",
          end: "+=600",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress * 100;
            menuRef.current.style.setProperty("--line-pos", `${progress}%`);
          },
        },
      });

      gsap.to(menuInnerRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: "top -190%-=600",
          end: "+=2000",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress; // 0 → 1

            // update wipe background (yours)
            menuInnerRef.current.style.setProperty(
              "--inner-pos",
              `${progress * 100}%`
            );

            // text items
            const items = menuInnerRef.current.querySelectorAll(".menu-item");
            const wrapRect = menuInnerRef.current.getBoundingClientRect();

            // wipe Y position
            const wipeY = wrapRect.top + wrapRect.height * progress;

            items.forEach((item) => {
              const rect = item.getBoundingClientRect();

              const itemTop = rect.top;
              const itemBottom = rect.bottom;

              // how much of this text is covered by the wipe (0 → 1)
              let fillAmount = (wipeY - itemTop) / (itemBottom - itemTop);

              fillAmount = Math.max(0, Math.min(fillAmount, 1)); // clamp

              // update CSS variable for gradual fill
              item.style.setProperty("--text-fill", `${fillAmount * 100}%`);
            });
          },
        },
      });
    },
    { dependencies: [], revertOnUpdate: true }
  );

  return (
    <div className="fixed w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
      <h1
        ref={titleRef}
        className="absolute top-[7%] left-[58%] transform -translate-x-1/2 text-[50px] font-semibold text-white my-5 flex gap-5 items-center justify-center"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black var(--line-pos, 0%), transparent calc(var(--line-pos, 0%) + 1%))",
          maskImage:
            "linear-gradient(to top, black var(--line-pos, 0%), transparent calc(var(--line-pos, 0%) + 1%))",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        Selected Project
      </h1>

      <div
        id="svgOutterWrapper"
        className="flex items-center gap-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div
          id="svgOrigin"
          className="relative w-[70vw] min-h-[200px]"
          // style={{ opacity: showSvgOrigin ? 1 : 0 }}
        >
          <svg
            id="mySvg"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-[100]"
          >
            <g id="circleWrapper">
              {[...Array(6)].map((_, i) => {
                const r = 1.5; // radius of circle
                const svgWidth = window.innerWidth * 0.7; // 70vw
                const cx = ((i + 0.5) * svgWidth) / 6;
                const cy = 160; // vertical position

                return (
                  <path
                    key={i}
                    id={`circle${i + 1}`}
                    style={{ fill: "white" }}
                    d={`
                    M ${cx - r}, ${cy}
                    a ${r},${r} 0 1,0 ${r * 2},0
                    a ${r},${r} 0 1,0 ${-r * 2},0
                `}
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
                  id={`rect${i + 1}`}
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

            <path
              id="logoPath1"
              fill="#17ff27"
              style={{ visibility: "hidden" }}
              d="M0,.89685h17.84739v77.09546l-4.28337-1.78474,36.76562-31.4114c2.0157-1.90022,4.33587-2.88183,6.96048-2.94482,2.61412-.05774,4.7558.86612,6.42506,2.76634,1.78474,1.90547,2.51963,4.1049,2.22567,6.60353-.29396,2.49863-1.51178,4.76105-3.65346,6.78201l-30.87598,26.23566,31.58987,26.59261c2.14169,2.0262,3.32801,4.34636,3.56948,6.96048.23097,2.61937-.59841,4.88179-2.49863,6.78201-1.91072,2.02095-4.16789,3.0918-6.78201,3.21253-2.62462.11548-4.94478-.83463-6.96048-2.85558l-36.76562-31.4114,4.28337-1.78474v34.08851H0V.89685Z"
            />
            <path
              id="logoPath2"
              fill="#17ff27"
              style={{ visibility: "hidden" }}
              d="M147.18676,62.25235c-3.45399-6.36207-8.24129-11.35934-14.3724-14.9918-6.1311-3.62722-13.11258-5.44345-20.96543-5.44345h-.35695c-7.85285,0-14.84483,1.81623-20.97593,5.44345-6.1206,3.63247-10.88691,8.65598-14.27791,15.08104-3.391,6.42506-5.08126,13.627-5.08126,21.59534,0,7.97358,1.86873,15.14403,5.61668,21.5061,3.74795,6.36732,9.01818,11.33309,15.80019,14.90257,6.78201,3.56948,14.50888,5.35422,23.2016,5.35422h29.26971v-16.77654h-29.44819c-9.16516,0-15.88417-2.46714-20.16755-7.40667-2.3989-2.76503-4.05503-5.97756-5.11013-9.54835h62.04329v-8.2098c0-7.96833-1.73225-15.13878-5.17574-21.5061ZM91.76538,69.92673c1.84773-3.74795,4.46185-6.69277,7.85285-8.83446s7.28593-3.21253,11.69529-3.21253h.53542c4.39886,0,8.32528,1.07084,11.77928,3.21253,3.4435,2.14169,6.1206,5.29647,8.03132,9.45911.69027,1.51506,1.11546,3.26305,1.5564,4.99727h-43.3744c.45668-1.98683,1.06822-3.87984,1.92384-5.62193Z"
            />
            <path
              id="logoPath3"
              fill="#17ff27"
              style={{ visibility: "hidden" }}
              d="M240.56015,62.25235c-3.45399-6.36207-8.24129-11.35934-14.3724-14.9918-6.1311-3.62722-13.11258-5.44345-20.96543-5.44345h-.35695c-7.85285,0-14.84483,1.81623-20.97593,5.44345-6.1206,3.63247-10.88691,8.65598-14.27791,15.08104-3.391,6.42506-5.08126,13.627-5.08126,21.59534,0,7.97358,1.86873,15.14403,5.61668,21.5061,3.74795,6.36732,9.01818,11.33309,15.80019,14.90257,6.78201,3.56948,14.50888,5.35422,23.2016,5.35422h29.26971v-16.77654h-29.44819c-9.16516,0-15.88417-2.46714-20.16755-7.40667-2.3989-2.76503-4.05503-5.97756-5.11013-9.54835h62.04329v-8.2098c0-7.96833-1.73225-15.13878-5.17574-21.5061ZM185.13877,69.92673c1.84773-3.74795,4.46185-6.69277,7.85285-8.83446,3.391-2.14169,7.28593-3.21253,11.69529-3.21253h.53542c4.39886,0,8.32528,1.07084,11.77928,3.21253,3.4435,2.14169,6.1206,5.29647,8.03132,9.45911.69027,1.51506,1.11546,3.26305,1.5564,4.99727h-43.3744c.45668-1.98683,1.06822-3.87984,1.92384-5.62193Z"
            />
            <path
              id="logoPath4"
              fill="#17ff27"
              style={{ visibility: "hidden" }}
              d="M257.93744,43.53704h41.04899c7.36992,0,14.21492,1.84773,20.52449,5.53269,6.29908,3.69021,11.29635,8.68748,14.9918,14.9918,3.68496,6.30958,5.53269,13.14932,5.53269,20.52449,0,7.38042-1.84773,14.22017-5.53269,20.52449-3.69546,6.30958-8.69273,11.30684-14.9918,14.9918-6.30958,3.69021-13.15457,5.53269-20.52449,5.53269h-23.2016v42.83373h-17.84739V43.53704ZM286.8502,64.24001c-3.56948,2.14169-6.39356,5.02876-8.48276,8.65598-2.0787,3.63247-3.11804,7.5274-3.11804,11.69004,0,4.28337,1.03935,8.24129,3.11804,11.86851,2.08919,3.63247,4.91328,6.48805,8.48276,8.56675,3.56948,2.08394,7.43291,3.12329,11.6008,3.12329,4.15739,0,7.99983-1.03935,11.50632-3.12329,3.50649-2.0787,6.30958-4.93428,8.38827-8.56675,2.0787-3.62722,3.12854-7.58514,3.12854-11.86851,0-4.16264-1.04985-8.05757-3.12854-11.69004-2.0787-3.62722-4.88179-6.5143-8.38827-8.65598-3.50649-2.14169-7.34892-3.21253-11.50632-3.21253-4.16789,0-8.03132,1.07084-11.6008,3.21253Z"
            />
            <path
              id="logoPath5"
              fill="#17ff27"
              style={{ visibility: "hidden" }}
              d="M357.41926,1.78474h82.81187c6.54054,0,12.33569,1.33855,17.39595,4.01566,5.06026,2.67711,9.01818,6.42506,11.87376,11.24385,2.85558,4.81879,4.28337,10.38298,4.28337,16.68731v50.15116h-17.84739v-50.15116c0-4.39886-1.52228-8.14681-4.55633-11.24385-3.03406-3.0918-6.75051-4.64032-11.14937-4.64032-4.28337,0-7.97883,1.54852-11.06538,4.64032-3.09705,3.09705-4.64032,6.845-4.64032,11.24385v50.15116h-17.84739v-50.15116c0-4.39886-1.52228-8.14681-4.55633-11.24385-3.03406-3.0918-6.75051-4.64032-11.14937-4.64032-4.28337,0-7.97883,1.54852-11.06538,4.64032-3.09705,3.09705-4.64032,6.845-4.64032,11.24385v50.15116h-17.84739V1.78474Z"
            />
            <path
              id="logoPath6"
              fill="#17ff27"
              style={{ visibility: "hidden" }}
              d="M561.75339,20.43526c-3.45399-6.36207-8.24129-11.35934-14.3724-14.9918-6.1311-3.62722-13.11258-5.44345-20.96543-5.44345h-.35695c-7.85285,0-14.84483,1.81623-20.97593,5.44345-6.1206,3.63247-10.88691,8.65598-14.27791,15.08104-3.391,6.42506-5.08126,13.627-5.08126,21.59534,0,7.97358,1.86873,15.14403,5.61668,21.5061,3.74795,6.36732,9.01818,11.33309,15.80019,14.90257,6.78201,3.56948,14.50888,5.35422,23.2016,5.35422h29.26971v-16.77654h-29.44819c-9.16516,0-15.88417-2.46714-20.16755-7.40667-2.3989-2.76503-4.05503-5.97756-5.11013-9.54835h62.04329v-8.2098c0-7.96833-1.73225-15.13878-5.17574-21.5061ZM506.33201,28.10963c1.84773-3.74795,4.46185-6.69277,7.85285-8.83446,3.391-2.14169,7.28593-3.21253,11.69529-3.21253h.53542c4.39886,0,8.32528,1.07084,11.77928,3.21253,3.4435,2.14169,6.1206,5.29647,8.03132,9.45911.69027,1.51506,1.11546,3.26305,1.5564,4.99727h-43.3744c.45668-1.98683,1.06822-3.87984,1.92384-5.62193Z"
            />
          </svg>
        </div>
      </div>

      {/* Expanding section */}
      <div
        ref={sectionRef}
        className="absolute top-[55%] left-[58%] transform -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[40px] w-[70vw] h-[70vh] bg-white opacity-0 z-[200]"
      >
        <div ref={videoRef} className="w-full h-full">
          <VideoPlayer videoSource={keepmeHomepage} />
        </div>
      </div>

      {/* KeepMe Sections */}
      <div
        ref={menuRef}
        className="absolute left-[5%] top-[55%] transform -translate-y-1/2 rounded-[40px] bg-white text-black
       h-[70vh] w-[15vw]"
        style={{
          "--line-pos": "-5%",
          WebkitMaskImage:
            "linear-gradient(to left, black var(--line-pos), transparent calc(var(--line-pos) + 0px))",
          maskImage:
            "linear-gradient(to left, black var(--line-pos), transparent calc(var(--line-pos) + 0px))",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <div
          ref={menuInnerRef}
          style={{
            "--inner-pos": "-5%",
            // white
            backgroundImage:
              "linear-gradient(to bottom, black var(--inner-pos), #17ff27 calc(var(--inner-pos) + 0px))",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className="w-full h-full flex flex-col items-center justify-evenly bg-transparent"
        >
          <div className="menu-item text-[1.8vw] font-bold">Homepage</div>
          <div className="menu-item text-[1.8vw] font-bold">Profile Page</div>
          <div className="menu-item text-[1.8vw] font-bold">Subscription</div>
          <div className="menu-item text-[1.8vw] font-bold">Search Cards</div>
        </div>
      </div>
    </div>
  );
};

export default KeepMeSection;
