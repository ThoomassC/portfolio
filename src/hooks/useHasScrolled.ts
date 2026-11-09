import { useEffect, useState } from "react";

/** Vrai dès que la page a défilé de plus de `threshold` pixels depuis le haut. */
export function useHasScrolled(threshold = 24): boolean {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const update = () => setHasScrolled(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [threshold]);

  return hasScrolled;
}
