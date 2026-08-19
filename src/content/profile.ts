/** Informations d'identité et de contact, partagées par le hero et la section Contact. */
export const profile = {
  name: "Thomas Caron",
  email: "caronthomas27@gmail.com",
  phone: { label: "07 83 52 37 85", href: "tel:+33783523785" },
  location: "Mont-Saint-Aignan, France",
  mapsUrl: "https://www.google.com/maps?q=Mont-Saint-Aignan",
  linkedInUrl: "https://www.linkedin.com/in/thomas-caron27/",
  gitHubUrl: "https://github.com/ThoomassC",
  cv: {
    href: "/assets/CV-Thomas-Caron-Developpeur-Full-Stack-QA.pdf",
    fileName: "CV-Thomas-Caron-Developpeur-Full-Stack-QA.pdf",
    /** 104 040 octets, soit 104 Ko au sens SI (1 Ko = 1000 octets). */
    label: "Télécharger mon CV (PDF, 104 Ko)",
  },
} as const;
