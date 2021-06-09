/// <reference types="Cypress"/>

const TAG_SELECTOR = '[data-testid="tag"]';

const addThreeTags = () => {
  cy.get('[name="tags"]')
    .type('robustness')
    .type('{enter}')
    .type('cleverness')
    .type('{enter}')
    .type('eloquence')
    .type('{enter}');
};

describe('Tags', () => {
  beforeEach(() => {
    cy.visit('/addplayer');
  });

  it('should render an input field', () => {
    cy.get('[name="tags"]').should('be.visible');
  });

  it('should generate a new tag if the users presses enter', () => {
    cy.get('[name="tags"]').type('nice haircut').type('{enter}');
    cy.get(TAG_SELECTOR).should('have.length', 1);
  });

  it('should generate three tags if the user presses enter three times', () => {
    addThreeTags();
    cy.get(TAG_SELECTOR).should('have.length', 3);
  });

  it('should delete the last tag if the user presses the left arrow key', () => {
    addThreeTags();
    cy.get('[name="tags"]').type('{backspace}');
    cy.get(TAG_SELECTOR).should('have.length', 2);
  });

  it('should select the first tag if users presses the right arrow key', () => {
    addThreeTags();
    cy.get('[name="tags"]').type('{rightarrow}');
    cy.get(TAG_SELECTOR).first().should('contain', 'ROBUSTNESS');
  });
});
