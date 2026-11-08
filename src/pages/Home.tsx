import type { ReactNode } from "react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Badge } from "@thomascaron/opale";
import StackChips from "../components/StackChips";
import { experiences } from "../content/experiences";
import { formations } from "../content/formations";
import { passions } from "../content/passions";
import { navigationItems } from "../content/navigation";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { skillGroups } from "../content/skills";
import type { DateRange } from "../content/types";
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
                <span>Développeur logiciel</span> · <span>Full-stack</span> · <span>QA</span>
              </p>
              <p className="hero-current">
                <span className="status-dot" aria-hidden="true" />
                Actuellement développeur full stack chez Blue Soft
              </p>
              <p>Basé à Rouen, France · remote partiel</p>
            </div>
          </div>
          <div className="hero-footer">
            <p className="hero-next-step">{profile.nextStep}</p>
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
            {skillGroups.map((group) => (
              <div className="skill-group" data-reveal="up" key={group.id}>
                <h3 className="skill-group__title" id={`skill-${group.id}`}>
                  <TitleWithBadge title={group.title}>
                    <span className="skill-group__count" aria-hidden="true">
                      {group.items.length}
                    </span>
                    <span className="visually-hidden">{`, ${group.items.length} compétences`}</span>
                  </TitleWithBadge>
                </h3>
                <ul className="skill-list" aria-label={`Compétences ${group.title}`}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
                              <h4>{mission.title}</h4>
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

          <div className="education" data-reveal="up">
            <h3 className="education-title" id="titre-formations">
              Apprendre pour mieux construire
            </h3>
            <ul className="education-list">
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
                  <strong>{formation.title}</strong>
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
          <div className="row-list">
            {projects.map((project) => (
              <article className="project-row" data-reveal="up" key={project.id}>
                <div className="project-row__main">
                  <h3>{project.title}</h3>
                  <p className="row-meta">
                    <Badge
                      rootClassName="status-badge-root"
                      className={`status-badge status-badge--${project.statusType}`}
                      variant={badgeVariantByStatus[project.statusType]}
                    >
                      {project.status}
                    </Badge>
                  </p>
                  <p className="project-row__description">{project.description}</p>
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
                          <IconArrowUpRight size={16} aria-hidden="true" />
                          <span className="visually-hidden">
                            {" "}
                            — {project.title} (nouvelle fenêtre)
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <p className="row-year">{project.date}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="page-section passions-section"
        id="passions"
        aria-labelledby="titre-passions"
      >
        <div className="container">
          <SectionHeading sectionId="passions" />
          <ul className="row-list" aria-label="Pratiques personnelles">
            {passions.map((passion, index) => (
              <li className="passion-row" data-reveal="up" key={passion.id}>
                <div>
                  <h3>{passion.title}</h3>
                  <p>{passion.description}</p>
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
                </div>
                <span className="row-year" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="page-section accessibility-section"
        id="accessibilite"
        aria-labelledby="titre-accessibilite"
      >
        <div className="container">
          <SectionHeading sectionId="accessibilite" />
          <div className="accessibility-layout" data-reveal="up">
            <div>
              <p className="accessibility-lede">
                Ce site vise un niveau de conformité aussi élevé que possible au RGAA 4.1.2 et fait
                l’objet d’améliorations continues.
              </p>
              <p className="accessibility-status">
                <span className="status-dot" aria-hidden="true" />
                Améliorations continues
              </p>
            </div>
            <div>
              <ul className="accessibility-list">
                <li>
                  <strong>Navigation</strong>
                  <span>Lien d’évitement, titres structurés et utilisation au clavier.</span>
                </li>
                <li>
                  <strong>Lecture</strong>
                  <span>
                    Contrastes renforcés, textes redimensionnables et thème clair ou sombre, au
                    choix.
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
                <IconArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        className="page-section contact-section"
        id="contact"
        aria-labelledby="titre-contact"
      >
        <div className="container">
          <SectionHeading sectionId="contact">Me contacter</SectionHeading>
          <p className="contact-statement" data-reveal="up">
            Une opportunité, une idée
            <br /> ou l’envie de faire connaissance ?
          </p>
          <p className="contact-next-step" data-reveal="up">
            {profile.nextStep}
          </p>
          <address className="contact-rows" data-reveal="up">
            <a href={`mailto:${profile.email}`}>
              <span>{profile.email}</span>
              <IconArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.phone.href}>
              <span>{profile.phone.label}</span>
              <IconArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.mapsUrl} target="_blank" rel="noopener noreferrer">
              <span>{profile.location}</span>
              <IconArrowUpRight size={16} aria-hidden="true" />
              <span className="visually-hidden"> (nouvelle fenêtre)</span>
            </a>
          </address>
          <div className="contact-direct" data-reveal="up">
            <p className="section-eyebrow">Ou retrouvez-moi</p>
            <ul className="contact-socials" aria-label="Réseaux professionnels">
              <li>
                <a href={profile.gitHubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                  <span className="visually-hidden"> (nouvelle fenêtre)</span>
                </a>
              </li>
              <li>
                <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <span className="visually-hidden"> (nouvelle fenêtre)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>E-mail</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Home;
