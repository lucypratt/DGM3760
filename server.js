const express = require('express')
const app = express()
const port = 3000


const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParse.urlencoded())
app.use(bodyParser.urlencoded ( {extended: true}))

let todos = [
    {
        id: 0,
        todo: "a task",
        done: false
    },
    {
        id: 1,
        todo: "Something else",
        done: false
    },
    {
        id: 2,
        todo: "something else",
        done: false
    }
]

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/api/todo', (req, res) => {
    res.send("This is a new route")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/api/todo', (req, res) => {
    res.send("Got a POST request")

    todo.push( {
        id: todos.length + 1,
        todo: req.body.todo,
        done: false
    })
   res.send(todos)
})