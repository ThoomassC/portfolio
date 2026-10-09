import { spawnSync } from "node:child_process";

const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.PORTFOLIO_DEPLOY_BRANCH;

if (branch !== "recette") {
  console.error("Build de recette refusé : seule la branche recette peut être publiée.");
  process.exit(1);
}

const result = spawnSync("npm", ["run", "build"], { stdio: "inherit" });
if (result.error) {
  console.error(result.error.message);
}
process.exit(result.status ?? 1);
