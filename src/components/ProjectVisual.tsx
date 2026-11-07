import {
  IconArrowUpRight,
  IconCode,
  IconCommand,
  IconCurrencyEuro,
  IconPlus,
} from "@tabler/icons-react";
import { profile } from "../content/profile";

/** Compositions éditoriales illustratives, sans prétendre être des captures. */
const ProjectVisual = ({ id }: { readonly id: string }) => {
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
