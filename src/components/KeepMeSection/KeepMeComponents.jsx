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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import colorWheel from "../../assets/color-wheel.webp";
import "./../../assets/css/custom.css";
import customisablePlans from "./../../assets/keepme/subscription/customisablePlans.PNG";
import billingDetails from "./../../assets/keepme/subscription/billingDetails.PNG";
import upgradeSubscription from "./../../assets/keepme/subscription/upgradeSubscription.PNG";

gsap.registerPlugin(ScrollTrigger);

// bg-fuchsia-900
// bg-slate-950
// bg-violet-900
// bg-blue-900
// bg-sky-950

const glaceAvatar =
  "https://keepmeprd.fra1.digitaloceanspaces.com/assets/templateBG/glaceCustom.webp";

// #0B0114, #160625, #1F1135
// #FF2D95, #BC13FE, #00F3FF
// #E0D7FF, #A58BA3

const sections = [
  { id: 1, title: "Homepage", color: "bg-[#d6266b]", hold: 2700 },
  { id: 2, title: "Profile Page", color: "bg-[#8e26d6]", hold: 6500 },
  { id: 3, title: "Templates", color: "bg-[#c01ac0]", hold: 800 },
  { id: 4, title: "Subscription", color: "bg-[#6b26d6]", hold: 800 },
];

const profilePageComponents = [
  {
    id: 1,
    title: "Account Details",
    description:
      "This feature allows users to manage their personal information, including name, email, phone number, and social links. Users can create custom action buttons with labels linking to URLs or files. Additionally, users can add notes or supplementary information, which the AI chatbot can utilize to provide context-aware responses.",
    icon: accountDetailsFixed,
    icon2: accountDetailsFull,
  },
  {
    id: 2,
    title: "Company Details",
    description:
      "Designed for business users, this feature allows a company to manage its profile and invite team members. All company information is shared consistently across all associated user accounts, providing a unified business presence.",
    icon: companyDetailsFull,
  },
  {
    id: 3,
    title: "My Digital Card",
    description:
      "This feature enables users to create a personalized digital card with a custom display name used in its URL. Users can choose from multiple templates, adjust background and font colors, upload custom background images, and select from various layouts to tailor their card’s appearance.",
    icon: myDigitalCardFixed,
    icon2: myDigitalCardFull,
  },
  {
    id: 4,
    title: "My Qr Codes",
    description:
      "This feature allows users to create fully customized QR codes for instant sharing of their digital card. Users can personalize dot patterns, corner shapes, background colors, and even add a custom logo, ensuring each QR code aligns with their personal or brand identity.",
    icon: myQrCodesFixed,
    icon2: myQrCodesFull,
  },
  {
    id: 5,
    title: "Apple Wallet Cards",
    description:
      "This feature allows users to save their digital card to Apple Wallet or Google Wallet. The wallet stores all relevant information from the individual or company card and includes the QR code for easy sharing.",
    icon: appleWalletFull,
  },
  {
    id: 6,
    title: "Analytics",
    description:
      "This feature provides users with detailed insights into their digital card’s performance. Users can track total and unique views, view engagement trends over time via interactive graphs, monitor average time spent, bounce rate, geographic data (cities and countries), device and browser statistics, and analyze custom action events such as button clicks and click-through rates on specific templates.",
    icon: analyticsFixed,
    icon2: analyticsFull,
  },
  {
    id: 7,
    title: "Profile Type",
    description:
      "This feature allows users to select and switch between an individual or a business profile. Choosing a business profile enables collaboration by inviting team members and sharing company information, while the individual profile focuses on personal branding and customization. This flexibility ensures that users can tailor their digital presence to their specific needs, whether personal or professional.",
    icon: profiletypeFull,
  },
  {
    id: 8,
    title: "Team Members",
    description:
      "This feature enables company owners and administrators to manage their team efficiently. Users can generate and share invite codes via copy or email, create alternative profiles without registering new accounts, and edit or update existing profiles. For companies with a subscription plan, templates can be assigned to team members, ensuring a consistent digital presence across the organization.",
    icon: teamMembersFixed,
    icon2: teamMembersFull,
  },
  {
    id: 9,
    title: "Security",
    description:
      "This feature allows users to securely manage their account and subscription settings. Users can update login credentials, including username and password, and maintain control over their subscription plan—viewing status, billing history, next payment date, and options to cancel or reactivate. Subscription management is integrated with Stripe, providing a seamless and secure billing experience.",
    icon: securityFixed,
    icon2: securityFull,
  },
];

const templates = [
  {
    id: 1,
    title: "BaseV2",
    image: BaseV2,
    colors: ["custom", "reset"],
    fontColors: ["white", "black"],
  },
  {
    id: 2,
    title: "ExecV2",
    image: ExecV2,
    colors: ["gray", "pink", "gold", "black", "blue"],
    fontColors: ["white"],
  },
  {
    id: 3,
    title: "Fluro",
    image: Fluro,
    colors: ["red", "green", "blue"],
    fontColors: ["black"],
  },
  {
    id: 4,
    title: "PlayV2",
    image: PlayV2,
    colors: ["blue"],
    fontColors: ["white"],
  },
  {
    id: 5,
    title: "Glace",
    image: Glace,
    colors: ["customCard", "reset"],
    fontColors: ["white", "black"],
    extraSetting: "blur",
  },
];

const KeepMeComponents = ({
  playKeepMeHomepage,
  selectedProjectRef,
  videoWrapperRef,
}) => {
  const containerRef = useRef(null);
  const headerGap = 6;

  const templatesRowRef = useRef(null);
  const templatesContainerRef = useRef(null);

  const customisableRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".card");
      const profileItems = gsap.utils.toArray(".profile-item");

      gsap.set(".profile-title-description", { opacity: 0, x: -20 });
      gsap.set(".profile-image", { y: 800 });

      gsap.set(customisableRef.current, {
        opacity: 0,
        x: -400,
        scale: 0.7,
        filter: "blur(5px)",
      });

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
        totalScroll * 0.01,
      );

      sections.forEach((section, index) => {
        if (index !== 0) {
          tl.to(cards[index], {
            y: `${index * headerGap}vh`,
            ease: "none",
            duration: TRANSITION_SCROLL,
          });
        }

        if (section.id === 2) {
          const itemDuration = section.hold / profileItems.length;

          profileItems.forEach((item, i) => {
            const title = item.querySelector(".profile-title-description");
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
              [title],
              {
                opacity: 1,
                x: 0,
                duration: itemDuration * 0.4,
              },
              `<${itemDuration * 0.5}`, // <--- THIS IS THE KEY: Starts 50% into the image duration
            );

            // 4. Fade out the PREVIOUS title and image
            if (i > 0) {
              const prevTitle = profileItems[i - 1].querySelector(
                ".profile-title-description",
              );

              tl.to([prevTitle], { opacity: 0, x: 20, duration: 0.2 }, "<");
            }

            // 5. Scroll tall image to the top
            if (tallImg && imageContainer) {
              // Get the front image height (icon)
              const frontHeight = shortImg.offsetHeight;
              // Get the back image height (icon2)
              const backHeight = tallImg.offsetHeight;
              // Calculate how much we need to move up so the bottom aligns
              const scrollDistance = backHeight - frontHeight;

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
          });
        } else if (section.id === 3) {
          if (templatesRowRef.current) {
            const totalWidth =
              templatesRowRef.current.scrollWidth -
              templatesContainerRef.current.clientWidth +
              700;

            // Hold first
            tl.to({}, { duration: 200 });

            // Horizontal scroll
            tl.to(templatesRowRef.current, {
              x: -totalWidth,
              ease: "none",
              duration: 1400,
            });

            // Transition OUT the templates row
            tl.to(templatesRowRef.current, {
              scale: 0.7,
              rotateY: 15,
              opacity: 0,
              filter: "blur(5px)",
              duration: 500,
              ease: "power2.inOut",
            });

            // Bring IN the hero
            tl.to(
              customisableRef.current,
              {
                opacity: 1,
                filter: "blur(0px)",
                x: 0,
                scale: 1,
                duration: 500,
                ease: "power3.out",
              },
              "<+300",
            );

            // Hold hero
            tl.to({}, { duration: 300 });
          }
        } else if (section.id === 4) {
          const items = gsap.utils.toArray(".sub-item");

          if (items.length) {
            tl.to(items, {
              y: 0,
              opacity: 1,
              stagger: 100,
              ease: "power3.out",
              duration: 400,
            });
            tl.to({}, { duration: section.hold });
          }
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
          className={`card absolute inset-0 w-full rounded-[40px] sm:p-[4vh] pt-[3vh] border border-black/20 shadow-[0_0px_50px_rgba(0,0,0,0.5)] ${section.color}`}
          style={{
            zIndex: index + 1,
            height: `calc(100vh - ${index * headerGap}vh)`,
          }}
        >
          {section.id === 1 ? (
            <>
              <div className="pl-[10%]">
                <h2 className="text-[44px] font-ica-rubrik text-black uppercase title-homepage">
                  {section.title}
                </h2>

                <div className="mt-10 text-xl text-black/70">
                  {playKeepMeHomepage && (
                    <div
                      ref={videoWrapperRef}
                      className={`bg-[#efa8c4] absolute top-[55%] left-[50%] transform -translate-x-1/2 -translate-y-1/2
               overflow-hidden rounded-[40px] w-[90vw] sm:w-[80vw] h-[80vh] opacity-0 z-[200]`}
                    >
                      <h1
                        ref={selectedProjectRef}
                        data-content="SELECTED PROJECT"
                        className="text-[8vw] sm:text-[10vh] leading-[1em] whitespace-nowrap font-ica-rubrik text-black scale-0
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
              <h2 className="text-[44px] font-ica-rubrik text-black uppercase">
                {section.title}
              </h2>

              {/* ... inside section.id === 2 mapping ... */}
              <div className="absolute top-[15%] inset-0 flex items-center justify-center">
                {profilePageComponents.map((comp) => (
                  <div
                    key={comp.id}
                    className="profile-item absolute flex flex-col sm:flex-row items-center justify-between px-20 gap-10 w-full h-full"
                  >
                    <div className="profile-title-description opacity-0 h-[50vh] absolute left-[5%] top-[50%] -translate-y-1/2">
                      {/* Title: Positioned absolute so they all stack in one spot */}
                      <h3 className="text-4xl font-bold font-inter text-black whitespace-nowrap">
                        {comp.title}
                      </h3>

                      <div className="sm:max-w-[25vw] mt-10 font-inter font-semibold text-lg text-black">
                        {comp.description.split(". ").map((sentence, idx) => (
                          <p
                            key={idx}
                            className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-black before:rounded-full before:inline-block"
                          >
                            {sentence}.
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Image: This is what we will slide up */}
                    <div className="profile-image w-auto sm:w-[55vw] h-[60vh] sm:h-auto flex items-center justify-center ml-auto">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : section.id === 3 ? (
            <div className="w-full">
              <h2 className="text-[44px] font-ica-rubrik text-black uppercase pl-[10%]">
                {section.title}
              </h2>

              <div
                ref={templatesContainerRef}
                className="w-full h-full overflow-hidden rounded-[20px] mt-[6vh]"
              >
                <div
                  ref={templatesRowRef}
                  className="flex gap-6 pl-[5%] sm:pl-[10%] py-[4vh] h-full"
                >
                  {templates.map((template, index) => (
                    <div
                      key={index}
                      className="flex bg-white/40 rounded-[40px] h-[90vw] sm:h-[47vh] w-[90vw] sm:w-[47vh] 
                                  shrink-0 justify-center items-center relative border border-black/20"
                    >
                      <div className="flex flex-col justify-evenly items-center w-full h-full z-10">
                        <img
                          src={template.image}
                          alt={template.title}
                          className="h-[70%] w-auto"
                        />
                        <div className="text-black font-inter text-[15px]">
                          {template.title}
                        </div>

                        <div className="flex items-center justify-center gap-1">
                          <div>
                            {template.colors && (
                              <div className="flex justify-center items-center gap-0.5 cursor-pointer">
                                {template.colors.map((color, index) => (
                                  <div
                                    key={index}
                                    className="w-[13px] h-[13px] border border-black rounded-full mb-1 transition-colors duration-200 ease-in-out"
                                    style={{
                                      backgroundColor: color,
                                    }}
                                  >
                                    {color === "custom" && (
                                      <img
                                        src={colorWheel}
                                        alt="colorswheel"
                                        className="z-10 w-full h-full object-cover rounded-full"
                                      />
                                    )}

                                    {color === "reset" && (
                                      <div className="flex items-center justify-center text-white bg-[#252525] rounded-full z-10">
                                        <FontAwesomeIcon
                                          className="w-full h-full"
                                          icon={faRotate}
                                        />
                                      </div>
                                    )}

                                    {/* Background Template Card */}
                                    {color === "customCard" && (
                                      <div className="flex items-center justify-center text-white bg-[#252525] rounded-full overflow-hidden z-10">
                                        <div
                                          className="w-[12px] h-[12px] bg-cover bg-center"
                                          style={{
                                            backgroundImage: `url(${glaceAvatar})`,
                                          }}
                                          aria-hidden="true"
                                        />
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {template.extraSetting && (
                            <>
                              {template.title === "Glace" && (
                                <>
                                  <div className="border-r border-black h-5" />

                                  <input
                                    type="range"
                                    min="0"
                                    max="10"
                                    step="0.1"
                                    defaultValue={1}
                                    className="w-20 range-slider"
                                    style={{
                                      background: `linear-gradient(to right, #D1D3D6 ${(1 / 10) * 100}%, #f3f3f3 ${(1 / 10) * 100}%)`,
                                    }}
                                    aria-label="GlaceCard blur effect"
                                  />
                                </>
                              )}
                            </>
                          )}

                          <div className="border-r border-black h-5" />

                          <div>
                            {template.fontColors && (
                              <div>
                                <div className="flex justify-center items-center gap-0.5 cursor-pointer">
                                  {template.fontColors.map(
                                    (fontColor, index) => (
                                      <div
                                        key={index}
                                        className="p-[2px] w-[13px] h-[13px] border border-black flex rounded-full mb-1 transition-border duration-200 ease-in-out"
                                        style={{
                                          backgroundColor: fontColor,
                                        }}
                                      ></div>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NEW HERO SCENE */}
              <div
                ref={customisableRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="flex justify-between items-center w-full h-full px-[3%] gap-10">
                  <img
                    className="w-[50vw] max-h-max rounded-[40px]"
                    src={customisableFull}
                  />
                  <div className="flex flex-col">
                    <h2 className="text-black font-inter font-bold text-[40px]">
                      Customisable
                    </h2>
                    <p className="font-inter text-lg font-semibold text-black mt-5">
                      Customisable is a powerful template system that allows you
                      to fully design and personalize your digital card. You can
                      freely add, remove, and rearrange elements using an
                      intuitive drag-and-drop interface, giving you complete
                      control over the layout and structure.
                      <br />
                      <br />
                      Each element comes with its own dedicated settings panel,
                      where you can adjust typography (font size, font family,
                      and colors), customize button styles, control spacing,
                      dimensions, and scale images precisely to your needs.
                      <br />
                      <br />
                      The platform also supports advanced features such as an
                      integrated AI assistant that can answer questions about
                      your business, products, pricing, or availability based on
                      the content you provide. You can upload catalogs,
                      schedules, or any business-related information, and the
                      assistant will use them to help your visitors.
                      <br />
                      <br />
                      Additional features include a meeting booking button,
                      fully customizable backgrounds (including image uploads
                      and blur effects), QR code generation for fast sharing and
                      scanning, and independent layout customization for mobile
                      and desktop to ensure a perfect experience on every
                      device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-[44px] font-ica-rubrik text-black uppercase pl-[10%]">
                {section.title}
              </h2>

              <div className="flex items-center h-[60vh] justify-around gap-5 mt-6 p-10">
                <div className="flex items-start justify-between gap-6 max-w-[60vw]">
                  {/* Card 1 */}
                  <div className="sub-item opacity-0 translate-y-[80px] flex items-center gap-4 sm:gap-10">
                    <img
                      src={customisablePlans}
                      alt="Choose plan"
                      className="max-h-[70vh] w-auto rounded-[40px] object-contain"
                    />
                  </div>

                  {/* Card 2 */}
                  <div className="sub-item opacity-0 translate-y-[80px] flex items-center gap-4 sm:gap-10">
                    <img
                      src={billingDetails}
                      alt="Subscription details"
                      className="max-h-[70vh] w-auto rounded-[40px] object-contain"
                    />
                  </div>

                  {/* Card 3 */}
                  <div className="sub-item opacity-0 translate-y-[80px] flex items-center gap-4 sm:gap-10">
                    <img
                      src={upgradeSubscription}
                      alt="Upgrade plan"
                      className="max-h-[70vh] w-auto rounded-[40px] object-contain"
                    />
                  </div>
                </div>

                <div className="sub-item opacity-0 translate-y-[80px] max-w-[30vw] flex flex-col items-center">
                  {/* first text  */}
                  <div className="step-text">
                    <h3 className="text-xl md:text-2xl font-semibold text-center">
                      Choose Your Plan
                    </h3>
                    <p className="text-black text-center max-w-xs">
                      Users can select between multiple plans based on the number
                      of profiles and choose monthly or annual billing.
                    </p>
                  </div>

                  <div className="step-text absolute opacity-0">
                    <h3 className="text-xl md:text-2xl font-semibold text-center">Manage Subscription</h3>
                    <p className="text-gray-400 text-center max-w-xs">
                      A dedicated dashboard shows the active plan, next billing
                      date, payment history, and billing details.
                    </p>
                  </div>

                  <div className="step-text absolute opacity-0">
                    <h3 className="text-xl md:text-2xl font-semibold text-center">Upgrade Anytime</h3>
                    <p className="text-gray-400 text-center max-w-xs">
                      Users can upgrade their plan instantly through a focused
                      upgrade flow without interrupting their subscription.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default KeepMeComponents;
