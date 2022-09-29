import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const pathAlias = [
  { alias: "@", path: "src/" },
  { alias: "@components", path: "src/components" },
  { alias: "@animations", path: "src/animation" },
  { alias: "@styles", path: "src/styles" },
  { alias: "@front", path: "src/front" },
  { alias: "@views", path: "src/views" },
  { alias: "@hooks", path: "src/hooks" },
  { alias: "@ui", path: "src/ui" },
  { alias: "@layout", path: "src/layout" },
  { alias: "@utils", path: "src/utils" },
  { alias: "@dashboard", path: "src/Dashboard" },
  { alias: "@services", path: "src/services" },
  { alias: "@helper", path: "src/_helper" },
  { alias: "@config", path: "src/config" },
  { alias: "@db", path: "src/db" },
  { alias: "@context", path: "src/context" },
  { alias: "@assets", path: "src/assets" },
  { alias: "@media", path: "src/media" },
];

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: (() => {
      const paths = {};
      pathAlias.forEach(
        (curr) => (paths[curr.alias] = `${__dirname}/${curr.path}`)
      );
      return paths;
    })(),
  },
});
