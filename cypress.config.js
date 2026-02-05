/* eslint-disable */
import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4173',
    projectId: "8e9uf9",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});