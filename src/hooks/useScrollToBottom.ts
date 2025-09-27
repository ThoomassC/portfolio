import { useState, useEffect } from "react";

export const useScrollToBottom = (offset = 50) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // window.innerHeight: Hauteur de la partie visible de la fenêtre
      // window.scrollY: Position de défilement verticale
      // document.documentElement.offsetHeight: Hauteur totale de la page
      // offset: Une marge pour déclencher l'effet un peu avant d'atteindre le fond
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - offset
      ) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    // Vérifier la position au chargement initial (pour les pages sans scroll)
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return isAtBottom;
};
