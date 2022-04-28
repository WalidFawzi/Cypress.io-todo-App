/// <reference types="Cypress" />
describe('Check all the todos functions', () => {

    beforeEach(() => {
        localStorage.setItem('user', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTNlOTA0MDFiNTIzM2ViNDhiMjVhZCIsImZpcnN0TmFtZSI6IldhbGVlZCIsImxhc3ROYW1lIjoiRmF3enkiLCJpYXQiOjE2NTAyODAwODR9.N9FwD4dTlmxgIvwHXFUfEhj3fMLJPnTd8GJBbNeYuu4","userID":"6253e90401b5233eb48b25ad","firstName":"Waleed"}')
        cy.intercept('GET', '**/api/v1/tasks', {
            fixture: 'tasks'
        })
    });

    it('Should show time to sleep message', () => {
        const now = new Date('April 24 2022 01:00:00')
        cy.clock(now)
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain', 'Time to sleep')
    })

    it('Should show good morning message', () => {
        const now = new Date('April 24 2022 09:00:00')
        cy.clock(now)
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain', 'Good morning')
    })

    it('Should show good afternoon message', () => {
        const now = new Date('April 24 2022 14:00:00')
        cy.clock(now)
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain', 'Good afternoon')
    })

    it('Should show good evening message', () => {
        const now = new Date('April 24 2022 20:00:00')
        cy.clock(now)
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text', 'Good Evening')
    })

    it('Should not show first name if there is no first name property in the local storage', () => {
        localStorage.setItem('user', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTNlOTA0MDFiNTIzM2ViNDhiMjVhZCIsImZpcnN0TmFtZSI6IldhbGVlZCIsImxhc3ROYW1lIjoiRmF3enkiLCJpYXQiOjE2NTAyODAwODR9.N9FwD4dTlmxgIvwHXFUfEhj3fMLJPnTd8GJBbNeYuu4","userID":"6253e90401b5233eb48b25ad"}')
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text', 'user')

    })

    it('Should not show the firstname if the firstname is less than 2 chars',() =>{
        localStorage.setItem('user', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTNlOTA0MDFiNTIzM2ViNDhiMjVhZCIsImZpcnN0TmFtZSI6IldhbGVlZCIsImxhc3ROYW1lIjoiRmF3enkiLCJpYXQiOjE2NTAyODAwODR9.N9FwD4dTlmxgIvwHXFUfEhj3fMLJPnTd8GJBbNeYuu4","userID":"6253e90401b5233eb48b25ad","firstName":"W"}')
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text', 'user')

    })

    it('Should not show the firstname if the firstname contains @',() =>{
        localStorage.setItem('user', '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTNlOTA0MDFiNTIzM2ViNDhiMjVhZCIsImZpcnN0TmFtZSI6IldhbGVlZCIsImxhc3ROYW1lIjoiRmF3enkiLCJpYXQiOjE2NTAyODAwODR9.N9FwD4dTlmxgIvwHXFUfEhj3fMLJPnTd8GJBbNeYuu4","userID":"6253e90401b5233eb48b25ad","firstName":"Waleed@"}')
        cy.visit('/todo');
        cy.get('[data-testid="welcome"]').should('contain.text', 'user')

    })
})