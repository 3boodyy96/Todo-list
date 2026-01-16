// select the elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');

// function to add a new todo


addTodoBtn.addEventListener('click', () => {
    let todoText = todoInput.value.trim();
    if (todoText !== "") {
        todoList.innerHTML += `
            <li class="flex items-center gap-2 p-2">
                <input type="checkbox" class="w-4 h-4">
                <span>${todoText}</span>
            </li>`;
        todoInput.value = "";
    }
});



// allow adding todo with Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoBtn.click();
    }
});