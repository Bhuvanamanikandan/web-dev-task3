document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    addButton.addEventListener('click', addTask);
    loadTasksFromLocalStorage();
});

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskValue = taskInput.value.trim();
    if (taskValue === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskValue, 'pending');
    taskInput.value = '';
    saveTasksToLocalStorage();
}

function createTaskElement(taskText, status) {
    const taskList = status === 'pending' ? document.getElementById('task-list') : document.getElementById('completed-tasks');
    const li = document.createElement('li');
    li.className = 'task ' + status;
    li.dataset.status = status;
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-task-btn">&times;</button>
        ${status === 'pending' ? '<button class="toggle-status-btn"><i class="fas fa-check"></i></button>' : ''}
    `;

    if (status === 'pending') {
        li.querySelector('.toggle-status-btn').addEventListener('click', () => toggleTaskStatus(li, taskText));
    }
    li.querySelector('.delete-task-btn').addEventListener('click', () => {
        li.remove();
        saveTasksToLocalStorage();
    });

    taskList.appendChild(li);
}

function toggleTaskStatus(task, taskText) {
    // Instead of moving to completed, remove the task
    task.remove();
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        const text = task.querySelector('.task-text').textContent;
        const status = task.dataset.status;
        tasks.push({ text, status });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.status);
    });
}
