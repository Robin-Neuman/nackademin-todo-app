const chai = require('chai')
const chaiHTTP = require('chai-http');
const { assert } = require('chai');
chai.use(chaiHTTP);
const app = require('../app.js').app;
const server = require('../app.js').server;
const expect = chai.expect;

describe('Test functionality of api get-route', function () {
    it('should return an array with todo list objects', function () {
        chai.request(app)
            .get('/todo')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    })
})