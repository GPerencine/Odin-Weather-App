// src/tasks/taskModal.js
import { Task, renderTask, addTask, updateTask } from "./taskManager.js";
import { currentProjectId } from "../projects/projectManager.js";

const taskModal = document.querySelector("#task-modal");
const btnCloseModal = document.querySelector("#btn-close-task-modal");
const taskForm = document.querySelector("#task-form");
const modalTitle = document.querySelector("#task-modal h3");

document.addEventListener("click", (event) => {
  if (event.target.closest("#addTask")) {
    modalTitle.textContent = "Add new task";
    delete taskForm.dataset.editingId;
    taskForm.reset();
    taskModal.showModal();
  }
});

btnCloseModal.addEventListener("click", () => taskModal.close());

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskForm.querySelector("#title").value;
  const description = taskForm.querySelector("#description").value;
  const dueDate = taskForm.querySelector("#due-date").value;
  const priority = taskForm.querySelector(
    'input[name="priority"]:checked',
  ).value;

  if (modalTitle.textContent === "Add new task") {
    const task = new Task(
      title,
      description,
      dueDate,
      priority,
      currentProjectId,
    );
    addTask(task);
    renderTask(task);
  } else {
    updateTask(taskForm.dataset.editingId, {
      title,
      description,
      dueDate,
      priority,
    });
    delete taskForm.dataset.editingId;
  }

  taskModal.close();
  taskForm.reset();
});
