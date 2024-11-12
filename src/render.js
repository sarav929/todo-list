import { getProjects, saveProjects } from "./storage"
import createTaskForm from "./task-form"
import { findAssignedProject, findProjectInStorage, findTaskInStorage, clear, formatDate, dateValidation, clearCompletedTasks, getTodayTasks, getWeekTasks, getOverdueTasks, getThisMonthTasks, isDatePast } from "./helper"
import editImg from "../src/icons/edit.svg"
import expandImg from "../src/icons/expand.svg"
import closeIcon from "../src/icons/close.svg"
import saveIcon from "../src/icons/save.svg"
import deleteIcon from "../src/icons/delete.svg"

// render projects and tasks //

export function renderNewProject(project) {
    const projectBtn = document.createElement('div')
    projectBtn.setAttribute('class', 'nav-btn project-btn')
    projectBtn.innerHTML = '<span class="bullet-point">•</span>' + project.title
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

    if (projectsList.length == 0) {
        const content = document.getElementById('content')
        const emptyMessage = document.createElement('div')
        emptyMessage.setAttribute('class', 'empty-message')
        emptyMessage.textContent = "No projects. You're all caught up!"
        content.appendChild(emptyMessage)
    }

    clear(document.getElementById('project-list'))

    projectsList.forEach((project) => {
        renderNewProject(project)
    });
}

export function renderProjectPage(project) {
    const header = document.querySelector('header')
    const title = document.getElementById('page-title')
    
    title.textContent = project.title

    const newTask = document.getElementById('create-new-task')
    newTask.classList.remove('hidden')
    newTask.addEventListener('click', () => {
        createTaskForm(project)
    })

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

    const clearTasks = document.createElement('button')
    clearTasks.textContent = 'Clear completed tasks'

    clearTasks.setAttribute('id', 'clear-tasks')
    content.appendChild(clearTasks)

    clearTasks.addEventListener('click', () => {
        clearCompletedTasks(project, getProjects())
        renderProjectPage(findProjectInStorage(project, getProjects()))
    })

    const tasks = document.createElement('div')
    tasks.setAttribute('id', 'tasks-wrapper')
    content.appendChild(tasks)

    const tasksList = project.tasks

    if (tasksList.length == 0) {
        const noTasks = document.createElement('div')
        const emptyMessage = document.createElement('div')
        emptyMessage.setAttribute('class', 'empty-message')
        emptyMessage.textContent = "No tasks. You're all caught up!"
        content.appendChild(emptyMessage)
        content.removeChild(clearTasks)
    }

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

    const label = document.createElement('label')
    label.setAttribute('class', 'checkbox-label')

    const span = document.createElement('span')
    span.setAttribute('class', 'custom-checkbox')

    const isCompletedCheck = document.createElement('input')
    isCompletedCheck.setAttribute('type', 'checkbox')

    label.appendChild(isCompletedCheck)
    label.appendChild(span)

    collapsed.appendChild(label)

    isCompletedCheck.checked = task.isCompleted
    if (isCompletedCheck.checked) {
        taskDiv.classList.add('task-completed')
    }   

    const isOverdue = document.createElement('div')
    isOverdue.setAttribute('class', 'overdue-label')
    collapsed.appendChild(isOverdue)
    isOverdue.classList.add('hidden')

    if (isDatePast(task.dueDate)) {
        isOverdue.classList.remove('hidden')
    }

    collapsed.appendChild(taskInfo)

    const name = document.createElement('div')
    name.setAttribute('class', 'task-name')
    name.textContent = task.title
    taskInfo.appendChild(name)

    const date = document.createElement('div')
    name.setAttribute('class', 'task-date')
    date.textContent = formatDate(task.dueDate)
    taskInfo.appendChild(date)


    // task edit-expand icons //

    const icons = document.createElement('div')
    icons.setAttribute('class', 'actions')
    collapsed.appendChild(icons)

    const expandIcon = document.createElement('img')
    expandIcon.setAttribute('id', 'expand-task')
    expandIcon.src = expandImg
    icons.appendChild(expandIcon)

    if (task.note == '') {
        expandIcon.classList.add('hidden')
    } else {
        const expanded = document.createElement('div')
        expanded.setAttribute('class', 'not-expanded')
        taskDiv.appendChild(expanded)
        const note = document.createElement('div')
        note.setAttribute('class', 'task-note')
        note.textContent = task.note
        expanded.appendChild(note)

        expandIcon.addEventListener('click', () => {
            if (expanded.classList.contains('not-expanded')) {
                expanded.classList.replace('not-expanded', 'expanded')
            } else {
                expanded.classList.replace('expanded', 'not-expanded')
            }      
        })
    }

    switch (task.priority) {
        case "High":
            taskDiv.classList.add('high-priority')
            break
        case "Medium":
            taskDiv.classList.add('medium-priority')
            break
        case "Low":
            taskDiv.classList.add('low-priority')
            break
        default:
            break
    }

    const editIcon = document.createElement('img')
    editIcon.setAttribute('id', 'edit-task')
    editIcon.src = editImg
    icons.appendChild(editIcon)
    
    editIcon.addEventListener('click', () => {
        renderTaskEditModal(task)
    })

    // mark as complete/not complete // 

    isCompletedCheck.addEventListener('change', () => {
        const projectList = getProjects()
        const currentTask = findTaskInStorage(task, projectList)
        if (isCompletedCheck.checked) {
            taskDiv.classList.add('task-completed')
            currentTask.updateTaskInfo("isCompleted", true)
            editIcon.classList.add('disabled')
            expandIcon.classList.add('disabled')
        } else {
            taskDiv.classList.remove('task-completed')
            currentTask.updateTaskInfo("isCompleted", false)
            editIcon.classList.remove('disabled')
            expandIcon.classList.remove('disabled')
        }
        saveProjects(projectList)
    })
}

function renderFilteredTasks(tasks, message) {
    if (tasks.length == 0) {
        const content = document.getElementById('content')
        const emptyMessage = document.createElement('div')
        emptyMessage.setAttribute('class', 'empty-message')
        emptyMessage.textContent = message
        content.appendChild(emptyMessage)
    } else {
        const taskWrap = document.createElement('div')
        taskWrap.setAttribute('id', 'tasks-wrapper')
        content.appendChild(taskWrap)

        tasks.forEach((task) => {
            renderTask(task)
        })
    }
}

// edit - delete modals //

function renderModal() {

    const body = document.querySelector('body')
    const dialog = document.createElement('dialog')
    body.appendChild(dialog)
    dialog.showModal()

    const closeDialog = document.createElement('div')
    closeDialog.innerHTML = `<img src="${closeIcon}">`
    closeDialog.setAttribute('class', 'close-modal')
    dialog.appendChild(closeDialog)
    closeDialog.addEventListener('click', () => {
        dialog.close()
        body.removeChild(dialog)
    });

    const editForm = document.createElement('form')
    editForm.setAttribute('class', 'edit-form')
    dialog.appendChild(editForm)
}

function renderTaskEditModal(task) {
    
    renderModal()
    const body = document.querySelector('body')
    const editForm = document.querySelector('form')
    const dialog = document.querySelector('dialog')
    editForm.setAttribute('id', 'task-edit-form')

    editForm.innerHTML = `<label for="task-new-title"><p>Title</p>
    <input type="text" id="task-new-title" value="${task.title}" maxlength="20" required>
    </label>
    <label for="task-new-due-date"><p>Due Date</p>
    <input type="date" id="task-new-due-date" value="${task.dueDate}" required>
    </label>
    <div id="future-date-error" class="error-message hidden"></div>
    <label for="task-new-note"><p>Note</p>
    <textarea name="task-note" id="task-new-note">${task.note}</textarea>
    </label>
    <label for="task-new-priority"><p>Priority</p>
    <select name="priority" id="task-new-priority">
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    </select>
    </label>
    <div class="modal-btns"><button id="delete-task-btn"><img src="${deleteIcon}" class="btn-icon"> Delete</button>
    <button type="submit"><img src="${saveIcon}" class="btn-icon">Save</button></div>`

    const taskNewTitle = document.getElementById('task-new-title')
    const taskNewDate = document.getElementById('task-new-due-date')
    const taskNewNote = document.getElementById('task-new-note')
    const taskNewPriority = document.getElementById('task-new-priority')

    const options = Array.from(document.querySelectorAll('option'))
    const currentOption = options.find((option) => option.value == task.priority)
    currentOption.selected = true

    const message = document.getElementById('future-date-error')
    const deleteTask = document.getElementById('delete-task-btn')

    const projectsList = getProjects()
    const assignedProject = findAssignedProject(task, projectsList)
    const storageTask = findTaskInStorage(task, projectsList)
    const submitBtn = document.getElementById('submit-btn')
    

    dateValidation(taskNewDate, message, submitBtn)

    deleteTask.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this task?')) {
            assignedProject.removeTask(storageTask)
            saveProjects(projectsList)
            dialog.close()
            body.removeChild(dialog)
            renderProjectPage(assignedProject)
        }
        return
    })

    editForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if (storageTask) {
            storageTask.title = taskNewTitle.value
            storageTask.dueDate = taskNewDate.value
            storageTask.note = taskNewNote.value
            storageTask.priority = taskNewPriority.value
            saveProjects(projectsList)
            dialog.close()
            body.removeChild(dialog)
            renderProjectPage(assignedProject)
        }
    })
}

function renderProjectEditModal(project) {
    renderModal()
    const body = document.querySelector('body')
    const pageTitle = document.getElementById('page-title')
    const content = document.getElementById('content')
    const editForm = document.querySelector('form')
    const dialog = document.querySelector('dialog')
    editForm.setAttribute('id', 'project-edit-form')

    editForm.innerHTML = `<label for="project-new-title"><p>Title</p>
    <input type="text" id="project-new-title" value="${project.title}" maxlength="20" required>
    </label>

    <label for="project-new-description"><p>Description</p>
    <input type="text" id="project-new-description" value="${project.description}">
    </label>

    <div class="modal-btns"><button id="delete-project-btn"><img src="${deleteIcon}" class="btn-icon"> Delete</button>
    <button type="submit"><img src="${saveIcon}" class="btn-icon">Save</button></div>`

    const newProjTitle = document.getElementById('project-new-title')
    const newProjDescr = document.getElementById('project-new-description')
    const deleteProject = document.getElementById('delete-project-btn')

    const projectsList = getProjects()
    const selectedProject = findProjectInStorage(project, projectsList)

    deleteProject.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this project?')) {
            const projectIndex = projectsList.findIndex(p => p.title === project.title)
            if (projectIndex !== -1) {
                projectsList.splice(projectIndex, 1)
                saveProjects(projectsList)
                dialog.close()
                body.removeChild(dialog)
                renderProjects(projectsList)
                clear(pageTitle)
            }
            return
        }
    });

    editForm.addEventListener('submit', (e) => {
        e.preventDefault()
        selectedProject.updateProjInfo('title', newProjTitle.value)
        selectedProject.tasks.forEach((task) => {
            task.updateTaskInfo('project', selectedProject.title)
        })
        selectedProject.updateProjInfo("description", newProjDescr.value)

        saveProjects(projectsList)

        dialog.close()
        body.removeChild(dialog)
        renderProjects(projectsList)
        renderProjectPage(selectedProject)
    }) 
}

// task filtering //

export function renderToday() {
    const content = document.getElementById('content')
    clear(content)
    const title = document.getElementById('page-title')
    title.textContent = "Today's tasks"

    const todayTasks = getTodayTasks(getProjects())
    renderFilteredTasks(todayTasks, 'No tasks are due today.')
}

export function renderWeek() {
    const content = document.getElementById('content')
    clear(content)
    const title = document.getElementById('page-title')
    title.textContent = "This Week's tasks"

    const weekTasks = getWeekTasks(getProjects())
    renderFilteredTasks(weekTasks, 'No tasks are due this week.')
}

export function renderNextWeek() {
    const content = document.getElementById('content')
    clear(content)
    const title = document.getElementById('page-title')
    title.textContent = "Next Week's tasks"

    const weekTasks = getNextWeekTasks(getProjects())
    renderFilteredTasks(nextWeekTasks, 'No tasks are due this week.')
}

export function renderThisMonth() {
    const content = document.getElementById('content')
    clear(content)
    const title = document.getElementById('page-title')
    title.textContent = "This month's tasks"

    const monthTasks = getThisMonthTasks(getProjects())
    renderFilteredTasks(monthTasks, 'No tasks are due this week.')
}

export function renderOverdue() {
    const content = document.getElementById('content')
    clear(content)
    const title = document.getElementById('page-title')
    title.textContent = "Overdue tasks"

    const overdueTasks = getOverdueTasks(getProjects())
    
    renderFilteredTasks(overdueTasks, 'No overdue tasks.')
}

