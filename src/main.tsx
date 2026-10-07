import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import BuildView from "./pages/BuildView";
import CriticalAlarm from "./pages/CriticalAlarm";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/components.css";

// Two prototype flows: default = "Building a view", #alarm = "Critical alarm arrives"
function App() {
  const [hash, setHash] = useState(location.hash);
  useEffect(() => {
    const onHash = () => setHash(location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash === "#alarm" ? <CriticalAlarm /> : <BuildView />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
