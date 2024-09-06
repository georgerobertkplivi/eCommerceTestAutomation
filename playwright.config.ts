// @ts-ignore
import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
    // ...
    projects: [
        {
            name: "Chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "Firefox",
            use: { ...devices["Desktop Firefox"] },
        },
    ],

    reporter: [["line"], ["allure-playwright"]],
});