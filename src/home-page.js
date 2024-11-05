import Project from "./project"
import Task from "./task"
import createTaskForm from "./task-form"
import createProjectForm from "./project-form"
import { getProjects } from "./storage"

export function renderNewProject(project) {
    const projectBtn = document.createElement('button')
    projectBtn.setAttribute('class', 'project-btn')
    projectBtn.textContent = project.title
    document.getElementById('project-list').appendChild(projectBtn)
    projectBtn.addEventListener('click', (e) => {
        e.preventDefault()
        renderProjectPage(project)
    })
}

export function renderProjects(projectsList) {

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
            task.isCompletedCheck = true
        } else {
            taskDiv.classList.remove('task-completed')
            task.isCompletedCheck = false
        }
    })

    const name = document.createElement('div')
    name.setAttribute('id', 'task-name')
    name.textContent = task.title
    taskDiv.appendChild(name)

    const date = document.createElement('div')
    name.setAttribute('id', 'task-date')
    date.textContent = task.dueDate
    taskDiv.appendChild(date)

    const note = document.createElement('div')
    name.setAttribute('id', 'task-note')
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

const createHome = () => {
    const body = document.querySelector('body')

    const container = document.createElement('div')
    container.setAttribute('class', 'page-container')
    body.appendChild(container)

    // sidebar //

    const sidebar = document.createElement('nav')
    container.appendChild(sidebar)

    const appName = document.createElement('h1')
    appName.textContent = 'To-do List'
    sidebar.appendChild(appName)

    const btnWrapper = document.createElement('div')
    btnWrapper.setAttribute('class', 'nav-btns')
    sidebar.appendChild(btnWrapper)

    // btns //

    const today = document.createElement('button')
    today.setAttribute('class', 'nav-btn')
    today.textContent = "Today's Tasks"
    btnWrapper.appendChild(today)

    // projects section //

    let projectsList = getProjects()
    
    const projectsHeader = document.createElement('h2')
    projectsHeader.textContent = "My Projects"
    sidebar.appendChild(projectsHeader)

    const newProj = document.createElement('button')
    newProj.setAttribute('id', 'new-project-btn')
    newProj.textContent = "+ Project"
    sidebar.appendChild(newProj)

    const projList = document.createElement('div')
    projList.setAttribute('id', 'project-list')
    sidebar.appendChild(projList)

    renderProjects(projectsList)

    //main content//

    const main = document.createElement('main')
    container.appendChild(main)
    const header = document.createElement('header')

    const content = document.createElement('div')
    content.setAttribute('id', 'content')

    const pageTitle = document.createElement('h1')
    pageTitle.setAttribute('id', 'page-title')

    const newTask = document.createElement('button')
    newTask.textContent = '+ New Task'
    newTask.setAttribute('id', 'new-task-btn')

    main.appendChild(header)
    main.appendChild(content)
    header.appendChild(pageTitle)
    header.appendChild(newTask)

    // nav handle click // 

    newTask.addEventListener('click', () => {
        createTaskForm()
    })

    newProj.addEventListener('click', () => {
        createProjectForm()
    })

    today.addEventListener('click', () => {
        pageTitle.textContent = "Today's Tasks"
        content.textContent = "Here's today's tasks"
    })

    //const myProjects = document.getElementsByClassName('project-btn')
    //for (let btn of myProjects) {
        //btn.addEventListener('click', () => {
            //clear(content)

            //const selectedProject = getProjects().find(project => project.title == btn.textContent)
            
            //pageTitle.textContent = selectedProject.title

            //const descrContainer = document.createElement('div')
            //descrContainer.setAttribute('id', 'description-container')
            //content.appendChild(descrContainer)
            //descrContainer.textContent = selectedProject.description

            //const tasksContainer = document.createElement('div')
            //tasksContainer.setAttribute('id', 'tasks')
            //content.appendChild(tasksContainer)

            //const projectTasks = selectedProject.tasks

            //projectTasks.forEach((task) => {
                //const taskDiv = document.createElement('div')
                //taskDiv.setAttribute('class', 'task-container')
                //taskDiv.innerHTML = `<input type="checkbox">
                //<span>${task.title}</span>
                //<span>Due ${task.dueDate}</span>`

                //tasksContainer.appendChild(taskDiv)
            //})

        //})
    //}

}



export default createHome