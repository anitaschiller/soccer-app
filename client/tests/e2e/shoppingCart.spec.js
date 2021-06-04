/// <reference types="Cypress"/>

const SERVER_URL = 'http://localhost:4000';

describe('ShoppingCart', () => {
  beforeEach(() => {
    cy.request(SERVER_URL + '/prune-database');
    cy.fixture('clubOne').then((club) =>
      cy.request('POST', SERVER_URL + '/clubs', club)
    );
    cy.fixture('clubTwo').then((club) =>
      cy.request('POST', SERVER_URL + '/clubs', club)
    );
    cy.fixture('playerOne').then((player) =>
      cy.request('POST', SERVER_URL + '/players', player)
    );
    cy.fixture('playerTwo').then((player) =>
      cy.request('POST', SERVER_URL + '/players', player)
    );
  });
  it('should create a shopping cart for the selected football club', () => {
    cy.visit('/');
    cy.get('[data-testid="club-selection"]').click();
    cy.get('header ul li').first().click();
    cy.get('main article button').first().click();
    cy.get('main article button').eq(1).click();
    cy.get('[href="/cart"]').should('contain', '2 items');
    cy.get('[href="/cart"]').click();
    cy.get('[data-testid="saved-player"]').should('have.length', 2);
  });
  it('should show a total of the players prices as "sum total"', () => {
    cy.visit('/');
    cy.get('[data-testid="club-selection"]').click();
    cy.get('header ul li').first().click();
    cy.get('main article button').first().click();
    cy.get('main article button').eq(1).click();
    cy.get('[href="/cart"]').should('contain', '2 items');
    cy.get('[href="/cart"]').click();
    cy.get('tfoot').should('contain', '50.000');
  });
});
