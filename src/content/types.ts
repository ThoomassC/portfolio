import type { TablerIcon } from "@tabler/icons-react";

/** Une date lisible et sa valeur machine, destinée à l'attribut `dateTime`. */
export type DateMark = {
  readonly label: string;
  readonly dateTime: string;
};

/**
 * Une plage de dates. Les deux bornes sont conservées séparément parce qu'un
 * `<time dateTime>` unique ne peut décrire qu'un seul instant : le rendu produit
 * donc deux `<time>` distincts.
 */
export type DateRange = {
  readonly start: DateMark;
  /**
   * Absente pour une période toujours en cours. Le rendu affiche alors
   * « Aujourd'hui » en texte simple : un `<time dateTime>` ne peut pas porter une
   * borne indéterminée sans mentir sur sa valeur machine.
   */
  readonly end?: DateMark;
};

export type Mission = {
  readonly title: string;
  readonly range: DateRange;
  readonly description: string;
  readonly stack: readonly string[];
};

export type Experience = {
  readonly company: string;
  readonly title: string;
  readonly range: DateRange;
  readonly description: string;
  readonly icon: TablerIcon;
  readonly stack: readonly string[];
  readonly missions: readonly Mission[];
};

/** Suffixe des classes `--completed` / `--in-progress` du CSS. */
export type StatusType = "completed" | "in-progress" | "upcoming";

export type Formation = {
  readonly title: string;
  readonly level: string;
  readonly status: string;
  readonly statusType: StatusType;
};

export type SkillGroup = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly string[];
};

export type ProjectLink = {
  readonly label: string;
  readonly href: string;
};

export type Project = {
  readonly id: string;
  readonly date: string;
  readonly title: string;
  readonly status: string;
  readonly statusType: StatusType;
  readonly description: string;
  readonly stack: readonly string[];
  readonly links: readonly ProjectLink[];
};

/**
 * Une pratique personnelle tenue dans la durée. Même vocabulaire que `Project` et
 * `Experience` : une icône `TablerIcon` et des `ProjectLink` — un tableau vide quand
 * la pratique n'a rien de public à montrer, comme pour un projet sans dépôt liable.
 */
export type Passion = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: TablerIcon;
  readonly links: readonly ProjectLink[];
};

export type NavigationItem = {
  readonly id: string;
  readonly label: string;
};
