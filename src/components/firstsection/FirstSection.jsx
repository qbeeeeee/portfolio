import React from "react";
import BackgroundGradient from "./BackgroundGradient";
import Starfield from "./StarField";

const FirstSection = () => {
  return (
    <div className="w-full relative min-h-screen">
      <BackgroundGradient />
      <Starfield />
    </div>
  );
};

export default FirstSection;
