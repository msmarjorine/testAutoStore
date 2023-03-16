/// <reference types="cypress"/>

describe("Search functionality", () => {
  before(() => {
    cy.fixture("search-request").then((data) => {
      globalThis.data = data;
    });
  });

  beforeEach(() => {
    cy.visit("/");
  });
  it("Check the search dropdown", () => {
    cy.get("#search-category").should("have.css", "display", "none");
    cy.get("#filter_keyword").click();
    cy.get("#search-category").should("have.css", "display", "block");
    cy.get("#category_selected").should("have.text", "All Categories");
    cy.get("#filter_keyword")
      .type("pro")
      .then(() => {
        cy.get("#category_43").click();
        cy.get("#category_selected").should("have.text", "Skincare");
        cy.get("#filter_keyword").type("{enter}");
        cy.url().should("contain", "/search&keyword=pro&category_id=0,43");
      });
  });
  it("Make a valid search request", () => {
    const requests = data.validRequest;
    const randInd = Math.floor(Math.random() * requests.length);
    const request = requests[randInd];
    cy.makeSearchRequest(request);
    cy.get("span.bgnone").contains(request);
    cy.get("#product_details").should("be.visible");
  });
  it("Make an invalid search request", () => {
    cy.makeSearchRequest(data.invalidRequest);
    cy.get("div.contentpanel").children("div").contains("There is no product");
    cy.get("#product_details").should("not.exist");
  });
});
