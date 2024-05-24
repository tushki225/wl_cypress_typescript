import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    // To display small circular charts regarding test results
    charts: true,
    // Generate JSON file to create custom reports
    json: true,
    // Customize the directory in which reports are saved
    reportsDir: '',
    // Customize the report file name
    reportFilename: 'results',
    // Generate new report file or overwrite the a single file
    overwrite: true
  },
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          // Then to see the log messages in the terminal
          //   cy.task("log", "my message");
          console.log(message + "\n\n");
          return null;
        },
      });
    },
  },
});
