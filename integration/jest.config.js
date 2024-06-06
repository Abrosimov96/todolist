module.export = {
    preset: "jest-puppeteer",
    testRegex: "./*.test.js$",
    setupFilesAfterEnv: ["./setupTests.js"],
}
