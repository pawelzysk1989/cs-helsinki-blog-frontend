// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

import { admin, Credentials, User } from '../types';

const adminCredentials: Credentials = {
  username: admin.username,
  password: admin.password,
};

declare global {
  namespace Cypress {
    interface Chainable {
      createUser(user?: User): void;
      login(credentials?: Credentials): void;
      resetDB(): void;
    }
  }
}

Cypress.Commands.add('resetDB', () => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset');
});

Cypress.Commands.add('createUser', (user = admin) => {
  cy.request('POST', 'http://localhost:3001/api/users', user);
});

Cypress.Commands.add('login', (credentials = adminCredentials) => {
  cy.clearLocalStorage('loggedUser');
  cy.request('POST', 'http://localhost:3001/api/login', credentials).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body));
  });
});
