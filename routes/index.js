const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async function (req, res) {
    res.render('login')
})

router.get('/home', async function (req, res) {
    fetch('http://localhost:3006/todo')
    .then(response => response.json())
    .then(function (data) {
        res.render('index', {todoLists: data})
    })
})

module.exports = router