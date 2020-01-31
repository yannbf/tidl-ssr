const baseUrl = 'http://localhost:3000/'

context('Home', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
  })

  it('Task list contains 3 elements', () => {
    cy.get('[data-testid="list-item"]').should('have.length', 3)
  })
})
