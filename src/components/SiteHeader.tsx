import { useEffect, useRef, useState } from "react";
import { IconMenu2, IconMoon, IconX } from "@tabler/icons-react";

import { navigationItems, navigationSectionIds } from "../content/navigation";
import { profile } from "../content/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection, selectSection } = useActiveSection(navigationSectionIds);
  const { isDarkTheme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * Les listeners sont posés sur `document` et non sur le `<nav>` : après un
   * clic sur un `<button>`, Safari laisse le focus sur `<body>`, un `onKeyDown`
   * porté par la navigation ne verrait donc jamais la touche Échap.
   */
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    const handlePointerDown = (event: Event) => {
      const target = event.target;

      if (target instanceof Node && headerRef.current?.contains(target)) {
        return;
      }

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
    <header className="site-header" ref={headerRef}>
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#contenu-principal">
          {profile.name}
          {/* Decorative HERE, unlike the hero. `profile.portrait.alt` is a descriptive
              alternative because the hero image stands alone and carries the identity by
              itself. Inside this link the identity is already carried by the name right
              beside it, so a descriptive alt would make the link announce "Thomas Caron
              Thomas Caron, souriant, en chemise bleu marine sur fond clair". An empty alt
              keeps the link's accessible name equal to its visible text. */}
          <img
            className="site-header__avatar"
            src={profile.portrait.src}
            width={32}
            height={32}
            alt=""
            decoding="async"
          />
        </a>

        <nav className="main-navigation" aria-label="Navigation principale">
          <div
            id="navigation-principale"
            className={`section-nav section-nav--site${isMenuOpen ? " is-open" : ""}`}
          >
            {navigationItems.map(({ id, label }) => (
              <a
                href={`#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
                key={id}
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

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="navigation-principale"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          {isMenuOpen ? (
            <IconX aria-hidden="true" size={22} stroke={2.4} />
          ) : (
            <IconMenu2 aria-hidden="true" size={22} stroke={2.4} />
          )}
          <span>Menu</span>
        </button>

        <button
          className="theme-toggle"
          type="button"
          aria-pressed={isDarkTheme}
          onClick={toggleTheme}
        >
          <IconMoon aria-hidden="true" size={20} stroke={2.3} />
          <span>Thème sombre</span>
        </button>
      </div>
    </header>
  );
};

export default SiteHeader;
