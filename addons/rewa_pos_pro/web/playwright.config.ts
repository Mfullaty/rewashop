import { defineConfig } from "@playwright/test";
export default defineConfig({
    testDir: "./tests/browser",
    workers: 1,
    fullyParallel: false,
    timeout: 30000,
    use: {
        baseURL: process.env.POS_WEB_TEST_URL || "http://127.0.0.1:8123",
        viewport: { width: 1366, height: 768 },
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
        launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
            ? {
                  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
                  args: [
                      "--no-sandbox",
                      "--disable-dev-shm-usage",
                      "--use-gl=angle",
                      "--use-angle=swiftshader",
                      "--no-zygote",
                  ],
              }
            : {},
    },
});
