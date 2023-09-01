let todos = [
    {
      todoID: 0,
      todoCategory: "School",
      todoName: "Finish Homework",
      todoCompleteStatus: false,
      todoDate: "1/1/23"
    },

    {
        todoID: 2,
        todoCategory: "Home",
        todoName: "Do Dishes",
        todoCompleteStatus: false,
        todoDate: "3/1/23"
      },

      {
        todoID: 3,
        todoCategory: "Work",
        todoName: "Send Report",
        todoCompleteStatus: false,
        todoDate: "2/1/23"
      },
   
  ];

  let list = document.getElementById("todoList")
  let addTodo = document.getElementById("addTodo")
  

  addTodo.addEventListener("click", function() {
    generateTodo(todos)
  });
  
  let i = 0;
  function generateTodo(newTodo) {  

    if (i < newTodo.length) {
        let todoWrapper = document.createElement("a")
        let todo = document.createElement("li")
        
            todo.innerHTML = newTodo[i]["todoName"]
            todo.className = "todo"
            todoWrapper.appendChild(todo)
            list.appendChild(todoWrapper)
            i++
    } else {
        let todoWrapper = document.createElement("a")
        let todo = document.createElement("li")
        
            todo.innerHTML = "New Task"
            todo.className = "todo"
            todoWrapper.appendChild(todo)
            list.appendChild(todoWrapper)
            i++

    }
    


   /*  for (i = 0; i < newTodo.length; i++) {
        let todo = document.createElement("li")
        todo.innerHTML = newTodo[i]["todoName"]
        list.appendChild(todo)
    }
 */
    
  }

  let todo = document.getElementsByClassName("todo")
  todoWrapper.addEventListener("click", function() {
    todo.style.display = "none";
  })



  
  console.log(todos[0].todoName)