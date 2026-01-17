// select the elements
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');
const todoListImg = document.getElementById('To-do-list-img');
const todosCounter = document.getElementById('todos-counter');
const todoCountSpan = document.getElementById('todo-count');

// function for local storage
const saveToLocalStorage = () => {
    localStorage.setItem('todos', todoList.innerHTML);
}

const loadFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todoList.innerHTML = savedTodos;
        hideImageAndTodosCounter();
        updateCounterAndProgressBar();
    }
}

// load todos from local storage on page load
window.addEventListener('load', loadFromLocalStorage);

// function to hide image and update todos counter
const hideImageAndTodosCounter = () => {
    todoList.children.length === 0 ?
        todoListImg.style.display = 'block' : todoListImg.style.display = 'none';
    // update todos counter
    todosCounter.style.display = todoList.children.length === 0 ? 'none' : 'block';
}


// function to update progress bar
const updateProgressBar = () => {
    const totalTodos = todoList.children.length;
    const completedTodos = todoList.querySelectorAll('input[type="checkbox"]:checked').length;
    const progressBar = document.getElementById('progress');
    progressBar.max = totalTodos;
    progressBar.value = completedTodos;
    
}
// function to update todos counter and progress bar

const updateCounterAndProgressBar = () => {
    const totalTodos = todoList.children.length;
    const completedTodos = todoList.querySelectorAll('input[type="checkbox"]:checked').length;
    todoCountSpan.textContent = completedTodos + "/" + totalTodos;
    // update progress bar
    updateProgressBar();
    if (totalTodos === completedTodos && totalTodos !== 0) {
        // trigger confetti animation
        const count = 200,
            defaults = {
                origin: { y: 0.7 },
            };

        function fire(particleRatio, opts) {
            confetti(
                Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio),
                })
            );
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }
}

// add event listener to update counter on checkbox change
todoList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        updateCounterAndProgressBar();
        e.target.checked ?
            e.target.parentElement.classList.add('line-through', 'text-gray-400') :
            e.target.parentElement.classList.remove('line-through', 'text-gray-400');
        
    }
});

// save to local storage on any change in todo list
document.addEventListener('change', saveToLocalStorage);
document.addEventListener('click', saveToLocalStorage);
// function to add a new todo


addTodoBtn.addEventListener('click', () => {
    let todoText = todoInput.value.trim();
    if (todoText !== "") {
        todoList.innerHTML += `
        <div class="todo-items backdrop-blur-md rounded-xl p-2">
            <li class="flex items-center gap-2 p-2">
                <input type="checkbox" class="w-4 h-4">
                <span>${todoText}</span>
                <button class="delete-btn focus:outline-none rounded-md hover:scale-125 transition ease-in-out w-10 h-10 p-0">
                    <image src="images/delete icon.png" class="w-10 h-10">
                </button>
            </li>
        </div>`;
        todoInput.value = "";
        hideImageAndTodosCounter();
        updateCounterAndProgressBar();
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


