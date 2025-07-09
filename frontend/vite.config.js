import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // listen on all interfaces
    allowedHosts: [".trycloudflare.com"], // allow
    proxy: {
      "/api": "http://localhost:2200", // Proxy API requests to the backend server
    },
  },
  preview: {
    /* needed if you ever run `vite preview` */
    allowedHosts: [".trycloudflare.com"],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [react(), tailwindcss()],
});
