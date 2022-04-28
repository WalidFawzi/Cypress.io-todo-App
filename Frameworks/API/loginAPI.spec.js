import { faker } from '@faker-js/faker';

describe('Check all the register API test cases', () => {

    it('should return error if the email not a port of the body', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/login',
            method: 'POST',
            body: {
                "password": "Waleed@2020"
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(400);
            expect(res.body.message).to.eql('Please Fill a correct Password')
        })
    })

    it('should return error if the password not entered', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/login',
            method: 'POST',
            body: {
                "email": faker.internet.email(),
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(400);
            expect(res.body.message).to.contain('Please Fill a correct Password')
        })
    })

    it('Status code should be OK if all the data is correct and login with valid crednetials', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/login',
            method: 'POST',
            body: {
                "email": "waleedfawzy777@gmail.com",
                "password": "Waleed@2027"
            },
        }).then(res => {
            expect(res.status).to.eql(200);
        })
    })

    it('should return error if login with invalid credentials', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/login',
            method: 'POST',
            body: {
                "email": faker.internet.email(),
                "password": "Waleed@2020"
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(400);
            expect(res.body.message).to.contain('We could not find the email in the database')
        })
    })

    it('should return error if login with valid email and invalid password', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/login',
            method: 'POST',
            body: {
                "email": "waleedfawzy777@gmail.com",
                "password": "Waleed@2020"
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(401);
            expect(res.body.message).to.contain('The email and password combination is not correct')
        })
    })

})