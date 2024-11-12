import Task from "./task"
import { getProjects, saveProjects} from "./storage"
import { renderProjects, renderProjectPage } from "./render"
import { dateValidation, convertToDateObj } from "./helper"

const createTaskForm = (project) => {

    const pageTitle = document.getElementById('page-title')
    const content = document.getElementById('content')
    const newTask = document.getElementById('create-new-task')
    newTask.classList.add('hidden')

    pageTitle.textContent = `${project.title} » new task`
    content.innerHTML = `<form id="task-form"> 
    <label for="task-title"><p>Title</p>
    <input type="text" id="task-title" maxlength="20" required>
    </label>

    <label for="task-due-date"><p>Due Date</p>
    <input type="date" id="task-due-date" required>
    </label>

    <div id="future-date-error" class="error-message hidden"></div>

    <label for="task-note"><p>Note</p>
    <textarea name="task-note" id="task-note" maxlength="200"></textarea>
    </label>

    <label for="task-priority"><p>Priority</p>
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

    const taskNote = document.getElementById('task-note')

    form.addEventListener('submit', (e) => {
        e.preventDefault()


        const projectsList = getProjects()

        let newTask = new Task(taskTitle.value, convertToDateObj(taskDueDate.value), project.title, taskNote.value, taskPriority.value, false)
        const assignedProject = projectsList.find(p => p.title == project.title)
        assignedProject.addTask(newTask)

        saveProjects(projectsList)
        form.reset()
        renderProjects(projectsList)
        renderProjectPage(assignedProject)
        
    })
}

export default createTaskForm