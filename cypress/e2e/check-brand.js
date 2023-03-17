/// <reference types="cypress"/>

describe("Review products by brand", () => {
  it("Select the brand and review the products", function () {
    cy.visit("/");
    cy.selectBrandByNumber(2);
    cy.url().should("contain", "product/manufacturer");
    cy.get(".heading1 > .maintext").then(function (brandname) {
      const brandName = brandname.text();
      cy.log(`The selected brand name is ${brandName}`);
      cy.title().should("contain", brandName);
    });
    cy.go("back");
    cy.selectBrandByName("Lancôme");
    cy.url().should("contain", "product/manufacturer");
    cy.get(".heading1 > .maintext").then(function (brandname) {
      const brandName = brandname.text();
      cy.log(`The selected brand name is ${brandName}`);
      cy.title().should("contain", brandName);
    });
  });
});
