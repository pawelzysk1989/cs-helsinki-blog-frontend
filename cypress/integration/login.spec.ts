import { admin } from '../types';

describe('Login with form', function () {
  beforeEach(function () {
    cy.resetDB();
    cy.createUser();
    cy.visit('');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  it('user can login with good credentials', function () {
    cy.findByLabelText('username').type(admin.username);
    cy.findByLabelText('password').type(admin.password);
    cy.get('button[type="submit"]').click();

    cy.contains('Pawel Zysk logged in');
  });

  // it('login fails with wrong password', function () {
  //   cy.contains('log in').click();
  //   cy.get('#username').type('mluukkai');
  //   cy.get('#password').type('wrong');
  //   cy.get('#login-button').click();

  //   cy.get('.error')
  //     .should('contain', 'wrong credentials')
  //     .and('have.css', 'color', 'rgb(255, 0, 0)')
  //     .and('have.css', 'border-style', 'solid');

  //   cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
  // });
});
