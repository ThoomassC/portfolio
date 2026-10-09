import type { ReactNode } from "react";
import {
  IconArrowDown,
  IconArrowDownRight,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
  IconMail,
  IconMapPin,
  IconPhone,
  IconPlus,
} from "@tabler/icons-react";
import { Badge } from "@thomascaron/opale";
import ProjectVisual from "../components/ProjectVisual";
import StackChips from "../components/StackChips";
import { experiences } from "../content/experiences";
import { formations } from "../content/formations";
import { passions } from "../content/passions";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { skillGroups } from "../content/skills";
import type { DateRange } from "../content/types";
import { useScrollReveal } from "../hooks/useScrollReveal";

const DateRangeText = ({ range }: { readonly range: DateRange }) => (
  <span className="date-range">
    <time dateTime={range.start.dateTime}>{range.start.label}</time>
    <span aria-hidden="true"> — </span>
    {range.end ? (
      <time dateTime={range.end.dateTime}>{range.end.label}</time>
    ) : (
      <span>Aujourd’hui</span>
    )}
  </span>
);
const SectionHeading = ({
  number,
  label,
  id,
  children,
}: {
  readonly number: string;
  readonly label: string;
  readonly id: string;
  readonly children: ReactNode;
}) => (
  <div className="section-heading" data-reveal="up">
    <p className="section-index">
      <span>{number} /</span> {label}
    </p>
    <h2 id={id}>{children}</h2>
  </div>
);
const badgeVariantByStatus = {
  completed: "positive",
  "in-progress": "info",
  upcoming: "warning",
} as const;

const Home = () => {
  useScrollReveal();
  return (
    <main className="portfolio-page" id="contenu-principal" tabIndex={-1}>
      <section className="hero" aria-labelledby="titre-principal">
        <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
        <div className="hero-intro" data-reveal="up">
          <p className="eyebrow eyebrow-roles">
            <span>Développeur logiciel</span> · <span>Full-stack</span> · <span>QA</span>
          </p>
          <p>
            De l’idée au produit.
            <br /> Du code à la qualité.
          </p>
        </div>
        <div className="hero-current-role" data-reveal="up">
          <span className="status-dot" aria-hidden="true" />
          <p>
            Actuellement
            <br />{" "}
            <strong>
              Développeur Full Stack
              <br /> chez Blue Soft
            </strong>
          </p>
        </div>
        <h1 id="titre-principal" className="hero-name">
          {profile.name}
        </h1>
        <div className="hero-portrait">
          <img
            src={profile.portrait.cutout.src}
            width={profile.portrait.cutout.width}
            height={profile.portrait.cutout.height}
            alt={profile.portrait.cutout.alt}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-bottom">
          <div className="hero-location">
            <p>
              Basé à Rouen, France.
              <br /> Mobile Paris · remote partiel
            </p>
            <ul className="hero-socials" aria-label="Profils en ligne">
              <li>
                <a href={profile.gitHubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub <IconArrowUpRight size={14} aria-hidden="true" />
                  <span className="visually-hidden"> de Thomas Caron (nouvelle fenêtre)</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn <IconArrowUpRight size={14} aria-hidden="true" />
                  <span className="visually-hidden"> de Thomas Caron (nouvelle fenêtre)</span>
                </a>
              </li>
            </ul>
          </div>
          <a className="hero-scroll" href="#apropos">
            <span>Faire connaissance</span>
            <IconArrowDown aria-hidden="true" size={42} stroke={1.3} />
          </a>
        </div>
        <span className="hero-edition" aria-hidden="true">
          PORTFOLIO — ÉDITION 2026
        </span>
        <p className="hero-availability">{profile.availability}</p>
      </section>

      <section className="about-section section-dark" id="apropos" aria-labelledby="titre-apropos">
        <div className="container">
          <p className="section-index" data-reveal="up">
            <span>01 /</span> Faisons connaissance
          </p>
          <h2 className="display-title" id="titre-apropos" data-reveal="up">
            À PROPOS
          </h2>
          <div className="about-layout">
            <IconArrowDownRight
              className="about-arrow"
              size={180}
              stroke={0.8}
              aria-hidden="true"
            />
            <div className="about-copy" data-reveal="up">
              <p className="about-lede">
                Je construis des applications.
                <br /> <span>Et la confiance qui va avec.</span>
              </p>
              <p>
                Je développe et fiabilise des applications web et mobiles, du C# et Angular aux
                tests automatisés Java avec Selenium et Cucumber. J’aime comprendre le besoin,
                construire une solution utile et m’assurer qu’elle tient dans la durée.
              </p>
              <p>
                En alternance chez Blue Soft et en formation au CESI, je relie développement
                full-stack, architecture et assurance qualité.
              </p>
              <div className="about-actions">
                <a
                  className="button button-light"
                  href={profile.cv.href}
                  download={profile.cv.fileName}
                >
                  <IconDownload size={18} aria-hidden="true" />
                  {profile.cv.label}
                </a>
                <a className="text-link" href="#contact">
                  Me contacter <IconArrowUpRight size={19} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
          <div className="about-facts" data-reveal="up">
            <div>
              <span>01</span>
              <p>
                Développement
                <br /> <strong>Web & mobile</strong>
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                Assurance qualité
                <br /> <strong>Tests & automatisation</strong>
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                Formation actuelle
                <br /> <strong>Architecture logicielle · Bac +5</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-shell projects-section"
        id="projets"
        aria-labelledby="titre-projets"
      >
        <div className="container">
          <div className="section-topline">
            <SectionHeading number="02" label="Sélection de projets" id="titre-projets">
              DU CODE
              <br /> <span>DU CONCRET</span>
            </SectionHeading>
            <p className="section-lede" data-reveal="up">
              Des idées transformées en applications. Un terrain pour construire, expérimenter et
              apprendre.
            </p>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" data-reveal="up" key={project.id}>
                <ProjectVisual id={project.id} />
                <div className="project-meta">
                  <span className="project-number">
                    0{index + 1} / {project.date}
                  </span>
                  <Badge
                    rootClassName="status-badge-root"
                    className={`project-status status-badge status-badge--${project.statusType}`}
                    variant={badgeVariantByStatus[project.statusType]}
                  >
                    {project.status}
                  </Badge>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <StackChips
                  label={`Technologies du projet ${project.title}`}
                  items={project.stack}
                />
                {project.links.length > 0 && (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a
                        className="text-link"
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                        <IconArrowUpRight size={18} aria-hidden="true" />
                        <span className="visually-hidden">
                          {" "}
                          — {project.title} (nouvelle fenêtre)
                        </span>
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <p className="projects-note">Compositions visuelles illustrant les projets.</p>
        </div>
      </section>

      <section
        className="section-shell journey-section"
        id="parcours"
        aria-labelledby="titre-parcours"
      >
        <div className="container">
          <div className="section-topline">
            <SectionHeading number="03" label="Expérience & formation" id="titre-parcours">
              UN PARCOURS
              <br /> <span>PLUSIEURS TERRAINS</span>
            </SectionHeading>
            <p className="section-lede" data-reveal="up">
              Du développement d’outils de production à l’automatisation de tests, j’interviens à
              chaque étape qui rend une application utile et fiable.
            </p>
          </div>
          <ol className="timeline" aria-label="Expériences professionnelles">
            {experiences.map((experience) => (
              <li className="timeline-item" data-reveal="up" key={experience.company}>
                <div className="experience-company">
                  <p className="company">{experience.company}</p>
                  <DateRangeText range={experience.range} />
                </div>
                <div className="experience-content">
                  <h3>{experience.title}</h3>
                  <p>{experience.description}</p>
                  <StackChips
                    label={`Technologies utilisées chez ${experience.company}`}
                    items={experience.stack}
                  />
                  {experience.missions.length > 0 && (
                    <ul
                      className="mission-list"
                      aria-label={`Missions réalisées chez ${experience.company}`}
                    >
                      {experience.missions.map((mission) => (
                        <li key={mission.title}>
                          <DateRangeText range={mission.range} />
                          <h4>{mission.title}</h4>
                          <p>{mission.description}</p>
                          <StackChips
                            label={`Technologies de la mission ${mission.title}`}
                            items={mission.stack}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <aside className="education" aria-labelledby="titre-formations" data-reveal="up">
            <div>
              <p className="section-index">Formation / École CESI</p>
              <h3 id="titre-formations">
                Apprendre pour
                <br /> mieux construire
              </h3>
            </div>
            <ul>
              {formations.map((formation) => (
                <li key={formation.title}>
                  <div>
                    <span className="formation-level">{formation.level}</span>
                    <strong>{formation.title}</strong>
                  </div>
                  <Badge
                    rootClassName="status-badge-root"
                    className={`status-badge status-badge--${formation.statusType}`}
                    variant={badgeVariantByStatus[formation.statusType]}
                  >
                    {formation.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        className="section-shell skills-section section-dark"
        id="competences"
        aria-labelledby="titre-competences"
      >
        <div className="container">
          <SectionHeading number="04" label="Compétences" id="titre-competences">
            LES BONS OUTILS
            <br /> <span>POUR BIEN CONSTRUIRE</span>
          </SectionHeading>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <section
                className="skill-group"
                aria-labelledby={`skill-${group.id}`}
                data-reveal="up"
                key={group.id}
              >
                <span className="skill-number">0{index + 1}</span>
                <div>
                  <h3 id={`skill-${group.id}`}>{group.title}</h3>
                  <StackChips label={`Compétences ${group.title}`} items={group.items} />
                </div>
                <IconPlus size={24} stroke={1.2} aria-hidden="true" />
              </section>
            ))}
          </div>
          <p className="skills-note" data-reveal="up">
            Une stack évolue. La curiosité reste.
          </p>
        </div>
      </section>

      <section
        className="section-shell passions-section"
        id="passions"
        aria-labelledby="titre-passions"
      >
        <div className="container">
          <div className="section-topline">
            <SectionHeading number="05" label="Hors du travail" id="titre-passions">
              AU-DELÀ
              <br /> <span>DU CODE</span>
            </SectionHeading>
            <p className="section-lede" data-reveal="up">
              Ce que je fais du reste de mon temps. Des pratiques tenues dans la durée, chacune avec
              son objectif.
            </p>
          </div>
          <ul className="passions-grid" aria-label="Pratiques personnelles">
            {passions.map((passion) => {
              const PassionIcon = passion.icon;
              return (
                <li className="passion-card" data-reveal="up" key={passion.id}>
                  <PassionIcon size={36} stroke={1.2} aria-hidden="true" />
                  <h3>{passion.title}</h3>
                  <p>{passion.description}</p>
                  {passion.links.length > 0 && (
                    <div className="passion-links">
                      {passion.links.map((link) => (
                        <a
                          className="text-link"
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                          <IconArrowUpRight size={17} aria-hidden="true" />
                          <span className="visually-hidden"> (nouvelle fenêtre)</span>
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="section-shell accessibility-section"
        id="accessibilite"
        aria-labelledby="titre-accessibilite"
      >
        <div className="container accessibility-layout">
          <div data-reveal="up">
            <p className="section-index">
              <span>06 /</span> Accessibilité
            </p>
            <h2 id="titre-accessibilite">
              LE WEB,
              <br /> POUR TOUS
            </h2>
            <p>
              Ce site vise un niveau de conformité aussi élevé que possible au RGAA 4.1.2 et fait
              l’objet d’améliorations continues.
            </p>
            <span className="accessibility-status">
              <span className="status-dot" aria-hidden="true" />
              Améliorations continues
            </span>
          </div>
          <div data-reveal="up">
            <ul className="accessibility-list">
              <li>
                <strong>Navigation</strong>
                <span>Lien d’évitement, titres structurés et utilisation au clavier.</span>
              </li>
              <li>
                <strong>Lecture</strong>
                <span>
                  Contrastes renforcés, textes redimensionnables et thème sombre optionnel.
                </span>
              </li>
              <li>
                <strong>Confort</strong>
                <span>
                  Mise en page responsive et préférence de réduction des mouvements respectée.
                </span>
              </li>
            </ul>
            <p className="accessibility-limit">
              <strong>Limite connue :</strong> le CV PDF téléchargeable est en cours de remise en
              accessibilité.
            </p>
            <a
              className="text-link"
              href={`mailto:${profile.email}?subject=Signalement%20accessibilit%C3%A9%20du%20portfolio`}
            >
              Signaler un problème d’accessibilité
              <IconArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section
        className="contact-section section-dark"
        id="contact"
        aria-labelledby="titre-contact"
      >
        <div className="container">
          <div className="contact-intro" data-reveal="up">
            <p className="section-index">
              <span>07 /</span> Et si on échangeait ?
            </p>
            <p>
              Une opportunité, une idée ou simplement
              <br /> l’envie de faire connaissance.
            </p>
          </div>
          <h2 id="titre-contact" data-reveal="up">
            PARLONS<span>-EN</span>
            <IconArrowUpRight stroke={1} aria-hidden="true" />
          </h2>
          <address className="contact-links" data-reveal="up">
            <a className="contact-email" href={`mailto:${profile.email}`}>
              <IconMail size={23} aria-hidden="true" />
              <span>{profile.email}</span>
              <IconArrowUpRight size={24} aria-hidden="true" />
            </a>
            <a href={profile.phone.href}>
              <IconPhone size={19} aria-hidden="true" />
              {profile.phone.label}
            </a>
            <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer">
              <IconMapPin size={19} aria-hidden="true" />
              {profile.location}
              <span className="visually-hidden"> (nouvelle fenêtre)</span>
            </a>
          </address>
          <div className="contact-bottom">
            <p>{profile.availability}</p>
            <ul className="contact-socials" aria-label="Réseaux professionnels">
              <li>
                <a href={profile.gitHubUrl} target="_blank" rel="noopener noreferrer">
                  <IconBrandGithub size={19} aria-hidden="true" />
                  GitHub
                  <IconArrowUpRight size={15} aria-hidden="true" />
                  <span className="visually-hidden"> (nouvelle fenêtre)</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  <IconBrandLinkedin size={19} aria-hidden="true" />
                  LinkedIn
                  <IconArrowUpRight size={15} aria-hidden="true" />
                  <span className="visually-hidden"> (nouvelle fenêtre)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
