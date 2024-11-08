import createTaskForm from "./task-form"
import createProjectForm from "./project-form"
import { getProjects } from "./storage"
import { renderProjects, renderToday, renderWeek, renderOverdue } from "./render"
import spring from "./icons/spring.png"
import calendarIcon from "./icons/calendar.svg"
import overdueIcon from "./icons/overdue.svg"
import listIcon from "./icons/list.svg"
import plusIcon from "./icons/plus.svg"

const createHome = () => {
    const body = document.querySelector('body')

    const container = document.createElement('div')
    container.setAttribute('class', 'page-container')
    body.appendChild(container)

    // sidebar //

    const sidebar = document.createElement('nav')
    container.appendChild(sidebar)

    const appTitle = document.createElement('div')
    appTitle.setAttribute('class', 'app-title')
    const appName = document.createElement('h1')
    appName.setAttribute('class', 'accent-title')
    const appIcon = document.createElement('img')
    appIcon.src = spring
    appName.innerHTML = ''
    sidebar.appendChild(appTitle)
    appTitle.appendChild(appIcon)
    appTitle.appendChild(appName)


    const btnWrapper = document.createElement('div')
    btnWrapper.setAttribute('class', 'nav-btns')
    sidebar.appendChild(btnWrapper)

    // btns //

    const today = document.createElement('div')
    today.innerHTML = `<img src="${listIcon}" class="nav-icon"> <span>Today</span>`
    today.setAttribute('class', 'nav-btn')
    btnWrapper.appendChild(today)

    const week = document.createElement('div')
    week.innerHTML = `<img src="${calendarIcon}" class="nav-icon"> <span>This week</span>`
    week.setAttribute('class', 'nav-btn')
    btnWrapper.appendChild(week)

    const overdue = document.createElement('div')
    overdue.innerHTML = `<img src="${overdueIcon}" class="nav-icon"> <span>Overdue</span>`
    overdue.setAttribute('class', 'nav-btn')
    btnWrapper.appendChild(overdue)



    // projects section //
    
    const projectsHeader = document.createElement('div')
    projectsHeader.setAttribute('class', 'projects-header')
    projectsHeader.innerHTML = `My Projects <img src="${plusIcon}" id="new-project-btn">`
    sidebar.appendChild(projectsHeader)

    const newProj = document.getElementById('new-project-btn')

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

    const newTask = document.createElement('div')
    newTask.setAttribute('id', 'create-new-task')
    newTask.innerHTML = `<img src="${plusIcon}"> New task`
    newTask.classList.add('hidden')

    main.appendChild(header)
    main.appendChild(content)
    header.appendChild(pageTitle)
    header.appendChild(newTask)
    

    renderProjects(getProjects())

    // nav handle click // 

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