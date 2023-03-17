/// <reference types="cypress"/>

describe.skip("Login and add products to the cart", () => {
  before(() => {
    cy.fixture("newUser").then(function (data) {
      globalThis.data = data;
    });
  });

  it("User should be able to add products to their cart", () => {
    cy.visit("/index.php?rt=account/login");
    cy.loginCommand(data.existingUser.login, data.existingUser.password);
    cy.wait(2000);
  });
});
