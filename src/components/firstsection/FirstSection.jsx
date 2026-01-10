import React from "react";
import PreloaderHero from "./../firstsection/preloader/PreloaderHero";

const FirstSection = () => {
  return (
    <div className="w-full relative min-h-screen z-10">
      <PreloaderHero />
      {/* <Starfield /> */}
    </div>
  );
};

export default FirstSection;
