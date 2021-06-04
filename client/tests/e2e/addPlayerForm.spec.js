/// <reference types="Cypress"/>

const SERVER_URL = 'http://localhost:4000';

describe('PlayerForm', () => {
  beforeEach(() => {
    cy.request(SERVER_URL + '/prune-database');
    cy.fixture('clubTwo').then((club) =>
      cy.request('POST', SERVER_URL + '/clubs', club)
    );
    cy.visit('/');
  });
  it('should render the headline', () => {
    cy.get('[href="/addplayer"]').click();
    cy.get('form h2').contains('Add a new player');
  });
  it('should fill in the form properly', () => {
    const player = {
      name: 'Cristiano Ronaldo',
      price: 10000,
      club: 'Juventus Turin',
      position: 'midfield',
      email: 'cristiano@casa-mama.pr',
      skills: ['theatricality'],
    };
    cy.get('[href="/addplayer"]').click();
    cy.get('[name="name"]').type(player.name);
    cy.get('[name="price"]').type(player.price);
    cy.get('[name="club"]').select(player.club);
    cy.get('[name="position"]').check(player.position);
    player.skills.forEach((skill) =>
      cy.get('[name="tags"]').type(skill).type('{enter}')
    );
    cy.get('[name="email"]').type(player.email);
    cy.get('button').first().click();
    cy.get('[data-testid="form-error-display"]').should('not.be.visible');
    cy.get('header a').first().click();
    cy.get('[data-testid="player-card"]').contains(player.name);
  });
});
