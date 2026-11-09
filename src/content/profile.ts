/** Informations d'identité et de contact, partagées par le hero et la section Contact. */
export const profile = {
  name: "Thomas Caron",
  email: "caronthomas27@gmail.com",
  phone: { label: "07 83 52 37 85", href: "tel:+33783523785" },
  location: "Mont-Saint-Aignan (Rouen)",
  mapsUrl: "https://www.google.com/maps?q=Mont-Saint-Aignan",
  linkedInUrl: "https://www.linkedin.com/in/thomas-caron27/",
  gitHubUrl: "https://github.com/ThoomassC",
  /** Intitulé officiel du Bac +6 visé au CESI, à reprendre tel quel. */
  nextStep:
    "Je souhaite poursuivre en Mastère Spécialisé® Manager de Portefeuille de Projets – Transition Numérique au CESI (Bac +6).",
  /** Recherche d'alternance pour le Mastère, affichée en tête du hero. */
  seeking: "Je recherche une alternance à partir d’octobre 2027",
  portrait: {
    /** Portrait détouré du hero : l'image y est seule et porte l'identité, d'où une
        alternative descriptive. Ailleurs, à côté du nom, elle devrait rester vide. */
    cutout: {
      src: "/assets/portrait-thomas-caron-cutout-v3.webp",
      width: 1086,
      height: 1448,
      alt: "Thomas Caron, souriant, en chemise bleu marine.",
    },
  },
  cv: {
    href: "/assets/CV-Thomas-Caron-Chef-de-projet-SI-v2.pdf",
    fileName: "CV-Thomas-Caron-Chef-de-projet-SI.pdf",
    /** 113 340 octets, soit 113 Ko au sens SI (1 Ko = 1000 octets). */
    size: "113 Ko",
    label: "Télécharger mon CV (PDF, 113 Ko)",
  },
} as const;
