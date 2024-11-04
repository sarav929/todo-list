import Project from "./project"

const createProjectForm = () => {
    let projectsList = []

    const pageTitle = document.getElementById('page-title')
    const content = document.getElementById('content')

    pageTitle.textContent = "Create a new project"
    content.innerHTML = `<form id="project-form"> 
    <label for="project-title">Title:
        <input type="text" id="project-title" required>
    </label>

    <label for="project-title">Description:
        <input type="text" id="project-description">
    </label>

    <button type="submit">Add task</button>

    </form>`

    const form = document.getElementById('project-form')

    const projTitle = document.getElementById('project-title')

    const projDescription = document.getElementById("project-description")

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        let newProject = new Project(projTitle.value, projDescription.value)

        projectsList.push(newProject)

        console.log(projectsList)
    })

}

export default createProjectForm