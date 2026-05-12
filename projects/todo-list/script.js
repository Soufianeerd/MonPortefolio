// Task Master Business Logic

// Selectors
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.getElementById('close-modal');
const saveTaskBtn = document.getElementById('save-task');
const taskInput = document.getElementById('task-input');
const taskPriority = document.getElementById('task-priority');
const taskDate = document.getElementById('task-date');

const listToday = document.getElementById('list-today');
const listUpcoming = document.getElementById('list-upcoming');
const countToday = document.getElementById('count-today');
const countPriorities = document.getElementById('count-priorities');
const remainingCount = document.getElementById('remaining-count');

// State
let tasks = JSON.parse(localStorage.getItem('taskmaster_tasks')) || [
    { id: 1, text: "Préparer la présentation", priority: "high", date: "today", completed: false },
    { id: 2, text: "Répondre aux emails", priority: "medium", date: "today", completed: true },
    { id: 3, text: "Réunion avec l'équipe", priority: "high", date: "today", completed: false },
    { id: 4, text: "Mettre à jour le rapport", priority: "low", date: "today", completed: false },
    { id: 5, text: "Planifier le sprint", priority: "none", date: "tomorrow", completed: false },
    { id: 6, text: "Revue de projet", priority: "none", date: "friday", completed: false }
];

// Init
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    setupFilters();
});

// Modal Logic
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    taskInput.focus();
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    taskInput.value = '';
});

saveTaskBtn.addEventListener('click', addTask);

// Task Logic
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text: text,
        priority: taskPriority.value,
        date: taskDate.value,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    modal.style.display = 'none';
    taskInput.value = '';
}

function toggleTask(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('taskmaster_tasks', JSON.stringify(tasks));
}

function renderTasks(filter = 'all') {
    listToday.innerHTML = '';
    listUpcoming.innerHTML = '';
    
    let filteredTasks = tasks;
    if (filter === 'today') filteredTasks = tasks.filter(t => t.date === 'today');
    if (filter === 'priorities') filteredTasks = tasks.filter(t => t.priority !== 'none');
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    const todayTasks = filteredTasks.filter(t => t.date === 'today');
    const upcomingTasks = filteredTasks.filter(t => t.date !== 'today');

    // Section Visibility
    document.querySelector('#list-today').closest('.task-section').style.display = todayTasks.length ? 'block' : 'none';
    document.querySelector('#list-upcoming').closest('.task-section').style.display = upcomingTasks.length ? 'block' : 'none';

    todayTasks.forEach(task => listToday.appendChild(createTaskCard(task)));
    upcomingTasks.forEach(task => listUpcoming.appendChild(createTaskCard(task)));

    updateStats();
}

function createTaskCard(task) {
    const div = document.createElement('div');
    div.className = `task-card ${task.completed ? 'completed' : ''}`;
    
    const priorityLabel = getPriorityLabel(task.priority);
    const dateLabel = getDateLabel(task.date);

    div.innerHTML = `
        <div class="checkbox" onclick="event.stopPropagation(); toggleTask(${task.id})"></div>
        <div class="task-text">${task.text}</div>
        <div class="task-meta">
            ${task.priority !== 'none' ? `<span class="priority-dot ${task.priority}"></span> ${priorityLabel}` : ''}
            ${task.date !== 'today' ? `<span style="margin-left: 12px;">${dateLabel}</span>` : ''}
            <i class="fas fa-trash-alt" style="margin-left: 16px; opacity: 0.3; cursor: pointer;" onclick="event.stopPropagation(); deleteTask(${task.id})"></i>
        </div>
    `;
    
    div.onclick = () => toggleTask(task.id);
    return div;
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function getPriorityLabel(p) {
    const labels = {
        'high': 'Élevée',
        'medium': 'Moyenne',
        'low': 'Basse',
        'none': ''
    };
    return labels[p] || '';
}

function getDateLabel(d) {
    const labels = {
        'today': 'Aujourd\'hui',
        'tomorrow': 'Demain',
        'friday': 'Vendredi',
        'later': 'Plus tard'
    };
    return labels[d] || '';
}

function updateStats() {
    const todayCount = tasks.filter(t => t.date === 'today' && !t.completed).length;
    const priorityCount = tasks.filter(t => t.priority !== 'none' && !t.completed).length;
    const remaining = tasks.filter(t => !t.completed).length;

    countToday.innerText = todayCount;
    countPriorities.innerText = priorityCount;
    remainingCount.innerText = `${remaining} tâche${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}`;
}

function setupFilters() {
    const navItems = document.querySelectorAll('.nav-item, .filter-chip');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = item.getAttribute('data-filter');
            if (!filter) return;

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const title = item.querySelector('span')?.innerText || item.innerText;
            document.getElementById('view-title').innerText = title;
            
            renderTasks(filter);
        });
    });
}
