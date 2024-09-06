import {expect, Page} from '@playwright/test';
import { config } from '../config';
import { BillingInformation } from '../utils/BillingInformation';
import {Product, ProductDetails} from '../utils/Product';
// @ts-ignore
import { faker } from '@faker-js/faker';

export class CheckoutPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillCustomerInformation(billingInfo: Record<BillingInformation, string>) {
        await this.page.fill(config.selectors.checkout.firstName, billingInfo[BillingInformation.FirstName]);
        await this.page.fill(config.selectors.checkout.lastName, billingInfo[BillingInformation.LastName]);
        await this.page.fill(config.selectors.checkout.postalCode, billingInfo[BillingInformation.PostalCode]);
    }

    async fillRandomCustomerInformation() {
        const billingInfo = {
            [BillingInformation.FirstName]: faker.person.firstName(),
            [BillingInformation.LastName]: faker.person.lastName(),
            [BillingInformation.PostalCode]: faker.location.zipCode()
        };
        await this.fillCustomerInformation(billingInfo);
    }

    async continueCheckout() {
        await this.page.click(config.selectors.checkout.continueButton);
    }

    async verifyCheckoutSummary(products: Product[]) {
        for (const product of products) {
            const expectedProductDetails = ProductDetails[product];

            await expect(this.page.locator(config.selectors.checkout.itemQuantity)).toContainText(expectedProductDetails.quantity);
            await expect(this.page.locator(config.selectors.product.inventoryItemName)).toContainText(expectedProductDetails.name);
            await expect(this.page.locator(config.selectors.product.inventoryItemPrice)).toContainText(expectedProductDetails.price);
        }

        const totalAmount = products.reduce((sum, product) => {
            const details = ProductDetails[product];
            return sum + parseFloat(details.total.slice(1)); // Remove '$' and convert to float
        }, 0);

        await expect(this.page.locator(config.selectors.checkout.totalLabel)).toContainText(`Total: $${totalAmount.toFixed(2)}`);
    }

    async finishCheckout() {
        await this.page.click(config.selectors.checkout.finishButton);
    }
}
