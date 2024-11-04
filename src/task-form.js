import Task from "./task"
import createProjectForm from "./project-form"

const createTaskForm = () => {

    let taskList = []

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

    <label for="task-due-date">Project:
        <select name="project" id="project-list">
            <option value="none" selected="selected">None</option>
        </select>
    </label>

    <label for="new-project">or create a new one first:
        <button type="button" id="new-project-for-task">+ New Project</button>
    </label>

    <label for="task-note">Note:
        <textarea name="task-note" id="task-note"></textarea>
    </label>

    <button type="submit">Add task</button>

    </form>`

    // add functionality to form // 

    const form = document.getElementById('task-form')

    const taskTitle = document.getElementById('task-title')

    const taskDueDate = document.getElementById("task-due-date")

    const projectSelect = document.getElementById('project-list')

    const newProj = document.getElementById('new-project-for-task')
    newProj.addEventListener('click', () => {
        createProjectForm()
    })

    const taskNote = document.getElementById('task-note')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let newTask = new Task(taskTitle.value, taskDueDate.value, projectSelect.value, taskNote.value)

        taskList.push(newTask)
        console.log(taskList)

        form.reset()
    })


}

export default createTaskForm