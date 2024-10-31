import Project from "./project"
import Task from "./task"

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

    const unsorted = document.createElement('button')
    unsorted.setAttribute('class', 'nav-btn')
    unsorted.textContent = "Unsorted Tasks"
    btnWrapper.appendChild(unsorted)

    // projects section //

    const projects = document.createElement('h2')
    projects.textContent = "My Projects"
    sidebar.appendChild(projects)

    const newProj = document.createElement('button')
    newProj.setAttribute('id', 'new-project-btn')
    newProj.textContent = "+ Project"
    sidebar.appendChild(newProj)

    const projList = document.createElement('div')
    projList.setAttribute('class', 'project-list')
    sidebar.appendChild(projList)

    ///// test projects ///// 

    const test1 = document.createElement('button')
    test1.textContent = "Project one"
    test1.setAttribute('class', 'project-btn')
    projList.appendChild(test1)

    const test2 = document.createElement('button')
    test2.textContent = "Project two"
    test2.setAttribute('class', 'project-btn')
    projList.appendChild(test2)

    ////////

    //main content//

    const main = document.createElement('main')
    container.appendChild(main)
    const header = document.createElement('header')

    const content = document.createElement('div')
    content.setAttribute('id', 'content')

    //content.textContent = "Here's the content"

    const pageTitle = document.createElement('h1')
    //pageTitle.textContent = 'Page Title'
    const newTask = document.createElement('button')
    newTask.textContent = '+ New Task'
    newTask.setAttribute('id', 'new-task-btn')

    main.appendChild(header)
    main.appendChild(content)
    header.appendChild(pageTitle)
    header.appendChild(newTask)

    // handle click // 

    today.addEventListener('click', () => {
        pageTitle.textContent = "Today's Tasks"
        content.textContent = "Here's today's tasks"
    })

    unsorted.addEventListener('click', () => {
        pageTitle.textContent = "Unsorted Tasks"
        content.textContent = "Here's your unsorted tasks"
    })

    const myProjects = document.getElementsByClassName('project-btn')
    for (let btn of myProjects) {
        btn.addEventListener('click', () => {
            pageTitle.textContent = btn.textContent
            content.textContent = `Here will be ${btn.textContent}'s tasks`
        })
    }



}

export default createHome