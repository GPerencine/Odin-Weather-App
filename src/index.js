// src/index.js
import { loadTasks } from "./tasks/tasks.js";
import "./tasks/taskModal.js";
import { loadNotes } from "./notes/notes.js";
import "./notes/noteModal.js";
import { setCurrentProject } from "./projects/projectManager.js";
import { loadProjects } from "./projects/projects.js";
import "./projects/projectModal.js";
import "./styles.css";
import "./images/preview.png";

const content = document.querySelector("#content");
const projectList = document.querySelector("#project-list");
const btnTasks = document.querySelector("#Tasks");
const btnCalendar = document.querySelector("#calendar");
const btnNotes = document.querySelector("#notes");

content.appendChild(loadTasks());
loadProjects();

btnTasks.addEventListener("click", () => {
  setCurrentProject(null);
  content.innerHTML = "";
  content.appendChild(loadTasks());
});
btnNotes.addEventListener("click", () => {
  content.innerHTML = "";
  content.appendChild(loadNotes());
});

document.querySelector("#project-list").addEventListener("click", (event) => {
  const projectBtn = event.target.closest(".project-item");
  if (!projectBtn || event.target.closest(".edit, .delete")) return;

  const projectId = projectBtn.dataset.id;
  setCurrentProject(projectId);

  content.innerHTML = "";
  content.appendChild(loadTasks());
});
