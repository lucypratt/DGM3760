let categories = []
let todos = []


fetch('/api/todos')
.then(res => res.json())
.then(data => console.log(data))

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
    categories = categories.map((category) => {
      if (category.name === name) {
        category.name = newText
      }
      return category
    })

    todos = todos.map((todo) => {
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
  let updatedCategories = []
  for (let i = 0; i < categories.length; i++) {
      let currentCategory = categories[i]
      if (currentCategory.name !== name) {
          updatedCategories.push(currentCategory)
      }
  }
  categories = updatedCategories
  

  let updatedTodos = []
  for (let i = 0; i < todos.length; i++) {
      let currentTodo = todos[i]
      if (currentTodo.category === name) {
          currentTodo.category = ""
      }
      updatedTodos.push(currentTodo)
  }
  todos = updatedTodos

    createCategoryList()
    createTodoCategoryDropdown()
    createSortCategoryDropdown()
    renderTodoList()
  
}

function getCategoryById(name) {
  for (let i = 0; i < categories.length; i++) {
      let currentCategory = categories[i]
      if (currentCategory.name === name) {
          return currentCategory
      }
  }
  
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
  li.onclick = () => {
    handleClick()
}

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add('btn', 'ml-5', 'btn-secondary')
    deleteBtn.innerText = "Delete"


    function deleteBtnDelete(event) {
      
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

  categories.forEach((category) => {
    let option = document.createElement("option")
    option.value = category.name
    option.innerText = category.name
    sortCategoryDropdown.appendChild(option)
  })
}

// function newTask() {
//   const task = document.createElement("li")
  
 
//   const taskWrapper = document.createElement("span")
  
//   task.setAttribute('id', 'task')
//   task.setAttribute("contenteditable", "true")
//   const newInput = document.getElementById("myInput").value
//  task.innerHTML = newInput
 
//   list.appendChild(taskWrapper)
//   taskWrapper.appendChild(task)

//   taskWrapper.addEventListener("click", strike = () => {
//     task.classList.toggle("strike")

//   })
//   document.getElementById("myInput").value = "";

//   const wrapper = document.createElement("SPAN");
//   wrapper.innerHTML = "\u00D7";
//   wrapper.className = "close m-5 justify-items-end font-bold text-xl";
  

//   task.appendChild(wrapper);
// wrapper.addEventListener("click", close = () => {
//   task.style.display = "none"
  
// })


// }

let newTodoID = 1
function addTodo() {
  let todoText = document.getElementById("newTodo").value
  let selectedCategory = document.getElementById("category").value

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


  fetch('/api/todo', {
    method: 'POST',
    body: JSON.stringify({todo: todoText}),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    renderTodoList(data)
  })
}

function toggleDone(id) {
  todos = todos.map( (todo) => {
    if (todo.id === id) {
      todo.complete = !todo.complete
    }
    return todo
  })
  renderTodoList()

  let todoID = event.target.dataset.todoid

  //make a fetch request to complete dodo
  fetch('/api/complete', {
    method: 'POST',
    body: JSON.stringify({todoID}),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    renderTodoList(data)
  })
}


// function edit() {
//   task.setAttribute("contenteditable", "true")
// }


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
    li.onclick = () => {
      toggleDone(todo.id)
    }
    let editBtn = document.createElement("span")
    editBtn.classList.add("edit-btn")
    editBtn.innerHTML = "&#9999;"
    editBtn.onclick = (event) => {
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
  document.getElementById("todosLeft").innerText = "You have " + todosLeft + " todos left"
}

function sortTodosByCategory() {
  let selectedCategory = document.getElementById("sortCategory").value
  let sortedTodos = []

  if (selectedCategory === "all") {
    renderTodoList()
  } else {
    let filteredTodos = todos.filter((todo) => {
      return todo.category === selectedCategory
    })
    for (let i = 0; i < filteredTodos.length; i++) {
      sortedTodos.push(filteredTodos[i])
  }
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].category !== selectedCategory) {
        sortedTodos.push(todos[i])
    }
}
    todos = sortedTodos
    renderTodoList()
  }
}
