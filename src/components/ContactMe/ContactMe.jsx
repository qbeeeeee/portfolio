import React, { useRef, useState } from "react";
import "./../../assets/css/custom.css";
import "./../../assets/css/projectsSectionCss.css";
import WhatsappGreen from "../../assets/contactme/whatsappGreen.svg?react";
import LinkedinBlue from "../../assets/contactme/linkedinBlue.svg?react";
import ViberPurple from "../../assets/contactme/viberBlack.svg?react";
import GithubCircle from "../../assets/contactme/githubCircle.svg?react";
import resumeIcon from "../../assets/contactme/resume.svg";
import myResume from "../../assets/contactme/resume.pdf";
import exclamationMarkIcon from "../../assets/contactme/exlamationMark.svg";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "../../AppContext";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    icon: LinkedinBlue,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/konstantinos-papadopoulos-26712321a/",
  },
  { icon: WhatsappGreen, name: "WhatsApp", url: "https://wa.me/306972358102" },
  { icon: ViberPurple, name: "Viber", url: "viber://chat?number=306972358102" },
  {
    icon: GithubCircle,
    name: "Github",
    url: "https://github.com/qbeeeeee?tab=repositories",
  },
  // {
  //   icon: ResumeIcon,
  //   name: "Resume CV",
  //   url: "",
  // },
];

const ContactMe = () => {
  const { isPhone } = useAppContext();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    company: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const API_ENDPOINT =
      "https://765x2q8qe6.execute-api.eu-central-1.amazonaws.com/contactme-form";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
          company: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("error");
    }
  };

  const sectionRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);

  const bgRef = useRef(null);

  const contactRevealRef = useRef(null);
  const contactRevealRef2 = useRef(null);
  const contactBgRef = useRef(null);

  useGSAP(
    () => {
      if (!isPhone) return;

      const dot = dotRef?.current;
      const text = textRef?.current;

      const contactReveal = contactRevealRef2?.current;

      // Initial clip-path
      gsap.set(text, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(contactReveal, { clipPath: "inset(0 100% 0 0)" });

      // Calculate text width and left position
      const textRect = text.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Distance dot needs to travel
      const travelDistance = textRect.right - sectionRect.left;

      // gsap.set(dot, { clipPath: "inset(79% 0 0 0)" });

      gsap.to(dot, {
        scaleY: 1,
        borderRadius: "15px",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=250",
          end: "+=150",
          scrub: true,
        },
      });

      // Animate dot along scroll
      gsap.to(dot, {
        x: travelDistance + 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "+=300",
          scrub: true,
          onUpdate: (self) => {
            const dotX = self.progress * (travelDistance + 10);

            const progress = Math.min(dotX / travelDistance, 1);

            text.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
          },
        },
        ease: "none",
      });

      gsap.to(bgRef.current, {
        clipPath: "inset(100% 0 0 0)",
        id: "exclamationMark",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center-=200",
          end: isPhone <= 640 ? "+=100" : "+=200",
          scrub: true,
        },
        ease: "none",
      });

      const container = contactRevealRef.current;
      const bg = contactBgRef.current;

      const containerRect = container.getBoundingClientRect();
      const bgRect = bg.getBoundingClientRect();

      const travelDistance2 = containerRect.height - bgRect.height;

      gsap.to(bg, {
        y: travelDistance2,
        ease: "none",
        scrollTrigger: {
          id: "revealFormData",
          trigger: contactReveal,
          start: () => {
            const finish = ScrollTrigger.getById("exclamationMark");
            return finish?.end - (isPhone <= 640 ? 200 : 200) || 0;
          },
          // start: "top center+=100",
          end: isPhone <= 640 ? "+=350" : "+=200",
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            contactReveal.style.clipPath = `inset(0 0 ${100 - progress * 100}% 0)`;
          },
        },
      });

      // gsap.fromTo(
      //   bg,
      //   { scaleY: 1, borderRadius: "20px" },
      //   {
      //     scaleY: isPhone <= 640 ? 0.3 : 0.1,
      //     borderRadius: "30px",
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: contactReveal,
      //       start: () => {
      //         const start = ScrollTrigger.getById("revealFormData");
      //         return start?.end - 200 || 0;
      //       },
      //       end: "+=200",
      //       scrub: true,
      //     },
      //   },
      // );
    },
    { dependencies: [isPhone], revertOnUpdate: true },
  );

  return (
    <div className="min-h-max lg:min-h-screen w-full sm:mt-[40vh] flex flex-col items-center pb-20 lg:pb-0">
      <div ref={sectionRef} className="relative">
        {/* Fat Dot */}
        <div
          ref={dotRef}
          className="absolute left-0 bottom-[25%] h-14 sm:h-[100px] lg:h-[20vh] max-h-[200px] scale-y-0 w-auto z-20 rounded-[40px] overflow-hidden"
        >
          {/* Background layer */}
          <div
            ref={bgRef}
            className="absolute inset-0 bg-[#d6266b]"
            style={{ clipPath: "inset(0 0 0 0)" }}
          />
          {/* Your image */}
          <img
            src={exclamationMarkIcon}
            alt="!"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Contact Text */}
        <div
          ref={textRef}
          className="text-white text-[50px] sm:text-[90px] lg:text-[clamp(3rem,25vh,13rem)] whitespace-nowrap font-ica-rubrik"
        >
          Contact Me{" "}
        </div>
      </div>

      <div
        ref={contactRevealRef}
        className="relative w-full flex justify-evenly items-end px-6 sm:px-10 lg:px-20 overflow-visible lg:-mt-6"
      >
        {/* animated background */}
        <div
          ref={contactBgRef}
          className="absolute pointer-events-none left-1/2 transform -translate-x-1/2 inset-0 bg-[#d6266b] z-20 rounded-[40px] w-[90%] sm:w-[80%] h-4 sm:h-7 lg:h-10"
          style={{ clipPath: "inset(0 0 0 0)" }}
        />

        <div
          ref={contactRevealRef2}
          className="w-full flex flex-col lg:flex-row justify-evenly items-center lg:items-stretch gap-6 sm:gap-10 lg:gap-0 z-10 pt-6 pb-14 sm:pb-40"
        >
          <div className="w-full lg:w-[50%] max-w-lg text-white z-10 flex flex-col gap-10 justify-between">
            <div className="font-inter sm:text-[20px]">
              If you have any inquires or just want to say hi, please use the
              contact form or any of the socials!
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 font-inter">
                <a
                  href={myResume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transition-all duration-300 hover:translate-x-1 max-w-max"
                >
                  <div className="text-white/60 text-sm">CV</div>

                  <div className="relative text-white text-[18px]">
                    View Resume
                    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                  </div>
                </a>

                <a
                  href="mailto:papadokonst1998@gmail.com"
                  className="group transition-all duration-300 hover:translate-x-1 max-w-max"
                >
                  <div className="text-white/60 text-sm">Email</div>

                  <div className="relative text-white text-[18px]">
                    Papadokonst1998@gmail.com
                    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                  </div>
                </a>

                <a
                  href="tel:+306972358102"
                  className="group transition-all duration-300 hover:translate-x-1 max-w-max"
                >
                  <div className="text-white/60 text-sm">Phone</div>

                  <div className="relative text-white text-[18px]">
                    +30 6972358102
                    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-white transition-all duration-500 group-hover:w-full"></span>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-6 sm:gap-8 mt-1">
                {socials.map(({ icon: Icon, name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center group"
                  >
                    <Icon className="w-8 h-8 text-white cursor-pointer transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-1" />

                    <div
                      className="
                    absolute top-12 flex flex-col items-center
                    opacity-0 translate-y-2 scale-75
                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                    transition-all duration-300 pointer-events-none
                  "
                    >
                      <div className="px-3 py-1 text-xs text-white font-inter bg-white/10 backdrop-blur-md rounded-md border border-white/20">
                        {name}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* <a
                href={myResume}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  "--colorButton": "rgb(255 255 255 / 0.9)",
                  "--colorButton2": "black",
                  "--borderLeftBottom": "1px",
                  "--borderOutline": "0px",
                }}
                className="projectViewButton max-w-max !capitalize"
              >
                View Resume (CV)
              </a> */}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full lg:w-[50%] max-w-xl flex flex-col gap-6 text-white z-10"
          >
            <div className="flex gap-4">
              {/* First Name */}
              <div className="relative w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder=" "
                  value={formData.firstName}
                  onChange={handleChange}
                  className="peer w-full p-3 font-inter font-light bg-transparent border-b border-l border-white/90 rounded-md outline-none"
                  required
                />

                <label
                  className="
                  absolute left-4 top-3 text-white/70 font-light
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-base
                  peer-focus:-top-2
                  peer-focus:text-xs
                  peer-[&:not(:placeholder-shown)]:-top-2
                  peer-[&:not(:placeholder-shown)]:text-xs
                  pointer-events-none
                "
                >
                  First Name
                </label>
              </div>

              {/* Last Name */}
              <div className="relative w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder=" "
                  value={formData.lastName}
                  onChange={handleChange}
                  className="peer w-full p-3 font-inter font-light bg-transparent border-b border-l border-white/90 rounded-md outline-none"
                  required
                />
                <label
                  className="
                  absolute left-4 top-3 text-white/70 font-light
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-base
                  peer-focus:-top-2
                  peer-focus:text-xs
                  peer-[&:not(:placeholder-shown)]:-top-2
                  peer-[&:not(:placeholder-shown)]:text-xs
                  pointer-events-none
                "
                >
                  Last Name
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className="peer w-full p-3 font-inter font-light bg-transparent border-b border-l border-white/90 rounded-md outline-none"
                required
              />
              <label
                className="
                  absolute left-4 top-3 text-white/70 font-light
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-base
                  peer-focus:-top-2
                  peer-focus:text-xs
                  peer-[&:not(:placeholder-shown)]:-top-2
                  peer-[&:not(:placeholder-shown)]:text-xs
                  pointer-events-none
                "
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                rows="5"
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
                className="peer w-full p-3 font-inter font-light bg-transparent border-b border-l border-white/90 rounded-md outline-none resize-none"
                required
              />
              <label
                className="
                  absolute left-4 top-3 text-white/70 font-light
                  transition-all duration-200
                  peer-placeholder-shown:top-3
                  peer-placeholder-shown:text-base
                  peer-focus:-top-2
                  peer-focus:text-xs
                  peer-[&:not(:placeholder-shown)]:-top-2
                  peer-[&:not(:placeholder-shown)]:text-xs
                  pointer-events-none
                "
              >
                Your Message
              </label>
            </div>

            {/* Honeypot field */}
            <input
              type="text"
              name="company"
              value={formData.company || ""}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
              tabIndex="-1"
            />

            <button
              style={{
                "--colorButton": "rgb(255 255 255 / 0.9)",
                "--colorButton2": "black",
                "--borderLeftBottom": "1px",
                "--borderOutline": "0px",
                opacity: status === "sending" ? 0.7 : 1,
                cursor: status === "sending" ? "not-allowed" : "pointer",
              }}
              type="submit"
              className="projectViewButton"
              disabled={status === "sending"}
            >
              Send Message
            </button>

            {/* Optional: Simple feedback messages */}
            {status === "success" && (
              <p className="text-green-400 mt-2">Message sent successfully!</p>
            )}
            {status === "error" && (
              <p className="text-red-400 mt-2">
                Something went wrong. Try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
