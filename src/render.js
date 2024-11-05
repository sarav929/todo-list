import { getProjects } from "./storage"

export function renderNewProject(project) {
    const projectBtn = document.createElement('button')
    projectBtn.setAttribute('class', 'project-btn')
    projectBtn.textContent = project.title
    document.getElementById('project-list').appendChild(projectBtn)
    projectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectsList = getProjects();
        const latestProject = projectsList.find(proj => proj.title === project.title);

        if (latestProject) {
            renderProjectPage(latestProject);
        }
    })
}

export function renderProjects(projectsList) {

    clear(document.getElementById('project-list'))

    projectsList.forEach((project) => {
        renderNewProject(project)
    });
}

export function renderProjectPage(project) {
    const title = document.getElementById('page-title')
    title.textContent = project.title

    const content = document.getElementById('content')
    clear(content)

    const description = document.createElement('div')
    description.setAttribute('id', 'description-container')
    description.textContent = project.description
    content.appendChild(description)

    const tasks = document.createElement('div')
    tasks.setAttribute('id', 'tasks-wrapper')
    content.appendChild(tasks)

    const tasksList = project.tasks

    tasksList.forEach((task) => {
        renderTask(task)
    })
}

export function renderTask(task) {
    const tasks = document.getElementById('tasks-wrapper')
    const taskDiv = document.createElement('div')
    taskDiv.setAttribute('class', 'task')

    tasks.appendChild(taskDiv)

    const isCompletedCheck = document.createElement('input')
    isCompletedCheck.setAttribute('type', 'checkbox')
    taskDiv.appendChild(isCompletedCheck)

    // mark as complete/not complete // 

    isCompletedCheck.addEventListener('change', () => {
        if (isCompletedCheck.checked) {
            taskDiv.classList.add('task-completed')
            task.updateTaskInfo("isCompleted", true)
            console.log(task)
        } else {
            taskDiv.classList.remove('task-completed')
            task.updateTaskInfo("isCompleted", false)
            console.log(task)
        }
    })

    const name = document.createElement('div')
    name.setAttribute('class', 'task-name')
    name.textContent = task.title
    taskDiv.appendChild(name)

    const date = document.createElement('div')
    name.setAttribute('class', 'task-date')
    date.textContent = task.dueDate
    taskDiv.appendChild(date)

    const note = document.createElement('div')
    name.setAttribute('class', 'task-note')
    note.textContent = task.note
    taskDiv.appendChild(note)

    // delete & edit //

    const icons = document.createElement('div')
    icons.setAttribute('class', 'actions')
    taskDiv.appendChild(icons)

    const deleteIcon = document.createElement('button')
    deleteIcon.textContent = 'D'
    icons.appendChild(deleteIcon)

    const editIcon = document.createElement('button')
    editIcon.textContent = 'E'
    icons.appendChild(editIcon)

}

export function clear(element) {
    element.innerHTML = ''
}