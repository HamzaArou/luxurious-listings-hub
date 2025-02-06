import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

// Import fonts asynchronously
const loadFonts = async () => {
  await Promise.all([
    import("@fontsource/ibm-plex-sans-arabic/400.css"),
    import("@fontsource/ibm-plex-sans-arabic/500.css"),
    import("@fontsource/ibm-plex-sans-arabic/700.css")
  ]);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Create a function to initialize the app
const initializeApp = async () => {
  // Load fonts first
  await loadFonts();
  
  // Wait for document fonts to be ready
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  
  const root = document.getElementById("root");
  if (!root) throw new Error("Root element not found");
  
  createRoot(root).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

// Initialize the app and catch any errors
initializeApp().catch(console.error);