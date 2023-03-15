/// <reference types="cypress"/>

describe("Add multiple items to the basket", () => {
  before(function () {
    cy.fixture("hair-products").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visitStoreHomepage();
    cy.clickOnHairProducts();
  });

  it("Add specific items to the basket", () => {
    cy.addProductToBasket();
  });
});
