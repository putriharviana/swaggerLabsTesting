describe ("Sauce Demo Test Cases", () => {
    it("Flow valid user", () => {
        cy.visit("http://www.saucedemo.com/");
        
        const username = cy.get("input[data-test='username']");
        username.type("standard_user");

        const password = cy.get("input[data-test='password']");
        password.type("secret_sauce");

        const buttonLogin = cy.get("input[data-test='login-button']");
        buttonLogin.click();

        const loopingButtonCart = [
            {
                nameButton: "backpack"
            },
            {
                nameButton: "bike-light"
            },
            {
                nameButton: "bolt-t-shirt"
            },
        ];

        loopingButtonCart.forEach(({nameButton})=> {
            const buttonAddtoCart = cy.get("button[data-test='add-to-cart-sauce-labs-"+`${nameButton}`+"']");
            buttonAddtoCart.click();
        })

        const numberOfObjects = loopingButtonCart.length;
        
        const badgeCart = cy.get("span[data-test='shopping-cart-badge']").should('have.text', numberOfObjects);

        const cartPages = cy.get("div[id='shopping_cart_container']");
        cartPages.click();

        //checking item products in cart pages same with added items in dashboard
        const expectedNameItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt']
        const checkingNameItems = cy.get("div[data-test='inventory-item-name']").then($els => [...$els].map(el => el.innerText))
        checkingNameItems.should('deep.eq', expectedNameItems);

        const buttonCheckOut = cy.get("button[data-test='checkout']");
        buttonCheckOut.click();

        const firstName = cy.get("input[data-test='firstName']");
        firstName.should('have.text', '');
        firstName.type("Testing");

        const lastName = cy.get("input[data-test='lastName']");
        lastName.should('have.text', '');
        lastName.type("123");

        const postalCode = cy.get("input[data-test='postalCode']");
        postalCode.should('have.text', '');
        postalCode.type("123456");
        
        const buttonContinue = cy.get("input[data-test='continue']");
        buttonContinue.click();

        cy.wait(2000);
        // checking item products in cart pages same with previously checkout item
        checkingNameItems.should('deep.eq', expectedNameItems);

        const buttonFinish = cy.get("button[data-test='finish']");
        buttonFinish.click();

        const completeOrder = cy.get("h2[data-test='complete-header']")
        completeOrder.should('have.text', "Thank you for your order!");

        const buttonHome = cy.get("button[data-test='back-to-products']");
        buttonHome.click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    })
})