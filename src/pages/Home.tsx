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
  IconPhone,
  IconSchool,
  IconTestPipe,
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

function Home() {
  return (
    <main className="portfolio-page" id="contenu-principal" tabIndex={-1}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="glass-orb glass-orb-one" aria-hidden="true" />
      <div className="glass-orb glass-orb-two" aria-hidden="true" />

      <section className="hero section-shell" aria-labelledby="titre-principal">
        <div className="container">
          <nav className="section-nav" aria-label="Navigation principale">
            <a href="#parcours">Parcours</a>
            <a href="#competences">Compétences</a>
            <a href="#projets">Projets</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="hero-card liquid-card">
            <p className="eyebrow">Développeur logiciel · Full-stack · QA</p>
            <h1 id="titre-principal">Thomas Caron</h1>
            <p className="hero-lede">
              Je conçois des expériences numériques fiables, du développement
              applicatif aux tests automatisés.
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
            <ul className="hero-details" aria-label="Informations principales">
              <li>Mont-Saint-Aignan, France</li>
              <li>Développement web, mobile & qualité logicielle</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className="section-shell"
        id="parcours"
        aria-labelledby="titre-parcours"
      >
        <div className="container">
          <div className="section-heading">
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
              {experiences.map((experience) => {
                const ExperienceIcon = experience.icon;

                return (
                  <li
                    className="timeline-item liquid-card"
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
              className="education liquid-card"
              aria-labelledby="titre-formations"
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
          <div className="section-heading">
            <p className="eyebrow">Compétences</p>
            <h2 id="titre-competences">Un socle technique polyvalent.</h2>
            <p>
              Des technologies choisies pour développer, faire évoluer et
              vérifier la qualité des applications.
            </p>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <section
                className="skill-group liquid-card"
                key={group.title}
                aria-labelledby={`skill-${group.title}`}
              >
                <h3 id={`skill-${group.title}`}>{group.title}</h3>
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
          <div className="section-heading">
            <p className="eyebrow">Projets</p>
            <h2 id="titre-projets">
              Des réalisations, avec le goût du concret.
            </h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card liquid-card" key={project.title}>
                <p className="project-date">{project.date}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-shell contact-section"
        id="contact"
        aria-labelledby="titre-contact"
      >
        <div className="container">
          <div className="contact-card liquid-card">
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
