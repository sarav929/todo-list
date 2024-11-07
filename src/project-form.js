import Project from "./project"
import { renderNewProject, renderProjectPage } from "./render"
import { getProjects, saveProjects } from "./storage"
import { titleValidation } from "./helper"

const createProjectForm = () => {

    const pageTitle = document.getElementById('page-title')
    const content = document.getElementById('content')

    pageTitle.textContent = "Create a new project"
    content.innerHTML = `<form id="project-form"> 
    <label for="project-title">Title:
        <input type="text" id="project-title" required>
    </label>
    <div id="title-error" class="title-error hidden"></div>

    <label for="project-title">Description:
        <input type="text" id="project-description">
    </label>

    <button type="submit">Create project</button>

    </form>`

    const form = document.getElementById('project-form')

    const projTitle = document.getElementById('project-title')
    const message = document.getElementById('title-error')

    titleValidation(projTitle, message)

    const projDescription = document.getElementById("project-description")

    const projectsList = getProjects()

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let newProject = new Project(projTitle.value, projDescription.value)
        projectsList.push(newProject)

        saveProjects(projectsList)
        renderNewProject(newProject)
        renderProjectPage(newProject)
        
        form.reset()
    })

}

export default createProjectForm