let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskListContainer = document.getElementById('task-list');
const taskCounter = document.getElementById('task-counter');
const filterBtns = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false
    });

    taskInput.value = '';
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}


function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}


function renderTasks() {
    taskListContainer.innerHTML = '';

    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        taskListContainer.innerHTML = `<div style="text-align:center; color:#777;">No tasks yet. Add your first task!</div>`;
    } else {
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.style.cssText = "display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid #eee; margin-bottom: 8px; border-radius: 6px; background: #fafafa;";
            
            taskItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                    <span style="${task.completed ? 'text-decoration: line-through; color: #888;' : ''}">${task.text}</span>
                </div>
                <button onclick="deleteTask(${task.id})" style="background: none; border: none; color: #ff4d4f; cursor: pointer; font-size: 18px; font-weight: bold; padding: 0 5px;" title="Delete task">&times;</button>
            `;

            taskListContainer.appendChild(taskItem);
        });
    }

    const remainingCount = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${remainingCount} remaining`;
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
    });
});

renderTasks();