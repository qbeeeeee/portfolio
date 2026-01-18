import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPlayer from "./videoplayer/VideoPlayer";
import keepmeHomepage from "../../assets/keepme/homepage.mp4";
import BaseV2 from "../../assets/keepme/templates/BaseV2.webp";
import ExecV2 from "../../assets/keepme/templates/ExecV2.webp";
import Fluro from "../../assets/keepme/templates/Fluro.webp";
import PlayV2 from "../../assets/keepme/templates/PlayV2.webp";
import Glace from "../../assets/keepme/templates/Glace.webp";
import accountDetailsFixed from "../../assets/keepme/sections/accountDetailsFixed.webp";
import accountDetailsFull from "../../assets/keepme/sections/accountDetailsFull.png";
import companyDetailsFull from "../../assets/keepme/sections/companyDetailsFull.png";
import appleWalletFull from "../../assets/keepme/sections/appleWalletFull.png";
import analyticsFixed from "../../assets/keepme/sections/analyticsFixed.webp";
import analyticsFull from "../../assets/keepme/sections/analyticsFull.png";
import profiletypeFull from "../../assets/keepme/sections/profiletypeFull.png";
import teamMembersFull from "../../assets/keepme/sections/teamMembersFull.png";
import teamMembersFixed from "../../assets/keepme/sections/teamMembersFixed.webp";
import securityFixed from "../../assets/keepme/sections/securityFixed.webp";
import securityFull from "../../assets/keepme/sections/securityFull.png";
import myQrCodesFull from "../../assets/keepme/sections/myQrCodesFull.png";
import myQrCodesFixed from "../../assets/keepme/sections/myQrCodesFixed.webp";
import customisableFull from "../../assets/keepme/sections/customisableFull.png";
import myDigitalCardFull from "../../assets/keepme/sections/myDigitalCardFull.png";
import myDigitalCardFixed from "../../assets/keepme/sections/myDigitalCardFixed.webp";

gsap.registerPlugin(ScrollTrigger);

// bg-fuchsia-900
// bg-slate-950
// bg-violet-900
// bg-blue-900
// bg-sky-950

const sections = [
  { id: 1, title: "Homepage", color: "bg-fuchsia-900", hold: 3000 },
  { id: 2, title: "Profile Page", color: "bg-violet-900", hold: 6500 },
  { id: 3, title: "Settings", color: "bg-indigo-900", hold: 800 },
  { id: 4, title: "Dashboard", color: "bg-blue-900", hold: 800 },
];

const profilePageComponents = [
  {
    id: 1,
    title: "Account Details",
    description: "Here the user can update his personal details",
    icon: accountDetailsFixed,
    icon2: accountDetailsFull,
  },
  {
    id: 2,
    title: "Company Details",
    description: "This is the component",
    icon: companyDetailsFull,
  },
  {
    id: 3,
    title: "My Digital Card",
    description: "This is the component",
    icon: myDigitalCardFixed,
    icon2: myDigitalCardFull,
  },
  {
    id: 4,
    title: "Templates",
    description: "This is the component",
  },
  {
    id: 5,
    title: "My Qr Codes",
    description: "This is the component",
    icon: myQrCodesFixed,
    icon2: myQrCodesFull,
  },
  {
    id: 6,
    title: "Apple Wallet Cards",
    description: "This is the component",
    icon: appleWalletFull,
  },
  {
    id: 7,
    title: "Analytics",
    description: "This is the component",
    icon: analyticsFixed,
    icon2: analyticsFull,
  },
  {
    id: 8,
    title: "Profile Type",
    description: "This is the component",
    icon: profiletypeFull,
  },
  {
    id: 9,
    title: "Team Members",
    description: "This is the component",
    icon: teamMembersFixed,
    icon2: teamMembersFull,
  },
  {
    id: 10,
    title: "Security",
    description: "This is the component",
    icon: securityFixed,
    icon2: securityFull,
  },
  {
    id: 11,
    title: "Customisable",
    description: "This is the component",
    icon: customisableFull,
  },
];

const templates = [
  { id: 1, title: "BaseV2", image: BaseV2 },
  { id: 2, title: "ExecV2", image: ExecV2 },
  { id: 3, title: "Fluro", image: Fluro },
  { id: 4, title: "PlayV2", image: PlayV2 },
  { id: 5, title: "Glace", image: Glace },
];

const KeepMeComponents = ({
  playKeepMeHomepage,
  selectedProjectRef,
  videoWrapperRef,
}) => {
  const containerRef = useRef(null);
  const headerGap = 70;

  const templatesRowRef = useRef(null);
  const templatesContainerRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      const profileItems = gsap.utils.toArray(".profile-item");

      gsap.set(".profile-title", { opacity: 0, x: -20 });
      gsap.set(".profile-image", { y: 800 });
      gsap.set(".profile-description", { opacity: 0, x: -20 });

      // Set initial positions
      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, { y: 0 });
        } else {
          gsap.set(card, { y: window.innerHeight });
        }
      });

      const TRANSITION_SCROLL = 500;

      const totalScroll =
        sections.reduce((sum, s) => sum + s.hold, 0) +
        (sections.length - 1) * TRANSITION_SCROLL;

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "keepme-components",
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: true,
          scrub: 1,
        },
      });

      gsap.set(".title-homepage", {
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 1,
      });

      tl.to(
        ".title-homepage",
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          duration: totalScroll * 0.05,
        },
        totalScroll * 0.02,
      );

      sections.forEach((section, index) => {
        if (index !== 0) {
          tl.to(cards[index], {
            y: index * headerGap,
            ease: "none",
            duration: TRANSITION_SCROLL,
          });
        }

        if (section.id === 2) {
          const itemDuration = section.hold / profileItems.length;

          profileItems.forEach((item, i) => {
            const title = item.querySelector(".profile-title");
            const desc = item.querySelector(".profile-description");
            const imageContainer = item.querySelector(".profile-image");
            const tallImg = item.querySelector(".tall-img-scroll");
            const shortImg = item.querySelector(".short-img-scroll");

            // 1. Slide the IMAGE up and fade in
            tl.to(imageContainer, {
              y: 0,
              opacity: 1,
              duration: itemDuration,
              ease: "power2.inOut",
            });

            // 2. NEW: Tilt all PREVIOUS images by an additional 5 degrees
            if (i > 0) {
              const previousImages = profileItems
                .slice(0, i)
                .map((el) => el.querySelector(".profile-image"));

              tl.to(
                previousImages,
                {
                  rotation: "+=1.5",
                  // x: "+=15",
                  y: "-=5",
                  duration: itemDuration,
                  ease: "power2.inOut",
                  filter: "blur(1px)",
                  // opacity: 0.8,
                },
                "<",
              ); // "<" makes it start at the same time as the new image animation
            }

            // 3. Cross-fade the TITLE (Delayed until image is halfway up)
            tl.to(
              [title, desc],
              {
                opacity: 1,
                x: 0,
                duration: itemDuration * 0.4,
              },
              `<${itemDuration * 0.5}`, // <--- THIS IS THE KEY: Starts 50% into the image duration
            );

            // 4. Fade out the PREVIOUS title and image
            if (i > 0) {
              const prevTitle =
                profileItems[i - 1].querySelector(".profile-title");

              const prevDecs = profileItems[i - 1].querySelector(
                ".profile-description",
              );

              tl.to(
                [prevTitle, prevDecs],
                { opacity: 0, x: 20, duration: 0.2 },
                "<",
              );
            }

            // 5. Scroll tall image to the top
            if (tallImg && imageContainer) {
              // Get the front image height (icon)
              const frontHeight = shortImg.offsetHeight;
              // Get the back image height (icon2)
              const backHeight = tallImg.offsetHeight;
              // Calculate how much we need to move up so the bottom aligns
              const scrollDistance = backHeight - frontHeight;
              console.log(frontHeight);

              if (scrollDistance > 0) {
                // Animate y instead of top for smooth GPU animation
                tl.to(tallImg, {
                  y: -scrollDistance, // move up exactly
                  duration: 500, // same as before
                  ease: "none",
                });

                tl.to({}, { duration: 0.5 });
              }
            }

            // 6. EXTRA HOLD for "Templates"
            if (i === 3 && templatesRowRef.current) {
              const totalWidth =
                templatesRowRef.current.scrollWidth -
                templatesContainerRef.current.clientWidth +
                415;

              // Hold first
              tl.to({}, { duration: 200 });

              // Horizontal scroll
              tl.to(templatesRowRef.current, {
                x: -totalWidth,
                ease: "none",
                duration: 1400,
              });

              // Hold last
              tl.to({}, { duration: 200 });
            }
          });
        } else {
          tl.to({}, { duration: section.hold });
        }
      });
    },
    { dependencies: [], revertOnUpdate: true },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`card absolute inset-0 w-full h-screen p-10 border-t border-white/20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] ${section.color}`}
          style={{
            zIndex: index + 1,
          }}
        >
          {section.id === 1 ? (
            <>
              <div className="pl-[10%]">
                <h2
                  className="text-[44px] font-black text-white uppercase tracking-tighter title-homepage"
                  style={{ height: `${headerGap}px` }}
                >
                  {section.title}
                </h2>

                <div className="mt-10 text-xl text-white/70">
                  {playKeepMeHomepage && (
                    <div
                      ref={videoWrapperRef}
                      className={`bg-white absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
               overflow-hidden rounded-[40px] w-[80vw] h-[80vh] opacity-0 z-[200]`}
                    >
                      <h1
                        ref={selectedProjectRef}
                        style={{ color: "#140014" }}
                        data-content="SELECTED PROJECT"
                        className="text-[5em] leading-[1em] whitespace-nowrap font-ica-rubrik text-black scale-0
         absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold flex items-center justify-center"
                      >
                        SELECTED PROJECT
                      </h1>

                      <VideoPlayer videoSource={keepmeHomepage} />
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : section.id === 2 ? (
            <div className="pl-[10%]">
              <h2
                className="text-[44px] font-black text-white uppercase tracking-tighter"
                style={{ height: `${headerGap}px` }}
              >
                {section.title}
              </h2>

              {/* ... inside section.id === 2 mapping ... */}
              <div className="absolute inset-0 flex items-center justify-center">
                {profilePageComponents.map((comp) => (
                  <div
                    key={comp.id}
                    className="profile-item absolute flex items-center justify-between px-20 gap-10 w-full h-full"
                  >
                    {/* Title: Positioned absolute so they all stack in one spot */}
                    <h3 className="profile-title opacity-0 text-4xl font-bold text-white whitespace-nowrap absolute left-[10%] top-[30%] -translate-y-1/2">
                      {comp.title}
                    </h3>

                    <div className="profile-description opacity-0 text-lg font-bold text-white whitespace-nowrap absolute left-[10%] top-[40%] -translate-y-1/2">
                      {comp.description}
                    </div>

                    {/* Image: This is what we will slide up */}
                    <div className="profile-image w-[55vw] h-auto flex items-center justify-center ml-auto">
                      {comp.id === 4 ? (
                        <div
                          ref={templatesContainerRef}
                          className="w-full h-full overflow-hidden rounded-[20px] border border-black/30 bg-white"
                        >
                          <div
                            ref={templatesRowRef}
                            className="flex gap-10 pl-[400px] py-9 h-full"
                          >
                            {templates.map((temp, index) => (
                              <div
                                key={index}
                                className="flex bg-[#f9f9f9] rounded-[40px] h-[285px] sm:h-[450px] w-[297px] sm:w-[400px] 
                                  shrink-0 justify-center items-center relative"
                              >
                                <div className="flex flex-col justify-center items-center w-full h-full z-10">
                                  <img
                                    src={temp.image}
                                    alt={temp.title}
                                    className="h-[70%] w-auto"
                                  />
                                  <div className="mt-6 text-black text-xl font-medium">
                                    {temp.title}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="relative overflow-hidden border border-black/30 h-full w-full rounded-[20px]">
                          <img
                            src={comp.icon}
                            alt={comp.title}
                            className="short-img-scroll w-full h-full relative z-10 object-contain border border-white/20"
                          />
                          {comp.icon2 && (
                            <img
                              src={comp.icon2}
                              alt={comp.title}
                              className="tall-img-scroll w-full h-auto z-0 absolute top-0 object-cover border border-white/20"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="pl-[10%]">
              <h2
                className="text-[44px] font-black text-white uppercase tracking-tighter"
                style={{ height: `${headerGap}px` }}
              >
                {section.title}
              </h2>
              <div className="mt-10 text-xl text-white/70">dsadsdassd</div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default KeepMeComponents;
