import { getProjects, saveProjects } from "./storage"
import createTaskForm from "./task-form"
import { findAssignedProject, findProjectInStorage, findTaskInStorage, clear, formatDate, isDateInFuture, dateValidation, clearCompletedTasks, getTodayTasks, getWeekTasks, getOverdueTasks } from "./helper"
import editImg from "../src/icons/edit.svg"
import expandImg from "../src/icons/expand.svg"
import plusIcon from "../src/icons/plus.svg"

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
        content.textContent = "No projects. You're all caught up!"
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
        noTasks.setAttribute('class', 'no-tasks-to-display')
        noTasks.textContent = "No tasks. You're all caught up!"
        content.appendChild(noTasks)
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

    const isCompletedCheck = document.createElement('input')
    isCompletedCheck.setAttribute('type', 'checkbox')
    collapsed.appendChild(isCompletedCheck)
    isCompletedCheck.checked = task.isCompleted
    if (isCompletedCheck.checked) {
        taskDiv.classList.add('task-completed')
    }    

    // mark as complete/not complete // 

    isCompletedCheck.addEventListener('change', () => {
        const projectList = getProjects()
        const currentTask = findTaskInStorage(task, projectList)
        if (isCompletedCheck.checked) {
            taskDiv.classList.add('task-completed')
            currentTask.updateTaskInfo("isCompleted", true)
        } else {
            taskDiv.classList.remove('task-completed')
            currentTask.updateTaskInfo("isCompleted", false)
        }
        saveProjects(projectList)
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
        name.setAttribute('class', 'task-note')
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
}

function renderFilteredTasks(tasks, message) {
    if (tasks.length == 0) {
        const content = document.getElementById('content')
        const noTasks = document.createElement('div')
        noTasks.setAttribute('class', 'no-tasks-to-display')
        noTasks.textContent = message
        content.appendChild(noTasks)
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
    closeDialog.textContent = 'X'
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

    editForm.innerHTML = `<label for="task-new-title">Title:
    <input type="text" id="task-new-title" value="${task.title}" maxlength="20" required>
    </label>
    <label for="task-new-due-date">Due date:
    <input type="date" id="task-new-due-date" value="${task.dueDate}" required>
    </label>
    <div id="future-date-error" class="error-message hidden"></div>
    <label for="task-new-note">Note:
    <textarea name="task-note" id="task-new-note">${task.note}</textarea>
    </label>
    <label for="task-new-priority">Priority:
    <select name="priority" id="task-new-priority">
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
    </select>
    </label>
    <button id="delete-task-btn">Delete task</button>
    <button type="submit" id="submit-btn">Save</button>`

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

    editForm.innerHTML = `<label for="project-new-title">Title:
    <input type="text" id="project-new-title" value="${project.title}" maxlength="20" required>
    <label for="project-new-description">Description:
    <input type="text" id="project-new-description" value="${project.description}">
    <button id="delete-project-btn">Delete project</button>
    <button type="submit">Save</button>`

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

export function renderOverdue() {
    const content = document.getElementById('content')
    clear(content)
    const title = document.getElementById('page-title')
    title.textContent = "Overdue tasks"

    const overdueTasks = getOverdueTasks(getProjects())
    
    renderFilteredTasks(overdueTasks, 'No overdue tasks.')
}

