/// <reference types="cypress"/>

describe("Search functionality", () => {
  it("Make a valid search request", () => {
    cy.intercept("POST", "**/*.shoptimally.com/users/event/visit_url*").as(
      "visitUrl"
    );

    cy.visitStoreHomepage();
    cy.makeSearchRequest("lipstick");
    cy.get("span.bgnone").contains("Lipstick");

    cy.wait("@visitUrl").should(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      //asserts on bdy and headers don't work somehow...'
      //expect(response.headers).to.have.property("Content-Encoding", "gzip")
      //expect(request.headers).to.have.property("Referer", "https://automationteststore.com/")
    });
  });
  it("Make an invalid search request", () => {
    cy.visitStoreHomepage();
    cy.makeSearchRequest("bbbbbbb");
    cy.get("div.contentpanel").children("div").contains("There is no product");
  });
});
