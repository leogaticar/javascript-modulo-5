let tasksList = [];
const tasksListElement = document.querySelector("#tasksList tbody");
const addTaskButton = document.querySelector("#addTask");
const todoTask = document.querySelector("#todoTask");
const cuentaTareas = document.querySelector("#cuenta-tareas");
const cuentaRealizadas = document.querySelector("#cuenta-realizadas");

function renderTasks() {
    tasksListElement.innerHTML = tasksList.map(item => 
        `<tr>
            <td>${item.id}</td>
            <td>${item.task}</td>
            <td><input type="checkbox" data-id="${item.id}" ${item.completed ? 'checked' : ''}></td>
            <td><button class="delete" data-id="${item.id}">✕</button></td>
        </tr>`
    ).join('');
    cuentaTareas.textContent = tasksList.length;
    cuentaRealizadas.textContent = tasksList.filter(item => item.completed).length;
}

function addTask() {
    const newTask = todoTask.value.trim();
    if (newTask) {
        const newId = tasksList.length > 0 ? Math.max(...tasksList.map(t => t.id)) + 1 : 1;
        tasksList.push({ id: newId, task: newTask, completed: false });
        todoTask.value = "";
        renderTasks();
    }
}

function deleteTask(id) {
    tasksList = tasksList.filter(item => item.id !== id);
    renderTasks();
}

function toggleTask(id) {
    tasksList = tasksList.map(item => 
        item.id === id ? {...item, completed: !item.completed} : item
    );
    renderTasks();
}

addTaskButton.addEventListener("click", addTask);

tasksListElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        deleteTask(Number(e.target.dataset.id));
    }
});

tasksListElement.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
        toggleTask(Number(e.target.dataset.id));
    }
});


renderTasks();
