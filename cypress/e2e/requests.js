/// <reference types="cypress"/>

describe("Check different requests and responses", () => {
  it("verifies GET request", () => {
    cy.request("GET", "/").as("getRequest");
    cy.get("@getRequest").then((response) => {
      expect(response.status).to.eql(200);
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
      expect(response.headers.server).to.eql("LiteSpeed");
    });
  });
  it("verifies POST request", () => {
    cy.request({
      method: "POST",
      url: "/index.php?rt=content/contact&form_id=2",
      body: {
        first_name: "Butters",
        email: "butters@stotch.sp",
        enquiry: "My enquiry to you, my favorite store",
      },
    }).as("postRequest");
    cy.get("@postRequest").then((response) => {
      cy.log(response);
      expect(response.status).to.eql(200);
      expect(response).to.have.property("headers");
    });
  });
  it("verifies request to Not Found page", () => {
    cy.request({
      method: "GET",
      url: "/cordiceps",
      failOnStatusCode: false,
    }).as("notFound");
    cy.get("@notFound").then((response) => {
      expect(response.status).to.eql(404);
      expect(response.statusText).to.eq("Not Found");
      expect(response).to.have.property("headers");
      expect(response).to.have.property("duration");
      expect(response.headers.server).to.eql("LiteSpeed");
    });
  });
});
