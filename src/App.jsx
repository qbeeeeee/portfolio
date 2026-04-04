import React, { useEffect, useState } from "react";
import PreloaderHero from "./components/Firstsection/PreloaderHero";
import KeepMeSection from "./components/KeepMeSection/KeepMeSection";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OtherProjects from "./components/OtherProjects";
import ContactMe from "./components/ContactMe/ContactMe";
import { useAppContext } from "./AppContext";
import Header from "./components/Header/Header";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const { resumeScroll } = useAppContext();

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
      <Header animationFinished={animationFinished} />

      <div
        id="home"
        className="w-full relative min-h-[calc(100vh_+_700px)] z-20"
      >
        <PreloaderHero
          setAnimationFinished={setAnimationFinished}
          animationFinished={animationFinished}
        />
      </div>

      <section id="keepme">
        <KeepMeSection />
      </section>

      <section id="projects">
        <OtherProjects animationFinished={animationFinished} />
      </section>

      <section id="contact">
        <ContactMe />
      </section>
    </div>
  );
};

export default App;
