export const config = {
    baseUrl: 'https://www.saucedemo.com',
    credentials: {
        standardUser: 'standard_user',
        lockedOutUser: 'locked_out_user',
        problemUser: 'problem_user',
        performanceGlitchUser: 'performance_glitch_user',
        errorUser: 'error_user',
        visualUser: 'visual_user',
        password: 'secret_sauce'
    },
    selectors: {
        login: {
            username: '#user-name',
            password: '#password',
            loginButton: '#login-button'
        },
        cart: {
            shoppingCart: '.shopping_cart_link',
            addToCart: '#add-to-cart',
            shoppingItem: '.shopping_cart_badge',
            cartTitle: '.title',
            title: '[data-test="title"]',
            checkoutButton: '[data-test="checkout"]',
            backButton: '#back-to-products',

        },
        product: {
            shoppingCartLink: '[data-test="shopping-cart-link"]',
            shoppingCartBadge: '[data-test="shopping-cart-badge"]',
            inventoryItemName: '[data-test="inventory-item-name"]',
            inventoryItemPrice: '[data-test="inventory-item-price"]',
        },
        checkout: {
            firstName: '#first-name',
            lastName: '#last-name',
            postalCode: '#postal-code',
            checkOutButton: '#checkout',
            continueShoppingButton: '#continue-shopping',
            continueButton: '#continue',
            cancelButton: '#cancel',
            finishButton: '#finish',
            // firstName: '[data-test="firstName"]',
            // lastName: '[data-test="lastName"]',
            // postalCode: '[data-test="postalCode"]',
            // continueButton: '[data-test="continue"]',
            itemQuantity: '[data-test="item-quantity"]',
            subtotalLabel: '[data-test="subtotal-label"]',
            taxLabel: '[data-test="tax-label"]',
            totalLabel: '[data-test="total-label"]',
            // finishButton: '[data-test="finish"]',
            completeHeader: '[data-test="complete-header"]',
            backToProductsButton: '[data-test="back-to-products"]',
        },
        checkoutOverview: {
            productName: '.inventory_item_name',
            productPrice: '.inventory_item_price',
            productQuantity: '.cart_quantity',
            productSubTotal: '.summary_subtotal_label',
            productTaxes: '.summary_tax_label',
            totalPrice: '.summary_total_label',
            itemQuantity: '[data-test="item-quantity"]',
            subtotalLabel: '[data-test="subtotal-label"]',
            taxLabel: '[data-test="tax-label"]',
            totalLabel: '[data-test="total-label"]',
            finishButton: '[data-test="finish"]',
            completeHeader: '[data-test="complete-header"]',
            backToProductsButton: '[data-test="back-to-products"]',
        },
        common: {
            errorMessage: '.error-message-container'
        }
    }
};
