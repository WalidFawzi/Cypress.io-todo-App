/// <reference types="Cypress" />

describe('Check all the Login functions', () => {

    beforeEach(() => {
        cy.visit('/login');
    });

    it('Login with invalid credentials', () => {
        cy.get('[data-testid="email"]').type('tes@g.com')
        cy.get('[data-testid="password"]').type('Waleed@2027')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiAlert-message').should('contain','We could not find the email in the database')
    
    })

    it('Login with empty credentials', () => {
        cy.get('.MuiButton-label').click();
        cy.get('#login-helper-text').should('contain','Please Insert a correct Email format')
    
    })

    it('Login with Valid email and empty password', () => {
        cy.get('[data-testid="email"]').type('tes@g.com')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain','Password must be Minimum eight characters')
    
    })

    it('Login with Valid password and empty Email', () => {
        cy.get('[data-testid="password"]').type('Waleed@2027')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain','Please Insert a correct Email format')
    
    })

    it('Login with Valid Credentials', () => {
        cy.get('[data-testid="email"]').type('waleedfawzy777@gmail.com')
        cy.get('[data-testid="password"]').type('Waleed@2027')
        cy.get('.MuiButton-label').click();
        cy.url().should('contain','todo')
    })


})