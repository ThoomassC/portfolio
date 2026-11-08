import { act, render, waitFor } from "@testing-library/react";
import { StrictMode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { navigationSectionIds } from "./content/navigation";
import { setPrefersColorScheme, setPrefersReducedMotion } from "./test/setup";

/**
 * Régression : le site est rendu côté client et sans routeur. Le navigateur
 * traite le fragment d'URL avant que React n'ait monté le DOM, donc une page
 * ouverte à froid sur `/#projets` reste en haut (scrollY: 0 mesuré au
 * navigateur, alors que la cible est à 3009 px). Tout lien profond partagé
 * dépose le lecteur au sommet de la page.
 *
 * L'application doit donc, à son montage, amener elle-même à l'écran la
 * section désignée par le hash — sans jamais lever d'exception sur un hash qui
 * n'est pas un sélecteur CSS valide.
 */

type ScrollCall = {
  readonly target: Element;
  readonly options?: ScrollIntoViewOptions | boolean;
};

const scrollCalls: ScrollCall[] = [];

/**
 * jsdom n'implémente pas Element.prototype.scrollIntoView : il n'existe même
 * pas de propriété à espionner avec vi.spyOn. On l'installe donc à la main, et
 * localement à ce fichier pour ne rien changer aux autres suites. L'espion
 * enregistre son `this`, seul moyen de vérifier *quel* élément a défilé.
 */
const scrollIntoViewSpy = vi.fn(function scrollIntoView(
  this: Element,
  options?: ScrollIntoViewOptions | boolean
) {
  scrollCalls.push({ target: this, options });
});

function installScrollIntoViewSpy() {
  Object.defineProperty(Element.prototype, "scrollIntoView", {
    value: scrollIntoViewSpy,
    configurable: true,
    writable: true,
  });
}

function uninstallScrollIntoViewSpy() {
  Reflect.deleteProperty(Element.prototype, "scrollIntoView");
}

/**
 * `window.location.hash = …` fonctionne sous jsdom mais émet un événement
 * `hashchange`, ce qui laisserait passer un correctif qui n'écoute que
 * `hashchange` alors que le bug concerne le tout premier rendu.
 * `history.replaceState` réécrit l'URL sans émettre d'événement : c'est
 * exactement l'état d'une page ouverte directement sur un lien profond, avant
 * tout montage React.
 *
 * À noter : jsdom encode le fragment au passage (`#<script>` devient
 * `#%3Cscript%3E`), ce qui reste un sélecteur CSS invalide — le cas hostile
 * garde donc tout son sens.
 */
function setInitialHash(hash: string) {
  window.history.replaceState(null, "", `${window.location.pathname}${hash}`);
}

/** Identifiants des éléments effectivement amenés à l'écran, dans l'ordre des appels. */
function scrolledElementIds(): string[] {
  return scrollCalls.map((call) => call.target.id);
}

function behaviorOf(call: ScrollCall): ScrollBehavior | undefined {
  return typeof call.options === "object" && call.options !== null
    ? call.options.behavior
    : undefined;
}

function scrollBehaviors(): (ScrollBehavior | undefined)[] {
  return scrollCalls.map(behaviorOf);
}

/**
 * Attend que le défilement ait eu lieu sur les éléments attendus. `onTimeout`
 * renvoie l'erreur telle quelle : par défaut waitFor recopie tout le DOM dans
 * le message d'échec, ce qui noie l'assertion sous des centaines de lignes de
 * balisage.
 */
function waitForScrolledElementIds(expectedIds: readonly string[]) {
  return waitFor(() => expect(scrolledElementIds()).toEqual([...expectedIds]), {
    onTimeout: (error) => error,
  });
}

/**
 * Un correctif peut légitimement différer le défilement d'une frame, le temps
 * que la mise en page soit calculée. On attend donc une frame d'animation —
 * une condition du navigateur, pas une durée arbitraire — avant les assertions
 * négatives, pour ne pas conclure « rien n'a défilé » trop tôt.
 */
async function letDeferredScrollHappen() {
  await act(async () => {
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  });
}

beforeEach(() => {
  installScrollIntoViewSpy();
  setPrefersColorScheme("light");
  setPrefersReducedMotion(false);
});

afterEach(() => {
  scrollCalls.length = 0;
  scrollIntoViewSpy.mockClear();
  uninstallScrollIntoViewSpy();
  setInitialHash("");
});

describe("lien profond vers une section au chargement", () => {
  it.each([...navigationSectionIds])(
    "devrait amener la section à l'écran quand l'URL est ouverte sur #%s",
    async (sectionId) => {
      setInitialHash(`#${sectionId}`);

      render(<App />);

      await waitForScrolledElementIds([sectionId]);
    }
  );

  it("devrait n'amener aucune section à l'écran quand l'URL n'a pas de hash", async () => {
    setInitialHash("");

    render(<App />);
    await letDeferredScrollHappen();

    expect(scrolledElementIds()).toEqual([]);
  });

  it("devrait ignorer sans erreur un hash qui ne désigne aucune section de navigation", async () => {
    setInitialHash("#nexistepas");

    expect(() => render(<App />)).not.toThrow();
    await letDeferredScrollHappen();

    expect(scrolledElementIds()).toEqual([]);
  });

  /**
   * `document.querySelector("#1abc")` lève une SyntaxError : ce test documente
   * pourquoi le correctif ne peut pas interpoler le hash dans un sélecteur CSS.
   */
  it.each(["#<script>", "#1abc", "#a b", "#"])(
    "devrait ignorer sans erreur un hash qui n'est pas un sélecteur CSS valide (%s)",
    async (hostileHash) => {
      setInitialHash(hostileHash);

      expect(() => render(<App />)).not.toThrow();
      await letDeferredScrollHappen();

      expect(scrolledElementIds()).toEqual([]);
    }
  );

  it("devrait amener la section à l'écran sans animation quand le mouvement est réduit", async () => {
    setPrefersReducedMotion(true);
    setInitialHash("#contact");

    render(<App />);

    await waitForScrolledElementIds(["contact"]);
    expect(scrollBehaviors()).not.toContain("smooth");
  });

  /**
   * `html` porte `scroll-behavior: smooth` : sans un `behavior` explicite, le
   * rattrapage serait animé et traverserait toutes les sections, déclenchant au
   * passage les IntersectionObserver de useScrollReveal — mesuré 17 blocs
   * `[data-reveal]` révélés sur 17, contre 1 sur 17 sans hash. Plus rien ne
   * s'animerait si le lecteur remontait la page. Une assertion négative sur
   * « smooth » ne suffit pas : elle passe aussi quand l'option est absente.
   */
  it("devrait sauter instantanément, jamais en défilement animé", async () => {
    setInitialHash("#contact");

    render(<App />);

    await waitForScrolledElementIds(["contact"]);
    expect(scrollBehaviors()).toEqual(["instant"]);
  });

  /**
   * `main.tsx` monte l'application dans StrictMode, qui invoque les effets deux
   * fois en développement. C'est le seul contexte où la position du garde
   * `hasScrolled` se joue : posé après le défilement plutôt qu'avant, ou confié
   * à une frame d'animation annulée au nettoyage, le rattrapage se dédouble ou
   * disparaît entièrement — sans qu'aucun autre test ne bronche.
   */
  it("devrait défiler une seule fois malgré le double montage de StrictMode", async () => {
    setInitialHash("#projets");

    render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    await waitForScrolledElementIds(["projets"]);
    await letDeferredScrollHappen();

    expect(scrolledElementIds()).toEqual(["projets"]);
  });
});
