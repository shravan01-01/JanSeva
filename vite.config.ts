import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // If you host on GitHub Pages under a repo (username.github.io/repo-name)
  // set the base to the repo name. Change '/janseva-portal/' to your repo if different.
  base: process.env.VITE_BASE || (mode === "production" ? "/JanSeva/" : "/"),

  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
