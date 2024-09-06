import { Page } from '@playwright/test';
import { config } from '../config';

export class ErrorPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getErrorMessage() {
        return await this.page.textContent('.error-message-container');
    }

    async goTo500Page() {
        await this.page.goto(config.baseUrl + '/500.html');
    }
}
