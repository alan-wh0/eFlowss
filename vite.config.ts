import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
  proxy: {
    '/api': {
      target: 'https://eservices.app.n8n.cloud/webhook-test', // URL del servidor al que deseas hacer proxy
      secure: false, 
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''), // quita /api del inicio
    },
  },
},

});
