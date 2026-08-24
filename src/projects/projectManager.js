// src/projects/projectManager.js
import { saveToStorage, getFromStorage } from "../storage.js";
import { tasks } from "../tasks/taskManager.js";
export {
  Project,
  renderProject,
  addProject,
  updateProject,
  projects,
  currentProjectId,
  setCurrentProject,
};

const projects = getFromStorage("projects");
const projectModal = document.querySelector("#project-modal");
const projectForm = document.querySelector("#project-form");

class Project {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
  }
}

function renderProject(project) {
  const projectList = document.querySelector("#project-list");

  const projectBtn = document.createElement("button");
  projectBtn.classList.add("nav-button", "project-item");
  projectBtn.dataset.id = project.id;
  projectBtn.innerHTML = `
        ${project.title}<span><button class="edit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button><button class="delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg></button></span>
    `;

  projectList.appendChild(projectBtn);
}

function addProject(project) {
  projects.push(project);
  saveToStorage("projects", projects);
}

function deleteProject(id) {
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex > -1) {
    projects.splice(projectIndex, 1);
    saveToStorage("projects", projects);

    for (let i = tasks.length - 1; i >= 0; i--) {
      if (tasks[i].projectId === id) {
        tasks.splice(i, 1);
      }
    }
    saveToStorage("tasks", tasks);
  }
}

function editProject(id) {
  const modalTitle = document.querySelector("#project-modal h3");
  modalTitle.textContent = "Edit project";
  projectForm.dataset.editingId = id;
  const projectIndex = projects.findIndex((project) => project.id === id);

  projectForm.querySelector("#title").value = projects[projectIndex].title;

  projectModal.showModal();
}

function updateProject(id, updatedValues) {
  const project = projects.find((project) => project.id === id);
  if (!project) return;

  project.title = updatedValues.title;
  saveToStorage("projects", projects);

  const btn = document.querySelector(`.project-item[data-id="${id}"]`);
  if (!btn) return;

  btn.innerHTML = `
        ${project.title}<span><button class="edit"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg></button><button class="delete"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg></button></span>
    `;
}

document.addEventListener("click", (event) => {
  const projectItem = event.target.closest(".project-item");
  if (!projectItem) return;

  const projectId = projectItem.dataset.id;

  if (event.target.closest(".delete")) {
    deleteProject(projectId);
    projectItem.remove();
  }

  if (event.target.closest(".edit")) {
    editProject(projectId);
  }
});

let currentProjectId = null;

function setCurrentProject(id) {
  currentProjectId = id;
}
