/// <reference types="Cypress" />

describe('Check all the newtodos functions', () => {

    beforeEach(() => {
        localStorage.setItem('user', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTNlOTA0MDFiNTIzM2ViNDhiMjVhZCIsImZpcnN0TmFtZSI6IldhbGVlZCIsImxhc3ROYW1lIjoiRmF3enkiLCJpYXQiOjE2NTAyODAwODR9.N9FwD4dTlmxgIvwHXFUfEhj3fMLJPnTd8GJBbNeYuu4","userID":"6253e90401b5233eb48b25ad","firstName":"Waleed"}')
        cy.intercept('GET', '**/api/v1/tasks', {
            fixture: 'tasks'
        })

        cy.intercept('POST','/api/v1/tasks',{}).as('newtask')

    })

    it('The plus button is naviating to a newURL', () => {
        cy.visit('/todo');
        cy.get('[data-testid="add"]').click()
        cy.url().should('contain','todo/new')
    })

    it('Check the validation message displayed once the user clicks on add without entering task title',()=>{
        cy.visit('/todo');
        cy.get('[data-testid="add"]').click()
        cy.get('[data-testid="submit-newTask"]').click()
        cy.get('.MuiFormHelperText-root').should('be.visible').and('contain','New todo is required, and it should be more than 3 characters')
    })

    it('Create new todo', () => {
        cy.visit('/todo');
        cy.get('[data-testid="add"]').click()
        cy.get('[data-testid="new-todo"]').type('Test Waleed')
        cy.get('[data-testid="submit-newTask"]').click()
        cy.wait('@newtask').then(xhr => {
            expect(xhr.request.body.item).to.eql('Test Waleed')
        })

    })
})