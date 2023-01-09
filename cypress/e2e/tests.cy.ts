describe('Cypress tests', () => {
  it('can visit site and see a list of 10 actors', () => {
    cy.visit('localhost:4200');
    cy.get('.actor').should('have.length', 10);
  });

  it('clicking page 9 takes you to last page and show no NEXT button', () => {
    cy.visit('localhost:4200');
    cy.get('.paginator').contains('9').click();
    cy.get('.actor').should('have.length', 2);
    cy.get('button').contains('NEXT').should('not.exist');
  });

  it('clicking luke skywalker takes user to page about actor', () => {
    cy.visit('localhost:4200');
    cy.get('.actor').contains('Luke Skywalker').click();
    cy.get('h1').should('contain.text', 'Name: Luke Skywalker');
  });

  it("clicking Luke's homeworld takes user to Tatooine page", () => {
    cy.visit('localhost:4200');
    cy.get('.actor').contains('Luke Skywalker').click();
    cy.get('button').contains('See homeworld').click();
    cy.get('h1').should('contain.text', 'Name: Tatooine');
  });
});
