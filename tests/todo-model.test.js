const chai = require('chai')
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const app = require('../app.js').app;
const server = require('../app.js').server;
const expect = chai.expect;
const todo_model = require('../models/todo-model')
const {User, TodoList, connect, disconnect} = require('../models/DB');

describe('Get all todolists and todos', function() {
    before(async () => {
        connect(() => {
            console.log("connected to db")
        })
        let addListResponse = await todo_model.addTodoList('testList', '1')
        let addTodoResponse = await todo_model.addTodo('testTodo', addListResponse.doc._id, addListResponse.doc.user_id)
        expect(addTodoResponse.nModified).to.equal(1)
    })
    it('Should return an array of lists with todos as a nested array', async function () {
        let todoLists = await todo_model.getTodos()
        expect(todoLists).to.be.an('array')
        expect(todoLists[0]).to.have.own.property('todos')
        expect(todoLists[0].todos).to.be.an('array')
    })
})

describe('Add a new todo list into database', function () {
    it('Should return an object with the added todolist title and an _id', async function () { 
        let response = await todo_model.addTodoList('test', '1')
        expect(response.doc).to.be.an('object')
        expect(response.doc.title).to.equal('test')
        expect(response.doc._id).to.not.equal(undefined).and.to.not.equal(null)
    })
})

describe('Remove todolist item with specific id', function () {
    it('Should return an object with the added todolist title and an _id', async function () { 
        let addResponse = await todo_model.addTodoList('test', '1')
        let response = await todo_model.removeList(addResponse.doc._id)
        expect(response.deletedCount).to.equal(1)
        
    })
})

describe('Add new todo list and a todo to db with new date', function () {
    it('Should return the newly added todo list and return new todo with new correct date', async function () {
        await TodoList.deleteOne({ title: 'testList' })

        let addListResponse = await todo_model.addTodoList('testList', '1')
        let addTodoResponse = await todo_model.addTodo('testTodo', addListResponse.doc._id, addListResponse.doc.user_id)
        let getResponse = await todo_model.getTodoList(addListResponse.doc._id)
        expect(addListResponse.doc.title).to.equal("testList")
        expect(getResponse.todos[0].title).to.equal("testTodo")
        expect(new Date(getResponse.todos[0].date_added)).to.not.equal('Invalid Date')
    })
})

describe('Update todo with new information and receive numreplaced 1', async function () {
    await TodoList.deleteOne({ title: 'testList' })

    let addListResponse = await todo_model.addTodoList('testList', '1')
    await todo_model.addTodo('testTodo', addListResponse.doc._id, addListResponse.doc.user_id)    
    let getResponse = await todo_model.getTodoList(addListResponse.doc._id)
    let updateResponse = await todo_model.updateTodo(getResponse.todos[0]._id.slice(2), 'newTestTitle', true, addListResponse.doc._id)
    expect(updateResponse.nModified).to.equal(1)
})

setTimeout((function() {
    return process.exit()
}), 5000)
