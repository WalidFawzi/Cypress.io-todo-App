import { faker } from '@faker-js/faker';

describe('Check all the register API test cases', () => {

    it('should return error if the firstname not a port of the body', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/register',
            method: 'POST',
            body: {
                "lastName": faker.name.findName(),
                "email": faker.internet.email(),
                "password": "Waleed@2020"
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(400);
            expect(res.body.message).to.eql('\"firstName\" is required')
        })
    })

    it('should return error if the firstname less than 2 chars', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/register',
            method: 'POST',
            body: {
                "firstName":"wa",
                "lastName": faker.name.findName(),
                "email": faker.internet.email(),
                "password": "Waleed@2020"
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(400);
            expect(res.body.message).to.contain(' at least 3 characters')
        })
    })

    it('Status code should be OK if all the data is correct', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/register',
            method: 'POST',
            body: {
                "firstName" :faker.name.findName(),
                "lastName": faker.name.findName(),
                "email": faker.internet.email(),
                "password": "Waleed@2020"
            },
        }).then(res => {
            expect(res.status).to.eql(201);
        })
    })

    it('should return error if the lastname is not a part of the body', () => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/register',
            method: 'POST',
            body: {
                "firstName":faker.name.findName(),
                "email": faker.internet.email(),
                "password": "Waleed@2020"
            },
            failOnStatusCode: false
        }).then(res => {
            expect(res.status).to.eql(400);
            expect(res.body.message).to.contain('\"lastName\" is required')
        })
    })

})