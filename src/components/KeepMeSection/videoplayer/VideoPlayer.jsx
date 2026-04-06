import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = ({
  videoSource,
  onVideoEnd,
  videoWrapperInsideRef,
  videoRef,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const handleButtonClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoEnd = () => {
    setIsEnded(true); // Mark the video as ended
    setIsPlaying(false);
    if (onVideoEnd) onVideoEnd(); // Callback for video end
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
      setIsEnded(false);
      setIsPlaying(false);
    }
  }, [videoSource]);

  // Auto-Pause when scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Create an observer that triggers when the video is less than 10% visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the video leaves the screen AND it is currently playing, pause it
          if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }, // 10% visibility threshold
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      observer.disconnect();
    };
  }, [videoRef]); // This only runs once on mount

  return (
    <div
      className="relative w-auto h-auto"
      ref={videoWrapperInsideRef}
      style={{ opacity: 0 }}
    >
      <video
        ref={videoRef}
        src={videoSource}
        preload="metadata" // Stops massive background downloads on load
        className="w-auto h-auto max-h-[min(75dvh,689px)] max-w-[min(90vw,1225px)] min-h-[250px] lg:min-h-[500px] rounded-[40px] object-contain"
        muted
        playsInline
        webkit-playsinline="true"
        onEnded={handleVideoEnd}
        onPlay={() => {
          setIsPlaying(true);
          setIsEnded(false);
        }}
        onPause={() => setIsPlaying(false)}
      />

      <button
        onClick={handleButtonClick}
        className="absolute z-40 bottom-8 right-8 bg-white text-gray-500 p-3 sm:p-5 flex items-center justify-center rounded-full shadow-md hover:bg-gray-300 transition"
      >
        <FontAwesomeIcon
          className="w-4 sm:w-5 h-4 sm:h-5"
          icon={isEnded ? faRotateLeft : isPlaying ? faPause : faPlay}
        />
      </button>
    </div>
  );
};

export default VideoPlayer;
