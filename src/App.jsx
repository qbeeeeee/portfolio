import React, { useEffect, useRef, useState } from "react";
import PreloaderHero from "./components/firstsection/PreloaderHero";
import KeepMeSection from "./components/KeepMeSection/KeepMeSection";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OtherProjects from "./components/OtherProjects";
import StarField from "./components/StarField";

const App = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

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
