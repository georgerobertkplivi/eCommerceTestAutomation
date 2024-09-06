export enum Product {
    SauceLabsBackpack = 'Sauce Labs Backpack',
    SauceLabsBikeLight = 'Sauce Labs Bike Light',
    SauceLabsBoltTShirt = 'Sauce Labs Bolt T-Shirt',
    SauceLabsFleeceJacket = 'Sauce Labs Fleece Jacket',
    SauceLabsOnesie = 'Sauce Labs Onesie',
    TestAllTheThingsTShirt = 'Test.allTheThings() T-Shirt (Red)',
}

export const ProductDetails = {
    [Product.SauceLabsBackpack]: {
        name: 'Sauce Labs Backpack',
        price: '$29.99',
        quantity: '1',
        tax: '$2.40',
        total: '$32.39',
    },
    [Product.SauceLabsBikeLight]: {
        name: 'Sauce Labs Bike Light',
        price: '$9.99',
        quantity: '1',
        tax: '$0.80',
        total: '$10.79',
    },
    [Product.SauceLabsBoltTShirt]: {
        name: 'Sauce Labs Bolt T-Shirt',
        price: '$15.99',
        quantity: '1',
        tax: '$1.28',
        total: '$17.27',
    },
    [Product.SauceLabsFleeceJacket]: {
        name: 'Sauce Labs Fleece Jacket',
        price: '$49.99',
        quantity: '1',
        tax: '$4.00',
        total: '$53.99',
    },
    [Product.SauceLabsOnesie]: {
        name: 'Sauce Labs Onesie',
        price: '$7.99',
        quantity: '1',
        tax: '$0.64',
        total: '$8.63',
    },
    [Product.TestAllTheThingsTShirt]: {
        name: 'Test.allTheThings() T-Shirt (Red)',
        price: '$15.99',
        quantity: '1',
        tax: '$1.28',
        total: '$17.27',
    },
};
