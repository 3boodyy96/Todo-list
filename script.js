// select the elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const todoListImg = document.getElementById('To-do-list-img');
const todosCounter = document.getElementById('todos-counter');
const todoCountSpan = document.getElementById('todo-count');

// function to hide image and update todos counter
const hideImageAndTodosCounter = () =>
{
    todoList.children.length === 0 ? 
    todoListImg.style.display = 'block' : todoListImg.style.display = 'none';
    // update todos counter
    todosCounter.style.display = todoList.children.length === 0 ? 'none' : 'block';
}


// function to update todos counter

const updateTodosCounter = () => 
{
    const totalTodos = todoList.children.length;
    const completedTodos = todoList.querySelectorAll('input[type="checkbox"]:checked').length;
    todoCountSpan.textContent = completedTodos +"/"+ totalTodos;
    if (totalTodos === completedTodos && totalTodos !== 0)
    {
        alert("Congratulations! You have completed all your todos!");
    }
}

// add event listener to update counter on checkbox change
todoList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        updateTodosCounter();
    }
});

// function to add a new todo


    addTodoBtn.addEventListener('click', () => {
            let todoText = todoInput.value.trim();
    if (todoText !== "") {
        todoList.innerHTML += `
        <div class="todo-items backdrop-blur-md rounded-xl p-2">
            <li class="flex items-center gap-2 p-2">
                <input type="checkbox" class="w-4 h-4">
                <span>${todoText}</span>
                <button class="delete-btn ml-auto hover:scale-125 transition ease-in-out">
                    <image src="images/delete icon.png" class="w-10 h-10">
                </button>
            </li>
        </div>`;
        todoInput.value = "";
        hideImageAndTodosCounter();
        updateTodosCounter();
    }
});



// allow adding todo with Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoBtn.click();
    }
});


// delete todo when button is clicked
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn') || e.target.parentElement.classList.contains('delete-btn')) {
        const todoItem = e.target.closest('.todo-items');
        todoList.removeChild(todoItem);
        hideImageAndTodosCounter();
    }
});


// todos counter
