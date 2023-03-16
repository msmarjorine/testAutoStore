/// <reference types="cypress"/>

describe("Check the Contact Us page", () => {
  Cypress.config("defaultCommandTimeout", 20000);

  before(function () {
    cy.fixture("userDetails").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.visitStoreContactpage();
  });

  it("Should open the Contact Us page and submit the form with valid data", () => {
    cy.submitTheForm(data.first_name, data.email, data.enquiry);
    cy.url().should("contain", "contact/success");
    cy.get("div.contentpanel").should(
      "contain",
      "Your enquiry has been successfully sent to the store owner!"
    );
  });
  it("Should not be able to submit the form with invalid email", () => {
    cy.submitTheForm(data.first_name, "test_email", data.enquiry);
    cy.url().should("not.contain", "contact/success");
    cy.get(".help-block .has-error").should(
      "have.text",
      " E-Mail Address does not appear to be valid!"
    );
  });
});
