import { Page } from '@playwright/test';
import { config } from '../config';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async login(username: string, password: string) {
        await this.page.fill(config.selectors.login.username, username);
        await this.page.fill(config.selectors.login.password, password);
        await this.page.click(config.selectors.login.loginButton);
    }

    async getErrorMessage() {
        return await this.page.textContent(config.selectors.common.errorMessage);
    }
}
