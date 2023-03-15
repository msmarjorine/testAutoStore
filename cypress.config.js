const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
