import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoPlayer = ({ videoSource, onVideoEnd }) => {
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnded, setIsEnded] = useState(false);

  const handleButtonClick = () => {
    const video = videoRef.current;

    if (isEnded) {
      video.play(); // Replay the video if it has ended
      setIsEnded(false);
      setIsPlaying(true);
    } else if (isPlaying) {
      video.pause(); // Pause the video
      setIsPlaying(false);
    } else {
      video.play(); // Play the video
      setIsPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setIsEnded(true); // Mark the video as ended
    setIsPlaying(false);
    if (onVideoEnd) onVideoEnd(); // Callback for video end
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = videoSource;
      videoRef.current.load(); // Ensures the video updates
      setIsEnded(false); // Reset video end state
    }
  }, [videoSource]);

  useGSAP(
    () => {
      if (!videoWrapperRef.current) return;
      const keepmeSelectedProject = ScrollTrigger.getById(
        "keepme-selected-project",
      );

      gsap.fromTo(
        videoWrapperRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.inOut",
          clearProps: "opacity",
          scrollTrigger: {
            trigger: document.body,
            start: () => keepmeSelectedProject?.end,
            end: "+=400",
            scrub: true,
          },
        },
      );
    },
    { dependencies: [] },
  );

  return (
    <div
      className="relative w-full h-full"
      ref={videoWrapperRef}
      style={{ opacity: 0 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full min-h-[300px] sm:min-h-[500px] rounded-[40px] object-cover"
        autoPlay
        muted
        onEnded={handleVideoEnd}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button
        onClick={handleButtonClick}
        className="absolute z-40 bottom-8 right-8 bg-white text-gray-500 p-5 flex items-center justify-center rounded-full shadow-md hover:bg-gray-300 transition"
      >
        <FontAwesomeIcon
          className="w-5 h-5"
          icon={isEnded ? faRotateLeft : isPlaying ? faPause : faPlay}
        />
      </button>
    </div>
  );
};

export default VideoPlayer;
