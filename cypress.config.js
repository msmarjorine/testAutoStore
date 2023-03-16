const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "cyw1mg",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.automationteststore.com/",
    specPattern: "cypress/e2e/*.js",
    viewportWidth: 1366,
    viewportHeight: 768,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    videoUploadOnPasses: false,
  },
});

//record Key for Cypress Cloud
// f9720f03-bce2-4f16-a35d-43517c9d696b
