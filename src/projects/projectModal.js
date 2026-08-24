// src/projects/projectModal.js
import {
  Project,
  renderProject,
  addProject,
  updateProject,
} from "./projectManager.js";

const projectModal = document.querySelector("#project-modal");
const btnCloseModal = document.querySelector("#btn-close-project-modal");
const projectForm = document.querySelector("#project-form");
const modalTitle = document.querySelector("#project-modal h3");

document.addEventListener("click", (event) => {
  if (event.target.closest("#addProject")) {
    modalTitle.textContent = "Add new project";
    delete projectForm.dataset.editingId;
    projectForm.reset();
    projectModal.showModal();
  }
});

btnCloseModal.addEventListener("click", () => projectModal.close());

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = projectForm.querySelector("#title").value;

  if (modalTitle.textContent === "Add new project") {
    const project = new Project(title);
    addProject(project);
    renderProject(project);
  } else {
    updateProject(projectForm.dataset.editingId, { title });
    delete projectForm.dataset.editingId;
  }

  projectModal.close();
  projectForm.reset();
});
