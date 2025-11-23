import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "SwiftWeather",
        short_name: "SwiftWeather",
        description: "A modern, beautiful weather application",
        theme_color: "#667eea",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23667eea" width="192" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" fill="white" font-family="system-ui">⛅</text></svg>',
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%23667eea" width="512" height="512"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="300" fill="white" font-family="system-ui">⛅</text></svg>',
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><rect fill="%23667eea" width="192" height="192"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100" fill="white" font-family="system-ui">⛅</text></svg>',
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "maskable",
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="%23667eea" width="512" height="512"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="300" fill="white" font-family="system-ui">⛅</text></svg>',
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea"/><stop offset="100%" style="stop-color:%234facfe"/></linearGradient></defs><rect fill="url(%23grad)" width="540" height="720"/><text x="270" y="360" dominant-baseline="middle" text-anchor="middle" font-size="200" fill="white" font-family="system-ui">⛅</text></svg>',
            sizes: "540x720",
            type: "image/svg+xml",
            form_factor: "narrow",
          },
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea"/><stop offset="100%" style="stop-color:%234facfe"/></linearGradient></defs><rect fill="url(%23grad)" width="1280" height="720"/><text x="640" y="360" dominant-baseline="middle" text-anchor="middle" font-size="200" fill="white" font-family="system-ui">⛅</text></svg>',
            sizes: "1280x720",
            type: "image/svg+xml",
            form_factor: "wide",
          },
        ],
        categories: ["weather", "productivity"],
        screenshots_display: "browser",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,txt,woff,woff2}"],
        cleanupOutdatedCaches: true,
        navigateFallback: "index.html",
      },
    }),
  ],
});
