import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Cambia si usas otro puerto para tu frontend
    chromeWebSecurity: false, // Desactiva restricciones del navegador
    viewportWidth: 1280, // Tamaño estándar del navegador
    viewportHeight: 720,
    defaultCommandTimeout: 10000, // Tiempo de espera para comandos
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
