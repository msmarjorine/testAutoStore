/// <reference types="cypress"/>

describe("Verify variables, cypress commands and jquery commands", () => {
  it.skip("Navigating to pages with variables", () => {
    //the following will fail
    cy.visit("/");
    const makeupLink = cy
      .get('ul.categorymenu li a[href*="product/category&path="]')
      .contains("Makeup");
    const skincareLink = cy
      .get('ul.categorymenu li a[href*="product/category&path="]')
      .contains("Skincare");
    makeupLink.click();
    skincareLink.click();
  });

  it("Navigating to pages without using variables", () => {
    //the following will pass
    cy.visit("/");
    cy.get('ul.categorymenu li a[href*="product/category&path="]')
      .contains("Makeup")
      .click();
    cy.get('ul.categorymenu li a[href*="product/category&path="]')
      .contains("Skincare")
      .click();
  });

  it("Navigate to Makeuplink and verify the header", () => {
    cy.visit("/");
    cy.get('ul.categorymenu li a[href*="product/category&path="]')
      .contains("Makeup")
      .click();

    //the following will fail
    //const header = cy.get('h1.heading1 span.maintext')
    //cy.log(header.text())

    cy.get("h1.heading1 span.maintext").then(($headerText) => {
      const headerText = $headerText.text();
      cy.log("Found header text: " + headerText);
      expect(headerText).is.eq("Makeup");
    });
  });

  it("Validate properties of the Contact Us page", () => {
    cy.visit("/index.php?rt=content/contact");

    //Uses cypress commands and chaining
    cy.contains("#ContactUsFrm", "Contact Us Form")
      .find("#field_11")
      .should("contain", "First name:");

    //jQuery approach
    cy.contains("#ContactUsFrm", "Contact Us Form").then((text) => {
      const firstNameText = text.find("#field_11").text();
      expect(firstNameText).to.contain("First name");
    });

    //Embedded commands (closure)
    cy.get("#field_11").then((fnText) => {
      cy.log(fnText.text());
      cy.log(fnText);
    });
  });

  it.only("Validate properties of the image", () => {
    cy.visit("/index.php?rt=content/content&content_id=3");

    cy.get("i.fa-list").then((catalogPic) => {
      const catalog = catalogPic;
      expect(catalog).to.have.css("display", "inline-block");
      expect(catalog).to.be.visible;
    });
  });
});
