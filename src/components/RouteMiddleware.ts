import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ROUTES = ["/", "/project", "/experience", "/skill", "/contact"];

function levenshtein(a: string, b: string) {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j] + 1,
              matrix[i][j - 1] + 1,
              matrix[i - 1][j - 1] + 1
            );
    }
  }
  return matrix[a.length][b.length];
}

const RouteMiddleware = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectedRef = useRef(false);

  useEffect(() => {
    if (redirectedRef.current) return;
    const current = location.pathname;
    if (ROUTES.includes(current)) return;

    let closest = "/";
    let minDist = 6;
    let foundByPrefix = false;
    for (const route of ROUTES) {
      const dist = levenshtein(current, route);
      if (
        (dist < minDist && dist <= 5) ||
        route.startsWith(current) ||
        current.startsWith(route)
      ) {
        minDist = dist;
        closest = route;
        if (route.startsWith(current) || current.startsWith(route)) {
          foundByPrefix = true;
        }
      }
    }

    if (
      closest !== "/" &&
      (minDist <= 5 || foundByPrefix) &&
      current !== closest
    ) {
      redirectedRef.current = true;
      toast.success("Page la plus proche trouvée, redirection effectuée.");
      navigate(closest, { replace: true });
    } else if (
      (closest === "/" || (!foundByPrefix && minDist > 5)) &&
      current !== "/"
    ) {
      redirectedRef.current = true;
      toast.error("Page non trouvée, retour à l'accueil.");
      navigate("/", { replace: true });
    }
  }, [location, navigate]);

  return null;
};

export default RouteMiddleware;
