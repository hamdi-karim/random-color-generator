/// <reference types="cypress" />

/* eslint-disable testing-library/await-async-utils */
describe("tests the homescreen of the color generator app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("front page can be opened and contains Generate Palettte Button", function () {
    cy.contains("Generate Color Palette");
  });

  it("displays Light Mode by default", () => {
    cy.contains("Light Mode");
  });

  it("displays 8 Rows for color Palettes by default", () => {
    cy.get("[data-cy='colorPaletteRow']").should("exist");
    cy.get("[data-cy='colorPaletteRow']").should("have.length", 8);
  });

  it("generates new 8 random colors", () => {
    cy.get("[data-cy='generateColorsButton']").should("exist");
    cy.get("[data-cy='generateColorsButton']").click();

    cy.get("[data-cy='colorPaletteRow']").should("exist");
    cy.get("[data-cy='colorPaletteRow']").should("have.length", 8);
  });

  it("shoud set the primary color when user clicks button", () => {
    cy.get("[data-testid='setPrimaryButton']").eq(1).click();
    cy.contains("User History");
    cy.contains("Primary Color");
  });

  it("should be able to unlike a Color", () => {
    cy.get("[data-testid='likeButton']").eq(0).click().wait(1000).click();
  });

  it("display LIKED text when user likes a color", () => {
    cy.get("[data-testid='likeButton']").eq(2).click();

    cy.contains("LIKED");
  });
});
