// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("visitStoreContactpage", () => {
  cy.get(".info_links_footer > li > a").contains("Contact Us").click();
});

Cypress.Commands.add("clickOnHairProducts", () => {
  cy.get('ul.categorymenu li a[href*="product/category&path="]')
    .contains("Hair Care")
    .click();
});

Cypress.Commands.add("makeSearchRequest", (request) => {
  cy.get("#filter_keyword").type(request).type("{enter}");
});

Cypress.Commands.add("submitTheForm", (name, email, enquiry) => {
  cy.get("#ContactUsFrm_first_name").type(name);
  cy.get("#ContactUsFrm_email").type(email);
  cy.get("#ContactUsFrm_enquiry").type(enquiry);
  cy.get('button[title="Submit"]').click();
});

Cypress.Commands.add("selectProduct", (productName) => {
  cy.get("div.fixed_wrapper .prdocutname").each((el) => {
    if (el.text().includes(productName)) cy.wrap(el).click();
  });
});

/* Cypress.Commands.add("addProductToBasket", (productName) => {
  cy.get("div.fixed_wrapper .prdocutname").each(($el, index, $list) => {
    if ($el.text() === productName) {
      cy.log($el.text());
      cy.get(".productcart").eq(index).click();
    }
  });
}); */

Cypress.Commands.add("addProductToBasket", (productName) => {
  cy.get("div.fixed_wrapper .prdocutname").each((el, i) => {
    if (el.text() === productName) cy.get(".productcart").eq(i).click();
  });
});
