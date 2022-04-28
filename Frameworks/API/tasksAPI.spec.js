describe('Check the all tasks API', () => {
    let token;
    let taskID;

    before(() => {
        cy.request({
            url: 'http://localhost:8080/api/v1/users/login',
            method: 'POST',
            body: {
                "email": "waleedfawzy777@gmail.com",
                "password": "Waleed@2027"
            },
        }).then(res => {
            token = res.body.access_token;
        })
    })

    it('should be able to add new task', () => {
        
      cy.request({
        url: 'http://localhost:8080/api/v1/tasks',
        method: 'POST',
        body: {
            "item" : "Play chess",
            "isCompleted": false
        },
        headers: {Authorization: 'Bearer ' + token}
      }).then(res => {
          taskID = res.body.addedTask._id;
          expect(res.status).eql(201);
          expect(res.body.addedTask.item).eql('Play chess')
      })
    })

    it('should return all tasks',()=>{
        cy.request({
            url: 'http://localhost:8080/api/v1/tasks',
            method: 'GET',
            headers: {Authorization: 'Bearer ' + token}
        }).then(res =>{
            expect(res.status).eql(200)
        })
    })

    it('should be able to update a task' , ()=>{

        cy.request({
            url: 'http://localhost:8080/api/v1/tasks/' + taskID,
            method: 'PUT',
            headers: {Authorization: 'Bearer ' + token},
            body : {
                 "isCompleted" : true,
                 "item" : "Hello Waleed"
                }
        }).then(res =>{
            expect(res.status).eql(200)
        })
    })

    it('should be able to delete a task' , ()=>{

        cy.request({
            url: 'http://localhost:8080/api/v1/tasks/' + taskID,
            method: 'DELETE',
            headers: {Authorization: 'Bearer ' + token},
        }).then(res =>{
            expect(res.status).eql(200)
        })
    })
})