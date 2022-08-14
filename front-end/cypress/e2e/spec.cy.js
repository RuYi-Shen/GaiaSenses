import { faker } from "@faker-js/faker";

const URL = "http://localhost:3000";
const SERVER_URL = "http://localhost:5000";

beforeEach(() => {
  cy.visit(URL);
});


afterEach(() => {
  cy.wait(500);
});
