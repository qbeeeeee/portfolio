import React, { useEffect, useRef, useState } from "react";
import PreloaderHero from "./components/Firstsection/PreloaderHero";
import KeepMeSection from "./components/KeepMeSection/KeepMeSection";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OtherProjects from "./components/OtherProjects";
import ContactMe from "./components/ContactMe/ContactMe";
import { AppProvider } from "./AppContext";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Add a set duration for a more consistent feel
      lerp: 0.08,
      wheelMultiplier: 0.75,
      touchMultiplier: 2, // You might want to bump this slightly if syncTouch is on
      infinite: false,
      smoothWheel: true,

      // KEY SETTINGS FOR MOBILE STACKING:
      smoothTouch: true, // Keep this true
      syncTouch: true, // This mimics native touch scroll behavior and prevents "stacking"
      syncTouchLerp: 0.08, // Ensures the touch speed matches your lerp speed
      touchInertiaMultiplier: 15, // Limits how much "flick" carries over
    });

    lenisRef.current = lenis;
    lenis.stop();

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => {
      // Use the standard time (seconds) - lenis usually handles the conversion
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // requestAnimationFrame(() => {
    //   ScrollTrigger.refresh();
    // });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const stopScroll = () => {
    if (!lenisRef.current) return;
    lenisRef.current.stop(); // stops all user scroll
  };

  const resumeScroll = () => {
    if (!lenisRef.current) return;
    lenisRef.current.start(); // resumes scrolling
  };

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
    <AppProvider>
      <div
        style={{
          background:
            "radial-gradient(circle at center, #1a001a 0%, #000000 100%)",
        }}
        className={`overflow-x-hidden relative ${
          !animationFinished ? "overflow-hidden h-screen" : ""
        }`}
      >
        <div className="w-full relative min-h-[calc(100vh_+_700px)] z-20">
          <PreloaderHero
            setAnimationFinished={setAnimationFinished}
            animationFinished={animationFinished}
          />
        </div>

        <KeepMeSection />

        <OtherProjects
          animationFinished={animationFinished}
          stopScroll={stopScroll}
          resumeScroll={resumeScroll}
        />

        <ContactMe />
      </div>
    </AppProvider>
  );
};

export default App;
