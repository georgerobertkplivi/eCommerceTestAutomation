import { Page } from '@playwright/test';
import { config } from '../config';

export class HomePage {
  private page: Page;
  private selectors = config.selectors.login;

  constructor(page: Page) {
    this.page = page;
  }

  async goTo() {
    await this.page.goto(config.baseUrl);
  }

  async login(username: string = config.credentials.standardUser, password: string = config.credentials.password) {
    await this.page.fill(this.selectors.username, username);
    await this.page.fill(this.selectors.password, password);
    await this.page.click(this.selectors.loginButton);
  }
}
