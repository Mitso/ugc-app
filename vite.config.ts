import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenvx from '@dotenvx/dotenvx'
import path from "path";

dotenvx.config();
export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(), 
    tsconfigPaths()
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      '@': path.resolve(__dirname, './app'),
    },
  },
});