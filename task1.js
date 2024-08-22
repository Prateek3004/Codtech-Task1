document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');
    const clearButton = document.getElementById('clearButton');

    // Load tasks from local storage
    loadTasks();

    addButton.addEventListener('click', () => {
        const task = input.value.trim();
        if (task) {
            addTodoItem(task);
            input.value = '';
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const task = input.value.trim();
            if (task) {
                addTodoItem(task);
                input.value = '';
            }
        }
    });

    clearButton.addEventListener('click', () => {
        document.querySelectorAll('li.completed').forEach(li => li.remove());
        saveTasks();
    });

    function addTodoItem(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <div class="actions">
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const newTask = prompt('Edit your task:', li.querySelector('.task-text').textContent);
            if (newTask !== null) {
                li.querySelector('.task-text').textContent = newTask.trim();
                saveTasks();
            }
        });

        li.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            saveTasks();
        });

        todoList.appendChild(li);
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="actions">
                    <button class="edit-btn">Edit</button>
                    <button class="remove-btn">Remove</button>
                </div>
            `;
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTasks();
            });

            li.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                const newTask = prompt('Edit your task:', li.querySelector('.task-text').textContent);
                if (newTask !== null) {
                    li.querySelector('.task-text').textContent = newTask.trim();
                    saveTasks();
                }
            });

            li.querySelector('.remove-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                li.remove();
                saveTasks();
            });

            todoList.appendChild(li);
        });
    }
});
