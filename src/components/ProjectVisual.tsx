import {
  IconArrowUpRight,
  IconCode,
  IconCommand,
  IconContrast,
  IconCurrencyEuro,
  IconLayoutKanban,
  IconMapPin,
  IconMicrophone,
  IconPlanet,
  IconPlus,
  IconZodiacLeo,
} from "@tabler/icons-react";
import { profile } from "../content/profile";

/** Compositions éditoriales illustratives, sans prétendre être des captures. */
const ProjectVisual = ({ id }: { readonly id: string }) => {
  if (id === "astrologie")
    return (
      <div className="project-visual project-visual--astrologie" aria-hidden="true">
        <span className="visual-caption">TRADITION SYMBOLIQUE</span>
        <div className="zodiac-wheel">
          <div className="zodiac-wheel__inner">
            <IconZodiacLeo stroke={1.2} />
          </div>
        </div>
        <div className="visual-word">
          ASTRO
          <br />
          LOGIE<span>Le ciel du jour, calculé chez vous.</span>
        </div>
      </div>
    );
  if (id === "astronomie")
    return (
      <div className="project-visual project-visual--astronomie" aria-hidden="true">
        <span className="visual-caption">DU SOLEIL AU MULTIVERS</span>
        <div className="orbit-system">
          <span className="orbit-system__sun" />
          <span className="orbit-system__ring orbit-system__ring--1">
            <i />
          </span>
          <span className="orbit-system__ring orbit-system__ring--2">
            <i />
          </span>
          <span className="orbit-system__ring orbit-system__ring--3">
            <i />
          </span>
        </div>
        <div className="visual-word">
          ASTRO
          <br />
          NOMIE<span>Voyage 3D au défilement.</span>
        </div>
        <IconPlanet className="visual-symbol" size={34} stroke={1.2} />
      </div>
    );
  if (id === "grand-oral-studio")
    return (
      <div className="project-visual project-visual--oral" aria-hidden="true">
        <span className="visual-caption">DIAPORAMA & RÉPÉTITION</span>
        <div className="slide-stack">
          <span />
          <span />
          <span className="slide-stack__front">
            <b>PROBLÉMATIQUE</b>
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="visual-word">
          GRAND
          <br />
          ORAL<span>Prêt le jour J.</span>
        </div>
        <IconMicrophone className="visual-symbol" size={34} stroke={1.2} />
      </div>
    );
  if (id === "opale")
    return (
      <div className="project-visual project-visual--opale" aria-hidden="true">
        <span className="visual-caption">DESIGN SYSTEM</span>
        <div className="opale-swatches">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="visual-word">
          OPALE<span>Contraste ≥ 4,5:1, vérifié en CI.</span>
        </div>
        <IconContrast className="visual-symbol" size={34} stroke={1.2} />
      </div>
    );
  if (id === "board")
    return (
      <div className="project-visual project-visual--board" aria-hidden="true">
        <span className="visual-caption">SESSIONS / PROJETS</span>
        <div className="board-columns">
          {[3, 2, 1].map((count, column) => (
            <div key={column}>
              <b />
              {Array.from({ length: count }, (_, card) => (
                <i key={card} />
              ))}
            </div>
          ))}
        </div>
        <span className="board-live">● EN DIRECT</span>
        <IconLayoutKanban className="visual-symbol" size={34} stroke={1.2} />
      </div>
    );
  if (id === "travels-in-world")
    return (
      <div className="project-visual project-visual--travels" aria-hidden="true">
        <span className="visual-caption">CARNET DE VOYAGES</span>
        <div className="travels-map" />
        <svg className="travels-route" viewBox="0 0 100 60" preserveAspectRatio="none">
          <path d="M8 46 C 28 10, 46 54, 62 24 S 88 14, 94 30" />
        </svg>
        <IconMapPin className="travels-pin travels-pin--1" size={30} stroke={1.5} />
        <IconMapPin className="travels-pin travels-pin--2" size={24} stroke={1.5} />
        <IconMapPin className="travels-pin travels-pin--3" size={30} stroke={1.5} />
        <div className="visual-word">
          TRAVELS<span>Une carte, une frise par voyage.</span>
        </div>
      </div>
    );
  if (id === "portfolio")
    return (
      <div className="project-visual project-visual--portfolio" aria-hidden="true">
        <div className="mini-browser">
          <div className="mini-browser__bar">
            <span>TC</span>
            <span>PORTFOLIO / 2026</span>
            <IconArrowUpRight size={14} />
          </div>
          <div className="mini-hero">
            <span>
              THOMAS
              <br />
              CARON
            </span>
            <img
              src={profile.portrait.cutout.src}
              alt=""
              width={profile.portrait.cutout.width}
              height={profile.portrait.cutout.height}
              loading="lazy"
            />
          </div>
          <div className="mini-footer">
            <span>DÉVELOPPEUR FULL-STACK & QA</span>
            <span>↓</span>
          </div>
        </div>
        <span className="visual-caption">DESIGN & DÉVELOPPEMENT</span>
      </div>
    );
  if (id === "gestion-de-budget")
    return (
      <div className="project-visual project-visual--budget" aria-hidden="true">
        <span className="visual-caption">ARCHITECTURE HEXAGONALE</span>
        <div className="budget-object">
          <IconCurrencyEuro stroke={1} />
          <div className="budget-orbit" />
        </div>
        <div className="budget-word">
          BUDGET<span>En garder la maîtrise.</span>
        </div>
        <span className="visual-corner">{`{ 01 }`}</span>
      </div>
    );
  if (id === "sites-web-et-apis")
    return (
      <div className="project-visual project-visual--api" aria-hidden="true">
        <span className="visual-caption">DU FRONT AU BACK</span>
        <div className="api-window">
          <div>
            <i />
            <i />
            <i />
            <span>api / index.ts</span>
          </div>
          <code>
            <span>const</span> application =<br />
            &nbsp; createApp({`{`}
            <br />
            &nbsp;&nbsp;&nbsp; front: <em>"React"</em>,<br />
            &nbsp;&nbsp;&nbsp; back: <em>"Node.js"</em>
            <br />
            &nbsp; {`}`});
          </code>
        </div>
        <IconCode className="api-symbol" size={85} stroke={1.2} />
      </div>
    );
  return (
    <div className="project-visual project-visual--game" aria-hidden="true">
      <span className="visual-caption">ROUEN MÉTROPOLE / 2024</span>
      <div className="game-title">
        GAME
        <br />
        JAM<span>48 HEURES POUR CRÉER.</span>
      </div>
      <div className="game-grid" />
      <IconCommand className="game-command" size={80} stroke={1} />
      <IconPlus className="game-plus" size={30} stroke={1.5} />
    </div>
  );
};
export default ProjectVisual;
