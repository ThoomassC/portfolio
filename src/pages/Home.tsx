import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  IconArrowDown,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBriefcase,
  IconCode,
  IconDeviceMobile,
  IconDownload,
  IconMail,
  IconMapPin,
  IconMenu2,
  IconMoon,
  IconPhone,
  IconSchool,
  IconTestPipe,
  IconX,
} from "@tabler/icons-react";

const experiences = [
  {
    period: "Septembre 2022 — Septembre 2025",
    dateTime: "2022-09",
    title: "Développeur informatique en alternance",
    company: "Linkt",
    description:
      "Participation au développement et à l’évolution d’un outil de production : amélioration de la maintenabilité, mises en production, correction d’anomalies et développement de fonctionnalités.",
    icon: IconCode,
  },
  {
    period: "Octobre 2025 — Décembre 2025",
    dateTime: "2025-10",
    title: "Développeur TMA full-stack",
    company: "Blue Soft",
    description:
      "Résolution de bugs sur une application en microservices, côté back-end et front-end, avec C# et Angular.",
    icon: IconBriefcase,
  },
  {
    period: "Décembre 2025 — Février 2026",
    dateTime: "2025-12",
    title: "Développeur iOS — cellule de sprint",
    company: "Blue Soft",
    description:
      "Développement Swift au sein d’une cellule de sprint pour une application iOS.",
    icon: IconDeviceMobile,
  },
  {
    period: "Février 2026 — Août 2026",
    dateTime: "2026-02",
    title: "QA automatisation",
    company: "Blue Soft",
    description:
      "Conception et maintenance de tests automatisés Java avec Selenium et Cucumber sur deux projets.",
    icon: IconTestPipe,
  },
];

const formations = [
  {
    title: "Manager en architectures et applications logicielles des SI",
    level: "Bac +5",
    status: "En cours",
    statusType: "in-progress",
  },
  {
    title: "Concepteur développeur d’applications",
    level: "Bac +3",
    status: "Obtenu",
    statusType: "completed",
  },
  {
    title: "Développeur informatique",
    level: "Bac +2",
    status: "Obtenu",
    statusType: "completed",
  },
];

const skillGroups = [
  {
    id: "langages",
    title: "Langages",
    items: [
      "JavaScript",
      "TypeScript",
      "Java",
      "C#",
      "Swift",
      "HTML",
      "CSS",
      "SQL",
    ],
  },
  {
    id: "developpement-web",
    title: "Développement web",
    items: [
      "React",
      "Angular",
      "Node.js",
      "Next.js",
      "NestJS",
      "Express",
      "REST API",
    ],
  },
  {
    id: "qualite-logicielle",
    title: "Qualité logicielle",
    items: [
      "Selenium",
      "Cucumber",
      "Jest",
      "Tests automatisés",
      "Tests fonctionnels",
    ],
  },
  {
    id: "donnees-outils",
    title: "Données & outils",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Git",
      "Docker",
      "Swagger",
      "Figma",
    ],
  },
];

const projects = [
  {
    date: "2024",
    title: "Application de gestion de budget",
    description:
      "Application en cours de développement pour piloter un budget personnel, conçue avec une architecture hexagonale.",
  },
  {
    date: "2022 — 2024",
    title: "Sites web & APIs",
    description:
      "Création de sites dynamiques et d’APIs avec React et Node.js, en appliquant les principes de Clean Architecture.",
  },
  {
    date: "Janvier 2024",
    title: "GameJam Rouen Métropole",
    description:
      "Conception en équipe d’un mini-jeu vidéo lors d’une GameJam de 48 heures, à partir d’un thème imposé.",
  },
];

const navigationItems = [
  { id: "parcours", label: "Parcours" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "accessibilite", label: "Accessibilité" },
  { id: "contact", label: "Contact" },
];

type Theme = "light" | "dark";

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return window.localStorage.getItem("portfolio-theme") === "dark"
        ? "dark"
        : "light";
    } catch {
      return "light";
    }
  });
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsMenuOpen(false);
  const isDarkTheme = theme === "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    themeColor?.setAttribute("content", isDarkTheme ? "#081721" : "#e7eff1");

    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Le thème reste utilisable même si le stockage local est indisponible.
    }
  }, [isDarkTheme, theme]);

  useEffect(() => {
    const sections = navigationItems
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              Math.abs(firstEntry.boundingClientRect.top) -
              Math.abs(secondEntry.boundingClientRect.top),
          )[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    root.classList.add("reveal-enabled");

    let animationFrame = 0;

    const updateVisibility = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const visibilityMargin = Math.min(viewportHeight * 0.28, 240);

      elements.forEach((element) => {
        const { top, bottom } = element.getBoundingClientRect();
        const isNearViewport =
          bottom >= -visibilityMargin &&
          top <= viewportHeight + visibilityMargin;

        element.classList.toggle("is-visible", isNearViewport);
      });
    };

    const scheduleVisibilityUpdate = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateVisibility);
      }
    };

    window.addEventListener("scroll", scheduleVisibilityUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleVisibilityUpdate);
    scheduleVisibilityUpdate();

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", scheduleVisibilityUpdate);
      window.removeEventListener("resize", scheduleVisibilityUpdate);
      root.classList.remove("reveal-enabled");
      elements.forEach((element) => element.classList.remove("is-visible"));
    };
  }, []);

  return (
    <main className="portfolio-page" id="contenu-principal" tabIndex={-1}>
      <div className="liquid-bubble liquid-bubble-one" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-two" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-three" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-four" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-five" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-six" aria-hidden="true" />

      <nav
        className="main-navigation"
        aria-label="Navigation principale"
        onKeyDown={(event) => {
          if (event.key === "Escape" && isMenuOpen) {
            closeMenu();
            menuButtonRef.current?.focus();
          }
        }}
      >
        <div className="container navigation-shell" data-reveal="down">
          <button
            className="theme-toggle"
            type="button"
            aria-label="Thème sombre"
            aria-pressed={isDarkTheme}
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === "light" ? "dark" : "light",
              )
            }
          >
            <IconMoon aria-hidden="true" size={20} stroke={2.3} />
            <span>Sombre</span>
          </button>

          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="navigation-principale"
            aria-label={
              isMenuOpen
                ? "Fermer le menu principal"
                : "Ouvrir le menu principal"
            }
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          >
            {isMenuOpen ? (
              <IconX aria-hidden="true" size={22} stroke={2.4} />
            ) : (
              <IconMenu2 aria-hidden="true" size={22} stroke={2.4} />
            )}
            <span>Menu</span>
          </button>

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
                  setActiveSection(id);
                  closeMenu();
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="hero" aria-labelledby="titre-principal">
        <div className="container">
          <div className="hero-card liquid-card" data-reveal="scale">
            <div className="hero-content">
              <p className="eyebrow">Développeur logiciel · Full-stack · QA</p>
              <h1 id="titre-principal">Thomas Caron</h1>
              <p className="hero-current-role">
                <strong>Actuellement</strong>
                <span>Développeur Full Stack chez Blue Soft</span>
              </p>
              <p className="hero-lede">
                Je développe et fiabilise des applications web et mobiles, du C#
                et Angular aux tests automatisés Java avec Selenium et Cucumber.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Me contacter
                  <IconArrowDown aria-hidden="true" size={18} stroke={2.5} />
                </a>
                <a
                  className="button button-secondary"
                  href="/assets/CV_Thomas_MAALSI.pdf"
                  download
                >
                  <IconDownload aria-hidden="true" size={18} stroke={2.5} />
                  Télécharger mon CV
                </a>
              </div>
              <ul
                className="hero-details"
                aria-label="Informations principales"
              >
                <li>Mont-Saint-Aignan, France</li>
                <li>Motivation - Curiosité - Esprit d’équipe</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-shell"
        id="parcours"
        aria-labelledby="titre-parcours"
      >
        <div className="container">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Expérience</p>
            <h2 id="titre-parcours">
              Un parcours construit sur le produit et sa qualité.
            </h2>
            <p>
              Du développement d’outils de production à l’automatisation de
              tests, j’interviens à chaque étape qui rend une application utile
              et fiable.
            </p>
          </div>

          <div className="journey-layout">
            <ol className="timeline" aria-label="Expériences professionnelles">
              {experiences.map((experience, index) => {
                const ExperienceIcon = experience.icon;

                return (
                  <li
                    className={`timeline-item liquid-card reveal-delay-${Math.min(index, 3)}`}
                    data-reveal="up"
                    key={experience.title}
                  >
                    <div className="squircle timeline-icon" aria-hidden="true">
                      <ExperienceIcon size={25} stroke={2} />
                    </div>
                    <div>
                      <time dateTime={experience.dateTime}>
                        {experience.period}
                      </time>
                      <h3>{experience.title}</h3>
                      <p className="company">{experience.company}</p>
                      <p>{experience.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <aside
              className="education liquid-card reveal-delay-2"
              aria-labelledby="titre-formations"
              data-reveal="up"
            >
              <div className="squircle education-icon" aria-hidden="true">
                <IconSchool size={25} stroke={2} />
              </div>
              <p className="eyebrow">Formation</p>
              <h2 id="titre-formations">Apprendre pour mieux construire.</h2>
              <p className="school-name">École CESI</p>
              <ul>
                {formations.map((formation) => (
                  <li key={formation.title}>
                    <strong>{formation.title}</strong>
                    <div className="formation-meta">
                      <span className="formation-level">{formation.level}</span>
                      <span
                        className={`education-status education-status--${formation.statusType}`}
                      >
                        {formation.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section
        className="section-shell"
        id="competences"
        aria-labelledby="titre-competences"
      >
        <div className="container">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Compétences</p>
            <h2 id="titre-competences">Un socle technique polyvalent.</h2>
            <p>
              Des technologies choisies pour développer, faire évoluer et
              vérifier la qualité des applications.
            </p>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <section
                className={`skill-group liquid-card reveal-delay-${index % 2}`}
                key={group.title}
                aria-labelledby={`skill-${group.id}`}
                data-reveal="up"
              >
                <h3 id={`skill-${group.id}`}>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell"
        id="projets"
        aria-labelledby="titre-projets"
      >
        <div className="container">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Projets</p>
            <h2 id="titre-projets">
              Des réalisations, avec le goût du concret.
            </h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card liquid-card reveal-delay-${index}`}
                data-reveal="up"
                key={project.title}
              >
                <p className="project-date">{project.date}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell accessibility-section"
        id="accessibilite"
        aria-labelledby="titre-accessibilite"
      >
        <div className="container">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Accessibilité</p>
            <h2 id="titre-accessibilite">
              Un portfolio pensé pour être utilisable par tous.
            </h2>
            <p>
              Ce site vise un niveau de conformité aussi élevé que possible au
              RGAA 4.1.2 et fait l’objet d’améliorations continues.
            </p>
          </div>

          <div className="accessibility-card liquid-card" data-reveal="up">
            <div className="accessibility-introduction">
              <p className="accessibility-status">
                <span>État actuel</span>
                Audit technique réalisé en juillet 2026
              </p>
              <h3>Plusieurs façons de parcourir le même contenu.</h3>
              <p>
                Le portfolio est conçu pour rester lisible, compréhensible et
                navigable avec différents appareils et modes d’interaction.
              </p>
            </div>

            <div>
              <ul className="accessibility-list">
                <li>
                  <strong>Navigation</strong>
                  <span>
                    Lien d’évitement, titres structurés et utilisation au
                    clavier.
                  </span>
                </li>
                <li>
                  <strong>Lecture</strong>
                  <span>
                    Contrastes renforcés, textes redimensionnables et thème
                    sombre optionnel.
                  </span>
                </li>
                <li>
                  <strong>Confort</strong>
                  <span>
                    Mise en page responsive et préférence de réduction des
                    mouvements respectée.
                  </span>
                </li>
              </ul>

              <p className="accessibility-limit">
                <strong>Limite connue :</strong> le CV PDF téléchargeable est en
                cours de remise en accessibilité.
              </p>

              <a
                className="button button-secondary accessibility-contact"
                href="mailto:caronthomas27@gmail.com?subject=Signalement%20accessibilit%C3%A9%20du%20portfolio"
              >
                Signaler un problème d’accessibilité
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-shell contact-section"
        id="contact"
        aria-labelledby="titre-contact"
      >
        <div className="container">
          <div className="contact-card liquid-card" data-reveal="up">
            <div className="section-heading section-heading-compact">
              <p className="eyebrow">Contact</p>
              <h2 id="titre-contact">Parlons de votre prochain projet.</h2>
              <p>
                Une opportunité, une idée ou simplement l’envie d’échanger : je
                vous répondrai avec plaisir.
              </p>
            </div>

            <address className="contact-links">
              <a href="mailto:caronthomas27@gmail.com">
                <span className="squircle contact-icon" aria-hidden="true">
                  <IconMail size={22} stroke={2} />
                </span>
                <span>
                  <small>E-mail</small>
                  caronthomas27@gmail.com
                </span>
                <IconArrowUpRight
                  className="contact-arrow"
                  aria-hidden="true"
                  size={19}
                />
              </a>
              <a href="tel:+33783523785">
                <span className="squircle contact-icon" aria-hidden="true">
                  <IconPhone size={22} stroke={2} />
                </span>
                <span>
                  <small>Téléphone</small>
                  07 83 52 37 85
                </span>
                <IconArrowUpRight
                  className="contact-arrow"
                  aria-hidden="true"
                  size={19}
                />
              </a>
              <a
                href="https://www.google.com/maps?q=Mont-Saint-Aignan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouvrir la localisation de Mont-Saint-Aignan dans Google Maps (nouvelle fenêtre)"
              >
                <span className="squircle contact-icon" aria-hidden="true">
                  <IconMapPin size={22} stroke={2} />
                </span>
                <span>
                  <small>Localisation</small>
                  Mont-Saint-Aignan, France
                </span>
                <IconArrowUpRight
                  className="contact-arrow"
                  aria-hidden="true"
                  size={19}
                />
              </a>
            </address>

            <div
              className="contact-socials"
              aria-label="Réseaux professionnels"
            >
              <a
                className="squircle social-link"
                href="https://www.linkedin.com/in/thomas-caron27/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consulter le profil LinkedIn de Thomas Caron (nouvelle fenêtre)"
              >
                <IconBrandLinkedin aria-hidden="true" size={22} />
              </a>
              <a
                className="squircle social-link"
                href="https://github.com/ThoomassC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consulter le profil GitHub de Thomas Caron (nouvelle fenêtre)"
              >
                <IconBrandGithub aria-hidden="true" size={22} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
