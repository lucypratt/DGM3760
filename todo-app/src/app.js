let categories = []
let todos = []

async function getElements() {
  let todosPromise = fetch("/api/todos")
  let categoriesPromise = fetch("/api/categories")

  try {
    const [todosResponse, categoriesResponse] = await Promise.all([
      todosPromise,
      categoriesPromise,
    ])

    const todosData = await todosResponse.json()
    const categoriesData = await categoriesResponse.json()

 
    todos = todosData
    categories = categoriesData

    renderTodoList()
    createCategoryList()
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

getElements()
//Done!
function addCategory() {
  let categoryText = document.getElementById("myNewCategory").value

   let newCategory = { name: categoryText }

  fetch("/api/categories", {
    method: "POST",
    body: JSON.stringify({ name: newCategory }),
    headers: { "Content-Type": "application/json" }
  })
  .then((res) => res.json())
  .then((data) => {
    categories = data
    createCategoryList()
  })
  document.getElementById("myNewCategory").value = ""
}

function editCategory(name) {
  let newText = prompt("Edit category:", getCategoryById(name).name)
  if (newText !== null) {
    const updatedCategory = { name: newText }

    fetch(`/api/todos/categories/${name}`, {
      method: "PUT",
      body: JSON.stringify({ category: updatedCategory }),
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        categories = data

        todos = todos.map((todo) => {
          if (todo.category === name) {
            todo.category = newText
          }
          return todo
        })

        categories = categories.map((category) => {
          if (category.name === name) {
            category.name = newText
          }
          return category
        })

        createCategoryList()
        createTodoCategoryDropdown()
        createSortCategoryDropdown()
        renderTodoList()
      })
  }
}
function deleteCategory(name) {
  fetch(`/api/categories/${name}`, {
      method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
      categories = data
      createCategoryList()
      createTodoCategoryDropdown()
      createSortCategoryDropdown()
      renderTodoList()
  })
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

//Done!
function addTodo() {
  let todoText = document.getElementById("newTodo").value
  let selectedCategory = document.getElementById("category").value

  fetch("/api/todos")
    .then((res) => res.json())
    .then((data) => {
      let newTodoID = findMaxTodoID(data) + 1  
      
      let newTodo = {
        id: newTodoID,
        todo: todoText,
        done: false,
        category: selectedCategory,
      }

      fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: newTodo }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          todos = data
          renderTodoList()
        })

      document.getElementById("newTodo").value = ""
    })
}

function findMaxTodoID(todos) {
  if (!todos || todos.length === 0) {
    return 0
  }
  return Math.max(...todos.map((todo) => todo.id))
}


function toggleDone(id) {
  console.log('Toggling done for ID:', id);
  todos = todos.map( (todo) => {
    if (todo.id === id) {
      todo.done = !todo.done
    }
    return todo
  })
  renderTodoList()


  //make a fetch request to complete dodo
  fetch('/api/complete', {
    method: 'POST',
    body: JSON.stringify({ id: id, done: !getTodoById(id).done }),
    headers: {"Content-Type": "application/json"}
  })
  .then(res => res.json())
  .then(data => {
    console.log('Received data from server:', data)
    renderTodoList(data)
  })
}


// function edit() {
//   task.setAttribute("contenteditable", "true")
// }


function editTodo(id) {
  let newText = prompt("Edit todo:", getTodoById(id).task);
  if (newText !== null) {
    const updatedTodo = {
      todo: newText
    };

    fetch(`/api/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        todos = data
        renderTodoList()
      })
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
  fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      todos = data
      renderTodoList()
    })
}

// not working
function deleteCompleted() {
  
  fetch('/api/todos/completed', {
    method: 'DELETE'
  })
  .then((res) => res.json())
  .then((data) => {
    todos = data
    renderTodoList()
  })
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
    li.innerText = todo.todo + " (Category: " + todo.category + " )"
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

    let deleteBtn = document.createElement("span")
    deleteBtn.classList.add("delete-btn")
    deleteBtn.innerHTML = "&#10006;"
    deleteBtn.onclick = (event) => {
      deleteTodo(todo.id)
    }
    li.appendChild(deleteBtn)
    li.appendChild(editBtn)

    if (todo.done) {
      li.classList.add("done")
    }

    todoList.appendChild(li)
  })

  updateTodosLeft()
}

function updateTodosLeft() {
  let totalTodos = todos.length
  let completedTodos = todos.filter((todo) => {
    return todo.done
  }).length
  let todosLeft = totalTodos - completedTodos
  document.getElementById("todosLeft").innerText = "You have " + todosLeft + " todos left"
}

function sortTodosByCategory() {
  let selectedCategory = document.getElementById("sortCategory").value

  if (selectedCategory === "all") {
    getElements()
  } else {
    fetch(`/api/todos/categories/${selectedCategory}`)
      .then(res => res.json())
      .then(data => {
        todos = data
        renderTodoList()
      })
      
  }
}
