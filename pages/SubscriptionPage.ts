import { Page } from '@playwright/test';

export class SubscriptionPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async subscribeToNewsletter(email: string) {
        await this.page.fill('#newsletter-input', email);
        await this.page.click('text=Subscribe');
    }

    async getSuccessMessage() {
        return await this.page.textContent('.newsletter-success');
    }
}
