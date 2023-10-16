const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/new', (req, res) => {
    res.send("This is a new route")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/', (req, res) => {
    res.send("Got a POST request")

    todo.push( {
        id: todos.length + 1,
        todo: "",
        done: false
    })
})