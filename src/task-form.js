import Task from "./task"
import { getProjects, saveProjects} from "./storage"
import { renderProjects, renderProjectPage } from "./render"
import { convertDate } from "./storage"
import { parse, isFuture } from "date-fns"

// check if date is future when setting dueDate // 

export function isDateInFuture(date, dateFormat) {
    const parsedDate = parse(date, dateFormat, new Date());
    return isFuture(parsedDate);
}

export function dateValidation(input, message) {
    input.addEventListener('input', () => {

        if (!isDateInFuture(input.value, 'yyyy-MM-dd')) {
            message.classList.remove('hidden')
            message.textContent = 'Select a future date for your task!'
        } else {
            message.classList.add('hidden') 
        }  
    })
}

/////

const createTaskForm = () => {

    const pageTitle = document.getElementById('page-title')
    const content = document.getElementById('content')

    pageTitle.textContent = "Create a new task"
    content.innerHTML = `<form id="task-form"> 
    <label for="task-title">Title:
        <input type="text" id="task-title" required>
    </label>

    <label for="task-due-date">Due date:
        <input type="date" id="task-due-date" required>
    </label>
    <div id="future-date-error" class="error-message hidden"></div>

    <label for="task-project">Project:
        <select name="project" id="project-selection">
        </select>
    </label>

    <label for="task-note">Note:
        <textarea name="task-note" id="task-note"></textarea>
    </label>

    <button type="submit">Add task</button>

    </form>`

    // add functionality to form // 

    const form = document.getElementById('task-form')

    const taskTitle = document.getElementById('task-title')

    const taskDueDate = document.getElementById('task-due-date')

    const message = document.getElementById('future-date-error')
    dateValidation(taskDueDate, message)

    //taskDueDate.addEventListener('input', () => {

        //if (!isDateInFuture(taskDueDate.value, 'yyyy-MM-dd')) {
            //message.classList.remove('hidden')
            //message.textContent = 'Select a future date for your task!'
        //} else {
            //message.classList.add('hidden') 
        //}  
    //})



    const projectSelect = document.getElementById('project-selection')

    let projectsList = getProjects()

    projectsList.forEach((project) => {
        const option = document.createElement('option')
        option.setAttribute('value', project.title)
        option.textContent = project.title
        projectSelect.appendChild(option)
    }) 

    const taskNote = document.getElementById('task-note')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (!isDateInFuture(taskDueDate.value, 'yyyy-MM-dd')) {
            return
        }

        let newTask = new Task(taskTitle.value, convertDate(taskDueDate.value, 'yyyy-MM-dd'), projectSelect.value, taskNote.value)
        const assignedProject = projectsList.find(project => project.title == projectSelect.value)
        assignedProject.addTask(newTask)

        saveProjects(projectsList)
        form.reset()
        renderProjects(projectsList)
        renderProjectPage(assignedProject)
        
    })
}

export default createTaskForm