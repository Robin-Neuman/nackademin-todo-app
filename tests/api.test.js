const chai = require('chai')
const chaiHTTP = require('chai-http');
const bcrypt = require('bcryptjs');
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

describe('Test out post todolist route', function () {
    let token;
    before(async () => {
        await chai.request(app)
            .post('/user/login')
            .send({
                username: 'test3',
                password: '1234'
            })
            .then((res) => {
                token = res.body.token
                expect(res).to.have.status(200)
            })
    })
    it('should return with 200', async function () {
        chai.request(app)
            .post('/todo')
            .set("authorization", `Bearer ${token}`)
            .send({ title: 'newList' })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
            });
    })
})

server.close()