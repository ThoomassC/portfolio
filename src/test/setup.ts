import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

/**
 * jsdom n'implémente ni matchMedia ni IntersectionObserver : on les fournit ici
 * sous une forme pilotable par les tests.
 *
 * - les préférences système se règlent avec setPrefersColorScheme /
 *   setPrefersReducedMotion / setMediaPreference, puis changent en cours de
 *   session avec emitMediaChange ;
 * - les intersections se déclenchent explicitement avec notifyIntersection, et
 *   observeCountFor / unobserveCountFor permettent de vérifier qu'un élément est
 *   bien observé puis relâché.
 */

/**
 * Node 25 expose un `localStorage` natif inutilisable (aucun fichier de
 * stockage n'est fourni) qui masque celui de jsdom : `setItem` n'existe même
 * pas. On installe donc un stockage en mémoire, remis à zéro entre les tests.
 */
class MemoryStorage {
  private entries = new Map<string, string>();

  get length(): number {
    return this.entries.size;
  }

  clear(): void {
    this.entries.clear();
  }

  getItem(key: string): string | null {
    return this.entries.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.entries.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.entries.delete(key);
  }

  setItem(key: string, value: string): void {
    this.entries.set(key, String(value));
  }
}

vi.stubGlobal("localStorage", new MemoryStorage() as unknown as Storage);
vi.stubGlobal("sessionStorage", new MemoryStorage() as unknown as Storage);

type MediaListener = (event: MediaQueryListEvent) => void;

const mediaPreferences = new Map<string, boolean>();
const mediaListeners = new Map<string, Set<MediaListener>>();

function listenersFor(query: string): Set<MediaListener> {
  const existing = mediaListeners.get(query);

  if (existing) {
    return existing;
  }

  const created = new Set<MediaListener>();
  mediaListeners.set(query, created);

  return created;
}

export function setMediaPreference(query: string, matches: boolean) {
  mediaPreferences.set(query, matches);
}

export function setPrefersColorScheme(scheme: "light" | "dark") {
  setMediaPreference("(prefers-color-scheme: dark)", scheme === "dark");
}

export function setPrefersReducedMotion(reduce: boolean) {
  setMediaPreference("(prefers-reduced-motion: reduce)", reduce);
}

/**
 * Met la préférence à jour puis notifie uniquement les écouteurs enregistrés
 * pour cette media query — un changement de thème système ne doit pas réveiller
 * l'écouteur de prefers-reduced-motion.
 */
export function emitMediaChange(query: string, matches: boolean) {
  setMediaPreference(query, matches);
  const event = { matches, media: query } as MediaQueryListEvent;
  listenersFor(query).forEach((listener) => listener(event));
}

function createMediaQueryList(query: string): MediaQueryList {
  const listeners = listenersFor(query);

  const mediaQueryList = {
    get matches() {
      return mediaPreferences.get(query) ?? false;
    },
    media: query,
    onchange: null,
    addEventListener: (_type: "change", listener: MediaListener) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: "change", listener: MediaListener) => {
      listeners.delete(listener);
    },
    addListener: (listener: MediaListener) => {
      listeners.add(listener);
    },
    removeListener: (listener: MediaListener) => {
      listeners.delete(listener);
    },
    dispatchEvent: () => false,
  };

  return mediaQueryList as unknown as MediaQueryList;
}

vi.stubGlobal("matchMedia", (query: string) => createMediaQueryList(query));

type IntersectionRecord = {
  readonly callback: IntersectionObserverCallback;
  readonly instance: IntersectionObserver;
  readonly observed: Set<Element>;
  readonly observeCalls: Element[];
  readonly unobserveCalls: Element[];
  disconnected: boolean;
};

const intersectionRecords: IntersectionRecord[] = [];

function buildEntry(
  target: Element,
  isIntersecting: boolean,
): IntersectionObserverEntry {
  const rect = target.getBoundingClientRect();

  return {
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: rect,
    intersectionRect: rect,
    rootBounds: null,
    time: 0,
  };
}

class ControllableIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  private readonly record: IntersectionRecord;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.root = options?.root ?? null;
    this.rootMargin = options?.rootMargin ?? "0px";
    const threshold = options?.threshold ?? 0;
    this.thresholds = Array.isArray(threshold) ? threshold : [threshold];

    this.record = {
      callback,
      instance: this,
      observed: new Set<Element>(),
      observeCalls: [],
      unobserveCalls: [],
      disconnected: false,
    };

    intersectionRecords.push(this.record);
  }

  observe(target: Element) {
    this.record.observeCalls.push(target);
    this.record.observed.add(target);
  }

  unobserve(target: Element) {
    this.record.unobserveCalls.push(target);
    this.record.observed.delete(target);
  }

  disconnect() {
    this.record.disconnected = true;
    this.record.observed.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

vi.stubGlobal("IntersectionObserver", ControllableIntersectionObserver);

function activeRecordsObserving(target: Element): IntersectionRecord[] {
  return intersectionRecords.filter(
    (record) => !record.disconnected && record.observed.has(target),
  );
}

/** Signale au(x) observateur(s) concerné(s) que l'élément entre ou sort du viewport. */
export function notifyIntersection(target: Element, isIntersecting: boolean) {
  activeRecordsObserving(target).forEach((record) => {
    record.callback([buildEntry(target, isIntersecting)], record.instance);
  });
}

/** Même chose, mais en un seul lot d'entrées par observateur. */
export function notifyIntersections(
  targets: readonly Element[],
  isIntersecting: boolean,
) {
  intersectionRecords
    .filter((record) => !record.disconnected)
    .forEach((record) => {
      const entries = targets
        .filter((target) => record.observed.has(target))
        .map((target) => buildEntry(target, isIntersecting));

      if (entries.length > 0) {
        record.callback(entries, record.instance);
      }
    });
}

export function observeCountFor(target: Element): number {
  return intersectionRecords.reduce(
    (total, record) =>
      total + record.observeCalls.filter((element) => element === target).length,
    0,
  );
}

export function unobserveCountFor(target: Element): number {
  return intersectionRecords.reduce(
    (total, record) =>
      total +
      record.unobserveCalls.filter((element) => element === target).length,
    0,
  );
}

afterEach(() => {
  cleanup();
  mediaPreferences.clear();
  mediaListeners.clear();
  intersectionRecords.length = 0;
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.className = "";
  vi.restoreAllMocks();
});
