import React, { useEffect, useRef, useState } from "react";
import "./../../assets/css/custom.css";
import "./../../assets/css/projectsSectionCss.css";
import LinkedinIcon from "../../assets/contactme/linkedinCircle.svg?react";
import GmailIcon from "../../assets/contactme/gmailCircle.svg?react";
import WhatsappCircle from "../../assets/contactme/whatsappCircle.svg?react";
import WhatsappGreen from "../../assets/contactme/whatsappGreen.svg?react";
import LinkedinBlue from "../../assets/contactme/linkedinBlue.svg?react";
import ViberPurple from "../../assets/contactme/viberBlack.svg?react";
import GithubCircle from "../../assets/contactme/githubCircle.svg?react";
import exclamationMarkIcon from "../../assets/contactme/exlamationMark.svg";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { icon: GmailIcon, name: "Gmail" },
  { icon: LinkedinBlue, name: "LinkedIn" },
  { icon: WhatsappGreen, name: "WhatsApp" },
  { icon: ViberPurple, name: "Viber" },
  { icon: GithubCircle, name: "Github" },
];

const ContactMe = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
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

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Clear form
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const sectionRef = useRef(null);
  const dotRef = useRef(null);
  const textRef = useRef(null);

  const bgRef = useRef(null);

  useEffect(() => {
    const dot = dotRef?.current;
    const text = textRef?.current;

    // Initial clip-path
    gsap.set(text, { clipPath: "inset(0 100% 0 0)" });

    // Calculate text width and left position
    const textRect = text.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();

    // Distance dot needs to travel
    const travelDistance = textRect.right - sectionRect.left + 10;

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
      x: travelDistance,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center+=100",
        end: "+=300",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          text.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
        },
      },
      ease: "none",
    });

    // gsap.to(dot, {
    //   scrollTrigger: {
    //     trigger: sectionRef.current,
    //     start: "top center-=200",
    //     end: "+=150",
    //     scrub: true,
    //     onUpdate: (self) => {
    //       const progress = self.progress;
    //       dot.style.clipPath = `inset(${79 - progress * 100}% 0 0 0)`;
    //     },
    //   },
    // });

    gsap.to(bgRef.current, {
      clipPath: "inset(100% 0 0 0)",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center-=200",
        end: "+=150",
        scrub: true,
      },
      ease: "none",
    });
  }, []);

  return (
    <div className="min-h-screen w-full mt-[40vh] flex flex-col items-center">
      <div ref={sectionRef} className="relative">
        {/* Fat Dot */}
        {/* <img
          src={exclamationMarkIcon}
          alt="!"
          ref={dotRef}
          className="absolute left-0 bottom-[25%] transform h-[20vh] w-auto z-20"
        /> */}

        {/* Fat Dot */}
        <div
          ref={dotRef}
          className="absolute left-0 bottom-[25%] h-[20vh] scale-y-0 w-auto z-20 rounded-[40px] overflow-hidden"
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
            className="h-full w-full object-contain"
          />
        </div>

        {/* Contact Text */}
        <div
          ref={textRef}
          className="text-white text-[clamp(3rem,25vh,13rem)] whitespace-nowrap font-ica-rubrik"
        >
          Contact Me
        </div>
      </div>

      <div className="w-full flex justify-evenly items-end mt-16 px-20">
        <div className="w-[20%] max-w-xl text-white flex flex-col gap-6 z-10">
          <div className="flex flex-col gap-6 font-inter">
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

          <div className="flex items-center gap-8 mt-1">
            {socials.map(({ icon: Icon, name }) => (
              <div
                key={name}
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
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-[50%] max-w-xl flex flex-col gap-6 text-white z-10"
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
  );
};

export default ContactMe;
