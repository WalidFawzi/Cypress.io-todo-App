/// <reference types="Cypress" />

it('E2E scenario for adding a new task', () => {
    cy.visit('/');
    cy.login('waleedfawzy777@gmail.com','Waleed@2027')
    cy.get('[data-testid="welcome"]').should('be.visible')
    cy.get('[data-testid="add"]').click()
    cy.get('[data-testid="new-todo"]').type('New course')
    cy.get('[data-testid="submit-newTask"]').click()
    cy.get('[data-testid="todo-item"]').should('be.visible')
    cy.get('[data-testid="complete-task"]').first().check()
    cy.get('[data-testid="todo-item"]').should('have.css','background-color','rgb(33, 76, 97)')
    cy.get('[data-testid="delete"]').first().click()
    cy.get('[data-testid="no-todos"]').should('be.visible')




})
