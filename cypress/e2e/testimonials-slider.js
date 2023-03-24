/// <reference types="cypress"/>

describe("Check testimonials slider", () => {
  const testimonials = [];

  it("slides should have corresponding content and styles", () => {
    cy.visit("/");
    cy.get("#testimonialsidebar").find("ul.slides").children("li").as("slides");
    cy.get("@slides").should("have.length", 6);
    cy.get("@slides").each((slide) => {
      cy.wrap(slide)
        .should("have.attr", "style")
        .and("contain", "float: left; display: block;");
      cy.wrap(slide)
        .find(".pull-left")
        .should("have.css", "color", "rgb(0, 161, 203)");
      let curTestimonial = slide.text();
      testimonials.push(curTestimonial);
    });
  });
  it("find clones clones in the slider", () => {
    cy.visit("/");
    const unique = [...new Set(testimonials)];
    if (testimonials.length === unique.length) {
      cy.log("There are no duplicate slides in the slider");
    } else {
      cy.log(
        `There are ${
          testimonials.length - unique.length
        } duplicate slides in the slider`
      );
    }
    cy.get("li.clone").should(
      "have.length",
      testimonials.length - unique.length
    );
  });
  it.only("check slider controls", () => {
    cy.visit("/");
    cy.get("ol.flex-control-paging > li > a").should("have.length", 4);
    cy.get("ol.flex-control-paging > li > a").eq(0).as("dot");
    cy.get("@dot")
      .click()
      .then(() => {
        cy.get("@dot").should("have.class", "flex-active");
      });
  });
});
