import React, { useEffect } from "react";
import FirstSection from "./components/firstsection/FirstSection";
import KeepMeSection from "./components/KeepMeSection2";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectsSectionV2 from "./components/ProjectsSectionV2";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  const vh = window.innerHeight;
  const totalHeight = 1.1 * vh + 5500;

  return (
    <div className="overflow-x-hidden min-h-[1000vh]">
      <FirstSection />
      <div className="h-[calc(110vh_+_5500px)]">
        <KeepMeSection />
      </div>
      <ProjectsSectionV2 />
    </div>
  );
};

export default App;
