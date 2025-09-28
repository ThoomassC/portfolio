import { useState, useEffect } from "react";

export const useScrollToBottom = (offset = 50) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - offset
      ) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return isAtBottom;
};
