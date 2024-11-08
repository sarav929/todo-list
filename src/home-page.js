import createTaskForm from "./task-form"
import createProjectForm from "./project-form"
import { getProjects } from "./storage"
import { renderProjects, renderToday, renderWeek, renderOverdue } from "./render"

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
    today.textContent = "Today"
    btnWrapper.appendChild(today)

    const week = document.createElement('button')
    week.setAttribute('class', 'nav-btn')
    week.textContent = "This Week"
    btnWrapper.appendChild(week)

    const overdue = document.createElement('button')
    overdue.setAttribute('class', 'nav-btn')
    overdue.textContent = "Overdue"
    btnWrapper.appendChild(overdue)



    // projects section //
    
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

    renderProjects(getProjects())

    // nav handle click // 

    newTask.addEventListener('click', () => {
        createTaskForm()
    })

    newProj.addEventListener('click', () => {
        createProjectForm()
    })

    today.addEventListener('click', () => {
        renderToday()
    })

    week.addEventListener('click', () => {
        renderWeek()
    })

    overdue.addEventListener('click', () => {
        renderOverdue()
    })

}



export default createHome