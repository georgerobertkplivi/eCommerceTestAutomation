import {expect, Page} from '@playwright/test';
import {config} from "../config";

export class OrderConfirmationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getConfirmationMessage() {
        return await this.page.textContent('.complete-header');
    }

    async verifyOrderCompletion() {
        await expect(this.page.locator(config.selectors.checkout.completeHeader)).toContainText('Thank you for your order!');
        await expect(this.page.locator(config.selectors.checkout.backToProductsButton)).toBeVisible();
    }

    async verifyOrderTitle() {
        await expect(this.page.locator(config.selectors.cart.title)).toBeVisible();
    }
}
