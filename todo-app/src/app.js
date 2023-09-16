



  let addBtn = document.getElementById("addTaskBtn")
  let list = document.getElementById("todoList")
  let header = document.getElementById("header")
  
  
  
function count() {
  const counterText = document.getElementById("counter")
 

  const listItems= Array.from(document.getElementById('todoList').children)

    const count = listItems.length
  counterText.textContent = count
}
 
  function newTask() {
    const task = document.createElement("li")
    
   
    const taskWrapper = document.createElement("span")
    
    task.setAttribute('id', 'task')
    task.setAttribute("contenteditable", "true")
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
    wrapper.className = "close m-5 justify-items-end font-bold text-xl";
    
  
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


function edit() {
  task.setAttribute("contenteditable", "true")
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