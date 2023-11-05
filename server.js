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

let categories = [
    {
        name: "Category1"
    },
    {
        name: "Category2"
    },
    {
        name: "Category3"
    }
]

app.get('/', (req, res) => {
    res.send(todos)
})

app.post('/api/todo', (req, res) => {
    res.send("Got a POST request")
    const newTodo = {
        id: todo.length,
        todo: "New Todo " + (todos.length + 1),
        done: false
    }
    todos.push(newTodo)
    res.send(newTodo)
})

app.put('/api/todo', (req, res) => {
    const todoId = parseInt(req.params.id)
    const updatedTodo = req.body
    todos = todos.map(todo => {
        if (todo.id === todoId) {
            todo.todo = updatedTodo.todo
        }
        return todo
    })
    res.send(todos)
})

app.delete('api/todos/', (req, res) => {
    const todoID = parseInt(req.params.id)
    todos = todos.filter(todo => todo.id !== todoID)
    res.send(todos)
})

app.get('/api/categories/:categoryName/todos', (req, res) => {
    const categoryName = req.params.category.name
    const todosForCategory = todos.filter(todo => todo => todo.category === categoryName)
    res.send(todosForCategory)
})

app.get('/api/categories', (req, res) => {
    res.send(categories)
})

app.post('/api/categories', (req, res) => {
    const newCategory = req.body.category.name
    categories.push(newCategory)
    res.send(categories)
})

app.put('/api/categories/:categoryName', (req, res) => {
    const categoryName = req.params.category.name
    const updatedCategory = req.body.category.name
    categories = categories.map(category => {
        if (category === categoryName) {
            category.name = updatedCategory
        }
        return category
    })
    res.send(categories)
})

app.delete('/api/categories/:categoryName', (req, res) => {
    const categoryName = req.params.category.name
    categories = categories.filter(category => category !== categoryName)
    res.send(categories)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

