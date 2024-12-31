import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";

// Create a function to load fonts
const loadFonts = async () => {
  await document.fonts.ready;
  createRoot(document.getElementById("root")!).render(<App />);
};

// Load fonts before rendering
loadFonts();