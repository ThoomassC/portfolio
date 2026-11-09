import { type ReactNode, useEffect, useRef, useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

type InfoToggleProps = {
  /** Identifiant de la bulle, relié au bouton par `aria-controls`. */
  readonly id: string;
  /** Nom accessible du bouton, par exemple « Description du projet Astrologie ». */
  readonly label: string;
  /** Prévient le parent pour qu'il passe au-dessus de ses voisins tant que la bulle est ouverte. */
  readonly onOpenChange?: (open: boolean) => void;
  readonly children: ReactNode;
};

/**
 * Le « i » cerclé et sa bulle. À placer dans un conteneur positionné qui porte aussi le
 * titre : la bulle s'ouvre juste dessous. Échap la referme et rend le focus au bouton,
 * un clic en dehors aussi.
 */
const InfoToggle = ({ id, label, onOpenChange, children }: InfoToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div className="info-root" ref={rootRef}>
      <button
        ref={toggleRef}
        className="info-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen((open) => !open)}
      >
        <IconInfoCircle size={18} stroke={1.75} aria-hidden="true" />
        <span className="visually-hidden">{label}</span>
      </button>
      <div className="info-bubble" id={id} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
};

export default InfoToggle;
