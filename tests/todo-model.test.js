const chai = require('chai')
const chaiHTTP = require('chai-http');
const { assert } = require('chai');
chai.use(chaiHTTP);
const app = require('../app.js').app;
const server = require('../app.js').server;
const expect = chai.expect;
const todo_model = require('../models/todo-model')
const db = require('../models/DB')

describe('Get all todolists and todos', function() {
    it('Should return an array of lists with todos as a nested array', async function () {
        let todoLists = await todo_model.getTodos()
        expect(todoLists).to.be.an('array')
        expect(todoLists[0]).to.have.own.property('todos')
        expect(todoLists[0].todos).to.be.an('array')
    })
})

describe('Add a new todo list into database', function () {
    it('Should return an object with the added todolist title and an _id', async function () { 
        let response = await todo_model.addTodoList('test')
        expect(response).to.be.an('object')
        expect(response).and.to.have.own.property('_id')
        expect(response).and.to.have.own.property('title')
        expect(response.title).to.equal('test')
        expect(response._id).to.not.equal(undefined).and.to.not.equal(null)
    })
})

describe('Remove todolist item with specific id', function () {
    it('Should return an object with the added todolist title and an _id', async function () { 
        let addResponse = await todo_model.addTodoList('test')
        let response = await todo_model.removeList(addResponse._id)
        expect(response).to.equal(1)
        
    })
})