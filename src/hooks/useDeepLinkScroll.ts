import { useEffect, useRef } from "react";

/**
 * Le fragment tel qu'il désigne un élément : le navigateur compare l'identifiant
 * à la forme décodée du hash (`#caf%C3%A9` désigne `id="café"`).
 * `decodeURIComponent` lève sur une séquence tronquée comme `#%` : on retombe
 * alors sur la forme brute, qui ne désignera simplement aucun élément.
 */
function decodeFragment(rawFragment: string): string {
  try {
    return decodeURIComponent(rawFragment);
  } catch {
    return rawFragment;
  }
}

/**
 * Rejoue le fragment d'URL au montage : le site est rendu côté client, donc le
 * navigateur a déjà traité `#projets` alors que la section n'existait pas encore
 * dans le DOM. Sans ce rattrapage, tout lien profond dépose le lecteur en haut
 * de page.
 *
 * Trois règles non négociables :
 * - la cible est résolue avec `getElementById`, jamais avec `querySelector` :
 *   aucun sélecteur n'est évalué, donc un hash arbitraire (`#1abc`, `#a b`,
 *   `#<script>`) ne peut pas lever de `SyntaxError` et casser le rendu. Aucune
 *   liste blanche n'est nécessaire : on restaure le comportement natif du
 *   navigateur, qui accepte n'importe quel identifiant présent dans la page ;
 * - le défilement est synchrone dans l'effet, PAS différé par
 *   `requestAnimationFrame` : la mise en page est déjà calculée au moment où
 *   l'effet s'exécute (vérifié : la cible reste à la même position avec le
 *   portrait retardé de 3 s, ses dimensions étant déclarées dans le markup), et
 *   un document en arrière-plan ne reçoit pas de frame d'animation — le
 *   rattrapage n'aurait alors jamais lieu, ce qui est le cas d'un onglet ouvert
 *   en tâche de fond depuis un courriel ;
 * - le garde `hasScrolled` est posé AVANT le défilement, et c'est lui seul qui
 *   garantit un unique saut : `StrictMode` invoque l'effet deux fois en
 *   développement, et un Fast Refresh le rejouerait sinon ;
 * - le décalage de l'en-tête collant n'est pas recalculé ici : `block: "start"`
 *   respecte le `scroll-padding-top` déclaré sur `html`, une compensation
 *   manuelle ferait double emploi.
 *
 * Le saut est INSTANTANÉ en toute circonstance, et c'est délibéré. `html` porte
 * `scroll-behavior: smooth`, donc sans ce `behavior` explicite le rattrapage
 * serait animé — mesuré à 1,2 s pour les 4856 px de `#contact`, là où le
 * comportement natif d'un fragment au chargement est immédiat. Surtout,
 * l'animation traverse toutes les sections et déclenche au passage les
 * `IntersectionObserver` de `useScrollReveal` : mesuré 17 blocs `[data-reveal]`
 * sur 17 marqués `is-visible` contre 1 sur 17 sans hash, donc plus rien ne
 * s'anime si le lecteur remonte la page. Le défilement animé reste réservé aux
 * clics de navigation, où il est porté par le CSS.
 *
 * Le changement de hash après le montage reste au navigateur, qui le gère
 * nativement puisque les sections sont alors présentes.
 */
export function useDeepLinkScroll(): void {
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (hasScrolled.current) {
      return;
    }

    const fragment = decodeFragment(window.location.hash.slice(1));

    if (fragment === "") {
      return;
    }

    const target = document.getElementById(fragment);

    if (!target) {
      return;
    }

    hasScrolled.current = true;
    target.scrollIntoView({ block: "start", behavior: "instant" });
  }, []);
}
