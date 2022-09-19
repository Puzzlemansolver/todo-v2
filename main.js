const taskInput = document.querySelector(".head input"),
filters = document.querySelectorAll(".controls span"),
clearAll= document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-list");
let editId;
let isEditedTask =false;
let todos = JSON.parse(localStorage.getItem("todo-list"));//get local storage



showTodo("all");

filters.forEach(btn =>{
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});
function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e =>{
        if(e.target.tagName !="I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    });
    

}
function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask=true;
    taskInput.value= taskName;
}

function deleteTask(deletedId){
    todos.splice(deletedId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos)); 
    showTodo("all");
}

function updateStatus(selectedTask){
    //getting paragraph that contains task name
    // document.getElementById("myList").lastChild.innerHTML;
    let taskName= selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
        console.log(todos[selectedTask.id].status);
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status ="pending";
    
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if(e.key =="Enter" && userTask){
        if(!isEditedTask){ // if is editdTas isfalse
            if(!todos){// if to do isnt exist, pass an empty array to todos
            todos= [];
            }

        let taskInfo = {name:userTask, status:"pending"};
        todos.push(taskInfo);//add new task

        } else{
            isEditedTask=false;
            todos[editId].name= userTask;
        }
    
        taskInput.value="";
    
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
});


clearAll.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});

function showTodo(filter){
    let li ="";
    if(todos){
        todos.forEach((todo, id) => {
            // iftodo status is completed, set status to completed to checked
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if(filter == todo.status || filter=="all"){
                li += `<li class="task-item">
                <label  for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}"> ${todo.name}</p>
                </label>
                <div class="settings">
                    <i  onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                    <ul  class="task-menu">
                        <li onclick ="editTask(${id},'${todo.name}')"><i class="fa-solid fa-pen-to-square"></i>edit</li>
                        <li onclick ="deleteTask(${id})"><i class="fa-solid fa-trash"></i>delete</li>
                    </ul>
                </div>
            </li>`;
            }
        
    });
    
    }
    taskBox.innerHTML=li || `<span> You don't have task here</span>`;
}
