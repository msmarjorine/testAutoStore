/// <reference types="cypress"/>

describe("Opening the individual product page", () => {
  it("Should open the product page", () => {
    cy.visit("/");
    cy.title().should("eq", "A place to practice your automation skills!");
    cy.get("section.slider").should("be.visible");
    cy.get("a.prdocutname").contains("Eye Precious").click();
    cy.get("h1.productname span").should(
      "have.text",
      "Absolue Eye Precious Cells"
    );
  });
  it("Should verify the product picture", () => {
    cy.visit("/index.php?rt=product/product&product_id=86");
    cy.get('div.hidden-xs img[src*="product36"]').should(
      "have.css",
      "width",
      "380px"
    );
  });
  it("Should add the product to the cart", () => {
    cy.visit("/index.php?rt=product/product&product_id=86");
    cy.get("ul.productpagecart a.cart").click();
    cy.url().should("contain", "?rt=checkout/cart");
    cy.title().should("equal", "Shopping Cart");
    cy.get("#cart_checkout1").should("be.visible");
    cy.get("#cart_checkout1").should(
      "have.css",
      "background-color",
      "rgb(242, 92, 39)"
    );
    cy.get('img[alt="Automation Test Store"]').click();
  });
  it("Should open the product using find command", () => {
    cy.visit("/");
    cy.get(".fixed_wrapper").find(".prdocutname").eq(4).click();
    cy.get("h1.productname span").should(
      "have.text",
      "Absolute Anti-Age Spot Replenishing Unifying TreatmentSPF 15"
    );
    cy.get("ul.productpagecart a.cart").click();
    cy.get('img[alt="Automation Test Store"]').click();
  });
  it("Should open the page with then command", () => {
    cy.visit("/");
    cy.get("a.prdocutname")
      .contains("Benefit Bella Bamba")
      .click()
      .then((itemHeaderText) =>
        cy.log("Selected the following item: " + itemHeaderText.text())
      );
    cy.get(".productfilneprice").should("contain.text", "$28.00");
  });
});
