import { describe, expect, it } from "vitest";
import stylesheet from "./index.css?raw";
import {
  compositeLayers,
  contrastRatio,
  deltaEOklab,
  MID_GREY_LUMINANCE,
  oklchHueDistance,
  parseRgba,
  relativeLuminance,
  withAlpha,
} from "./test/color";

/**
 * Contrat de couleur MESURÉ des design tokens.
 *
 * Les ratios vivaient jusqu'ici dans les commentaires de `index.css`, écrits à la
 * main : au premier changement de palette ils deviennent faux sans que rien ne le
 * signale. Ce fichier les recalcule depuis la feuille de style sur disque, thème
 * clair et thème sombre, pour que la dérive casse la CI au lieu de partir en
 * production.
 *
 * Ce qui est mesuré ici est le repli OPAQUE des surfaces : `--glass-fill-solid`
 * plutôt que `--glass-fill`, `--header-solid` plutôt que le verre fumé. Un token
 * translucide n'a pas de contraste propre — il dépend de ce qui défile derrière —
 * et c'est justement ce repli que voit l'utilisateur sans `backdrop-filter`.
 *
 * La feuille est lue en texte brut par `?raw`, résolu par Vite relativement à ce
 * fichier : pas de chemin absolu de machine, et pas besoin d'un typage Node que ce
 * dépôt n'a pas (`@types/node` n'est pas installé, donc `node:fs` ne compile pas).
 */

/** WCAG 2.1 — 1.4.6 Contrast (Enhanced), texte courant. */
const AAA_TEXT = 7;
/** WCAG 2.1 — 1.4.3 Contrast (Minimum), texte courant. */
const AA_TEXT = 4.5;
/** WCAG 2.1 — 1.4.11 Non-text Contrast, bordures et indicateurs de focus. */
const AA_NON_TEXT = 3;

/** Un cran de profondeur perceptible, sur l'échelle ×100 des commentaires du CSS. */
const MIN_BADGE_DELTA_E = 10;
/** Au-delà, la pastille d'état quitte la famille chromatique du bouton. */
const MAX_FAMILY_HUE_GAP = 6;
/** En dessous, deux statuts ne se distinguent plus que par la luminosité. */
const MIN_STATUS_HUE_GAP = 25;
/**
 * Plancher de PERCEPTIBILITÉ d'un liseré de conteneur — voir `GLASS_BORDER_CASES`
 * pour la raison de ne pas appliquer les 3:1 de WCAG 1.4.11 à un décor. En dessous,
 * un trait d'un pixel ne se voit plus du tout ; à 1.00:1 il n'existe pas.
 */
const MIN_RIM_CONTRAST = 1.2;

const LIGHT_SELECTOR = ":root";
const DARK_SELECTOR = ':root[data-theme="dark"]';
const VAR_HOP_LIMIT = 10;

const DECLARATION = /--([\w-]+)\s*:\s*([^;]+);/g;
const VAR_REFERENCE = /^var\(\s*(--[\w-]+)\s*\)$/;
const CSS_COMMENT = /\/\*[\s\S]*?\*\//g;

/**
 * The stylesheet with every `/* … *\/` removed.
 *
 * Not cosmetic — load-bearing. `index.css` quotes its RETIRED values inside comments
 * (`rgba(4, 52, 61, 0.20)`, `#0a2c38`, `#6f2a21`…), and a comment shaped like
 * `--text-body: #2c464b;` matches `DECLARATION` exactly like a real declaration. As
 * `Map.set` lets the last occurrence win, a value quoted AFTER the live declaration
 * silently replaces it: reproduced, the suite stayed green on a pair measuring
 * 2.23:1. Stripping first is the only fix that does not depend on where in the block
 * the comment happens to sit.
 *
 * Replaced by a space rather than by nothing, so that `a/*x*\/b` cannot weld two
 * tokens into one. Removing comments before counting braces also protects `ruleBody`
 * from a lone `{` or `}` written inside prose.
 */
function stripComments(css: string): string {
  return css.replace(CSS_COMMENT, " ");
}

interface Theme {
  readonly name: string;
  readonly tokens: ReadonlyMap<string, string>;
  /**
   * Les mêmes tokens sous `prefers-reduced-transparency: reduce` et
   * `prefers-contrast: more`, où les lavis translucides sont remplacés par des aplats.
   */
  readonly opaqueSurfaces: ReadonlyMap<string, string>;
}

/**
 * Body of the rule whose selector is exactly `selector`, braces excluded.
 *
 * Matched by counting braces rather than by regex: token values hold gradients
 * with their own parentheses, and a lazy `{[^}]*}` would break the day a nested
 * rule appears.
 */
function ruleBody(source: string, selector: string): string {
  const css = stripComments(source);
  const declarationStart = css.indexOf(`${selector} {`);

  if (declarationStart === -1) {
    throw new Error(`bloc \`${selector}\` introuvable dans index.css`);
  }

  const open = css.indexOf("{", declarationStart);
  let depth = 0;

  for (let index = open; index < css.length; index += 1) {
    if (css[index] === "{") {
      depth += 1;
    }

    if (css[index] === "}") {
      depth -= 1;

      if (depth === 0) {
        return css.slice(open + 1, index);
      }
    }
  }

  throw new Error(`accolades non refermées après \`${selector}\` dans index.css`);
}

/**
 * Value of one standard declaration, `var()` unresolved.
 *
 * Anchored on `^` or `;` so that asking for `backdrop-filter` cannot return the value
 * of `-webkit-backdrop-filter` sitting two lines below it.
 */
function declarationValue(body: string, property: string): string {
  const declaration = new RegExp(`(?:^|[;{])\\s*${property}\\s*:\\s*([^;]+);`).exec(
    stripComments(body)
  );

  if (declaration === null) {
    throw new Error(`déclaration \`${property}\` introuvable dans le bloc fourni`);
  }

  return declaration[1].trim();
}

/**
 * Les deux extracteurs retirent les commentaires, et pas seulement `ruleBody`.
 * Le trou d'origine était une dépendance d'ordre — « nettoyer avant d'extraire » —
 * et une dépendance d'ordre qu'il faut penser à respecter est un bug en sursis.
 */
function parseCustomProperties(source: string): Map<string, string> {
  const tokens = new Map<string, string>();

  for (const match of stripComments(source).matchAll(DECLARATION)) {
    tokens.set(`--${match[1]}`, match[2].trim());
  }

  return tokens;
}

/**
 * Valeur résolue d'un token, en suivant les alias `var(--autre-token)`.
 *
 * Lève dès qu'un token attendu manque : un token absent est une faute de frappe ou
 * une suppression, pas un cas à sauter en silence.
 */
function tokenValue(theme: Theme, name: string): string {
  let current = name;

  for (let hop = 0; hop < VAR_HOP_LIMIT; hop += 1) {
    const value = theme.tokens.get(current);

    if (value === undefined) {
      throw new Error(
        `token \`${current}\` introuvable dans le thème ${theme.name}` +
          (current === name ? "" : ` (alias de \`${name}\`)`)
      );
    }

    const reference = VAR_REFERENCE.exec(value);

    if (reference === null) {
      return value;
    }

    current = reference[1];
  }

  throw new Error(
    `chaîne d'alias \`var()\` trop profonde depuis \`${name}\` dans le thème ${theme.name}`
  );
}

/**
 * Les deux modes qui ont pour objet même de rendre les surfaces opaques y aplatissent
 * les lavis translucides en aplats. Mesurer les `rgba()` de `:root` sous ces modes
 * serait mesurer une combinaison qui n'y existe plus — la faute même que ce fichier
 * traque. Le sélecteur est celui de la feuille, à la virgule près.
 */
const OPAQUE_SURFACES_SELECTOR =
  "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)";

function readThemes(): readonly Theme[] {
  const light = parseCustomProperties(ruleBody(stylesheet, LIGHT_SELECTOR));
  const dark = parseCustomProperties(ruleBody(stylesheet, DARK_SELECTOR));
  const opaque = ruleBody(stylesheet, OPAQUE_SURFACES_SELECTOR);
  const opaqueLight = parseCustomProperties(ruleBody(opaque, LIGHT_SELECTOR));
  const opaqueDark = parseCustomProperties(ruleBody(opaque, DARK_SELECTOR));

  const cascadedDark = new Map([...light, ...dark]);

  return [
    {
      name: "clair",
      tokens: light,
      opaqueSurfaces: new Map([...light, ...opaqueLight]),
    },
    // Le thème sombre ne redéfinit que ce qui change : les tokens du header (verre
    // fumé dans les deux thèmes) n'existent que dans le bloc clair, dont il hérite.
    {
      name: "sombre",
      tokens: cascadedDark,
      opaqueSurfaces: new Map([...cascadedDark, ...opaqueLight, ...opaqueDark]),
    },
  ];
}

const THEMES = readThemes();

interface ContrastCase {
  readonly ink: string;
  readonly surface: string;
  readonly threshold: number;
}

function contrastCases(
  threshold: number,
  pairs: readonly (readonly [string, string])[]
): readonly ContrastCase[] {
  return pairs.map(([ink, surface]) => ({ ink, surface, threshold }));
}

/** Texte courant : la cible du site est le niveau AAA, pas le minimum AA. */
const ENHANCED_TEXT_CASES = contrastCases(AAA_TEXT, [
  ["--text-strong", "--site-background"],
  ["--text-body", "--site-background"],
]);

const MINIMUM_TEXT_CASES = contrastCases(AA_TEXT, [
  ["--text-muted", "--site-background"],
  ["--text-accent", "--site-background"],
  // `.eyebrow` hors carte : `.section-heading > .eyebrow` du parcours, des compétences,
  // des projets et de l'accessibilité (Home.tsx) est posé à même le fond de page. Le
  // token est décoratif par contrat de couleur, mais il porte du TEXTE.
  ["--accent-secondary", "--site-background"],
  // Repli opaque des cartes de verre, ce que voit un navigateur sans backdrop-filter.
  ["--text-strong", "--glass-fill-solid"],
  ["--text-body", "--glass-fill-solid"],
  ["--text-muted", "--glass-fill-solid"],
  // Les trois états du bouton plein : le survol et l'appui ne sont pas dispensés
  // du seuil AA sous prétexte d'être transitoires.
  ["--text-on-accent", "--accent"],
  ["--text-on-accent", "--accent-hover"],
  ["--text-on-accent", "--accent-active"],
  ["--badge-live-text", "--badge-live-surface"],
  ["--status-progress-text", "--status-progress-surface"],
  ["--status-upcoming-text", "--status-upcoming-surface"],
  // Le header sort du système de thème : verre fumé, donc aplat sombre partout.
  ["--header-text", "--header-solid"],
  ["--header-text-strong", "--header-solid"],
  ["--header-text-hover", "--header-solid"],
]);

/* ---------------------------------------------------------------------------
   ORDRE DES DEUX ANNEAUX DE FOCUS — à lire avant de « re-corriger » la paire
   `--focus-inner` / `--accent` ci-dessous en `--focus-outer` / `--accent`.

   La règle `:focus-visible` de la feuille (`a[href]`, `button`, `input`, `select`,
   `textarea`, `summary`, `[role="button"]`, `[tabindex]` — § 3 Base) peint ceci :

     outline: 2px solid var(--focus-inner);
     outline-offset: 2px;
     box-shadow:
       0 0 0 2px var(--focus-inner),   |  0 → 2 px du bord de l'élément
       0 0 0 5px var(--focus-outer),   |  0 → 5 px, donc VISIBLE de 2 à 5 px
       var(--elevation, 0 0 rgba(0, 0, 0, 0));

   Les `box-shadow` se peignent dans l'ordre de déclaration, la première par-dessus :
   l'étalement de 2 px masque le centre de celui de 5 px. En partant du bord de
   l'élément vers l'extérieur, on traverse donc `--focus-inner` (0 → 2 px, ombre),
   `--focus-inner` encore (2 → 4 px, l'`outline` décalée de 2 px et large de 2 px,
   peinte AU-DESSUS des ombres), puis `--focus-outer` (4 → 5 px).

   Conséquence, et c'est tout l'objet de ce commentaire : la bande qui TOUCHE l'aplat
   d'un bouton plein (`.button-primary`, `background: var(--accent)`) est
   `--focus-inner`. `--focus-outer` ne touche jamais `--accent` — son voisin est ce qui
   entoure le bouton, c'est-à-dire le fond de page ou le sol d'une carte. Mesurer
   `--focus-outer` contre `--accent` mesurait une adjacence qui n'existe pas ; pire, la
   contrainte était mathématiquement insatisfiable en thème clair (voir le bloc
   `--focus-outer` de la feuille : l'intervalle de luminance imposé par le fond de page
   et celui imposé par l'aplat accent sont disjoints), donc aucune palette ne pouvait
   la satisfaire.

   Les trois contraintes réelles du double liseré sont, dans l'ordre des bandes :
     1. `--focus-inner` contre l'aplat accent          — ici, à 3:1 ;
     2. `--focus-inner` contre `--focus-outer`          — ici, à 3:1 : les deux bandes
        doivent rester distinguables l'une de l'autre ;
     3. `--focus-outer` contre son dehors               — le fond de page ici, et les
        sols de carte composés dans `COMPOSITE_NON_TEXT_CASES`, parce qu'un bouton
        focalisé vit dans une carte bien plus souvent que sur le fond nu.
   ------------------------------------------------------------------------ */
const NON_TEXT_CASES = contrastCases(AA_NON_TEXT, [
  ["--control-border", "--site-background"],
  // Double liseré de focus : chaque anneau doit se détacher de ce qu'il borde.
  ["--focus-outer", "--site-background"],
  // La bande qui touche l'aplat accent est l'anneau INTÉRIEUR — voir ci-dessus.
  ["--focus-inner", "--accent"],
  ["--focus-outer", "--focus-inner"],
]);

/** Toutes les paires opaque-contre-opaque, pour le contrôle de sensibilité final. */
const ALL_OPAQUE_CASES: readonly ContrastCase[] = [
  ...ENHANCED_TEXT_CASES,
  ...MINIMUM_TEXT_CASES,
  ...NON_TEXT_CASES,
];

/* ---------------------------------------------------------------------------
   Supports COMPOSÉS.

   Les cas ci-dessus n'apparient que de l'opaque contre de l'opaque : aucun token
   translucide n'y est mesuré. Or `--panel-surface`, `--chip-surface`,
   `--glass-fill`, `--glass-border` et le halo sont tous des `rgba()`, et c'est sur
   eux que se joue la lisibilité réelle. Mutations vérifiées sur la vraie feuille —
   `--panel-surface` supprimé, `--chip-surface` passé en encre quasi opaque,
   `--glass-border` rendu invisible, `--halo-tint` passé en quasi-noir — toutes
   passaient au vert.

   Le sol du texte d'une carte n'est ni `--site-background` ni `--glass-fill-solid` :
   `.liquid-bubble` est un DISQUE PLEIN (`background: var(--halo-tint)` +
   `opacity: var(--halo-opacity)`, § 5 de la feuille), pas un dégradé fondu. Le sol
   est donc le halo composé sous le remplissage de verre. La composition est faite en
   source-over sRGB NON LINÉAIRE (`compositeOver`), ce que peint le navigateur.

   HYPOTHÈSE GÉOMÉTRIQUE, à connaître pour juger un échec : le modèle mesure le PIRE
   CAS de position de halo, pas un recouvrement constaté à une largeur de viewport
   donnée. Savoir si tel bouton a tel disque sous lui ne se lit pas dans le texte de
   la feuille — les six bulles sont posées en pourcentages de la hauteur de page et en
   `vw`, elles dérivent en continu (§ 5 : animation de dérive plus parallaxe au
   défilement) et la grille se recompose à chaque largeur. Un échec ici dit donc « il
   existe une largeur et un moment où cette encre tombe à ce ratio », ce qui est la
   bonne contrainte pour un décor mobile, et non « c'est ainsi à 1440 px ».

   Trous assumés de ce modèle, tous conservateurs ou non modélisables :
   - `backdrop-filter: blur() saturate()` transforme l'arrière-plan avant le
     remplissage. Le flou moyenne les voisins : mesurer le CENTRE d'un disque plein
     est la borne pessimiste, celle qu'on veut. La saturation, elle, n'est pas
     modélisée.
   - `--glass-highlight` (`::before`) et `--glass-specular` (`::after`) sont des
     dégradés à arrêts transparents : aucun aplat à mesurer.
   - `@supports not (backdrop-filter)` et `prefers-reduced-transparency: reduce`
     remplacent le verre par `--glass-fill-solid`, déjà couvert en opaque plus haut.
   ------------------------------------------------------------------------ */

/**
 * Une couche de peinture. `token` est un nom de token ; `opacity` nomme le token
 * numérique d'une `opacity` CSS portée par l'élément, qui multiplie l'alpha.
 * `declaration` porte une valeur lue directement dans une règle, `var()` compris.
 */
type StackLayer =
  | { readonly token: string; readonly opacity?: string }
  | { readonly declaration: string };

interface Support {
  /** Se lit à la suite de « sur » dans le nom du test. */
  readonly label: string;
  /** La plus basse d'abord. */
  readonly stack: readonly StackLayer[];
  /** Résoudre sur les tokens aplatis plutôt que sur ceux de la cascade normale. */
  readonly opaqueSurfaces?: true;
}

function numberToken(theme: Theme, name: string): number {
  const raw = tokenValue(theme, name);
  const value = Number(raw);

  if (!Number.isFinite(value)) {
    throw new Error(`token \`${name}\` attendu numérique dans le thème ${theme.name}, lu "${raw}"`);
  }

  return value;
}

/** Valeur d'une déclaration, `var(--token)` résolu dans le thème. */
function resolveDeclaration(theme: Theme, value: string): string {
  const reference = VAR_REFERENCE.exec(value);

  return reference === null ? value : tokenValue(theme, reference[1]);
}

function resolveSupport(theme: Theme, support: Support): string {
  const active: Theme =
    support.opaqueSurfaces === true ? { ...theme, tokens: theme.opaqueSurfaces } : theme;

  return compositeLayers(
    support.stack.map((layer) => {
      if ("declaration" in layer) {
        return resolveDeclaration(active, layer.declaration);
      }

      const color = tokenValue(active, layer.token);

      return layer.opacity === undefined
        ? color
        : withAlpha(color, numberToken(active, layer.opacity));
    })
  );
}

const PAGE: StackLayer = { token: "--site-background" };
const COOL_HALO: StackLayer = { token: "--halo-tint", opacity: "--halo-opacity" };
const WARM_HALO: StackLayer = { token: "--halo-tint-warm", opacity: "--halo-opacity" };
const GLASS_FILL: StackLayer = { token: "--glass-fill" };

/** Ce qui se trouve DERRIÈRE une carte, et donc dehors de sa bordure. */
const CARD_BACKDROPS: readonly Support[] = [
  { label: "le fond de page", stack: [PAGE] },
  { label: "le fond de page sous le halo froid", stack: [PAGE, COOL_HALO] },
  { label: "le fond de page sous le halo chaud", stack: [PAGE, WARM_HALO] },
];

/**
 * `.liquid-card` — `background: var(--glass-fill)` (§ 6), posé sur le décor du § 5.
 * Le halo chaud comme le froid passent sous les cartes : `.liquid-bubble-three`
 * (`top: 21%; right: 3vw`) est entièrement dans le viewport, au milieu du contenu.
 */
const GLASS_FLOORS: readonly Support[] = CARD_BACKDROPS.map((backdrop) => ({
  label: `la carte sur ${backdrop.label}`,
  stack: [...backdrop.stack, GLASS_FILL],
}));

/**
 * `@media (prefers-contrast: more)` force `.liquid-card { background: … }` : le sol y
 * est un APLAT connu, sans aucune hypothèse de composition. La valeur est LUE dans la
 * feuille — elle est en cours de changement, la coder en dur ferait de ce test un
 * doublon du CSS au lieu d'un contrôle.
 */
const FORCED_CONTRAST_CARD_BACKGROUND = declarationValue(
  ruleBody(ruleBody(stylesheet, "@media (prefers-contrast: more)"), ".liquid-card"),
  "background"
);

const FORCED_CONTRAST_FLOOR: Support = {
  label: "la carte sous prefers-contrast: more",
  stack: [{ declaration: FORCED_CONTRAST_CARD_BACKGROUND }],
  // Ce mode aplatit aussi les lavis : les mesurer avec les `rgba()` de `:root`
  // reviendrait à mesurer une combinaison qui n'existe pas dans ce mode.
  opaqueSurfaces: true,
};

/** Tous les sols de carte atteignables sur lesquels un lavis peut venir se poser. */
const CARD_FLOORS: readonly Support[] = [...GLASS_FLOORS, FORCED_CONTRAST_FLOOR];

/**
 * Encres posées à même le verre, sans lavis. Chaque paire est réalisée par une règle :
 * - `--text-strong`   : `.timeline .company` dans `.timeline-item.liquid-card`
 * - `--text-body`     : `.project-card p` dans `.project-card.liquid-card`
 * - `--text-muted`    : `.accessibility-status` dans `.accessibility-card.liquid-card`
 * - `--text-accent`   : `.project-date` dans `.project-card.liquid-card`
 * - `--accent-secondary` : `.eyebrow` dans `.hero-card` / `.education` /
 *   `.contact-card`, toutes `.liquid-card` (Home.tsx) — du texte réel, pas du décor.
 */
const CARD_INKS: readonly string[] = [
  "--text-strong",
  "--text-body",
  "--text-muted",
  "--text-accent",
  "--accent-secondary",
];

interface Wash {
  readonly token: string;
  /** Encres qu'une règle pose EFFECTIVEMENT sur ce lavis. */
  readonly inks: readonly string[];
  /** Vrai si un `1px solid var(--control-border)` entoure ce lavis. */
  readonly enclosedByControlBorder: boolean;
}

/**
 * Lavis d'état, posés sur le sol de la carte.
 *
 * `--text-muted` sur `--soft-surface-active` est volontairement ABSENT : la mesure a
 * l'air alarmante mais aucune règle ne la réalise — les consommateurs du token
 * (`.button-secondary:active`, `.section-nav a:active`, `.section-nav--site a:active`)
 * portent `--text-strong`, `--header-text*` ou `--text-accent`. Une contrainte
 * inventée qui bloque une palette valide est un test nuisible.
 */
const WASHES: readonly Wash[] = [
  {
    // `.accessibility-list li`, `.contact-links a`, et `.button-secondary` via
    // l'alias `--soft-surface`.
    token: "--panel-surface",
    inks: [
      // `.accessibility-list strong`, `.contact-links a`, `.button-secondary`
      "--text-strong",
      // `.accessibility-list span`
      "--text-body",
      // `.contact-links small`
      "--text-muted",
      // `.contact-arrow`
      "--text-accent",
    ],
    enclosedByControlBorder: true,
  },
  {
    // `.contact-links a:hover`, `.button-secondary:hover` via `--soft-surface-hover`.
    token: "--panel-surface-hover",
    inks: [
      // `.contact-links a` et `.button-secondary:hover` gardent cette encre
      "--text-strong",
      // `.contact-links a:hover > small`
      "--text-muted",
      // `.contact-arrow` sous le survol de l'ancre
      "--text-accent",
    ],
    enclosedByControlBorder: true,
  },
  {
    // `.button-secondary:active` — l'encre de `.button-secondary` persiste.
    token: "--soft-surface-active",
    inks: ["--text-strong"],
    enclosedByControlBorder: true,
  },
  {
    // `.skill-group li`, `.experience-stack li`, `.project-stack li`. Bordure
    // `--border-subtle`, purement décorative : pas de seuil 1.4.11 dessus.
    token: "--chip-surface",
    inks: ["--text-strong"],
    enclosedByControlBorder: false,
  },
];

interface WashSupport {
  readonly wash: Wash;
  readonly support: Support;
}

const WASH_SUPPORTS: readonly WashSupport[] = CARD_FLOORS.flatMap((floor) =>
  WASHES.map((wash) => ({
    wash,
    support: {
      label: `${wash.token} sur ${floor.label}`,
      stack: [...floor.stack, { token: wash.token }],
      ...(floor.opaqueSurfaces === true ? { opaqueSurfaces: true as const } : {}),
    },
  }))
);

interface CompositeCase {
  readonly ink: string;
  readonly inkStack: readonly StackLayer[];
  readonly support: string;
  readonly surfaceStack: readonly StackLayer[];
  readonly threshold: number;
  readonly opaqueSurfaces?: true;
}

function inksOn(
  support: Support,
  threshold: number,
  inks: readonly string[]
): readonly CompositeCase[] {
  return inks.map((token) => ({
    ink: token,
    inkStack: [{ token }],
    support: support.label,
    surfaceStack: support.stack,
    threshold,
    ...(support.opaqueSurfaces === true ? { opaqueSurfaces: true as const } : {}),
  }));
}

const COMPOSITE_TEXT_CASES: readonly CompositeCase[] = [
  ...CARD_FLOORS.flatMap((floor) => inksOn(floor, AA_TEXT, CARD_INKS)),
  ...WASH_SUPPORTS.flatMap(({ wash, support }) => inksOn(support, AA_TEXT, wash.inks)),
];

/**
 * `--glass-border` est le liseré de `.liquid-card`. Le fond de la carte est peint sous
 * la bordure (`background-clip: border-box` par défaut), donc le pixel de bordure vaut
 * `--glass-border` composé sur le remplissage de verre, lui-même sur le décor. On le
 * confronte aux deux aplats qu'il sépare : le dehors de la carte, et son dedans.
 *
 * SEUIL DE PERCEPTIBILITÉ, et non les 3:1 de WCAG 1.4.11 — ce point est un choix
 * argumenté, pas un oubli. 1.4.11 porte sur « l'information visuelle nécessaire pour
 * identifier les composants d'interface » : `.liquid-card` est un CONTENEUR
 * décoratif, pas un composant, et rien n'a besoin de son liseré pour être identifié
 * ou actionné. Les vraies bordures de contrôle, elles, sont mesurées à 3:1 —
 * `--control-border` juste au-dessus. Exiger 3:1 ici imposerait un trait d'encre franc
 * sur une carte claire, c'est-à-dire bloquerait une palette valide : mesuré, le liseré
 * tient 1.44:1 contre le décor, et la feuille documente cette valeur comme voulue, la
 * séparation étant portée par `--glass-shadow`.
 *
 * Ce que le seuil attrape quand même, et c'est le trou signalé : un liseré RENDU
 * INVISIBLE. À alpha 0, le pixel de bordure devient exactement le sol de la carte,
 * soit 1.00:1 contre le dedans.
 */
const GLASS_BORDER_CASES: readonly CompositeCase[] = CARD_BACKDROPS.flatMap((backdrop) => {
  const rim: readonly StackLayer[] = [...backdrop.stack, GLASS_FILL, { token: "--glass-border" }];

  return [
    {
      ink: "--glass-border",
      inkStack: rim,
      support: backdrop.label,
      surfaceStack: backdrop.stack,
      threshold: MIN_RIM_CONTRAST,
    },
    {
      ink: "--glass-border",
      inkStack: rim,
      support: `le remplissage de la carte sur ${backdrop.label}`,
      surfaceStack: [...backdrop.stack, GLASS_FILL],
      threshold: MIN_RIM_CONTRAST,
    },
  ];
});

/**
 * `--border-subtle` cerne les lavis les plus discrets : `.accessibility-list li`
 * (`--panel-surface`), les chips (`--chip-surface`) et les tuiles d'icône. La feuille
 * le documente comme « purement décoratif », donc pas de seuil 1.4.11 — mais rendu
 * TRANSPARENT il fait disparaître le contour des chips, et c'est l'une des mutations
 * qui passaient au vert. Même plancher de perceptibilité que le liseré de verre.
 */
const SUBTLE_BORDER_CASES: readonly CompositeCase[] = WASH_SUPPORTS.filter(
  ({ wash }) => !wash.enclosedByControlBorder
).map(({ support }) => ({
  ink: "--border-subtle",
  inkStack: [...support.stack, { token: "--border-subtle" }],
  support: support.label,
  surfaceStack: support.stack,
  threshold: MIN_RIM_CONTRAST,
  ...(support.opaqueSurfaces === true ? { opaqueSurfaces: true as const } : {}),
}));

const COMPOSITE_NON_TEXT_CASES: readonly CompositeCase[] = [
  // `--control-border` cerne trois contrôles posés sur une carte : `.button-secondary`,
  // `.social-link` et `.contact-links a`. Son voisin extérieur est le sol de la carte.
  ...CARD_FLOORS.flatMap((floor) => inksOn(floor, AA_NON_TEXT, ["--control-border"])),
  /*
   * Anneau EXTÉRIEUR du double liseré de focus contre son vrai voisinage.
   *
   * `NON_TEXT_CASES` ne le confrontait qu'à `--site-background`, or presque aucun
   * élément focalisable du site n'est posé sur le fond nu : `.button-primary`,
   * `.button-secondary`, `.contact-links a`, `.social-link` et les ancres de projet
   * vivent tous dans une `.liquid-card`, donc sur le sol composé décor + verre. Le
   * trou était là — l'anneau extérieur pouvait tenir 3:1 contre le fond de page et
   * disparaître sur une carte, sans qu'aucune assertion ne le dise.
   *
   * L'anneau est un INDICATEUR DE FOCUS, pas un décor de conteneur : les 3:1 de WCAG
   * 1.4.11 s'appliquent pleinement ici, sans le rabais de `MIN_RIM_CONTRAST` accordé
   * aux liserés de `.liquid-card`.
   */
  ...CARD_FLOORS.flatMap((floor) => inksOn(floor, AA_NON_TEXT, ["--focus-outer"])),
  // Son voisin intérieur est le lavis qu'il entoure.
  ...WASH_SUPPORTS.filter(({ wash }) => wash.enclosedByControlBorder).flatMap(({ support }) =>
    inksOn(support, AA_NON_TEXT, ["--control-border"])
  ),
  ...GLASS_BORDER_CASES,
  ...SUBTLE_BORDER_CASES,
];

const ALL_COMPOSITE_CASES: readonly CompositeCase[] = [
  ...COMPOSITE_TEXT_CASES,
  ...COMPOSITE_NON_TEXT_CASES,
];

interface HuePairCase {
  readonly one: string;
  readonly other: string;
}

const STATUS_HUE_CASES: readonly HuePairCase[] = [
  { one: "--badge-live-surface", other: "--status-progress-surface" },
  { one: "--badge-live-surface", other: "--status-upcoming-surface" },
  { one: "--status-progress-surface", other: "--status-upcoming-surface" },
];

const CONTRAST_TITLE = "devrait atteindre $threshold:1 pour $ink sur $surface";

/** Named so the failure message carries the pair, the theme and the measured ratio. */
function expectContrast(theme: Theme, testCase: ContrastCase): void {
  const { ink, surface, threshold } = testCase;
  const ratio = contrastRatio(tokenValue(theme, ink), tokenValue(theme, surface));

  expect(
    ratio,
    `${ink} sur ${surface} en thème ${theme.name} : ${ratio.toFixed(2)}:1 mesuré`
  ).toBeGreaterThanOrEqual(threshold);
}

const COMPOSITE_TITLE = "devrait atteindre $threshold:1 pour $ink sur $support";

/**
 * Le message porte les deux aplats RÉSOLUS en plus du ratio : sur un support composé
 * de quatre couches, savoir que la paire échoue ne suffit pas à savoir quelle couche
 * la fait échouer.
 */
function expectCompositeContrast(theme: Theme, testCase: CompositeCase): void {
  const { ink, inkStack, support, surfaceStack, threshold, opaqueSurfaces } = testCase;
  const mode = opaqueSurfaces === true ? { opaqueSurfaces: true as const } : {};
  const inkColor = resolveSupport(theme, { label: ink, stack: inkStack, ...mode });
  const surfaceColor = resolveSupport(theme, {
    label: support,
    stack: surfaceStack,
    ...mode,
  });
  const ratio = contrastRatio(inkColor, surfaceColor);

  expect(
    ratio,
    `${ink} (${inkColor}) sur ${support} (${surfaceColor}) en thème ${theme.name} : ` +
      `${ratio.toFixed(2)}:1 mesuré pour un seuil de ${threshold}:1`
  ).toBeGreaterThanOrEqual(threshold);
}

describe.each(THEMES)("contrat de couleur du thème $name", (theme: Theme) => {
  describe("contraste renforcé du texte courant", () => {
    it.each(ENHANCED_TEXT_CASES)(CONTRAST_TITLE, (testCase) => {
      expectContrast(theme, testCase);
    });
  });

  describe("contraste minimal du texte et des aplats", () => {
    it.each(MINIMUM_TEXT_CASES)(CONTRAST_TITLE, (testCase) => {
      expectContrast(theme, testCase);
    });
  });

  describe("contraste des composants d'interface", () => {
    it.each(NON_TEXT_CASES)(CONTRAST_TITLE, (testCase) => {
      expectContrast(theme, testCase);
    });
  });

  describe("contraste du texte sur les supports composés", () => {
    it.each(COMPOSITE_TEXT_CASES)(COMPOSITE_TITLE, (testCase) => {
      expectCompositeContrast(theme, testCase);
    });
  });

  describe("contraste des traits sur les supports composés", () => {
    it.each(COMPOSITE_NON_TEXT_CASES)(COMPOSITE_TITLE, (testCase) => {
      expectCompositeContrast(theme, testCase);
    });
  });

  describe("hiérarchie de la pastille d'état face au bouton", () => {
    it("devrait creuser un ΔE OKLab suffisant entre --badge-live-surface et --accent", () => {
      const distance = deltaEOklab(
        tokenValue(theme, "--badge-live-surface"),
        tokenValue(theme, "--accent")
      );

      expect(
        distance,
        `ΔE OKLab entre --badge-live-surface et --accent en thème ${theme.name} : ${distance.toFixed(2)} mesuré`
      ).toBeGreaterThanOrEqual(MIN_BADGE_DELTA_E);
    });

    it("devrait garder --badge-live-surface dans la famille de teinte de --accent", () => {
      const gap = oklchHueDistance(
        tokenValue(theme, "--badge-live-surface"),
        tokenValue(theme, "--accent")
      );

      expect(
        gap,
        `écart de teinte OKLCH entre --badge-live-surface et --accent en thème ${theme.name} : ${gap.toFixed(2)} deg mesuré`
      ).toBeLessThanOrEqual(MAX_FAMILY_HUE_GAP);
    });
  });

  describe("distinction des trois statuts", () => {
    it.each(STATUS_HUE_CASES)(
      "devrait séparer $one et $other par la teinte et pas seulement par la luminosité",
      ({ one, other }) => {
        const gap = oklchHueDistance(tokenValue(theme, one), tokenValue(theme, other));

        expect(
          gap,
          `écart de teinte OKLCH entre ${one} et ${other} en thème ${theme.name} : ${gap.toFixed(2)} deg mesuré`
        ).toBeGreaterThanOrEqual(MIN_STATUS_HUE_GAP);
      }
    );
  });
});

describe("extraction des tokens depuis le texte de la feuille", () => {
  /**
   * Reproduction exacte du faux vert : une déclaration réelle, puis l'ancienne valeur
   * citée en fin de bloc sous une forme syntaxiquement valide. `Map.set` laissant
   * gagner la dernière occurrence, c'est le commentaire qui décidait de la palette
   * mesurée — et la suite restait verte sur une paire à 2.23:1.
   */
  const CSS_WITH_A_COMMENTED_DECLARATION = `
:root {
  --text-body: #123456;
  /* ancienne valeur retirée, citée pour mémoire :
     --text-body: #2c464b; */
}
`;

  const CSS_WITH_PARENTHESES_AND_BRACES = `
:root {
  /* Un commentaire avec une accolade { orpheline et un ; en travers. */
  --glass-specular: linear-gradient(
    142deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.72) 16%
  );
  --panel-surface: rgba(7, 40, 45, 0.05); /* 1.100:1 */
}
`;

  it("devrait ignorer une déclaration citée dans un commentaire", () => {
    const tokens = parseCustomProperties(
      ruleBody(CSS_WITH_A_COMMENTED_DECLARATION, LIGHT_SELECTOR)
    );

    expect(tokens.get("--text-body")).toBe("#123456");
  });

  it("devrait ignorer une déclaration commentée même sans passer par ruleBody", () => {
    const tokens = parseCustomProperties(CSS_WITH_A_COMMENTED_DECLARATION);

    expect(tokens.get("--text-body")).toBe("#123456");
  });

  it("devrait garder les valeurs à parenthèses et à virgules intactes", () => {
    const tokens = parseCustomProperties(ruleBody(CSS_WITH_PARENTHESES_AND_BRACES, LIGHT_SELECTOR));

    expect(tokens.get("--glass-specular")).toContain("rgba(255, 255, 255, 0.72) 16%");
    expect(tokens.get("--panel-surface")).toBe("rgba(7, 40, 45, 0.05)");
  });

  it("devrait délimiter le bloc malgré une accolade orpheline dans un commentaire", () => {
    expect(() => ruleBody(CSS_WITH_PARENTHESES_AND_BRACES, LIGHT_SELECTOR)).not.toThrow();
  });

  it("devrait lire la valeur imposée par prefers-contrast: more dans la feuille", () => {
    expect(FORCED_CONTRAST_CARD_BACKGROUND).not.toBe("");
    expect(() => resolveSupport(THEMES[0], FORCED_CONTRAST_FLOOR)).not.toThrow();
  });

  it("devrait distinguer backdrop-filter de -webkit-backdrop-filter", () => {
    const body = ruleBody(ruleBody(stylesheet, "@media (prefers-contrast: more)"), ".liquid-card");

    expect(declarationValue(body, "backdrop-filter")).toBe("none");
  });
});

/**
 * Les deux modes qui promettent des surfaces opaques doivent les rendre OPAQUES.
 *
 * C'est la promesse entière de `prefers-reduced-transparency: reduce` et de
 * `prefers-contrast: more` : plus aucune surface dont la couleur dépende de ce qui
 * passe derrière. Un lavis resté en `rgba()` dans ces modes ne tient la promesse qu'à
 * moitié, et rien ne le dirait — `contrastRatio` refuse désormais de le mesurer, mais
 * seulement si quelqu'un le mesure.
 */
describe.each(THEMES)("aplatissement des surfaces du thème $name", (theme: Theme) => {
  const flattened: Theme = { ...theme, tokens: theme.opaqueSurfaces };

  it.each([
    { token: "--panel-surface" },
    { token: "--panel-surface-hover" },
    { token: "--soft-surface" },
    { token: "--soft-surface-hover" },
    { token: "--soft-surface-active" },
    { token: "--chip-surface" },
    { token: "--icon-surface-start" },
    { token: "--icon-surface-end" },
  ])("devrait rendre $token opaque", ({ token }) => {
    const value = tokenValue(flattened, token);
    const { alpha } = parseRgba(value);

    expect(alpha, `${token} vaut "${value}" en thème ${theme.name} aplati`).toBe(1);
  });
});

/* ---------------------------------------------------------------------------
   Sensibilité des tables composées.

   Les cinq mutations que la relecture a fait passer au vert. Le contrôle ne touche
   PAS `index.css` — il rejoue les mêmes tables sur une carte de tokens mutée en
   mémoire — et il exige que la mutation AJOUTE des échecs par rapport à la mesure du
   jour, pas simplement qu'il en reste : la feuille a déjà des échecs réels, et
   « il en reste au moins un » serait vrai sans rien prouver.
   ------------------------------------------------------------------------ */

const [LIGHT_THEME] = THEMES;

/** Mute le token dans les DEUX cartes : sinon le mode aplati échapperait à la mutation. */
function withToken(theme: Theme, token: string, value: string | undefined): Theme {
  const mutate = (source: ReadonlyMap<string, string>): Map<string, string> => {
    const tokens = new Map(source);

    if (value === undefined) {
      tokens.delete(token);
    } else {
      tokens.set(token, value);
    }

    return tokens;
  };

  return {
    name: `${theme.name} muté`,
    tokens: mutate(theme.tokens),
    opaqueSurfaces: mutate(theme.opaqueSurfaces),
  };
}

/**
 * Nombre de cas en échec. Une exception compte comme un échec : un token supprimé ou
 * devenu translucide là où on attend un aplat est un défaut, pas un cas à sauter.
 */
function failureCount(theme: Theme, cases: readonly CompositeCase[]): number {
  return cases.filter((testCase) => {
    const mode = testCase.opaqueSurfaces === true ? { opaqueSurfaces: true as const } : {};

    try {
      const ink = resolveSupport(theme, {
        label: testCase.ink,
        stack: testCase.inkStack,
        ...mode,
      });
      const surface = resolveSupport(theme, {
        label: testCase.support,
        stack: testCase.surfaceStack,
        ...mode,
      });

      return contrastRatio(ink, surface) < testCase.threshold;
    } catch {
      return true;
    }
  }).length;
}

/** Le même compteur pour les paires opaques. Une exception compte comme un échec. */
function opaqueFailureCount(theme: Theme, cases: readonly ContrastCase[]): number {
  return cases.filter((testCase) => {
    try {
      return (
        contrastRatio(tokenValue(theme, testCase.ink), tokenValue(theme, testCase.surface)) <
        testCase.threshold
      );
    } catch {
      return true;
    }
  }).length;
}

const LIGHT_BASELINE_FAILURES = failureCount(LIGHT_THEME, ALL_COMPOSITE_CASES);

const MUTATIONS: readonly {
  readonly label: string;
  readonly token: string;
  readonly value: string | undefined;
}[] = [
  { label: "--panel-surface supprimé", token: "--panel-surface", value: undefined },
  {
    label: "--chip-surface passé en encre quasi opaque",
    token: "--chip-surface",
    value: "rgba(7, 40, 45, 0.92)",
  },
  {
    label: "--glass-border rendu invisible",
    token: "--glass-border",
    value: "rgba(7, 40, 45, 0)",
  },
  {
    label: "--border-subtle rendu transparent",
    token: "--border-subtle",
    value: "rgba(7, 40, 45, 0)",
  },
  { label: "--halo-tint passé en quasi-noir", token: "--halo-tint", value: "#050708" },
  /*
   * Preuve que les cas `--focus-outer` sur les sols de carte ont des dents.
   *
   * `#e4e7f0` est un gris bleuté clair : il tient encore 1.05:1 contre le fond de page
   * — donc un test qui ne regarderait que `--site-background` le laisserait passer de
   * justesse dans le mauvais sens — et il s'effondre à 1.07:1 → 1.12:1 contre les
   * quatre sols de carte. Sans les cas ajoutés à `COMPOSITE_NON_TEXT_CASES`, cette
   * ligne ne créerait AUCUN échec supplémentaire et ce test passerait au rouge.
   */
  {
    label: "--focus-outer rapproché du sol des cartes",
    token: "--focus-outer",
    value: "#e4e7f0",
  },
];

describe("sensibilité des supports composés", () => {
  it.each(MUTATIONS)(
    "devrait faire échouer davantage de paires quand $label",
    ({ token, value }) => {
      const mutated = withToken(LIGHT_THEME, token, value);
      const failures = failureCount(mutated, ALL_COMPOSITE_CASES);

      expect(
        failures,
        `${failures} paires en échec après mutation, contre ${LIGHT_BASELINE_FAILURES} sur la feuille du jour`
      ).toBeGreaterThan(LIGHT_BASELINE_FAILURES);
    }
  );
});

/**
 * Sensibilité des paires OPAQUES, et d'abord de l'assertion réécrite.
 *
 * Une assertion corrigée sans contrôle de morsure n'est qu'un assouplissement bien
 * rédigé. Celle-ci mute `--focus-inner` — en mémoire, jamais dans la feuille — vers un
 * indigo CHOISI POUR NE CASSER QUE LA NOUVELLE PAIRE : `#6272b0` est à ΔE OKLab 17.5
 * de `--accent`, assez proche pour tomber à 2.13:1 contre l'aplat accent en clair et
 * 2.03:1 en sombre (sous les 3:1), mais assez éloigné de l'anneau extérieur pour tenir
 * 4.55:1 en clair et 4.45:1 en sombre — l'assertion `--focus-inner` / `--focus-outer`
 * reste donc verte sous cette mutation. Le seul échec ajouté est celui de la paire
 * `--focus-inner` / `--accent` : si quelqu'un la retire, ce test devient rouge.
 *
 * Les deux thèmes sont mutés parce que les deux définissent leur propre couple
 * d'anneaux, inversé de l'un à l'autre (anneau extérieur noir en clair, crème en
 * sombre).
 */
const OPAQUE_MUTATIONS: readonly {
  readonly label: string;
  readonly token: string;
  readonly value: string;
}[] = [
  {
    label: "--focus-inner rapproché de l'aplat accent",
    token: "--focus-inner",
    value: "#6272b0",
  },
];

describe.each(THEMES)("sensibilité des paires opaques du thème $name", (theme: Theme) => {
  const baseline = opaqueFailureCount(theme, ALL_OPAQUE_CASES);

  it.each(OPAQUE_MUTATIONS)(
    "devrait faire échouer davantage de paires quand $label",
    ({ token, value }) => {
      const mutated = withToken(theme, token, value);
      const failures = opaqueFailureCount(mutated, ALL_OPAQUE_CASES);

      expect(
        failures,
        `${failures} paires en échec après mutation, contre ${baseline} sur la feuille du jour`
      ).toBeGreaterThan(baseline);
    }
  );
});

describe("polarité du fond de page", () => {
  it("devrait rester plus clair que le gris moyen en thème clair", () => {
    const [light] = THEMES;
    const luminance = relativeLuminance(tokenValue(light, "--site-background"));

    expect(
      luminance,
      `luminance de --site-background en thème clair : ${luminance.toFixed(4)} mesurée`
    ).toBeGreaterThan(MID_GREY_LUMINANCE);
  });

  it("devrait rester plus sombre que le gris moyen en thème sombre", () => {
    const [, dark] = THEMES;
    const luminance = relativeLuminance(tokenValue(dark, "--site-background"));

    expect(
      luminance,
      `luminance de --site-background en thème sombre : ${luminance.toFixed(4)} mesurée`
    ).toBeLessThan(MID_GREY_LUMINANCE);
  });
});
