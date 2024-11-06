import { getProjects, saveProjects } from "./storage"
import editImg from "../src/icons/edit.svg"
import expandImg from "../src/icons/expand.svg"
import { dateValidation, isDateInFuture } from "./task-form"
import { formatDate } from "./storage"

export function renderNewProject(project) {
    const projectBtn = document.createElement('button')
    projectBtn.setAttribute('class', 'project-btn')
    projectBtn.textContent = project.title
    document.getElementById('project-list').appendChild(projectBtn)
    projectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectsList = getProjects();
        const latestProject = projectsList.find(proj => proj.title === project.title);

        if (latestProject) {
            renderProjectPage(latestProject);
        }
    })
}

export function renderProjects(projectsList) {

    clear(document.getElementById('project-list'))

    projectsList.forEach((project) => {
        renderNewProject(project)
    });
}

export function renderProjectPage(project) {
    const title = document.getElementById('page-title')
    
    title.textContent = project.title

    const editIcon = document.createElement('img')
    editIcon.setAttribute('id', 'edit-task')
    editIcon.src = editImg
    title.appendChild(editIcon)
    editIcon.addEventListener('click', () => {
        renderProjectEditModal(project)
    })

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

    const collapsed = document.createElement('div')
    collapsed.setAttribute('class', 'collapsed')
    taskDiv.appendChild(collapsed)

    const taskInfo = document.createElement('div')
    taskInfo.setAttribute('class', 'task-info')

    const isCompletedCheck = document.createElement('input')
    isCompletedCheck.setAttribute('type', 'checkbox')
    collapsed.appendChild(isCompletedCheck)

    // mark as complete/not complete // 

    isCompletedCheck.addEventListener('change', () => {
        if (isCompletedCheck.checked) {
            taskDiv.classList.add('task-completed')
            task.updateTaskInfo("isCompleted", true)
        } else {
            taskDiv.classList.remove('task-completed')
            task.updateTaskInfo("isCompleted", false)
        }
    })

    collapsed.appendChild(taskInfo)

    const name = document.createElement('div')
    name.setAttribute('class', 'task-name')
    name.textContent = task.title
    taskInfo.appendChild(name)

    const date = document.createElement('div')
    name.setAttribute('class', 'task-date')
    date.textContent = formatDate(task.dueDate)
    taskInfo.appendChild(date)


    // delete & edit //

    const icons = document.createElement('div')
    icons.setAttribute('class', 'actions')
    collapsed.appendChild(icons)

    const expandIcon = document.createElement('img')
    expandIcon.setAttribute('id', 'expand-task')
    expandIcon.src = expandImg
    icons.appendChild(expandIcon)
    if (task.note == '') {
        expandIcon.style.visibility = 'hidden'
    } else {
        const expanded = document.createElement('div')
        expanded.setAttribute('class', 'expanded')
        taskDiv.appendChild(expanded)
        const note = document.createElement('div')
        name.setAttribute('class', 'task-note')
        note.textContent = task.note
        expanded.appendChild(note)

        expandIcon.addEventListener('click', () => {
            if (expanded.style.display == 'none') {
                expanded.style.display = 'block'
            } else {
                expanded.style.display = 'none'
            }      
        })
    }

    const editIcon = document.createElement('img')
    editIcon.setAttribute('id', 'edit-task')
    editIcon.src = editImg
    icons.appendChild(editIcon)

    editIcon.addEventListener('click', () => {
        renderTaskEditModal(task)
    })
}

function renderTaskEditModal(task) {
    const body = document.querySelector('body')
    const dialog = document.createElement('dialog')
    body.appendChild(dialog)
    dialog.showModal()

    const closeDialog = document.createElement('div')
    closeDialog.textContent = 'X'
    dialog.appendChild(closeDialog)
    closeDialog.addEventListener('click', () => {
        dialog.close()
        body.removeChild(dialog)
    });

    const title = document.createElement('h1')
    title.textContent = "Edit this task"
    dialog.appendChild(title);

    const editForm = document.createElement('form')
    editForm.setAttribute('id', 'task-edit-form')
    dialog.appendChild(editForm)

    editForm.innerHTML = `
        <label for="task-new-title">Title:
            <input type="text" id="task-new-title" value="${task.title}" required>
        </label>
        <label for="task-new-due-date">Due date:
            <input type="date" id="task-new-due-date" value="${task.dueDate}" required>
        </label>
        <div id="future-date-error" class="error-message hidden"></div>
        <label for="task-new-note">Note:
            <textarea name="task-note" id="task-new-note">${task.note}</textarea>
        </label>
        <button type="button">Delete task</button>
        <button type="submit">Save</button>`

    const taskNewTitle = document.getElementById('task-new-title')
    const taskNewDate = document.getElementById('task-new-due-date')
    const taskNewNote = document.getElementById('task-new-note')
    const message = document.getElementById('future-date-error')
    
    dateValidation(taskNewDate, message)

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!isDateInFuture(taskNewDate.value, 'yyyy-MM-dd')) {
            return
        }

        const projectsList = getProjects();
        const assignedProject = projectsList.find(project => project.title === task.project)

        if (assignedProject) {
            const storageTask = assignedProject.tasks.find(t => t.id === task.id)

            if (storageTask) {
                storageTask.title = taskNewTitle.value
                storageTask.dueDate = taskNewDate.value
                storageTask.note = taskNewNote.value

                saveProjects(projectsList)

                dialog.close()
                body.removeChild(dialog)
                renderProjectPage(assignedProject)
            }
        }
    })
}

function renderProjectEditModal(project) {
    
}


export function clear(element) {
    element.innerHTML = ''
}

