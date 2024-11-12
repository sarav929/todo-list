import { parse, isFuture, format, isThisWeek, isToday, isBefore, startOfDay, addMonths } from "date-fns"
import { getProjects, saveProjects } from "./storage"


export function convertToDateObj(date) {
    const dateFormat = 'yyyy-MM-dd'
    const parsed = parse(date, dateFormat, new Date())
    const formatted = format(parsed, 'yyyy-MM-dd')
    return formatted
}

export function formatDate(date) {
    return format(date, 'dd-MM-yyyy')
}

export function isDateInFuture(date) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
    return isFuture(parsedDate)
}

export function isDateToday(date) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
    return isToday(parsedDate)
}

export function isDatePast(date) {
    const today = startOfDay(new Date())
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
    return isBefore(parsedDate, today)
}

export function isDateThisWeek(date) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date())
    return isThisWeek(parsedDate)
}

export function isDateNextMonth(date) {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
    const startOfNextMonth = startOfMonth(addMonths(new Date(), 1));
    const endOfNextMonth = endOfMonth(addMonths(new Date(), 1));
    return isAfter(parsedDate, startOfNextMonth) && isBefore(parsedDate, endOfNextMonth);
}

export function dateValidation(input, message, submit) {
    input.addEventListener('input', () => {

        if (!isDateInFuture(input.value) && !isDateToday(input.value)) {
            message.classList.remove('hidden')
            message.textContent = 'Select today or a future date for your task!'
            submit.disabled = true
        } else {
            message.classList.add('hidden') 
            submit.disabled = false
        }  
    })
}

export function titleValidation(input, message, submit) {

    input.addEventListener('input', () => {
        const projectsList = getProjects()

        if (projectsList.some((project) => project.title.toLowerCase() == input.value.toLowerCase())) {
            message.classList.remove('hidden')
            message.textContent = 'This list already exists.'
            submit.disabled = true
        } else {
            message.classList.add('hidden')
            submit.disabled = false
        }  
    })
}

export function findProjectInStorage(project, projects) {
    const selectedProject = projects.find(p => p.title === project.title)
    return selectedProject
}

export function findTaskInStorage(task, projects) {
    const assignedProject = projects.find(project => project.title === task.project)
    const storageTask = assignedProject.tasks.find(t => t.id === task.id)
    return storageTask
}

export function findAssignedProject(task, projects) {
    const assignedProject = projects.find(project => project.title === task.project)
    return assignedProject
}

export function clearCompletedTasks(project, projects) {
    const currentProject = findProjectInStorage(project, projects)

    currentProject.tasks.forEach ((task) => {
        if (task.isCompleted) {
            currentProject.removeTask(task)
        }
    })
    saveProjects(projects)
    
}

export function clear(element) {
    element.innerHTML = ''
}

// filter tasks //

export function getTodayTasks(projects) {
    const todayTasks = []
    projects.forEach((project) => {
        project.tasks.forEach((task) => {
            if (isDateToday(task.dueDate)) {
                todayTasks.push(task)
            }
        })
    })
    return todayTasks
}

export function getWeekTasks(projects) {
    const weekTasks = []
    projects.forEach((project) => {
        project.tasks.forEach((task) => {
            if (isDateThisWeek(task.dueDate)) {
                weekTasks.push(task)
            }
        })
    })
    return weekTasks
}

export function getThisMonthTasks(projects) {
    const thisMonthTasks = []
    projects.forEach((project) => {
        project.tasks.forEach((task) => {
            if (isDateThisMonth(task.dueDate)) {
                thisMonthTasks.push(task)
            }
        })
    })
    return thisMonthTasks
}

export function getOverdueTasks(projects) {
    const overdueTasks = []
    const today = new Date()
    projects.forEach((project) => {
        project.tasks.forEach((task) => {
            if (isDatePast(task.dueDate)) {
                overdueTasks.push(task)
            }
        })
    })
    return overdueTasks
}



