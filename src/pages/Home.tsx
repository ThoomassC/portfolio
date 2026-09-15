import {
  IconArrowDown,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
  IconMail,
  IconMapPin,
  IconPhone,
  IconSchool,
} from "@tabler/icons-react";
import {
  Backdrop,
  Button,
  Card,
  DateRange as UiDateRange,
  IconTile,
  Pill,
  SectionHeading,
  Timeline,
  TimelineItem,
} from "@thomascaron/ui";

import StackChips from "../components/StackChips";
import { experiences } from "../content/experiences";
import { formations } from "../content/formations";
import { passions } from "../content/passions";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { skillGroups } from "../content/skills";
import type { DateRange } from "../content/types";
import { useScrollReveal } from "../hooks/useScrollReveal";

/**
 * Une plage de dates se décrit avec deux `<time>` : un `dateTime` unique ne
 * documenterait que sa date de début.
 */
const DateRangeText = ({ range }: { readonly range: DateRange }) => (
  <UiDateRange className="date-range" start={range.start} end={range.end} />
);

const pillToneByStatus = {
  completed: "done",
  "in-progress": "progress",
  upcoming: "upcoming",
} as const;

const Home = () => {
  useScrollReveal();

  return (
    <main className="portfolio-page" id="contenu-principal" tabIndex={-1}>
      <Backdrop className="portfolio-backdrop">
        <section className="hero" aria-labelledby="titre-principal">
          <div className="container">
            <Card className="hero-card liquid-card" data-reveal="scale">
              <div className="hero-layout">
                <div className="hero-content">
                  <p className="eyebrow eyebrow-roles">
                    <span>Développeur logiciel</span> · <span>Full-stack</span> · <span>QA</span>
                  </p>
                  <h1 id="titre-principal">{profile.name}</h1>
                  <p className="hero-current-role">
                    <strong>Actuellement</strong>
                    <span>Développeur Full Stack chez Blue Soft</span>
                  </p>
                  <p className="hero-availability">Disponible à partir d’octobre 2027 — CDI</p>
                  <p className="hero-lede">
                    Je développe et fiabilise des applications web et mobiles, du C# et Angular aux
                    tests automatisés Java avec Selenium et Cucumber.
                  </p>
                  <div className="hero-actions">
                    <Button className="button button-primary" variant="primary" href="#contact">
                      Me contacter
                      <IconArrowDown aria-hidden="true" size={18} stroke={2.5} />
                    </Button>
                    <Button
                      className="button button-secondary"
                      variant="secondary"
                      href={profile.cv.href}
                      download={profile.cv.fileName}
                    >
                      <IconDownload aria-hidden="true" size={18} stroke={2.5} />
                      {profile.cv.label}
                    </Button>
                  </div>
                  <ul className="hero-socials" aria-label="Profils en ligne">
                    <li>
                      <IconTile
                        href={profile.gitHubUrl}
                        label="Profil GitHub de Thomas Caron (nouvelle fenêtre)"
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconBrandGithub aria-hidden="true" size={22} />
                      </IconTile>
                    </li>
                    <li>
                      <IconTile
                        href={profile.linkedInUrl}
                        label="Profil LinkedIn de Thomas Caron (nouvelle fenêtre)"
                        className="social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconBrandLinkedin aria-hidden="true" size={22} />
                      </IconTile>
                    </li>
                  </ul>
                  <ul className="hero-details" aria-label="Informations principales">
                    <li>Mont-Saint-Aignan (Rouen) — mobile Paris, remote partiel</li>
                  </ul>
                </div>

                <div className="hero-portrait">
                  <img
                    src={profile.portrait.src}
                    width={profile.portrait.width}
                    height={profile.portrait.height}
                    alt={profile.portrait.alt}
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="section-shell" id="parcours" aria-labelledby="titre-parcours">
          <div className="container">
            <SectionHeading
              className="section-heading"
              data-reveal="up"
              eyebrow="Expérience"
              headingId="titre-parcours"
              title="Un parcours construit sur le produit et sa qualité."
              lede="Du développement d’outils de production à l’automatisation de tests, j’interviens à chaque étape qui rend une application utile et fiable."
            />

            <div className="journey-layout">
              <Timeline className="timeline" label="Expériences professionnelles">
                {experiences.map((experience, index) => {
                  const ExperienceIcon = experience.icon;

                  return (
                    <TimelineItem
                      className={`timeline-item liquid-card tc-card tc-card--glass reveal-delay-${Math.min(index, 3)}`}
                      data-reveal="up"
                      key={experience.company}
                      icon={
                        <IconTile className="timeline-icon">
                          <ExperienceIcon size={25} stroke={2} />
                        </IconTile>
                      }
                    >
                      <DateRangeText range={experience.range} />
                      <h3>{experience.title}</h3>
                      <p className="company tc-timeline__meta">{experience.company}</p>
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
                    </TimelineItem>
                  );
                })}
              </Timeline>

              <aside
                className="education liquid-card tc-card tc-card--glass reveal-delay-2"
                aria-labelledby="titre-formations"
                data-reveal="up"
              >
                <IconTile className="education-icon">
                  <IconSchool size={25} stroke={2} />
                </IconTile>
                <p className="eyebrow">Formation</p>
                <h3 id="titre-formations">Apprendre pour mieux construire.</h3>
                <p className="school-name">École CESI</p>
                <ul>
                  {formations.map((formation) => (
                    <li key={formation.title}>
                      <strong>{formation.title}</strong>
                      <div className="formation-meta">
                        <span className="formation-level">{formation.level}</span>
                        <Pill
                          className="education-status"
                          tone={pillToneByStatus[formation.statusType]}
                        >
                          {formation.status}
                        </Pill>
                      </div>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-shell" id="competences" aria-labelledby="titre-competences">
          <div className="container">
            <SectionHeading
              className="section-heading"
              data-reveal="up"
              eyebrow="Compétences"
              headingId="titre-competences"
              title="Un socle technique polyvalent."
              lede="Des technologies choisies pour développer, faire évoluer et vérifier la qualité des applications."
            />

            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <section
                  className={`skill-group liquid-card tc-card tc-card--glass reveal-delay-${index % 2}`}
                  key={group.id}
                  aria-labelledby={`skill-${group.id}`}
                  data-reveal="up"
                >
                  <h3 id={`skill-${group.id}`}>{group.title}</h3>
                  <StackChips label={`Compétences ${group.title}`} items={group.items} />
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="projets" aria-labelledby="titre-projets">
          <div className="container">
            <SectionHeading
              className="section-heading"
              data-reveal="up"
              eyebrow="Projets"
              headingId="titre-projets"
              title="Des réalisations, avec le goût du concret."
            />

            <div className="projects-grid">
              {projects.map((project, index) => (
                <article
                  className={`project-card liquid-card tc-card tc-card--glass reveal-delay-${Math.min(index, 3)}`}
                  data-reveal="up"
                  key={project.id}
                >
                  <div className="project-meta">
                    <p className="project-date">{project.date}</p>
                    <Pill className="project-status" tone={pillToneByStatus[project.statusType]}>
                      {project.status}
                    </Pill>
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
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                          <span className="visually-hidden">
                            {` — ${project.title} (nouvelle fenêtre)`}
                          </span>
                          <IconArrowUpRight aria-hidden="true" size={17} stroke={2.2} />
                        </a>
                      ))}
                    </div>
                  )}
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
            <SectionHeading
              className="section-heading"
              data-reveal="up"
              eyebrow="Accessibilité"
              headingId="titre-accessibilite"
              title="Un portfolio pensé pour être utilisable par tous."
              lede="Ce site vise un niveau de conformité aussi élevé que possible au RGAA 4.1.2 et fait l’objet d’améliorations continues."
            />

            <Card className="accessibility-card liquid-card" data-reveal="up">
              <div className="accessibility-introduction">
                <p className="accessibility-status">
                  <span>État actuel</span>
                  Améliorations continues
                </p>
                <h3>Plusieurs façons de parcourir le même contenu.</h3>
                <p>
                  Le portfolio est conçu pour rester lisible, compréhensible et navigable avec
                  différents appareils et modes d’interaction.
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
                  <strong>Limite connue :</strong> le CV PDF téléchargeable est en cours de remise
                  en accessibilité.
                </p>

                <Button
                  className="button button-secondary accessibility-contact"
                  variant="secondary"
                  href={`mailto:${profile.email}?subject=Signalement%20accessibilit%C3%A9%20du%20portfolio`}
                >
                  Signaler un problème d’accessibilité
                </Button>
              </div>
            </Card>
          </div>
        </section>

        <section className="section-shell" id="passions" aria-labelledby="titre-passions">
          <div className="container">
            <SectionHeading
              className="section-heading"
              data-reveal="up"
              eyebrow="Hors du travail"
              headingId="titre-passions"
              title="Ce que je fais du reste de mon temps."
              lede="Des pratiques tenues dans la durée plutôt que par à-coups, et qui servent chacune un objectif."
            />

            <ul className="passions-grid" aria-label="Pratiques personnelles">
              {passions.map((passion, index) => {
                const PassionIcon = passion.icon;

                return (
                  <li
                    className={`passion-card liquid-card tc-card tc-card--glass reveal-delay-${Math.min(index, 3)}`}
                    data-reveal="up"
                    key={passion.id}
                  >
                    <IconTile className="passion-icon">
                      <PassionIcon size={25} stroke={2} />
                    </IconTile>
                    <div>
                      <h3>{passion.title}</h3>
                      <p>{passion.description}</p>
                      {passion.links.length > 0 && (
                        <div className="passion-links">
                          {passion.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label}
                              <span className="visually-hidden"> (nouvelle fenêtre)</span>
                              <IconArrowUpRight aria-hidden="true" size={17} stroke={2.2} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section
          className="section-shell contact-section"
          id="contact"
          aria-labelledby="titre-contact"
        >
          <div className="container">
            <Card className="contact-card liquid-card" data-reveal="up">
              <SectionHeading
                className="section-heading section-heading-compact"
                eyebrow="Contact"
                headingId="titre-contact"
                title="Parlons de votre poste — ou de votre prochain projet."
                lede="Une opportunité, une idée ou simplement l’envie d’échanger : je vous répondrai avec plaisir."
              />

              <address className="contact-links">
                <a href={`mailto:${profile.email}`}>
                  <IconTile className="contact-icon">
                    <IconMail size={22} stroke={2} />
                  </IconTile>
                  <span>
                    <small>E-mail</small>
                    {profile.email}
                  </span>
                  <IconArrowUpRight className="contact-arrow" aria-hidden="true" size={19} />
                </a>
                <a href={profile.phone.href}>
                  <IconTile className="contact-icon">
                    <IconPhone size={22} stroke={2} />
                  </IconTile>
                  <span>
                    <small>Téléphone</small>
                    {profile.phone.label}
                  </span>
                  <IconArrowUpRight className="contact-arrow" aria-hidden="true" size={19} />
                </a>
                <a
                  href={profile.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Localisation Mont-Saint-Aignan, France — ouvrir dans Google Maps (nouvelle fenêtre)"
                >
                  <IconTile className="contact-icon">
                    <IconMapPin size={22} stroke={2} />
                  </IconTile>
                  <span>
                    <small>Localisation</small>
                    {profile.location}
                  </span>
                  <IconArrowUpRight className="contact-arrow" aria-hidden="true" size={19} />
                </a>
              </address>

              <div className="contact-actions">
                <ul className="contact-socials" aria-label="Réseaux professionnels">
                  <li>
                    <IconTile
                      href={profile.linkedInUrl}
                      label="Consulter le profil LinkedIn de Thomas Caron (nouvelle fenêtre)"
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandLinkedin aria-hidden="true" size={22} />
                    </IconTile>
                  </li>
                  <li>
                    <IconTile
                      href={profile.gitHubUrl}
                      label="Consulter le profil GitHub de Thomas Caron (nouvelle fenêtre)"
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandGithub aria-hidden="true" size={22} />
                    </IconTile>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </section>
      </Backdrop>
    </main>
  );
};

export default Home;
