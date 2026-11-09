import { type ReactNode, useState } from "react";
import {
  IconArrowUpRight,
  IconBriefcase,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Badge } from "@thomascaron/opale";
import InfoToggle from "../components/InfoToggle";
import StackChips from "../components/StackChips";
import { experiences } from "../content/experiences";
import { certifications, formations, languages } from "../content/formations";
import { passions } from "../content/passions";
import { navigationItems } from "../content/navigation";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { skillGroups } from "../content/skills";
import type { DateRange, Project } from "../content/types";
import { useScrollReveal } from "../hooks/useScrollReveal";

const DateRangeText = ({ range }: { readonly range: DateRange }) => (
  <span className="date-range">
    <time dateTime={range.start.dateTime}>{range.start.label}</time>
    <span aria-hidden="true"> — </span>
    <span className="visually-hidden"> à </span>
    {range.end ? (
      <time dateTime={range.end.dateTime}>{range.end.label}</time>
    ) : (
      <span>Aujourd’hui</span>
    )}
  </span>
);

/**
 * Grand titre condensé. Le titre de niveau 2 porte le libellé de la navigation, pour
 * que chaque entrée du menu retrouve sa section par son nom.
 */
const SectionHeading = ({
  sectionId,
  children,
}: {
  readonly sectionId: string;
  readonly children?: ReactNode;
}) => {
  const navigationItem = navigationItems.find((item) => item.id === sectionId);

  return (
    <div className="section-heading" data-reveal="up">
      <h2 id={`titre-${sectionId}`}>{children ?? navigationItem?.label}</h2>
    </div>
  );
};

/** Garde la pastille collée au dernier mot : elle ne passe jamais seule à la ligne. */
const TitleWithBadge = ({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) => {
  const words = title.split(" ");
  const lastWord = words.pop();
  return (
    <>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="nowrap">
        {lastWord}
        {children}
      </span>
    </>
  );
};

/**
 * Une période est en cours tant que sa borne de fin est absente ou à venir. Les
 * dates machine sont au format « AAAA-MM », comparables comme des chaînes.
 */
function isOngoing(range: DateRange): boolean {
  if (!range.end) return true;
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  return range.end.dateTime >= currentMonth;
}

const badgeVariantByStatus = {
  completed: "positive",
  "in-progress": "info",
  upcoming: "warning",
} as const;

/**
 * Carte de projet. Avec un aperçu, la capture est cliquable à la souris, mais retirée
 * du clavier et des lecteurs d'écran : le lien « Voir le site » porte déjà la même
 * destination, un second arrêt de tabulation ferait doublon.
 */
const ProjectCard = ({ project }: { readonly project: Project }) => {
  const siteLink = project.links.find((link) => link.label === "Voir le site");
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const cardClassName = [
    "project-card",
    project.preview && "project-card--featured",
    isInfoOpen && "project-card--info-open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClassName}>
      {project.preview && (
        <a
          className="project-card__preview"
          href={siteLink?.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
        >
          <span className="project-card__chrome">
            <span />
            <span />
            <span />
          </span>
          <img
            src={project.preview.src}
            width={project.preview.width}
            height={project.preview.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </a>
      )}
      <div className="project-card__body">
        <p className="project-card__meta">
          <span className="project-card__date">{project.date}</span>
          <Badge
            rootClassName="status-badge-root"
            className={`status-badge status-badge--${project.statusType}`}
            variant={badgeVariantByStatus[project.statusType]}
          >
            {project.status}
          </Badge>
        </p>
        <div className="project-card__heading">
          <h3 className="project-card__title">{project.title}</h3>
          <InfoToggle
            id={`description-${project.id}`}
            label={`Description du projet ${project.title}`}
            onOpenChange={setIsInfoOpen}
          >
            <p>{project.description}</p>
          </InfoToggle>
        </div>
        <StackChips label={`Technologies du projet ${project.title}`} items={project.stack} />
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
                <IconArrowUpRight size={16} aria-hidden="true" />
                <span className="visually-hidden"> — {project.title} (nouvelle fenêtre)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

/** Identifiant HTML stable tiré d'un intitulé : minuscules ASCII et tirets. */
const slugify = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const featuredProjects = projects.filter((project) => project.preview);
const otherProjects = projects.filter((project) => !project.preview);

const Home = () => {
  useScrollReveal();
  return (
    <main className="portfolio-page" id="contenu-principal" tabIndex={-1}>
      <section className="hero" aria-labelledby="titre-principal">
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
        <div className="hero-content">
          <h1 id="titre-principal" className="hero-name">
            <span>Thomas</span> <span>Caron</span>{" "}
            <span className="hero-name__role">Chef de projet</span>
          </h1>
          <div className="hero-details">
            <div className="hero-intro">
              <p className="eyebrow-roles">
                <span>Responsable portefeuille projets</span> · <span>Management</span> ·{" "}
                <span>Chefferie de projet</span>
              </p>
              <p className="hero-current">
                <span className="status-dot" aria-hidden="true" />
                <span className="text-desktop">
                  Actuellement alternant développeur full stack chez Blue Soft
                </span>
                <span className="text-mobile">Alternant full stack chez Blue Soft</span>
              </p>
              <p>Basé à Rouen, France</p>
            </div>
          </div>
          <div className="hero-footer">
            <p className="hero-seeking">
              <IconBriefcase size={16} stroke={1.75} aria-hidden="true" />
              <span className="text-desktop">{profile.seeking}</span>
              <span className="text-mobile">Alternance dès octobre 2027</span>
            </p>
            <p className="hero-next-step">
              <span className="text-desktop">{profile.nextStep}</span>
              <span className="text-mobile">Objectif : Mastère Spécialisé® au CESI</span>
            </p>
          </div>
        </div>
      </section>

      <section
        className="page-section skills-section"
        id="competences"
        aria-labelledby="titre-competences"
      >
        <div className="container">
          <SectionHeading sectionId="competences" />
          <div className="skills-groups">
            {skillGroups.map((group) => {
              const total = group.items.length + (group.featured?.items.length ?? 0);
              return (
                <div className="skill-group" data-reveal="up" key={group.id}>
                  <h3 className="skill-group__title" id={`skill-${group.id}`}>
                    <TitleWithBadge title={group.title}>
                      <span className="skill-group__count" aria-hidden="true">
                        {total}
                      </span>
                      <span className="visually-hidden">{`, ${total} compétences`}</span>
                    </TitleWithBadge>
                  </h3>
                  <div className="skill-group__body">
                    {group.featured && (
                      <div className="skill-cluster">
                        <p className="skill-cluster__label">{group.featured.label}</p>
                        <ul
                          className="skill-chips skill-chips--featured"
                          aria-label={`Compétences ${group.title} — ${group.featured.label}`}
                        >
                          {group.featured.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="skill-cluster">
                      {group.featured && <p className="skill-cluster__label">Technique</p>}
                      <ul
                        className="skill-chips"
                        aria-label={
                          group.featured
                            ? `Compétences ${group.title} — Technique`
                            : `Compétences ${group.title}`
                        }
                      >
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="page-section journey-section"
        id="parcours"
        aria-labelledby="titre-parcours"
      >
        <div className="container">
          <SectionHeading sectionId="parcours" />
          <ol className="timeline" aria-label="Expériences professionnelles">
            {experiences.map((experience) => {
              const isCurrentExperience = isOngoing(experience.range);
              return (
                <li className="timeline-item" data-reveal="up" key={experience.company}>
                  <div className="timeline-item__aside">
                    <h3>{experience.title}</h3>
                    <p className="company">{experience.company}</p>
                    <p className="timeline-item__date">
                      {isCurrentExperience && (
                        <>
                          <span className="status-dot" aria-hidden="true" />
                          <span className="visually-hidden">En cours : </span>
                        </>
                      )}
                      <DateRangeText range={experience.range} />
                    </p>
                  </div>
                  <div className="timeline-item__body">
                    {experience.description && (
                      <p className="timeline-item__lede">{experience.description}</p>
                    )}
                    <StackChips
                      label={`Technologies utilisées chez ${experience.company}`}
                      items={experience.stack}
                    />
                    {experience.missions.length > 0 && (
                      <ul
                        className="mission-list"
                        aria-label={`Missions réalisées chez ${experience.company}`}
                      >
                        {experience.missions.map((mission) => {
                          const isCurrentMission = isOngoing(mission.range);
                          return (
                            <li
                              className={`mission${isCurrentMission ? " mission--current" : ""}`}
                              key={mission.title}
                            >
                              <p className="mission-date">
                                {isCurrentMission && (
                                  <span className="visually-hidden">En cours : </span>
                                )}
                                <DateRangeText range={mission.range} />
                              </p>
                              {mission.details ? (
                                <div className="mission-heading">
                                  <h4>{mission.title}</h4>
                                  <InfoToggle
                                    id={`details-${slugify(mission.title)}`}
                                    label={`Détails du poste ${mission.title}`}
                                  >
                                    <dl className="info-details">
                                      <dt>Contexte</dt>
                                      <dd>{mission.details.context}</dd>
                                      <dt>Rôle</dt>
                                      <dd>{mission.details.role}</dd>
                                      <dt>Méthode</dt>
                                      <dd>{mission.details.method}</dd>
                                      <dt>Résultat</dt>
                                      <dd>{mission.details.result}</dd>
                                    </dl>
                                  </InfoToggle>
                                </div>
                              ) : (
                                <h4>{mission.title}</h4>
                              )}
                              <p>{mission.description}</p>
                              <StackChips
                                label={`Technologies de la mission ${mission.title}`}
                                items={mission.stack}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section
        className="page-section formation-section"
        id="formations"
        aria-labelledby="titre-formations"
      >
        <div className="container">
          <SectionHeading sectionId="formations" />
          <ul className="education-list" data-reveal="up">
            {formations.map((formation) => (
              <li
                className={
                  formation.statusType === "in-progress"
                    ? "formation formation--current"
                    : "formation"
                }
                key={formation.title}
              >
                <span className="formation-level">{formation.level}</span>
                <div className="formation-title">
                  <strong>{formation.title}</strong>
                  <p className="formation-years">
                    {formation.school} · <DateRangeText range={formation.range} />
                  </p>
                  {formation.highlight && (
                    <p className="formation-highlight">
                      <IconUsersGroup size={16} stroke={1.75} aria-hidden="true" />
                      {formation.highlight}
                    </p>
                  )}
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
          <div className="qualifications" data-reveal="up">
            <div className="qualification-group">
              <h3 className="qualification-group__title">Langues</h3>
              <ul className="qualification-list">
                {languages.map((language) => (
                  <li key={language.label}>
                    {language.label} <strong>{language.level}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="qualification-group">
              <h3 className="qualification-group__title">Certifications</h3>
              <ul className="qualification-list">
                {certifications.map((certification) => (
                  <li key={certification}>{certification}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="page-section projects-section"
        id="projets"
        aria-labelledby="titre-projets"
      >
        <div className="container">
          <SectionHeading sectionId="projets" />
          <div className="project-showcase" data-reveal="up">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {otherProjects.length > 0 && (
            <>
              <p className="projects-subtitle" data-reveal="up">
                Autres projets
              </p>
              <div className="project-grid" data-reveal="up">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section
        className="page-section passions-section"
        id="passions"
        aria-labelledby="titre-passions"
      >
        <div className="container">
          <SectionHeading sectionId="passions" />
          <ul className="passion-grid" data-reveal="up" aria-label="Pratiques personnelles">
            {passions.map((passion) => {
              const Icon = passion.icon;
              return (
                <li className="passion-card" key={passion.id}>
                  <span className="passion-card__icon" aria-hidden="true">
                    <Icon size={26} stroke={1.75} />
                  </span>
                  <h3 className="passion-card__title">{passion.title}</h3>
                  <p className="passion-card__text">{passion.description}</p>
                  {passion.links.length > 0 && (
                    <div className="project-links">
                      {passion.links.map((link) => (
                        <a
                          className="text-link"
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                          <IconArrowUpRight size={16} aria-hidden="true" />
                          <span className="visually-hidden"> (nouvelle fenêtre)</span>
                        </a>
                      ))}
                    </div>
                  )}
                  <Icon
                    className="passion-card__watermark"
                    size={168}
                    stroke={1}
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section
        className="page-section contact-section"
        id="contact"
        aria-labelledby="titre-contact"
      >
        <div className="container">
          <SectionHeading sectionId="contact" />
          <div className="contact-panel" data-reveal="up">
            <div className="contact-panel__intro">
              <p className="contact-statement">Parlons-en.</p>
              <p className="contact-invite">
                Une opportunité, une idée ou l’envie de faire connaissance ?
              </p>
            </div>
            <address className="contact-rows">
              <a href={`mailto:${profile.email}`}>
                <span className="contact-rows__icon" aria-hidden="true">
                  <IconMail size={20} stroke={1.75} />
                </span>
                <span className="contact-rows__value">{profile.email}</span>
                <IconArrowUpRight className="contact-rows__arrow" size={18} aria-hidden="true" />
              </a>
              <a href={profile.phone.href}>
                <span className="contact-rows__icon" aria-hidden="true">
                  <IconPhone size={20} stroke={1.75} />
                </span>
                <span className="contact-rows__value">{profile.phone.label}</span>
                <IconArrowUpRight className="contact-rows__arrow" size={18} aria-hidden="true" />
              </a>
              <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer">
                <span className="contact-rows__icon" aria-hidden="true">
                  <IconMapPin size={20} stroke={1.75} />
                </span>
                <span className="contact-rows__value">{profile.location}</span>
                <IconArrowUpRight className="contact-rows__arrow" size={18} aria-hidden="true" />
                <span className="visually-hidden"> (nouvelle fenêtre)</span>
              </a>
            </address>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
