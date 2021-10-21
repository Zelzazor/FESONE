import { Projects } from './Projects';
import { SVG } from './svg';

const ManipulateDOM = (() => {
    const putProjects = () => {
        const projectsDOM = document.querySelector('.list-projects');
        
        Projects.getAllProjects().forEach((project, index) => {
            let projectDOM = document.createElement("div");
            projectDOM.dataset.id = index;
            projectDOM.classList.add("project");
            let titleDOM = document.createElement("p");
            titleDOM.classList.add("title");
            titleDOM.textContent = project.title;
            let descDOM = document.createElement("p");
            descDOM.classList.add("description");
            descDOM.textContent = project.description;
            projectDOM.appendChild(titleDOM);
            projectDOM.appendChild(descDOM);
            projectDOM.addEventListener("click", () => {
                let projectDetails = document.querySelector(".project-details");
                let todos = document.querySelector(".todos");

                while (projectDetails.firstChild) {
                    projectDetails.removeChild(projectDetails.lastChild);
                }
                while (todos.firstChild) {
                    todos.removeChild(todos.lastChild);
                }
                projectDetails.appendChild(ProjectFieldsDOM(project, index));
                todos.appendChild(todosDOM(index));
                todos.appendChild(barDOM(index));
            })
            projectsDOM.appendChild(projectDOM);
        });

    }

    const ProjectFieldsDOM = (project, index) => {
        let wrap = document.createElement("div");
        wrap.classList.add("project-options");
        let info = document.createElement("div");
        info.classList.add("project-info");
        let wrapbuttons = document.createElement("div");
        wrapbuttons.classList.add("project-buttons");
        let title = document.createElement("h1");
        title.textContent = project.title;
        let btnEdit = document.createElement("button");
        let btnDelete = document.createElement("button");
        btnEdit.id = "btnEdit";
        btnDelete.id = "btnDelete";
        btnEdit.innerHTML = SVG.editBtn();
        btnDelete.innerHTML = SVG.deleteBtn();

        // Edit Button Action

        btnEdit.addEventListener("click", () => {

            const projectsDOM = document.querySelector(".list-projects");
            document.querySelector("#btnAddProject").classList.add("hidden");
            document.querySelector("#btnBackProject").classList.remove("hidden");
            while (projectsDOM.firstChild) {
                projectsDOM.removeChild(projectsDOM.lastChild);
            }
            projectsDOM.appendChild(EditProjectDOM(project, index));

        })

        // Delete Button Action

        btnDelete.addEventListener("click", () => {
            Projects.removeProject(index);
            let todos = document.querySelector(".todos");
            while (wrap.firstChild) {
                wrap.removeChild(wrap.lastChild);
            }
            while (todos.firstChild) {
                todos.removeChild(todos.lastChild);
            }
            reloadProjects();
        });
        info.appendChild(title);
        wrapbuttons.appendChild(btnEdit);
        wrapbuttons.appendChild(btnDelete);
        wrap.appendChild(info);
        wrap.appendChild(wrapbuttons);
        return wrap;
    }
})();