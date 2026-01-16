// select the elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const todoListImg = document.getElementById('To-do-list-img');

// hide image when todo is added
const hideImage = () =>
{
    if (todoList.children.length > 0) {
        todoListImg.style.display = 'none';
    } else {
        todoListImg.style.display = 'block';
    }
}


// function to add a new todo


    addTodoBtn.addEventListener('click', () => {
            let todoText = todoInput.value.trim();
    if (todoText !== "") {
        todoList.innerHTML += `
        <div class="todo-items backdrop-blur-md rounded-xl p-2">
            <li class="flex items-center gap-2 p-2">
                <input type="checkbox" class="w-4 h-4">
                <span>${todoText}</span>
            </li>
        </div>`;
        todoInput.value = "";
        hideImage();
    }
});



// allow adding todo with Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoBtn.click();
    }
});
