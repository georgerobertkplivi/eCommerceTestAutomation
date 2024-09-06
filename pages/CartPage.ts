import {expect, Page} from '@playwright/test';
import { config } from '../config';
import {Product, ProductDetails} from "../utils/Product";

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async getCartItemCount() {
        return await this.page.$$eval(config.selectors.cart.shoppingItem, items => items.length);
    }

    async removeProduct(productName: string) {
        await this.page.click(`text=${productName}`);
        await this.page.click(config.selectors.cart.addToCart);
    }

    async goToCheckout() {
        await this.page.click(config.selectors.cart.shoppingCart);
        await expect(this.page.locator(config.selectors.cart.title)).toBeVisible();
        await this.page.click(config.selectors.checkout.checkOutButton);
    }

    async proceedToCheckout() {
        await this.page.click(config.selectors.cart.checkoutButton);
    }

    async verifyCartTitle() {
        await expect(this.page.locator(config.selectors.cart.title)).toBeVisible();
    }

    async verifyCartItems(products: Product[]) {
        for (const product of products) {
            const expectedProductDetails = ProductDetails[product];
            await expect(this.page.locator(config.selectors.product.inventoryItemName)).toContainText(expectedProductDetails.name);
            await expect(this.page.locator(config.selectors.product.inventoryItemPrice)).toContainText(expectedProductDetails.price);
        }
    }

    async goBackToProducts() {
        await this.page.click(config.selectors.cart.backButton);
    }

    async removeProductFromCart(product: Product) {
        const expectedProductDetails = ProductDetails[product];

        // Locate the remove button for the specific product
        const removeButton = this.page.locator(`${config.selectors.cart.addToCart}-${expectedProductDetails.name.toLowerCase().replace(/\s/g, "-")}`);
        await removeButton.click();
    }
}
