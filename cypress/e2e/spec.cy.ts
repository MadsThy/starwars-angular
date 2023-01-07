describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:4200');
    cy.title().should('contain', 'Starwars');
  });
});
