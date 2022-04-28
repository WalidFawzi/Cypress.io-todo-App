describe('Check all the signup functions', () => {

    beforeEach(() => {
        cy.visit('/signup');
    })
    it('Check if there is a validation message if the user didnt enter a valid firstname', () => {
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'First Name is required')

    })
    it('Check if there is a validation message if the user enter less than 3 characters in firstname', () => {
        cy.get('[data-testid="first-name"]').type('wa')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'First Name is required')
    })

    it('Check if there is a validation message if the user didnt enter a valid lastname', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('.MuiButton-label').click();
        cy.get('[data-testid="last-name"]')
        cy.get('.MuiFormHelperText-root').should('contain', 'Last Name is required')
    })
    it('Check if there is a validation message if the user didnt enter a valid lastname', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fa')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'Last Name is required')
    })
    it('Check if there is a validation message if the user didnt enter a valid email', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'Please Insert a correct Email format')
    })
    it('Check if there is a validation message if the user didnt enter a valid email format', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleed')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'Please Insert a correct Email format')
    })

    it('Check if there is a validation message if the user didnt enter a password', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleed@gmail.com')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'Password must be Minimum eight characters')

    })
    it('Check if there is a validation message if the user enter only 3 chars in password', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleed@gmail.com')
        cy.get('[data-testid="password"]').type('wal')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'Password must be Minimum eight characters')
        
    })

    it('Check if there is a validation message if the user enter invalid password format', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleed@gmail.com')
        cy.get('[data-testid="password"]').type('Waleed123456')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain', 'Password must be Minimum eight characters')
        
    })

    it('Check if there is a validation message if the user didnt enter confirm password ', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleed@gmail.com')
        cy.get('[data-testid="password"]').type('Waleed@2027')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain','Second password does not match')
        
    })

    it('Check if there is a validation message if the user enter a mismatched password ', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleed@gmail.com')
        cy.get('[data-testid="password"]').type('Waleed@2027')
        cy.get('[data-testid="confirm-password"]').type('2132334')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiFormHelperText-root').should('contain','Second password does not match')
        
    })

    it('Check if there is a validation message if the user enter a an exisiting email ', () => {
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleed@gmail.com')
        cy.get('[data-testid="password"]').type('Waleed@2027')
        cy.get('[data-testid="confirm-password"]').type('Waleed@2027')
        cy.get('.MuiButton-label').click();
        cy.get('.MuiAlert-message').should('contain','Email is already exists in the Database')
        
    })

    it('Regiater a new account', () => {

        cy.intercept('POST','**/api/v1/users/register',{
            fixture : 'register',
            statusCode : 201
        });
       
        cy.get('[data-testid="first-name"]').type('waleed')
        cy.get('[data-testid="last-name"]').type('fawzy')
        cy.get('[data-testid="email"]').type('waleedahmed@gmail.com')
        cy.get('[data-testid="password"]').type('Waleed@2027')
        cy.get('[data-testid="confirm-password"]').type('Waleed@2027')
        cy.get('.MuiButton-label').click();
        cy.url().should('contain','todo')        
    })

})