import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductListingPage } from '../pages/ProductListingPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import { LoginPage } from '../pages/LoginPage';
import { ErrorPage } from '../pages/ErrorPage';
import { SubscriptionPage } from '../pages/SubscriptionPage';
import {Product} from "../utils/Product";
import {BillingInformation} from "../utils/BillingInformation";

test.describe('E-commerce Shop Tests', () => {
    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.goTo();
    });

    test('Login with valid credentials', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.login();
        expect(await page.url()).toContain('inventory.html');
    });

    test('Login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('invalid_user', 'invalid_pass');
        expect(await loginPage.getErrorMessage()).toContain('Username and password do not match');
    });

    test('User cannot log in with empty credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('', '');  // Empty fields
        await expect(page.locator('[data-test="error"]')).toContainText('Username is required');  // Check for appropriate error message
    });

    test('Locked-out user cannot log in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out');
    });

    test.only('Products are sorted by price low to high', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        await productListingPage.sortBy('Price (low to high)');
        const prices = await productListingPage.getProductPrices();  // Retrieve product prices
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);  // Check if prices are sorted correctly
    });

    test('Filter products by category', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        await productListingPage.goTo();
        await productListingPage.filterByCategory('T-Shirts');  // Example filter category
        const categories = await productListingPage.getProductCategories();  // Get product categories
        for (const category of categories) {
            expect(category).toContain('T-Shirts');  // Validate all displayed items are T-Shirts
        }
    });

    test('Remove all items from the cart', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        const cartPage = new CartPage(page);

        await productListingPage.addProductToCart(Product.SauceLabsBackpack);
        await productListingPage.addProductToCart(Product.SauceLabsBikeLight);
        await productListingPage.goToCart();
        await cartPage.removeAllItems();  // Function to remove all items
        await expect(cartPage.isEmptyCart()).toBeTruthy();  // Check if cart is empty
    });

    test('Update product quantity in cart', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        const cartPage = new CartPage(page);

        await productListingPage.addProductToCart(Product.SauceLabsBackpack);
        await productListingPage.goToCart();

        await cartPage.updateProductQuantity(Product.SauceLabsBackpack, 3);  // Set quantity to 3
        await expect(cartPage.getProductQuantity(Product.SauceLabsBackpack)).toEqual('3');
    });

    test('Cannot proceed to checkout with invalid details', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productListingPage.addProductToCart(Product.SauceLabsBackpack);
        await productListingPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInformation(BillingInformation);  // Leave fields empty
        await checkoutPage.continueCheckout();
        await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');  // Verify error message
    });

    test('Proceed to checkout with valid details', async ({ page }) => {
        const productListingPage = new ProductListingPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await productListingPage.addProductToCart(Product.SauceLabsBackpack);
        await productListingPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInformation(BillingInformation);
        await checkoutPage.continueCheckout();

        await expect(page.locator('[data-test="summary_value_label"]')).toBeVisible();  // Verify checkout summary is visible
    });

    test('Add product to cart and verify cart count', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.login();

        const productListingPage = new ProductListingPage(page);
        await productListingPage.addProductToCart(Product.SauceLabsBackpack);

        const cartPage = new CartPage(page);
        expect(await cartPage.getCartItemCount()).toBe(1);
    });

    test('Complete checkout process with complete billing data', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.login();

        const productListingPage = new ProductListingPage(page);
        await productListingPage.addProductToCart(Product.SauceLabsBackpack);

        const cartPage = new CartPage(page);
        await cartPage.goToCheckout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillRandomCustomerInformation();
        await checkoutPage.continueCheckout();

        // Verify checkout summary for Sauce Labs Backpack

        const productsToAdd = [
            Product.SauceLabsBackpack,
        ];
        // await checkoutPage.verifyCheckoutSummary(Product.SauceLabsBackpack);
        await checkoutPage.verifyCheckoutSummary(productsToAdd);

        await checkoutPage.finishCheckout();

        const orderConfirmationPage = new OrderConfirmationPage(page);
        expect(await orderConfirmationPage.getConfirmationMessage()).toContain('Thank you for your order!');
    });

    test('Add multiple products to cart and checkout', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.login();

        const productListingPage = new ProductListingPage(page);


        // Products to add to the cart
        const productsToAdd = [
            Product.SauceLabsBackpack,
            Product.SauceLabsBikeLight,
            Product.SauceLabsBoltTShirt
        ];

        // Add multiple products to cart
        for (const product of productsToAdd) {
            await productListingPage.addProductToCart(product);
        }

        // Verify the cart item count
        await productListingPage.verifyCartItemCount(productsToAdd.length.toString());



        const cartPage = new CartPage(page);

        // Go to the cart and verify details
        await productListingPage.goToCart();
        await cartPage.verifyCartTitle();

        await cartPage.goToCheckout();

        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillRandomCustomerInformation();
        await checkoutPage.continueCheckout();


        await checkoutPage.finishCheckout();

        const orderConfirmationPage = new OrderConfirmationPage(page);
        expect(await orderConfirmationPage.getConfirmationMessage()).toContain('Thank you for your order!');
    });

    test('Add multiple products to cart and remove one', async ({ page }) => {
            const homePage = new HomePage(page);
            const productListingPage = new ProductListingPage(page);
            const cartPage = new CartPage(page);

            // Navigate to the home page
            await homePage.goTo();
            await homePage.login();

            // Products to add to the cart
            const productsToAdd = [
                Product.SauceLabsBackpack,
                Product.SauceLabsBikeLight,
                Product.SauceLabsBoltTShirt
            ];

            // Add multiple products to the cart
            for (const product of productsToAdd) {
                await productListingPage.addProductToCart(product);
            }

            // Verify the cart item count
            await productListingPage.verifyCartItemCount(productsToAdd.length.toString());

            // Go to the cart and verify items
            await productListingPage.goToCart();
            await cartPage.verifyCartTitle();
            // await cartPage.verifyCartItems(productsToAdd);

            // Remove one product from the cart
            const productToRemove = Product.SauceLabsBikeLight;
            await cartPage.removeProductFromCart(productToRemove);

            // Verify the cart item count after removal
            const productsAfterRemoval = productsToAdd.filter(product => product !== productToRemove);
            await productListingPage.verifyCartItemCount(productsAfterRemoval.length.toString());

            // Verify the remaining products in the cart
            // await cartPage.verifyCartItems(productsAfterRemoval);

            // Optional: Go back to product listing
            await cartPage.goBackToProducts();
        });

    test('Subscribe to newsletter', async ({ page }) => {
        const subscriptionPage = new SubscriptionPage(page);
        await subscriptionPage.subscribeToNewsletter('test@example.com');
        expect(await subscriptionPage.getSuccessMessage()).toBe('You have successfully subscribed to the newsletter!');
    });

    test('Handle 500 error page', async ({ page }) => {
        const errorPage = new ErrorPage(page);
        await errorPage.goTo500Page();
        expect(await errorPage.getErrorMessage()).toContain('500 Internal Server Error');
    });
});
