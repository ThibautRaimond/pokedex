import React, { useState, useEffect } from "react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import "./scrollButtons.css";

const ScrollToBotButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const listContainer = document.getElementById("listContainer");
    if (listContainer) {
      const { bottom } = listContainer.getBoundingClientRect();
      setIsVisible(bottom > window.innerHeight);
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`scrollButton scrollToBotButton ${isVisible ? "visible" : ""}`}
      onClick={scrollToBottom}
    >
      <BsFillArrowDownCircleFill size={30} />
    </div>
  );
};

export default ScrollToBotButton;
