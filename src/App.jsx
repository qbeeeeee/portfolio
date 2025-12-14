import React, { useEffect } from "react";
import ProjectsSection from "./components/ProjectsSection";
import FirstSection from "./components/firstsection/FirstSection";
import KeepMeSection from "./components/KeepMeSection2";
import PlanetsOrbit from "./components/PlanetsOrbit";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  return (
    <div className="overflow-x-hidden min-h-[800vh]">
      <FirstSection />
      <KeepMeSection />
      {/* <PlanetsOrbit /> */}
      <ProjectsSection />
    </div>
  );
};

export default App;
