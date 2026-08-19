# Portfolio — Thomas Caron

Portfolio personnel présentant mon parcours de développeur logiciel full-stack et QA.
Single-page en React 19 et TypeScript, avec un thème clair/sombre et une attention portée
à l'accessibilité (RGAA 4.1.2 / WCAG 2.2 AA).

**En ligne :** https://portfolio-omega-umber-81.vercel.app

## Choix techniques

Site statique volontairement sobre en dépendances : **React 19**, **Vite** et
**@tabler/icons-react** en production, rien d'autre. Pas de framework CSS, pas de routeur —
la page est unique et navigue par ancres, donc un routeur n'apporterait qu'un poids inutile.

La typographie s'appuie sur `system-ui` plutôt que sur une police téléchargée : c'est un
choix assumé, qui évite 100 Ko de police et un décalage de rendu au chargement.

## Accessibilité

L'accessibilité est traitée comme une contrainte de développement, pas comme une option :

- structure sémantique (`header` / `main` / `footer`, sections nommées, timeline en `ol`) ;
- navigation complète au clavier, lien d'évitement fonctionnel, focus visible garanti sur
  tous les fonds ;
- contrastes vérifiés par échantillonnage des pixels du rendu réel, dans les deux thèmes et
  à plusieurs largeurs de viewport — pas seulement par calcul théorique ;
- respect de `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast` et
  `forced-colors` ;
- `eslint-plugin-jsx-a11y` en configuration `strict` dans la CI de lint.

## Développement

```bash
npm install
npm run dev          # serveur de développement
npm run build        # vérification des types puis build de production
npm run lint         # ESLint, dont les règles jsx-a11y strictes
npm test             # Vitest
npm run test:watch   # Vitest en mode watch
npm run coverage     # couverture
```

## Mise en ligne

Déploiement continu via **Vercel** sur la branche principale.
