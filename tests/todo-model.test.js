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
        let addTodoResponse = await todo_model.addTodo('testTodo', addListResponse._id, '1')
        expect(addTodoResponse).to.have.keys('title', '_id', 'date_added', 'done', 'listId', 'user_id')
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
        expect(response.doc).and.to.have.own.property('_id')
        expect(response.doc).and.to.have.own.property('title')
        expect(response.doc.title).to.equal('test')
        expect(response.doc._id).to.not.equal(undefined).and.to.not.equal(null)
    })
})

describe('Remove todolist item with specific id', function () {
    it('Should return an object with the added todolist title and an _id', async function () { 
        let addResponse = await todo_model.addTodoList('test', '1')
        let response = await todo_model.removeList(addResponse.doc._id)
        expect(response).to.equal(1)
        
    })
})

describe('Add new todo list and a todo to db with new date', function () {
    it('Should return the newly added todo list and return new todo with new correct date', async function () {
        await db.todoLists.remove({ title: 'testList' }, { multi: true })
        await db.todos.remove({ title: 'testTodo' }, { multi: true })
        await db.todos.remove({ title: 'newTestTitle' }, { multi: true })

        let addListResponse = await todo_model.addTodoList('testList', '1')
        await todo_model.addTodo('testTodo', addListResponse.doc._id)
        let getResponse = await todo_model.getTodoList(addListResponse.doc._id)
        expect(addListResponse.doc.title).to.equal("testList")
        expect(getResponse.todos[0].title).to.equal("testTodo")
        expect(new Date(getResponse.todos[0].date_added)).to.not.equal('Invalid Date')
    })
})

describe('Update todo with new information and receive numreplaced 1', async function () {
    await TodoList.remove({ title: 'testList' })

    let addListResponse = await todo_model.addTodoList('testList')
    let addTodoResponse = await todo_model.addTodo('testTodo', addListResponse.doc._id)
    let updateResponse = await todo_model.updateTodo(addTodoResponse.doc._id, 'newTestTitle', true)
    expect(updateResponse).to.equal(1)
})

disconnect()
server.close()