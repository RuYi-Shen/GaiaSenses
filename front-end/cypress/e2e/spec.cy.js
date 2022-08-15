import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";
const SERVER_URL = "http://localhost:5000";

beforeEach(() => {
  cy.visit(URL);
});

describe("Authentication", () => {
  it("should register with valid credentials", () => {
    cy.get("a[href='/register']").click();
    cy.url().should("equal", `${URL}/register`);

    cy.get("#name").type(faker.name.fullName());
    cy.get("#email").type(faker.internet.email());
    const password = faker.internet.password();
    cy.get("#password").type(password);
    cy.get("#passwordConfirmation").type(password);

    cy.intercept("POST", "/auth/signup").as("signUp");
    cy.get("button").click();
    cy.wait("@signUp");
    //cy.get("@signUp").should( "have.property", "status", 200);
    cy.url().should("equal", `${URL}/`);
  });
  it("should login with valid credentials", () => {
    cy.get("#email").type("ruyishen2012@gmail.com");
    cy.get("#password").type("shen1234");

    cy.intercept("POST", "/auth/signin").as("signIn");
    cy.intercept("GET", "https://api.openweathermap.org/data/2.5/weather?").as("getWeather");
    cy.get("button").click();
    cy.wait("@signIn");
    //cy.wait(5000);
    //cy.get("@signIn").should( "have.property", "status", 200);
    //cy.wait("@getWeather");
    cy.url().should("equal", `${URL}/feed`);
  });
});

describe("Pages Navigation", () => {
  it("should go to discover page", () => {
    cy.get("#email").type("ruyishen2012@gmail.com");
    cy.get("#password").type("shen1234");

    cy.intercept("POST", "/auth/signin").as("signIn");
    cy.get("button").click();
    cy.wait("@signIn");
    cy.url().should("equal", `${URL}/feed`);
    cy.get("#discover").click();
    cy.url().should("equal", `${URL}/discover`);
  });
  it("should go to favorite page", () => {
    cy.get("#email").type("ruyishen2012@gmail.com");
    cy.get("#password").type("shen1234");

    cy.intercept("POST", "/auth/signin").as("signIn");
    cy.get("button").click();
    cy.wait("@signIn");
    cy.url().should("equal", `${URL}/feed`);
    cy.get("#favorite").click();
    cy.url().should("equal", `${URL}/favorite`);
  });
  it("should go to profile page", () => {
    cy.get("#email").type("ruyishen2012@gmail.com");
    cy.get("#password").type("shen1234");

    cy.intercept("POST", "/auth/signin").as("signIn");
    cy.get("button").click();
    cy.wait("@signIn");
    cy.url().should("equal", `${URL}/feed`);
    cy.get("#profile").click();
    cy.url().should("equal", `${URL}/profile`);
  });
  it("should go to create page", () => {
    cy.get("#email").type("ruyishen2012@gmail.com");
    cy.get("#password").type("shen1234");

    cy.intercept("POST", "/auth/signin").as("signIn");
    cy.get("button").click();
    cy.wait("@signIn");
    cy.url().should("equal", `${URL}/feed`);
    cy.get("#create").click();
    cy.url().should("equal", `${URL}/create`);
  });
});

afterEach(() => {
  cy.wait(500);
});
