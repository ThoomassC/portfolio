import { useEffect, useRef, useState } from "react";
import { IconArrowUpRight, IconMenu2, IconMoon, IconSun, IconX } from "@tabler/icons-react";
import { navigationItems, navigationSectionIds } from "../content/navigation";
import { profile } from "../content/profile";
import { useActiveSection } from "../hooks/useActiveSection";
import { THEME_ICONS, useTheme } from "../hooks/useTheme";

const SiteHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection, selectSection } = useActiveSection(navigationSectionIds);
  const { theme, isDarkTheme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
    <header className="site-header" ref={headerRef}>
      <a className="site-header__brand" href="#contenu-principal">
        <img
          className="brand-monogram"
          src={THEME_ICONS[theme].svg}
          width={36}
          height={38}
          alt=""
          aria-hidden="true"
        />
        <span>{profile.name}</span>
        <img
          className="site-header__avatar"
          src={profile.portrait.src}
          width={28}
          height={28}
          alt=""
          decoding="async"
        />
      </a>
      <nav className="main-navigation" aria-label="Navigation principale">
        <div id="navigation-principale" className={`section-nav${isMenuOpen ? " is-open" : ""}`}>
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
      <div className="header-actions">
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
              <IconSun size={19} stroke={1.8} />
            </span>
            <span className="theme-toggle__moon">
              <IconMoon size={19} stroke={1.8} />
            </span>
          </span>
          <span className="visually-hidden">Thème sombre</span>
        </button>
        <a className="header-contact" href="#contact">
          Parlons-en <IconArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="navigation-principale"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span>Menu</span>
          {isMenuOpen ? (
            <IconX aria-hidden="true" size={21} />
          ) : (
            <IconMenu2 aria-hidden="true" size={21} />
          )}
        </button>
      </div>
    </header>
  );
};
export default SiteHeader;
