import React, { useState, useEffect } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import "./ScrollButtons.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      // Scroller vers le début du main
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      
      // Donner le focus au h1.skipTarget
      const skipTarget = mainElement.querySelector('.skipTarget');
      if (skipTarget) {
        skipTarget.focus({ preventScroll: true });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <a
      href="#main-content"
      aria-label="Retourner en haut du contenu principal"
      className={`scrollButton scrollToTopButton ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <BsFillArrowUpCircleFill size={30} aria-hidden="true" />
    </a>
  );
};

export default ScrollToTopButton;
