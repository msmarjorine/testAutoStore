/// <reference types="cypress"/>

//Login AND register currently do not work for some reason, can't verify the checkout
describe("Login, add products to the cart and checkout", () => {
  before(() => {
    cy.fixture("newUser").then(function (data) {
      globalThis.data = data;
    });
  });

  it("User should be able to add products to their cart", () => {
    //check later if works
    //cy.loginCommand(data.existingUser2.login, data.existingUser2.password);

    cy.visit("/");

    //go to the homepage
    cy.get("a.logo").click();
    cy.get("a[title='Total Moisture Facial Cream']").click();
    cy.get("a.cart").click();
    //go to the homepage
    cy.get("a.logo").click();
    cy.get("a[title='Benefit Bella Bamba']").click();
    cy.get("a.cart").click();
    //check the cart page
    cy.url().should("contain", "rt=checkout/cart");
    cy.get("h1.heading1 > span.maintext").should("contain", "Shopping Cart");
    cy.get("table.table-bordered")
      .eq(0)
      .find("tr")
      .its("length")
      .should("eq", 3);

    /* cy.get("#cart_checkout2").click();
    //check the checkout page
    cy.url().should("contain", "rt=checkout/confirm");
    cy.get("h1.heading1 > span.maintext").should(
      "contain",
      "Checkout Confirmation"
    );

    cy.get("#checkout_btn").click();
    //check the confirmation page
    cy.url().should("contain", "rt=checkout/success");
    cy.get("h1.heading1 > span.maintext").should(
      "contain",
      "Your Order Has Been Processed!"
    ); */
  });
});
