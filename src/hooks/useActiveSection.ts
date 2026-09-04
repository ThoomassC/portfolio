import { useEffect, useState } from "react";

export type UseActiveSectionResult = {
  /** Identifiant de la section en cours de lecture, `""` si aucune. */
  readonly activeSection: string;
  /** Marque immédiatement une section comme active, au clic sur une ancre. */
  readonly selectSection: (sectionId: string) => void;
};

/**
 * Suit la section visible pour alimenter l'`aria-current` de la navigation.
 * `sectionIds` doit être une référence stable, sinon l'observateur se réabonne
 * à chaque rendu.
 */
export function useActiveSection(sectionIds: readonly string[]): UseActiveSectionResult {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const closestVisibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (firstEntry, secondEntry) =>
              Math.abs(firstEntry.boundingClientRect.top) -
              Math.abs(secondEntry.boundingClientRect.top)
          )[0];

        if (closestVisibleSection) {
          setActiveSection(closestVisibleSection.target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.1] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  return { activeSection, selectSection: setActiveSection };
}
