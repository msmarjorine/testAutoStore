/// <reference types="cypress"/>

describe("Alias and Invoke", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Validate a specific haircare product", () => {
    cy.get('ul.categorymenu li a[href*="product/category&path="]')
      .contains("Hair Care")
      .click();
    cy.get("div.fixed_wrapper .prdocutname")
      .eq(0)
      .invoke("text")
      .as("productThumbnail");
    cy.get("@productThumbnail").its("length").should("be.gt", 5);
    cy.get("@productThumbnail").should("include", "Seaweed");
  });

  it("Validate the number of products on the homepage", () => {
    cy.get("div.thumbnail").its("length").as("productsNumber");
    cy.get("@productsNumber").should("eq", 16);
    cy.get("a.productcart").eq(0).invoke("attr", "title").as("cartText");
    cy.get("@cartText").should("equal", "Add to Cart");
  });

  it("Validate the header", () => {
    cy.get("div.navbar-collapse").as("header");
    cy.get("@header").should("be.visible");
    cy.get("@header").should("have.css", "border-color", "rgb(16, 16, 16)");
    cy.get("div.navbar-right").as("headerLinks");
    cy.get("@headerLinks").children("div").should("have.length", 4);
    cy.get("img[alt='Automation Test Store']").as("logo");
    cy.get("@logo").should("have.attr", "title", "Automation Test Store");
  });

  it("Calculate total of normal and sale products", () => {
    cy.get("div.thumbnail").as("productThumbnail");
    cy.get("div.thumbnail").find(".oneprice").invoke("text").as("itemPrice");
    cy.get("div.thumbnail")
      .find(".pricenew")
      .invoke("text")
      .as("itemSalePrice");

    let itemsTotal = 0;
    cy.get("@itemPrice").then((linkText) => {
      let itemsPriceTotal = 0;
      let itemPrice = linkText.split("$");
      for (let i = 0; i < itemPrice.length; i++) {
        itemsPriceTotal += Number(itemPrice[i]);
      }
      cy.log("Total of full price products: " + itemsPriceTotal);
      itemsTotal += itemsPriceTotal;
    });
    cy.get("@itemSalePrice")
      .then((linkText) => {
        let itemsSalePriceTotal = 0;
        let itemSalePrice = linkText.split("$");
        for (let i = 0; i < itemSalePrice.length; i++) {
          itemsSalePriceTotal += Number(itemSalePrice[i]);
        }
        itemsTotal += itemsSalePriceTotal;
        cy.log("Total of sale price products: " + itemsSalePriceTotal);
      })
      .then(() => {
        cy.log("The price of all products together: " + itemsTotal);
        expect(itemsTotal).to.equal(639.49); //this sum changes all the time
      });
  });
});
