import { admin } from '../types';

describe('Login', function () {
  beforeEach(function () {
    cy.resetDB();
    cy.createUser();
  });
  describe('When home page opened and login form is shown', () => {
    beforeEach(function () {
      cy.visit('');
    });

    it('user can login with good credentials', function () {
      cy.findByLabelText('username').type(admin.username);
      cy.findByLabelText('password').type(admin.password);
      cy.get('button[type="submit"]').click();

      cy.contains('Pawel Zysk logged in');
    });

    it('login fails to log in with wrong password', function () {
      cy.findByLabelText('username').type(admin.username);
      cy.findByLabelText('password').type('wrong_password');
      cy.get('button[type="submit"]').click();

      cy.get('.notification--error')
        .should('contain', 'invalid password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Pawel Zysk logged in');
    });
  });

  describe('When bypassing UI', () => {
    beforeEach(() => {
      cy.login();
      cy.visit('');
    });
    it('user logs in with credentials', function () {
      cy.contains('Pawel Zysk logged in');
    });
  });
});
