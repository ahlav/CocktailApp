import puppeteer, {Browser, ElementHandle, Page} from "puppeteer";

export class e2eBase {
    url: string;
    browser: Browser | undefined;
    page: Page | undefined;

    constructor() {
        jest.setTimeout(30000);
        this.browser = undefined;
        this.page = undefined;
        this.url = "http://localhost:3000";
    }

    async openBrowser() {
        this.browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            args: ["--start-maximized", "--no-sandbox"]
        });
        this.page = (await this.browser.pages())[0];
        await this.page.setDefaultNavigationTimeout(30000);
    }

    async goToHomePage() {
        await this.page?.goto(this.url);
    }

    async closeBrowser() {
        await this.browser?.close();
    }

    async loginIntoApp() {
        await this.goToHomePage();
        await this.addTextToInput("#username", "admin");
        await this.addTextToInput("#password", "admin");
        await this.clickButton("#btn-submit");
    }

    async clickButton(selector: string) {
        await this.page?.waitForSelector(selector);
        const button: HTMLElement = await this.page?.$(selector) as unknown as HTMLElement;
        if (button) {
            await button.click()
        }
    }

    async addTextToInput(selector: string, text: string) {
        const inputEl = await this.page?.waitForSelector(selector);
        if (inputEl) {
            await this.page?.evaluate((element) => (element.value = ""), inputEl);
            await this.page?.focus(selector);
            await this.page?.keyboard.type(text);
        }
    }

    async dashboardPageIsVisible() {
        await this.page?.waitForSelector("#Cocktail");
    }

    async loginPageIsVisible() {
        await this.page?.waitForSelector("#password");
    }

    async refreshPage() {
        await this.page?.evaluate(() => {
            location.reload();
        });
        await this.dashboardPageIsVisible();
    }

    async errorNotificationWithTextIsShown(text: string) {
        await this.page?.waitForSelector("#alert-error");
        const innerHtml = await this.page?.$eval("#alert-error", (element) => element.textContent);
        expect(text).toEqual(innerHtml);
    }

    async elementTextEquals(name: string) {
        let text;
        const elementsWithText = await this.page?.$x(`//span[text()="${name}"]`);
        if (elementsWithText && elementsWithText.length > 0) {
            text = await e2eBase.getProperty(elementsWithText[0], 'textContent');
        }
        expect(text).toEqual(name);
    }

    private static async getProperty(element: ElementHandle, property: string): Promise<string> {
        return await (await element.getProperty(property)).jsonValue();
    }

    async waitUntilPageIsLoaded() {
        await this.page?.waitForTimeout(1000)
    }
}

