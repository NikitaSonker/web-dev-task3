document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('add-task-button');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.setAttribute('data-index', index);
            taskItem.innerHTML = `
                <span class="task-name ${task.completed ? 'completed' : ''}" onclick="toggleCompleted(${index})">${task.name}</span>
                <div class="task-actions">
                    <button class="edit-button">Edit</button>
                    <button class="delete-button">Delete</button>
                    <button class="priority-button">${task.priority === 'high' ? 'High' : 'Low'}</button>
                    <button class="status-button">${task.completed ? 'Completed' : 'Pending'}</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    }

    renderTasks();

    function addTask() {
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            const task = { name: taskName, completed: false, priority: 'low' }; // Default priority is low
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            taskInput.value = '';
        }
    }

    function toggleCompleted(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function editTask(index) {
        const newName = prompt('Edit Task:', tasks[index].name);
        if (newName !== null) {
            tasks[index].name = newName.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    function deleteTask(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    function togglePriority(index) {
        tasks[index].priority = tasks[index].priority === 'high' ? 'low' : 'high';
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function toggleStatus(index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);

    document.addEventListener('click', event => {
        if (event.target.classList.contains('edit-button')) {
            const taskIndex = event.target.closest('.task-item').dataset.index;
            editTask(taskIndex);
        }

        if (event.target.classList.contains('delete-button')) {
            const taskIndex = event.target.closest('.task-item').dataset.index;
            deleteTask(taskIndex);
        }

        if (event.target.classList.contains('priority-button')) {
            const taskIndex = event.target.closest('.task-item').dataset.index;
            togglePriority(taskIndex);
        }

        if (event.target.classList.contains('status-button')) {
            const taskIndex = event.target.closest('.task-item').dataset.index;
            toggleStatus(taskIndex);
        }
    });
});



