import createHome from "./home-page"
import createToday from "./today-page"
import createUpcoming from "./upcoming-page"
import createMyProject from "./project-page"

const createSidebar = () => {

    const nav = document.createElement('nav')
    const body = document.querySelector('body')

    body.appendChild(nav)

    const home = document.createElement('button')
    home.textContent = 'Home'
    home.addEventListener('click', createHome)

    const today = document.createElement('button')
    today.textContent = 'Today'
    today.addEventListener('click', createToday)

    const upcoming = document.createElement('button')
    upcoming.textContent = 'Upcoming'
    upcoming.addEventListener('click', createUpcoming)

    const myProjects = document.createElement('button')
    myProjects.textContent = 'My Projects'
    myProjects.addEventListener('click', createMyProject)

    nav.appendChild(home)
    nav.appendChild(today)
    nav.appendChild(upcoming)
    nav.appendChild(myProjects)
    
}

export default createSidebar