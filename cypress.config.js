// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports', // Diretório de saída
    overwrite: false,
    html: true,
    json: true,
    reportFilename: '[name]-report',
  },
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
     responseTimeout: 15000,    
     
    setupNodeEvents(on, config) {
      // implementa event listeners aqui, se necessário
    },
  },
});