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
    todo: "todoText",
    done: false,
    category: "Category1"
    },
    {
        id: 1,
        todo: "todoText2",
        done: false,
        category: "Category2"
        },
        {
            id: 2,
            todo: "todoText3",
            done: false,
            category: "Category3"
            },
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

// get todos - Done!
app.get('/api/todos', (req, res) => {
    res.send(todos)
})

//Add todo - Done!
app.post('/api/todos', (req, res) => {
    const newTodo = req.body.todo
    todos.push(newTodo)
    res.send(todos)
})

//update todos - Done!
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

//delete todos - done!
app.delete('/api/todos/:id', (req, res) => {
    const todoID = parseInt(req.params.id)
    todos = todos.filter(todo => todo.id !== todoID)
    res.send(todos)
})

//delete all todos - not working
app.delete('/api/todos/completed', (req, res) => {
    todos = todos.filter(todo => !todo.done);
    res.send(todos)
  })

//complete todo - done!
app.post('/api/complete', (req, res) => {
const todoID = req.body.id
const newDoneStatus = req.body.done

  const todoIndex = todos.findIndex((todo) => todo.id === todoID)

  if (todoIndex !== -1) {
    todos[todoIndex].done = newDoneStatus
    res.send(todos)
  } 
})

//Todos for each category - Done!
app.get('/api/todos/categories/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName
    const todosForCategory = todos.filter(todo => todo.category === categoryName)
    res.send(todosForCategory)
})

//get categories - Done!
app.get('/api/categories', (req, res) => {
    res.send(categories)
})

//add a category - Done!
app.post('/api/categories', (req, res) => {
    const newCategory = req.body.name
    categories.push(newCategory)
    res.send(categories)
})
//update categories - Done!
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
//delete category - done!
app.delete('/api/categories/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName
    categories = categories.filter(category => category.name !== categoryName)

    let updatedTodos = []
    for (let i = 0; i < todos.length; i++) {
        let currentTodo = todos[i]
        if (currentTodo.category === categoryName) {
            currentTodo.category = ""
        }
        updatedTodos.push(currentTodo)
    }
    todos = updatedTodos

    res.send(categories)
})

app.listen(port, () => {
    console.log(`Example app listening on port http://${hostname}:${port}`)
})

