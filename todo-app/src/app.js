let categories = []
let todos = []

function addCategory() {
  let categoryText = document.getElementById("myNewCategory").value

  let newCategory = { name: categoryText }
  categories.push(newCategory)
  createCategoryList()

  document.getElementById("myNewCategory").value = ""
}

function editCategory(name) {
  let newText = prompt("Edit category:", getCategoryById(name).name)
  if (newText !== null) {
    categories = categories.map(function (category) {
      if (category.name === name) {
        category.name = newText
      }
      return category
    })

    todos = todos.map(function (todo) {
      if (todo.category === name) {
        todo.category = newText
      }
      return todo
    })

    createCategoryList()
    createTodoCategoryDropdown()
    createSortCategoryDropdown()
    renderTodoList()
  }
}

function deleteCategory(name) {
    categories = categories.filter(function (category) {
      return category.name !== name
    })

    todos = todos.map(function (todo) {
      if (todo.category === name) {
        todo.category = ""
      }
      return todo
    })

    createCategoryList()
    createTodoCategoryDropdown()
    createSortCategoryDropdown()
    renderTodoList()
  
}

function getCategoryById(name) {
  return categories.find(category => category.name === name)
}

function createCategoryList() {
  let categoryList = document.getElementById("categoryList")
  categoryList.innerHTML = ""

  categories.forEach((category) => {
    let li = document.createElement("li")
    li.innerText = category.name
    
    function handleClick() {
      editCategory(category.name)
  }
   li.onclick = handleClick

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add('btn', 'ml-5', 'btn-secondary')
    deleteBtn.innerText = "Delete"


    function deleteBtnDelete(event) {
      event.stopPropagation()
      deleteCategory(category.name)
    }

    deleteBtn.onclick = deleteBtnDelete

    li.appendChild(deleteBtn)

    categoryList.appendChild(li)
  })

  createTodoCategoryDropdown()
  createSortCategoryDropdown()
}

function createTodoCategoryDropdown() {
  let categoryDropdown = document.getElementById("category")
  categoryDropdown.innerHTML = '<option value="">Category</option>'

  categories.forEach((category) => {
    let option = document.createElement("option")
    option.value = category.name
    option.innerText = category.name
    categoryDropdown.appendChild(option)
  })
}

function createSortCategoryDropdown() {
  let sortCategoryDropdown = document.getElementById("sortCategory")
  sortCategoryDropdown.innerHTML = '<option value="all">All</option>'

  categories.forEach(function (category) {
    let option = document.createElement("option")
    option.value = category.name
    option.innerText = category.name
    sortCategoryDropdown.appendChild(option)
  })
}


let newTodoID = 1
function addTodo() {
  let todoText = document.getElementById("newTodo").value
  let selectedCategory = document.getElementById("category").value
  if (todoText.trim() === "" || selectedCategory === "") return

  let newTodo = {
    id: newTodoID,
    task: todoText,
    complete: false,
    category: selectedCategory,
  }
  todos.push(newTodo)
  renderTodoList()

  document.getElementById("newTodo").value = ""
  newTodoID ++
}

function toggleDone(id) {
  todos = todos.map( (todo) => {
    if (todo.id === id) {
      todo.complete = !todo.complete
    }
    return todo
  })
  renderTodoList()
}

function editTodo(id) {
  let newText = prompt("Edit todo:", getTodoById(id).task)
  if (newText !== null) {
    todos = todos.map( (todo) => {
      if (todo.id === id) {
        todo.task = newText
      }
      return todo
    })
    renderTodoList()
  }
}
//Old CSS Deletion
//  const strikedTasks =
//   const completeTaskArr = new Array()
//   completeTaskArr.push(document.getElementById("task"))
//    for (i = 0, i < completeTaskArray, i++) {
//     if (completeTaskArry[i].classList.contains("strike"))
//    completeTask.remove()

//    }

// function removeLi(task) {
//   if (window.getComputedStyle(task).display === "none")
//   task.remove()

// }
// function checkCounter() {
//   removeLi(document.getElementById('task'))

function deleteTodo(id) {
  todos = todos.filter((todo) => {
    return todo.id !== id
  })
  renderTodoList()
}

function deleteCompleted() {
  todos = todos.filter((todo) => {
    return !todo.complete
  })
  renderTodoList()
}

function getTodoById(id) {
  return todos.find((todo) => {
    return todo.id === id
  })
}

function renderTodoList() {
  let todoList = document.getElementById("todoList")
  todoList.innerHTML = ""

  todos.forEach( (todo) => {
    let li = document.createElement("li")
    li.innerText = todo.task + " (Category: " + todo.category + ")"
    li.onclick = function () {
      toggleDone(todo.id)
    }
    let editBtn = document.createElement("span")
    editBtn.classList.add("edit-btn")
    editBtn.innerHTML = "&#9999;"
    editBtn.onclick = function (event) {
      event.stopPropagation()
      editTodo(todo.id)
    }
    li.appendChild(editBtn)

    if (todo.complete) {
      li.classList.add("done")
    }

    todoList.appendChild(li)
  })

  updateTodosLeft()
}

function updateTodosLeft() {
  let totalTodos = todos.length
  let completedTodos = todos.filter((todo) => {
    return todo.complete
  }).length
  let todosLeft = totalTodos - completedTodos
  document.getElementById("todosLeft").innerText = "Todos left: " + todosLeft
}

function sortTodosByCategory() {
  let selectedCategory = document.getElementById("sortCategory").value

  if (selectedCategory === "all") {
    renderTodoList()
  } else {
    let filteredTodos = todos.filter((todo) => {
      return todo.category === selectedCategory
    })
    let sortedTodos = filteredTodos.concat(
      todos.filter((todo) => {
        return todo.category !== selectedCategory
      })
    )
    todos = sortedTodos
    renderTodoList()
  }
}
