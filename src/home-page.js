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

}

export default createHome