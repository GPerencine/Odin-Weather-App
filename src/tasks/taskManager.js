// src/tasks/taskManager.js
import { saveToStorage, getFromStorage } from "../storage.js";
export { Task, renderTask, addTask, updateTask, tasks };

const tasks = getFromStorage("tasks");
const taskModal = document.querySelector("#task-modal");
const taskForm = document.querySelector("#task-form");

class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    projectId = null,
    isDone = false,
  ) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.projectId = projectId;
    this.isDone = isDone;
  }
}

function renderTask(task) {
  const tasksContainer = document.querySelector(".tasks-container");

  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");
  taskCard.classList.add(task.priority);
  if (task.isDone) {
    taskCard.classList.add("done");
  }
  taskCard.id = task.id;

  const [year, month, day] = task.dueDate.split("-");

  taskCard.innerHTML = `
        <div class="card-header">
            <input type="checkbox" class="task-checkbox" ${task.isDone ? "checked" : ""}>
            <h3>${task.title}</h3>
            <button class="edit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button>
            <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg></button>
        </div>
        <p>${task.description}</p>
        <p><span>Due date:</span> ${day}/${month}/${year}</p>
        <p><span>Priority:</span> <span class="${task.priority}">${task.priority}</span></p>
    `;

  tasksContainer.appendChild(taskCard);
}

function addTask(task) {
  tasks.push(task);
  saveToStorage("tasks", tasks);
}

function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    saveToStorage("tasks", tasks);
  }
}

function editTask(id) {
  const modalTitle = document.querySelector("#task-modal h3");
  modalTitle.textContent = "Edit task";
  taskForm.dataset.editingId = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);

  taskForm.querySelector("#title").value = tasks[taskIndex].title;
  taskForm.querySelector("#description").value = tasks[taskIndex].description;
  taskForm.querySelector("#due-date").value = tasks[taskIndex].dueDate;
  const priorityRadio = taskForm.querySelector(
    `input[name="priority"][value="${tasks[taskIndex].priority}"]`,
  );
  priorityRadio.checked = true;

  taskModal.showModal();
}

function updateTask(id, updatedValues) {
  const task = tasks.find((task) => task.id === id);
  if (!task) return;

  task.title = updatedValues.title;
  task.description = updatedValues.description;
  task.dueDate = updatedValues.dueDate;
  task.priority = updatedValues.priority;

  saveToStorage("tasks", tasks);

  const card = document.getElementById(id);
  if (!card) return;

  const [year, month, day] = task.dueDate.split("-");

  card.className = `task-card ${task.priority}`;
  card.querySelector("h3").textContent = task.title;
  card.querySelectorAll("p")[0].textContent = task.description;
  card.querySelectorAll("p")[1].innerHTML =
    `<span>Due date:</span> ${day}/${month}/${year}`;
  card.querySelectorAll("p")[2].innerHTML =
    `<span>Priority:</span> <span class="${task.priority}">${task.priority}</span>`;
}

document.addEventListener("click", (event) => {
  const taskCard = event.target.closest(".task-card");
  if (!taskCard) return;
  const taskId = taskCard.id;

  if (event.target.closest(".delete")) {
    deleteTask(taskId);
    taskCard.remove();
  }

  if (event.target.closest(".edit")) {
    editTask(taskId);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.classList.contains("task-checkbox")) {
    const taskCard = event.target.closest(".task-card");
    if (!taskCard) return;

    const task = tasks.find((task) => task.id === taskCard.id);
    if (task) {
      task.isDone = event.target.checked;
      taskCard.classList.toggle("done", task.isDone);
      saveToStorage("tasks", tasks);
    }
  }
});
