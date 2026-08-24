// src/projects/project.js
import { projects, renderProject } from "./projectManager.js";
export { loadProjects };

function loadProjects() {
  const projectList = document.querySelector("#project-list");

  projectList.innerHTML = "";
  projects.forEach((project) => renderProject(project));
}
