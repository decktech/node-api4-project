require('dotenv').config()
const express = require('express')
const cors = require('cors')
const users = require('./api/users')

const server = express()

const PORT = process.env.PORT || 9000

server.use(express.json())
server.use(cors())

server.get('/api/users', (req, res, next) => {
    res.json(users)
})

server.post('/api/register', (req, res, next) => {
    res.json(req.body)
})

server.post('/api/login', (req, res, next) => {
    if (req.body.name == null || req.body.password == null) {
        res.status(400).json({ message: 'name and password required'})
        next();
    }
    if (req.body.name === "" || req.body.password === "") {
        res.status(400).json({ message: 'name and password required'})
        next();
    }

    res.status(200).json({ message: "successful login"})
})

server.use('*', (req, res, next) => {
    res.send(`<h2>Hello</h2>`)
})

server.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

console.log(process.env.PORT)

