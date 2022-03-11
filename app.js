// Selectors

const todoinput = document.querySelector(".todo-input");
const todobutton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const filtertodo = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', gettodos); 
todobutton.addEventListener('click', addtodo);
todolist.addEventListener('click', deleteItem);
filtertodo.addEventListener('click', filteroption);

// Functions

function addtodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // Todo Div
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo');
    // Create Li
    const newtodo = document.createElement('li');
    newtodo.innerText = todoinput.value;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
    // Add Todo To Localstarage
    SaveLocalTodos(todoinput.value);
    // Check Mark Button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML = '<i class="fas fa-check"></i>';
    completedbutton.classList.add('complete-btn');
    tododiv.appendChild(completedbutton);
    // Check Trash Button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add('delete-btn');
    tododiv.appendChild(trashbutton);
    todolist.appendChild(tododiv);
    // Clear Todoinput Value
    todoinput.value = "";
}

function deleteItem(event) {
    const element = event.target;
    // DELETE TODO
    if (element.classList[0] === "delete-btn") {
        const todo = element.parentElement;
        // Animation
        todo.classList.add("fall");
        removelocaltodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }


    // CHECK MARK
    if (element.classList[0] === "complete-btn") {
        const todo = element.parentElement;
        todo.classList.toggle("completed");
    }
}

function filteroption(e) {
    const todos = todolist.childNodes;
    todos.forEach(function(todo){
        // switch(e.target.value){
        //     case"all":
        //     todo.style.display = 'flex';
        //     break;
        //     case"completed":
        //     if(todo.classList.contains('completed')){
        //         todo.style.display = 'flex';
        //     }else{
        //         todo.style.display = 'none';
        //     }
        //     break;
        //     case"uncompleted":
        //     if(!todo.classList.contains('completed')){
        //         todo.style.display = 'flex';
        //     }else{
        //         todo.style.display = 'none';
        //     }
        //     break;
        // }

        if (e.target.value === 'all') {
            todo.style.display = 'flex';
        } else if(e.target.value === "completed") {
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }else{
                todo.style.display = 'none';
            }
        } else if(e.target.value === "uncompleted") {
            if(!todo.classList.contains('completed')){
                todo.style.display = 'flex';
            }else{
                todo.style.display = 'none';
            }
        }
    });
}


function SaveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}


function gettodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
    // Todo Div
    const tododiv = document.createElement('div');
    tododiv.classList.add('todo');
    // Create Li
    const newtodo = document.createElement('li');
    newtodo.innerText = todo;
    newtodo.classList.add('todo-item');
    tododiv.appendChild(newtodo);
    
    // Check Mark Button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML = '<i class="fas fa-check"></i>';
    completedbutton.classList.add('complete-btn');
    tododiv.appendChild(completedbutton);
    // Check Trash Button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add('delete-btn');
    tododiv.appendChild(trashbutton);
    todolist.appendChild(tododiv);
    
    });

}


function removelocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []; 
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }  
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos)); 
}