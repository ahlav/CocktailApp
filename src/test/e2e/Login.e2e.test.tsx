import React from 'react';
import {e2eBase} from "./base/e2eBase";

describe("Login e2e test", () => {
    let testBase: e2eBase;

    beforeEach(async () => {
        testBase = new e2eBase();
        await testBase.openBrowser();
    });

    afterEach(async () => {
        await testBase.closeBrowser();
    });

    test("Should display Cocktail view after successful login", async () => {
        await testBase.goToHomePage();
        await testBase.addTextToInput("#username", "admin");
        await testBase.addTextToInput("#password", "admin");
        await testBase.clickButton("#btn-submit");
        await testBase.dashboardPageIsVisible();

        // Make sure session token persists after refresh
        await testBase.refreshPage();
        await testBase.dashboardPageIsVisible();
    });

    test("Should not display Cocktail view after unsuccessful login", async () => {
        await testBase.goToHomePage();
        await testBase.addTextToInput("#username", "user");
        await testBase.addTextToInput("#password", "user");
        await testBase.clickButton("#btn-submit");
        await testBase.loginPageIsVisible();
        await testBase.errorNotificationWithTextIsShown("Wrong credentials");
    });
});
