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

Cypress.Commands.add("hover", (element) => {
  cy.get(element).trigger("mouseover");
});

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

Cypress.Commands.add("createAccount", (user) => {
  const randNumber = Math.floor(Math.random() * 11000);
  const randEmail = randNumber + user.email;
  const randLogin = randNumber + user.login;

  cy.get("#AccountFrm_firstname").type(user.firstName);
  cy.get("#AccountFrm_lastname").type(user.lastName);
  cy.get("#AccountFrm_email").type(randEmail);
  cy.get("#AccountFrm_address_1").type(user.address);
  cy.get("#AccountFrm_city").type(user.city);
  cy.get("#AccountFrm_country_id").select(user.country);
  cy.get("#AccountFrm_postcode").type(user.zip);
  cy.get("#AccountFrm_zone_id").select(user.state);
  cy.get("#AccountFrm_loginname").type(randLogin);
  cy.get("#AccountFrm_password").type(user.password);
  cy.get("#AccountFrm_confirm").type(user.password);
  cy.get("#AccountFrm_newsletter0").check();
  cy.get("#AccountFrm_agree").check();
  cy.get("button[title='Continue']").click();
});

Cypress.Commands.add("loginCommand", (login, password) => {
  cy.visit("/index.php?rt=account/login");
  cy.get("#loginFrm_loginname").type(login);
  cy.get("#loginFrm_password").type(password);
  cy.get("button[title='Login']").click();
});

Cypress.Commands.add("selectBrandByNumber", (number) => {
  cy.get("#brandcarousal").children("li").eq(number).find("a").click();
});
Cypress.Commands.add("selectBrandByName", (brandName) => {
  cy.get(`img.internal[alt='${brandName}']`).click();
});
