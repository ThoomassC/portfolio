# Portfolio — Thomas Caron

Portfolio personnel de développeur logiciel full-stack et QA, en React 19 et TypeScript.
La version **3.0.0** adopte une direction « Obsidian », inspirée du template
[Dark Photo Portfolio de Lovable](https://lovable.dev/templates/websites/portfolio/obsidian-template) :
page sombre et cinématographique, nom géant posé sur un portrait en noir et blanc,
titres condensés, listes à filets fins, grain de film, navigation verticale qui suit
la section lue et apparitions au défilement.

Le thème sombre est la référence : fond `#0A0A0A`, texte `#FAFAFA`, corps `#A3A3A3`,
filets `#262626`. Le thème clair en est l'inverse monochrome (`#F5F5F4`, `#0A0A0A`,
`#3F3F46`). Le thème suit la préférence du système, puis le choix mémorisé. La mise
en couleur sera retravaillée élément par élément.

Le parcours, les missions, les formations, les compétences, les projets, les passions
et les coordonnées restent centralisés dans `src/content`.

## Développement

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
npm run build       # TypeScript puis build de production
npm run lint        # ESLint et règles jsx-a11y strictes
npm test            # Vitest : contenu, navigation, thèmes, contrastes et animations
```

Une page, des ancres et aucun routeur. Les badges de technologies et de statuts utilisent
**@thomascaron/opale**, conservé depuis le travail d'intégration précédent. La navigation
est native pour adapter les six entrées au menu mobile.

## Assets et typographie

- **Anton** est servie localement, avec `font-display: swap` et un préchargement.
  Sa licence SIL Open Font License est dans `public/assets/fonts/OFL-Anton.txt`.
- Le texte courant utilise Helvetica ou la police sans-serif disponible sur l'appareil.
- Le portrait original reste dans `public/assets/portrait-thomas-caron.jpg`.
  Une copie détourée se trouve dans `public/assets/portrait-thomas-caron-cutout-v2.webp`.
  Elle a été produite avec l'outil intégré `imagegen`, puis optimisée en WebP avec
  préservation de la transparence pour le chargement du hero.
  Instruction : retirer uniquement le fond, conserver l'identité, le visage, la pose,
  les vêtements et les couleurs, obtenir une transparence réelle sans ombre ni ajout.
- Le grain de film est une texture SVG en `data:` URI, masquée en contraste renforcé
  et en couleurs forcées.
- Les favicons portent une version dans leur nom (`favicon-v2.*`) : `vercel.json` sert
  `/assets/*` en cache `immutable`, un logo changé sous le même nom resterait l'ancien
  dans les navigateurs. Incrémenter la version à chaque nouveau logo.

## Accessibilité

Le site conserve le lien d'évitement, les landmarks, un unique titre de niveau 1,
les dates structurées et les noms de sections. Le menu se ferme avec Échap, restitue
le focus au bouton et se ferme à la sélection d'une ancre ou au clic extérieur.

Les thèmes clair et sombre suivent le système, puis le choix mémorisé de l'utilisateur.
Les contrastes du texte, des statuts, des contrôles et du focus sont mesurés dans les
tests à partir du CSS livré. Les préférences de réduction des mouvements, de contraste
renforcé et de couleurs forcées sont prises en compte. Les contenus déjà révélés restent
visibles quand on remonte la page.

Ces vérifications ne constituent pas un audit de conformité RGAA. Le CV PDF demeure
une limite connue et est en cours de remise en accessibilité.

## Git Flow et publication

La refonte est préparée sur **`codex/feature/portfolio-v2`**, créée depuis `develop`.
Le travail Opale précédemment non validé a été sauvegardé dans un stash nommé
« Sauvegarde du travail Opale avant refonte portfolio v2 » et repris dans cette branche.

La branche persistante **`recette`** est créée depuis `develop`. Les nouvelles versions
y sont fusionnées pour validation, puis publiées exclusivement depuis cette branche.

La recette possède son propre projet Vercel **`thomasca-portfolio-recette`**, dans le scope
`thoomas27s-projects`, et son URL :
[thomasca-portfolio-recette.vercel.app](https://thomasca-portfolio-recette.vercel.app/).
Les previews des autres branches y sont désactivées. Le build `npm run build:recette`
refuse toute branche différente de `recette`.

```bash
git switch recette
git merge --no-ff codex/feature/portfolio-v2
git push origin recette
npm run deploy:recette
```

Pour les versions suivantes, remplacer le nom de la branche de fonctionnalité dans
la commande de merge. `recette` reste la branche et l'URL de validation.
La commande `deploy:recette` vérifie la branche, l'absence de modifications non
committées et l'égalité du commit courant avec `origin/recette`. Elle cible explicitement
le projet Vercel de recette, indépendamment du lien local `.vercel`.

L’aperçu des liens utilise `public/assets/og-portrait-cobalt-v1.jpg` (1200 × 630).
Les métadonnées HTML prennent leur domaine dans `VITE_SITE_URL` : `.env` pour la
production et `.env.recette` pour la recette. Le build de recette sélectionne
automatiquement le mode Vite `recette`. Ces fichiers ne contiennent aucun secret.

**La fusion vers `develop`/`main`, la création de la release et le déploiement en production
attendent toujours le go explicite de Thomas.** La branche `main` pilote la production Vercel.

Site de production : [thomasca-portfolio.vercel.app](https://thomasca-portfolio.vercel.app/).
