import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("GENERATE_SOURCE_MAP", env.GENERATE_SOURCE_MAP === "true");
  return {
    build: {
      outDir: "build",
      sourcemap: env.GENERATE_SOURCE_MAP === "true",
    },
    plugins: [react(), svgr(), eslint()],
  };
});
