import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isPhone, setIsPhone] = useState(null);

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// custom hook (recommended)
export const useAppContext = () => {
  return useContext(AppContext);
};
