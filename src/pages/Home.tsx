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

import StackChips from "../components/StackChips";
import { experiences } from "../content/experiences";
import { formations } from "../content/formations";
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
  <p className="date-range">
    <time dateTime={range.start.dateTime}>{range.start.label}</time>
    {" — "}
    {range.end ? <time dateTime={range.end.dateTime}>{range.end.label}</time> : "Aujourd’hui"}
  </p>
);

const Home = () => {
  useScrollReveal();

  return (
    <main className="portfolio-page" id="contenu-principal" tabIndex={-1}>
      <div className="liquid-bubble liquid-bubble-one" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-two" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-three" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-four" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-five" aria-hidden="true" />
      <div className="liquid-bubble liquid-bubble-six" aria-hidden="true" />

      <section className="hero" aria-labelledby="titre-principal">
        <div className="container">
          <div className="hero-card liquid-card" data-reveal="scale">
            <div className="hero-content">
              <p className="eyebrow">Développeur logiciel · Full-stack · QA</p>
              <h1 id="titre-principal">{profile.name}</h1>
              <p className="hero-current-role">
                <strong>Actuellement</strong>
                <span>Développeur Full Stack chez Blue Soft</span>
              </p>
              <p className="hero-availability">
                Disponible à partir d’octobre 2027 — CDI ou freelance
              </p>
              <p className="hero-lede">
                Je développe et fiabilise des applications web et mobiles, du C# et Angular aux
                tests automatisés Java avec Selenium et Cucumber.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Me contacter
                  <IconArrowDown aria-hidden="true" size={18} stroke={2.5} />
                </a>
                <a
                  className="button button-secondary"
                  href={profile.cv.href}
                  download={profile.cv.fileName}
                >
                  <IconDownload aria-hidden="true" size={18} stroke={2.5} />
                  {profile.cv.label}
                </a>
              </div>
              <ul className="hero-socials" aria-label="Profils en ligne">
                <li>
                  <a
                    className="squircle social-link"
                    href={profile.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil GitHub de Thomas Caron (nouvelle fenêtre)"
                  >
                    <IconBrandGithub aria-hidden="true" size={22} />
                  </a>
                </li>
                <li>
                  <a
                    className="squircle social-link"
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil LinkedIn de Thomas Caron (nouvelle fenêtre)"
                  >
                    <IconBrandLinkedin aria-hidden="true" size={22} />
                  </a>
                </li>
              </ul>
              <ul className="hero-details" aria-label="Informations principales">
                <li>Mont-Saint-Aignan (Rouen) — mobile Paris, remote partiel</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell" id="parcours" aria-labelledby="titre-parcours">
        <div className="container">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Expérience</p>
            <h2 id="titre-parcours">Un parcours construit sur le produit et sa qualité.</h2>
            <p>
              Du développement d’outils de production à l’automatisation de tests, j’interviens à
              chaque étape qui rend une application utile et fiable.
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
                    key={experience.company}
                  >
                    <div className="squircle timeline-icon" aria-hidden="true">
                      <ExperienceIcon size={25} stroke={2} />
                    </div>
                    <div>
                      <DateRangeText range={experience.range} />
                      <h3>{experience.title}</h3>
                      <p className="company">{experience.company}</p>
                      <p>{experience.description}</p>
                      <StackChips
                        variant="experience-stack"
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
                                variant="experience-stack"
                                label={`Technologies de la mission ${mission.title}`}
                                items={mission.stack}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
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
              <h3 id="titre-formations">Apprendre pour mieux construire.</h3>
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

      <section className="section-shell" id="competences" aria-labelledby="titre-competences">
        <div className="container">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Compétences</p>
            <h2 id="titre-competences">Un socle technique polyvalent.</h2>
            <p>
              Des technologies choisies pour développer, faire évoluer et vérifier la qualité des
              applications.
            </p>
          </div>

          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <section
                className={`skill-group liquid-card reveal-delay-${index % 2}`}
                key={group.id}
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

      <section className="section-shell" id="projets" aria-labelledby="titre-projets">
        <div className="container">
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Projets</p>
            <h2 id="titre-projets">Des réalisations, avec le goût du concret.</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card liquid-card reveal-delay-${Math.min(index, 3)}`}
                data-reveal="up"
                key={project.id}
              >
                <div className="project-meta">
                  <p className="project-date">{project.date}</p>
                  <span className={`project-status project-status--${project.statusType}`}>
                    {project.status}
                  </span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <StackChips
                  variant="project-stack"
                  label={`Technologies du projet ${project.title}`}
                  items={project.stack}
                />
                {project.links.length > 0 && (
                  <div className="project-links">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
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
          <div className="section-heading" data-reveal="up">
            <p className="eyebrow">Accessibilité</p>
            <h2 id="titre-accessibilite">Un portfolio pensé pour être utilisable par tous.</h2>
            <p>
              Ce site vise un niveau de conformité aussi élevé que possible au RGAA 4.1.2 et fait
              l’objet d’améliorations continues.
            </p>
          </div>

          <div className="accessibility-card liquid-card" data-reveal="up">
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
                <strong>Limite connue :</strong> le CV PDF téléchargeable est en cours de remise en
                accessibilité.
              </p>

              <a
                className="button button-secondary accessibility-contact"
                href={`mailto:${profile.email}?subject=Signalement%20accessibilit%C3%A9%20du%20portfolio`}
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
              <h2 id="titre-contact">Parlons de votre poste — ou de votre prochain projet.</h2>
              <p>
                Une opportunité, une idée ou simplement l’envie d’échanger : je vous répondrai avec
                plaisir.
              </p>
            </div>

            <address className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <span className="squircle contact-icon" aria-hidden="true">
                  <IconMail size={22} stroke={2} />
                </span>
                <span>
                  <small>E-mail</small>
                  {profile.email}
                </span>
                <IconArrowUpRight className="contact-arrow" aria-hidden="true" size={19} />
              </a>
              <a href={profile.phone.href}>
                <span className="squircle contact-icon" aria-hidden="true">
                  <IconPhone size={22} stroke={2} />
                </span>
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
                <span className="squircle contact-icon" aria-hidden="true">
                  <IconMapPin size={22} stroke={2} />
                </span>
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
                  <a
                    className="squircle social-link"
                    href={profile.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consulter le profil LinkedIn de Thomas Caron (nouvelle fenêtre)"
                  >
                    <IconBrandLinkedin aria-hidden="true" size={22} />
                  </a>
                </li>
                <li>
                  <a
                    className="squircle social-link"
                    href={profile.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Consulter le profil GitHub de Thomas Caron (nouvelle fenêtre)"
                  >
                    <IconBrandGithub aria-hidden="true" size={22} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
