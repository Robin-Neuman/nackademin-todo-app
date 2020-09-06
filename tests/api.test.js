const chai = require('chai')
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const app = require('../index').app;
const server = require('../index').server;
const expect = chai.expect;

