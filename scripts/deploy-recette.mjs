import { execFileSync, spawnSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const refuse = (message) => {
  console.error(`Déploiement de recette refusé : ${message}`);
  process.exit(1);
};

const branch = git("branch", "--show-current");
if (branch !== "recette") {
  refuse("place-toi sur la branche recette.");
}
if (git("status", "--porcelain")) {
  refuse("committe ou sauvegarde les modifications avant de publier.");
}

const commit = git("rev-parse", "HEAD");
const remoteCommit = git("ls-remote", "--heads", "origin", "refs/heads/recette").split(/\s+/)[0];
if (remoteCommit !== commit) {
  refuse("pousse le commit courant sur origin/recette avant de publier.");
}

const result = spawnSync(
  "npx",
  [
    "--yes",
    "vercel@62.2.0",
    "deploy",
    "--prod",
    "--project",
    "thomasca-portfolio-recette",
    "--scope",
    "thoomas27s-projects",
    "--build-env",
    `PORTFOLIO_DEPLOY_BRANCH=${branch}`,
    "--meta",
    `githubCommitRef=${branch}`,
    "--meta",
    `githubCommitSha=${commit}`,
    "--yes",
  ],
  { stdio: "inherit" }
);
if (result.error) {
  console.error(result.error.message);
}
process.exit(result.status ?? 1);
