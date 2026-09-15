import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@thomascaron/ui/tokens.css";
import "@thomascaron/ui/ui.css";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
