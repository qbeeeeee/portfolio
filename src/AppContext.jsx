import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isPhone, setIsPhone] = useState(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenisInstance = new Lenis({
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

    // 1. Update State
    lenisRef.current = lenisInstance;

    // 2. Initial state: stopped (for your preloader)
    lenisInstance.stop();

    // 3. Sync with ScrollTrigger
    lenisInstance.on("scroll", ScrollTrigger.update);

    // 4. GSAP Ticker
    const raf = (time) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stopScroll = () => {
    if (lenisRef.current) lenisRef.current.stop();
  };

  const resumeScroll = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  const scrollToTarget = (target, options) => {
    if (lenisRef.current) {
      // Passes the target and your custom options straight to Lenis!
      lenisRef.current.scrollTo(target, options);
    }
  };

  // Check if is Phone or not
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setIsPhone(640);
      } else if (width >= 640 && width < 1024) {
        setIsPhone(1024);
      } else if (width >= 1024 && width < 1280) {
        setIsPhone(1280);
      } else if (width >= 1280 && width < 1536) {
        setIsPhone(1536);
      } else if (width >= 1536) {
        setIsPhone(1920);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    // Cleanup listener
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const value = {
    isPhone,
    stopScroll,
    resumeScroll,
    scrollToTarget,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// custom hook (recommended)
export const useAppContext = () => {
  return useContext(AppContext);
};
