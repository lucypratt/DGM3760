



  let addBtn = document.getElementById("addTaskBtn")
  let list = document.getElementById("todoList")

 
  function newTask() {
    const task = document.createElement("li")
   
    const taskWrapper = document.createElement("span")
    task.setAttribute('id', 'task')
    const newInput = document.getElementById("myInput").value
   task.innerHTML = newInput
   
   
    list.appendChild(taskWrapper)
    taskWrapper.appendChild(task)

    taskWrapper.addEventListener("click", strike = () => {
      task.classList.toggle("strike")
    })
    document.getElementById("myInput").value = "";



    const wrapper = document.createElement("SPAN");
    wrapper.innerHTML = "\u00D7";
    wrapper.className = "close";
  
    task.appendChild(wrapper);
  wrapper.addEventListener("click", close = () => {
    task.style.display = "none"


  })

   
  }
 const clearButton = document.getElementById("clearDone")
 clearButton.addEventListener("click", clearDone)
 function clearDone() {
  if (document.getElementById('task')) {
    const element = document.getElementsByClassName("strike")
    for (i = 0; i < element.length; i++)
    element[i].hidden = true;
  }
 
 }

  

//  const strikedTasks = 
//   const completeTaskArr = new Array()
//   completeTaskArr.push(document.getElementById("task"))
//    for (i = 0, i < completeTaskArray, i++) {
//     if (completeTaskArry[i].classList.contains("strike"))
//    completeTask.remove()

//    }
