import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import packageJson from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/CCC-Tool-2/",
  define: {
    "import.meta.env.APP_VERSION": JSON.stringify(packageJson.version),
  },
});
