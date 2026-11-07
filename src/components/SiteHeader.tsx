import { useEffect, useRef, useState } from "react";
import { IconMenu2, IconMoon, IconSun, IconX } from "@tabler/icons-react";
import { navigationItems, navigationSectionIds } from "../content/navigation";
import { profile } from "../content/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";

/**
 * En-tête discret, posé sur la page : nom à gauche, liens directs et thème à droite.
 * Sur grand écran, la navigation devient une colonne fixe en bas à droite qui suit
 * la section lue ; en dessous, elle s'ouvre en plein écran depuis l'icône de menu.
 */
const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection, selectSection } = useActiveSection(navigationSectionIds);
  const { isDarkTheme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationPanelRef = useRef<HTMLDivElement>(null);

  /**
   * Le panneau ouvert couvre tout l'écran : le focus y entre, et la page derrière
   * devient inerte et immobile, pour que ni Tab ni le lecteur d'écran ni le défilement
   * ne s'égarent dans un contenu masqué.
   */
  useEffect(() => {
    if (!isMenuOpen) return;
    const hidden = [
      document.getElementById("contenu-principal"),
      document.querySelector(".site-footer"),
      document.querySelector(".skip-link"),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement);
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    hidden.forEach((element) => {
      element.inert = true;
    });
    root.style.overflow = "hidden";
    navigationPanelRef.current?.querySelector("a")?.focus();

    return () => {
      hidden.forEach((element) => {
        element.inert = false;
      });
      root.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (event: Event) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target))
        setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={`site-header${isMenuOpen ? " is-menu-open" : ""}`} ref={headerRef}>
      <a className="site-header__brand" href="#contenu-principal">
        <img
          className="site-header__avatar"
          src={profile.portrait.src}
          width={28}
          height={28}
          alt=""
          decoding="async"
        />
        <span>{profile.name}</span>
      </a>
      <div className="header-actions">
        <ul className="header-links" aria-label="Liens directs">
          <li>
            <a href={`mailto:${profile.email}`}>E-mail</a>
          </li>
          <li>
            <a href={profile.cv.href} download={profile.cv.fileName}>
              CV<span className="visually-hidden"> — télécharger (PDF, 104 Ko)</span>
            </a>
          </li>
        </ul>
        <button
          className="theme-toggle"
          type="button"
          role="switch"
          aria-checked={isDarkTheme}
          onClick={toggleTheme}
        >
          <span className="theme-toggle__track" aria-hidden="true">
            <span className="theme-toggle__thumb" />
            <span className="theme-toggle__sun">
              <IconSun size={16} stroke={1.8} />
            </span>
            <span className="theme-toggle__moon">
              <IconMoon size={16} stroke={1.8} />
            </span>
          </span>
          <span className="visually-hidden">Thème sombre</span>
        </button>
      </div>
      <nav className="main-navigation" aria-label="Navigation principale">
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="navigation-principale"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className="visually-hidden">Menu</span>
          {isMenuOpen ? (
            <IconX aria-hidden="true" size={22} />
          ) : (
            <IconMenu2 aria-hidden="true" size={22} />
          )}
        </button>
        <div
          id="navigation-principale"
          ref={navigationPanelRef}
          className={`section-nav${isMenuOpen ? " is-open" : ""}`}
        >
          {navigationItems.map(({ id, label }) => (
            <a
              href={`#${id}`}
              key={id}
              aria-current={activeSection === id ? "location" : undefined}
              onClick={() => {
                selectSection(id);
                setIsMenuOpen(false);
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
export default SiteHeader;
