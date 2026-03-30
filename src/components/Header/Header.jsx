import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "../../AppContext";
import "./../../assets/css/custom.css";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "Home", id: "home" },
  { label: "KeepMe", id: "keepme" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const Header = ({ animationFinished }) => {
  const navRef = useRef(null);
  const bgRef = useRef(null);
  const linksRef = useRef([]);
  const { lenis } = useAppContext();

  const [activeId, setActiveId] = useState("home");
  const [hoveredId, setHoveredId] = useState(null);

  useGSAP(() => {
    if (animationFinished) {
      gsap.to(navRef.current, {
        scaleX: 1,
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.7)",
      });
    } else {
      gsap.set(navRef.current, {
        scaleX: 0.5,
        opacity: 0,
        y: -40,
      });
    }
  }, [animationFinished]);

  const handleNavClick = (e, id) => {
    e.preventDefault(); // Stop any default smooth behavior
    setHoveredId(null);

    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: -80, // Space for your fixed header
        immediate: true, // THE KEY: bypasses the 1.2s duration for an instant jump
        force: true, // Kills any current momentum from the user's mouse wheel
      });
    }
  };

  // Helper function to animate the pill to a specific element
  const animatePill = (target) => {
    if (!target || !bgRef.current) return;
    const { offsetLeft, offsetWidth } = target;

    gsap.to(bgRef.current, {
      left: offsetLeft,
      width: offsetWidth,
      duration: 0.6,
      ease: "elastic.out(1, 0.75)",
      opacity: 1,
    });
  };

  useGSAP(
    () => {
      // 1. Create ScrollTriggers for each section
      navItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: `#${item.id}`,
          start: "top center", // When the top of the section hits the center of the screen
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              animatePill(linksRef.current[index]);
              setActiveId(item.id);
              setHoveredId(null);
            }
          },
        });
      });
    },
    { dependencies: [], revertOnUpdate: true },
  );

  // Hover handlers (manual override)
  const handleMouseEnter = (e, id) => {
    animatePill(e.target);
    setHoveredId(id);
  };

  // When mouse leaves the whole nav, we want to snap back to the "active" scroll section
  const handleMouseLeaveNav = () => {
    setHoveredId(null);

    // Find which section is currently active and snap back to it
    const activeIndex = navItems.findIndex((item) => {
      const el = document.getElementById(item.id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return (
        rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2
      );
    });

    if (activeIndex !== -1) {
      animatePill(linksRef.current[activeIndex]);
    }
  };

  return (
    <nav
      className="fixed top-3 md:top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] md:w-auto"
      onMouseLeave={handleMouseLeaveNav}
    >
      <div
        ref={navRef}
        className="relative flex items-center justify-center gap-1 md:gap-4 py-1.5 md:py-2.5 px-2 md:px-3
         bg-white/30 backdrop-blur-xl border border-black/10 rounded-full shadow-lg mx-auto"
      >
        {/* Animated Pill Background */}
        <div
          ref={bgRef}
          className="absolute h-[80%] bg-white rounded-full shadow-sm opacity-0 -z-10"
          style={{ top: "10%" }}
        />

        {navItems.map((item, idx) => {
          const isHighlighted = hoveredId
            ? hoveredId === item.id
            : activeId === item.id;

          return (
            <div
              key={item.id}
              ref={(el) => (linksRef.current[idx] = el)}
              onClick={(e) => handleNavClick(e, item.id)}
              onMouseEnter={(e) => handleMouseEnter(e, item.id)}
              className={`px-3 md:px-6 py-2 text-[11px] md:text-sm font-inter font-semibold hover:cursor-pointer 
            transition-colors duration-300 whitespace-nowrap flex-1 md:flex-none text-center ${
              isHighlighted ? "text-[#d6266b]" : "text-black"
            }`}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Header;
