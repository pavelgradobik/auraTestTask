import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'd5ihra',
  e2e: {
    baseUrl: 'https://en.wikipedia.org/',
    requestTimeout: 10000,
    responseTimeout: 10000,
    defaultCommandTimeout: 5000,
    pageLoadTimeout: 10000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: 'mochawesome',
    experimentalOriginDependencies: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
