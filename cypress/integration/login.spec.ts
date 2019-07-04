describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/auth/login');
  });

  it('should open login page', () => {});

  it('should login when given proper email and passsword', () => {
    const properEmail = 'grzegorz.musialik@o2.pl';
    const properPassword = '123asD';

    cy.get('[data-cy=email-field]').type(properEmail);
    cy.get('[data-cy=password-field]').type(properPassword);
    cy.get('[data-cy=login-btn]').click();

    cy.url().should('include', '/admin/users');
  });
});
