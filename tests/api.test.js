const chai = require('chai')
const chaiHTTP = require('chai-http');
const { assert } = require('chai');
chai.use(chaiHTTP);
const app = require('../app.js').app;
const server = require('../app.js').server;
const expect = chai.expect;

describe('Test functionality of api get-route', function () {
    it('should return with 200', function () {
        chai.request(app)
            .get('/todo')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    })
})

describe('Test out adding a new todo list to db', function () {
    it('should return with 200', function () {
        chai.request(app)
            .post('/todo')
            .set({ "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidGVzdDMiLCJwYXNzd29yZCI6IiQyYSQxMCRwRU9ZS3VxU1hEcm4yelVKZGsybGV1akJMdnNEczQ2eEpNQnd2cUhHVmNDR1ZTYlgwWUEuVyIsInJvbGUiOiJhZG1pbiIsIl9pZCI6IkVvWnlXYjNDZ1h0RG5iaHYifSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTk5NDM1OTExLCJleHAiOjE1OTk0NzE5MTF9.M5vG8seAvf2gJpPKEMu17-d3ak4pgoQXb0L3gN-9XDU` })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    })
})