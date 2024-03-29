import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import jsconfigPaths from "vite-jsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    port: "3005",
    proxy: {
      "/socket.io": {
        target: "ws://localhost:3005",
        ws: false,
      },
    },
  },
});
