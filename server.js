const express = require('express')
const hostname = "127.0.0.1"
const app = express()
const port = 3000

app.use(express.static('todo-app'))

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
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
        done: true
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

// get todos
app.get('/api/todos', (req, res) => {
    res.send(todos)
})

app.post('/api/todos', (req, res) => {
    //res.send("Got a POST request")
    const newTodo = {
        id: todos.length,
        todo: "New Todo " + (todos.length + 1),
        done: false
    }
    todos.push(newTodo) 
    res.send(todos)
})

//update todos
app.put('/api/todos/:id', (req, res) => {
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

app.delete('/api/todos/:id', (req, res) => {
    const todoID = parseInt(req.params.id)
    todos = todos.filter(todo => todo.id !== todoID)
    res.send(todos)
})

//complete todo
app.post('/api/complete', (req, res) => {
const todoID = req.body.todoID


const todoIndex = todos.findIndex(todo => todo.todoID == todoID)
console.log("index", todoIndex)

todos[todoIndex].done = !todos[todoIndex].done

res.send(todos)
})

//Todos for each category
app.get('/api/todos/categories', (req, res) => {
    const categoryName = req.body.category.name
    const todosForCategory = todos.filter(todo => todo.category === categoryName)
    res.send(todosForCategory)
})

//get categories
app.get('/api/categories', (req, res) => {
    res.send(categories)
})

//add a category
app.post('/api/categories', (req, res) => {
    const newCategory = req.body.name
    categories.push(newCategory)
    res.send(categories)
})
//update categories
app.put('/api/todos/categories/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName
    const updatedCategory = req.body.category.name
    categories = categories.map(category => {
        if (category === categoryName) {
            category.name = updatedCategory
        }
        return category
    })
    res.send(categories)
})
//delete category
app.delete('/api/categories/:categoryName', (req, res) => {
    const categoryName = req.params.category.name
    categories = categories.filter(category => category !== categoryName)
    res.send(categories)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://${hostname}:${port}`)
})

