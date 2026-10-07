import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LiveView from "./pages/LiveView";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/components.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LiveView />
  </StrictMode>,
);
