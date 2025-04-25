import React from "react";
import logo from "../assets/logoREDESIGNED.png";

const Title = () => {
  // Custom hook for responsive design
  const useResponsive = () => {
    const [windowWidth, setWindowWidth] = React.useState(
      typeof window !== "undefined" ? window.innerWidth : 1200
    );

    React.useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away to set initial size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures this effect runs only once on mount

    return {
      isMobile: windowWidth < 640,
      isTablet: windowWidth >= 640 && windowWidth < 1024,
      isDesktop: windowWidth >= 1024,
    };
  };

  const { isMobile, isTablet } = useResponsive();

  // Determine font size based on screen width
  const getTitleStyles = () => {
    if (isMobile) {
      return "text-3xl font-bold text-[#431498]";
    }
    if (isTablet) {
      return "text-4xl font-bold text-[#431498]";
    }
    return "text-6xl font-bold text-[#431498]";
  };

  // Determine logo size based on screen width
  const getLogoSize = () => {
    if (isMobile) {
      return "h-12 w-12";
    }
    if (isTablet) {
      return "h-16 w-16";
    }
    return "h-28 w-28";
  };

  return (
    <div
      className="flex justify-center items-center py-2 px-4"
      style={{ backgroundColor: "#dcd8f3" }} // Add a solid purple background
    >
      <h1 className={`${getTitleStyles()} mr-2 md:mr-4 lg:mr-6`}>MoodLens</h1>
      <img src={logo} alt="logo" className={getLogoSize()} />
    </div>
  );
};

export default Title;
