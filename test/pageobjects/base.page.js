export default class BasePage {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open(path) {
        return browser.url(path);
    }

    /**
     * Wait for element to be displayed
     * @param {Object} element WebdriverIO element
     * @param {Number} timeout Timeout in milliseconds
     */
    async waitForDisplayed(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Click element with wait
     * @param {Object} element WebdriverIO element
     */
    async clickElement(element) {
        await this.waitForDisplayed(element);
        await element.click();
    }
} 