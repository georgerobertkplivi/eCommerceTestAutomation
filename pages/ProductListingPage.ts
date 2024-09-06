import {expect, Page} from '@playwright/test';
import { Product } from '../utils/Product';
import { config } from '../config';
import {CartPage} from "./CartPage";

// @ts-ignore
export class ProductListingPage extends CartPage{
    private page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    async addProductToCart(product: Product) {
        await this.page.click(`text=${product}`);
        await this.page.click('text=Add to cart');
        await this.goBackToProducts()
    }


    async goToCart() {
        await this.page.click(config.selectors.product.shoppingCartLink);
    }

    async verifyCartItemCount(expectedCount: string) {
        await this.page.waitForSelector(config.selectors.product.shoppingCartBadge);
        await expect(this.page.locator(config.selectors.product.shoppingCartBadge)).toContainText(expectedCount);
    }

    

    //todo Refactor this to be dynamic
    async verifyCartDetails() {
        await expect(this.page.locator(config.selectors.product.inventoryItemName)).toContainText('Sauce Labs Backpack');
        await expect(this.page.locator(config.selectors.product.inventoryItemPrice)).toContainText('$29.99');
    }
}

