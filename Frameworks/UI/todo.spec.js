/// <reference types="Cypress" />
describe('Check all the todos functions', () => {

    beforeEach(() => {
        localStorage.setItem('user', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTNlOTA0MDFiNTIzM2ViNDhiMjVhZCIsImZpcnN0TmFtZSI6IldhbGVlZCIsImxhc3ROYW1lIjoiRmF3enkiLCJpYXQiOjE2NTAyODAwODR9.N9FwD4dTlmxgIvwHXFUfEhj3fMLJPnTd8GJBbNeYuu4","userID":"6253e90401b5233eb48b25ad","firstName":"Waleed"}')
        cy.intercept('GET', '**/api/v1/tasks', {
            fixture: 'tasks'
        })
    });

    it('Should show the not completed tasks', () => {
        cy.visit('/todo');
        cy.get('[data-testid="todo-item"]').first().should('have.css','background-color','rgb(63, 81, 181)')
        cy.get('[data-testid="complete-task"]').first().should('not.have.attr','checked')
    })

    it('Should show the completed tasks', () => {
        cy.visit('/todo');
        cy.get('[data-testid="todo-item"]').last().should('have.css','background-color','rgb(33, 76, 97)')
        cy.get('[data-testid="complete-task"]').last().should('have.attr','checked')
        cy.get('[data-testid="todo-text"]').last().should('have.css','text-decoration-line','line-through')
    })

    it('Should show the pagination if the tasks more than 5', () => {
        cy.intercept('GET', '**/api/v1/tasks', {
            fixture: 'Taskpagination'
        })
        cy.visit('/todo');
        cy.get('[data-test-id="pagination-link"]').should('be.visible').and('have.length','2')
    })

})