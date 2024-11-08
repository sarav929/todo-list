import Task from "./task"

import { getProjects, saveProjects} from "./storage"
import { renderProjects, renderProjectPage } from "./render"
import { isDateInFuture, dateValidation, convertToDateObj } from "./helper"

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


    <label for="project-selection">Project:

        <select name="project" id="project-selection">
        </select>
    </label>

    <label for="task-note">Note:
        <textarea name="task-note" id="task-note"></textarea>
    </label>

    <label for="task-priority">Priority:
        <select name="priority" id="task-priority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
    </label>

    <button type="submit" id="submit-btn">Add task</button>

    </form>`

    // add functionality to form // 

    const form = document.getElementById('task-form')
    const taskTitle = document.getElementById('task-title')
    const taskDueDate = document.getElementById('task-due-date')
    const taskPriority = document.getElementById('task-priority')
    const message = document.getElementById('future-date-error')
    const submitBtn = document.getElementById('submit-btn')

    dateValidation(taskDueDate, message, submitBtn)

    const projectSelect = document.getElementById('project-selection')
    const projectsList = getProjects()

    projectsList.forEach((project) => {
        const option = document.createElement('option')
        option.setAttribute('value', project.title)
        option.textContent = project.title
        projectSelect.appendChild(option)
    }) 

    const taskNote = document.getElementById('task-note')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
      
        let newTask = new Task(taskTitle.value, convertToDateObj(taskDueDate.value), projectSelect.value, taskNote.value, taskPriority.value, false)
        
        const assignedProject = projectsList.find(project => project.title == projectSelect.value)
        assignedProject.addTask(newTask)

        saveProjects(projectsList)
        form.reset()
        renderProjects(projectsList)
        renderProjectPage(assignedProject)
        
    })
}

export default createTaskForm