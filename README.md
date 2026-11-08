# Portfolio — Thomas Caron

Site personnel en React 19, TypeScript et Vite : une seule page, sans routeur.

- Prod : [thomasca-portfolio.vercel.app](https://thomasca-portfolio.vercel.app/)
- Recette : [thomasca-portfolio-recette.vercel.app](https://thomasca-portfolio-recette.vercel.app/)

## Lancer

```bash
npm install
npm run dev     # http://localhost:5173
npm test        # Vitest
npm run lint    # ESLint + jsx-a11y
npm run build   # tsc puis build de production
```

## Modifier le contenu

Tout le texte est dans `src/content` (profil, parcours, formations, compétences,
projets, passions, navigation). Les styles et couleurs sont dans `src/index.css`.

## Publier

`feature/*` → `develop` → `recette` → `main`.

```bash
git switch recette && git merge --no-ff develop && git push
npm run deploy:recette   # vérifie branche, arbre propre et commit poussé
```

La production se publie depuis `main`. `VITE_SITE_URL` vient de `.env` (prod) ou
`.env.recette` (recette).

## À savoir

- `/assets/*` est servi en cache immuable : un fichier modifié doit changer de nom
  (`favicon-v2`, `og-portrait-marine-v1`, `projects/*-v1`…).
- Les contrastes des couleurs sont testés dans `src/index.css.test.ts`.
- Police Anton servie en local, licence dans `public/assets/fonts/OFL-Anton.txt`.
