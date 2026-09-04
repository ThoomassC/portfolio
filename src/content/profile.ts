/** Informations d'identité et de contact, partagées par le hero et la section Contact. */
export const profile = {
  name: "Thomas Caron",
  email: "caronthomas27@gmail.com",
  phone: { label: "07 83 52 37 85", href: "tel:+33783523785" },
  location: "Mont-Saint-Aignan, France",
  mapsUrl: "https://www.google.com/maps?q=Mont-Saint-Aignan",
  linkedInUrl: "https://www.linkedin.com/in/thomas-caron27/",
  gitHubUrl: "https://github.com/ThoomassC",
  portrait: {
    src: "/assets/portrait-thomas-caron.jpg",
    width: 900,
    height: 1200,
    /** Alternative descriptive POUR LE HERO, où l'image est seule et porte l'identité
        à elle seule. Dans un contexte qui affiche déjà le nom à côté d'elle — l'en-tête,
        voir SiteHeader.tsx — l'équivalent textuel est donc déjà fourni et l'alternative
        doit être VIDE : WCAG 1.1.1 proscrit le doublon, et une alternative descriptive y
        ferait annoncer « Thomas Caron Thomas Caron, souriant, en chemise… ». Une même
        image peut recevoir des alternatives différentes selon son contexte. */
    alt: "Thomas Caron, souriant, en chemise bleu marine sur fond clair.",
  },
  cv: {
    href: "/assets/CV-Thomas-Caron-Developpeur-Full-Stack-QA.pdf",
    fileName: "CV-Thomas-Caron-Developpeur-Full-Stack-QA.pdf",
    /** 104 040 octets, soit 104 Ko au sens SI (1 Ko = 1000 octets). */
    label: "Télécharger mon CV (PDF, 104 Ko)",
  },
} as const;
