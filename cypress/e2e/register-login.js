/// <reference types="cypress"/>

describe.skip("Register and log in with valid data", function () {
  before(function () {
    cy.fixture("newUser").then(function (data) {
      globalThis.data = data;
    });

    cy.wrap("wpeters").as("curLogin");
  });

  beforeEach(function () {
    cy.visit("/");
  });

  it("Register with valid data", function () {
    cy.get("#customer_menu_top").find("a").click();
    cy.get("button[title='Continue']").click();

    cy.intercept("POST", "**/index.php?rt=account/create").as("registerReq");

    cy.createAccount(data.validUser);

    cy.wait("@registerReq").its("response.statusCode").should("eq", 302);
    cy.url().should("contain", "rt=account/success");
    cy.get(".heading1 > .maintext").should(
      "contain",
      "Your Account Has Been Created!"
    );
    cy.get("ul.breadcrumb").children("li").eq(2).should("contain", "Success");
    cy.get("#customer_menu_top a.menu_account").should(
      "contain",
      data.validUser.firstName
    );
    cy.get("ul.side_account_list").children("li").eq(2).find("a").click();
    cy.get("fieldset")
      .children("div.form-group ")
      .eq(0)
      .find("div")
      .then(function (login) {
        this.curLogin = login.text();
        expect(this.curLogin).to.contain(data.validUser.login);
        cy.log(this.curLogin);
      });
  });
  it("Login with valid data", function () {
    cy.log(this.curLogin);

    cy.intercept("POST", "**/index.php?rt=account/login").as("loginReq");

    cy.loginCommand(data.existingUser2.login, data.existingUser2.password);

    cy.wait("@loginReq").its("response.statusCode").should("eq", 302);
    cy.url().should("contain", "rt=account/account");
    cy.get(".heading1 > .maintext").should("contain", "My Account");
    cy.get("span.subtext").should("have.text", data.existingUser.firstName);
  });
});

describe("Try to register and login with invalid data", () => {
  before(function () {
    cy.fixture("newUser").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.visit("/");
    cy.get("#customer_menu_top").find("a").click();
  });

  it("User should not be able to register with invalid email", () => {
    cy.get("button[title='Continue']").click();

    cy.intercept("POST", "**/index.php?rt=account/create").as("registerReq");

    cy.createAccount(data.invalidUser);

    cy.wait("@registerReq").its("response.statusCode").should("eq", 200);
    cy.url().should("contain", "rt=account/create");
    cy.get("div.alert-danger").should(
      "contain",
      "Email Address does not appear to be valid!"
    );
    cy.get("label.control-label")
      .contains("E-Mail")
      .should("have.css", "color", "rgb(169, 68, 66)");
    cy.get("span.help-block")
      .eq(2)
      .should("contain", "Email Address does not appear to be valid!");
  });

  it("User should not be able to login with invalid password", () => {
    cy.loginCommand(data.existingUser.login, data.existingUser.wrongPassword);
    cy.url().should("contain", "rt=account/login");
    cy.get("div.alert-danger").should(
      "contain",
      "Error: Incorrect login or password provided."
    );
  });
});
