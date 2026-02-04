import React, { useEffect, useRef, useState } from "react";
import PreloaderHero from "./components/firstsection/PreloaderHero";
import KeepMeSection from "./components/KeepMeSection/KeepMeSection";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OtherProjects from "./components/OtherProjects";
import StarField from "./components/StarField";

gsap.registerPlugin(ScrollTrigger);

const MAX_SCROLL_VELOCITY = 30;

const App = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,            // smoothing = lower max speed
      wheelMultiplier: 0.75, // mouse wheel
      touchMultiplier: 0.75, // trackpad / touch
      smoothWheel: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    lenis.stop();

    // Clamp scroll velocity + sync ScrollTrigger
    let isClamping = false;

    lenis.on("scroll", ({ velocity }) => {
      if (!isClamping && Math.abs(velocity) > MAX_SCROLL_VELOCITY) {
        isClamping = true;

        lenis.scrollTo(lenis.scroll, {
          immediate: true,
          lock: true,
        });

        // release lock on next frame
        requestAnimationFrame(() => {
          isClamping = false;
        });
      }

      ScrollTrigger.update();
    });
    
    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    window.scrollTo(0, 0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const stopScroll = () => {
    if (!lenisRef.current) return;
    lenisRef.current.stop(); // stops all user scroll
    console.log("Scrolling stopped");
  };

  const resumeScroll = () => {
    if (!lenisRef.current) return;
    lenisRef.current.start(); // resumes scrolling
    console.log("Scrolling resumed");
  };

  const vh = window.innerHeight;
  const totalHeight = 1.1 * vh + 5500;

  useEffect(() => {
    // Disable browser scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force to top immediately
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (animationFinished) {
      resumeScroll();
    }
  }, [animationFinished]);

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at center, #1a001a 0%, #000000 100%)",
      }}
      className={`overflow-x-hidden relative ${
        !animationFinished ? "overflow-hidden h-screen" : ""
      }`}
    >
      {/* {animationFinished && (
        <>
          <StarField />
        </>
      )} */}

      <div className="w-full relative min-h-screen z-20">
        <PreloaderHero setAnimationFinished={setAnimationFinished} />
      </div>

      <div className="h-[calc(110vh_+_13000px)]">
        <KeepMeSection />
      </div>

      <OtherProjects
        animationFinished={animationFinished}
        stopScroll={stopScroll}
        resumeScroll={resumeScroll}
      />

      <div className="h-[100vh]"></div>
    </div>
  );
};

export default App;
