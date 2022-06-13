import React from 'react';
import {e2eBase} from "./base/e2eBase";

describe("Dashboard e2e test", () => {
    let testBase: e2eBase;

    beforeEach(async () => {
        testBase = new e2eBase();
        await testBase.openBrowser();
        await testBase.loginIntoApp();
    });

    afterEach(async () => {
        await testBase.closeBrowser();
    });

    test("Should show cocktail list view when choosing categories", async () => {
        await testBase.dashboardPageIsVisible();
        await testBase.waitUntilPageIsLoaded();
        await testBase.clickButton("#Cocoa");
        await testBase.waitUntilPageIsLoaded();
        await testBase.elementTextEquals("Chocolate Drink");
        await testBase.clickButton("#Beer");
        await testBase.waitUntilPageIsLoaded();
        await testBase.elementTextEquals("Black and Brown");
    });

    test("Should show cocktail details when clicked on expand icon", async () => {
        await testBase.dashboardPageIsVisible();
        await testBase.waitUntilPageIsLoaded();

        // See glass type
        await testBase.clickButton("#expand-btn-16419");
        await testBase.waitUntilPageIsLoaded();
        await testBase.elementTextEquals("Highball glass");

        // See instructions
        await testBase.clickButton("#expand-btn-14588");
        await testBase.waitUntilPageIsLoaded();
        await testBase.elementTextEquals("Combine all ingredients. Blend until smooth. Garnish with chocolate shavings if desired.");
    });

});
