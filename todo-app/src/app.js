let addBtn = document.getElementById("addTaskBtn")
let list = document.getElementById("todoList")
let header = document.getElementById("header")

function count() {
  const counterText = document.getElementById("counter")

  const listItems = Array.from(document.getElementById("todoList").children)

  const count = listItems.length
  counterText.textContent = count
}

function newTask() {
  const task = document.createElement("li")
  const taskWrapper = document.createElement("span")
  const editBtn = document.createElement("span")
  const taskDiv = document.createElement("div")

  task.setAttribute("id", "task")

  const newInput = document.getElementById("myInput").value
  task.innerHTML = newInput

  editBtn.innerHTML = "Edit"
  editBtn.classList.add("btn", "btn-primary", "px-1")
  editBtn.addEventListener("click", edit(task))

  taskWrapper.classList.add("flex", "space-between", "w-100")

  const wrapper = document.createElement("SPAN")
  wrapper.innerHTML = "\u00D7"
  wrapper.className = "close m-5 justify-items-end font-bold text-xl"

  list.appendChild(taskWrapper)
  taskWrapper.appendChild(taskDiv)
  taskDiv.appendChild(task)
  taskWrapper.appendChild(editBtn)
  task.appendChild(wrapper)

  taskDiv.addEventListener("click", () => {
    task.classList.toggle("line-through")
  })
  document.getElementById("myInput").value = ""

  wrapper.addEventListener(
    "click",
    (close = () => {
      task.style.display = "none"
    })
  )
}
const clearButton = document.getElementById("clearDone")
clearButton.addEventListener("click", clearDone)
function clearDone() {
  const tasks = document.getElementsByClassName("line-through")

  while (tasks.length > 0) {
    const task = tasks[0]

    const taskWrapper = task.parentElement
    const taskParent = taskWrapper.parentElement
    taskParent.remove()
  }
}

function edit(task) {
  task.setAttribute("contenteditable", "true")
  task.focus()
}

const categories = ["Work", "Personal", "School"]
const selectElement = document.getElementById("category")
const addCategoryBtn = document.getElementById("addCategory")
addCategoryBtn.addEventListener("click", addCategory)


categories.forEach((category) => {
  const option = document.createElement("option")
  option.value = category
  option.text = category
  selectElement.add(option)
})



function addCategory() {
  const categoryName = document.getElementById("myNewCategory").value
  console.log(categoryName)

  categories.push(categoryName)

  const option = document.createElement("option")
  option.value = categoryName
  option.text = categoryName
  selectElement.add(option)
 
}

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

//   const listItems= Array.from(document.getElementById('todoList').children)

//   for (i=0; i > listItems.length; i++) {
//     if (window.getComputedStyle(listItems[i]).display === "none") {
//       listItems[i].pop()
//     } else {

//     }
//   }
//   console.log(listItems.length)

// }

// const check = document.getElementById("check")

//   function checkPending() {
//     const number = document.getElementById("todoList").childElementCount
//
//     counterText.textContent =  number
//   }
