import Project from "./project"
import Task from "./task"

import { findAssignedProject, findProjectInStorage, findTaskInStorage, clear, formatDate, isDateInFuture, dateValidation, convertToDateObj } from "./helper"

// initialize //

export function initializeProjects() {
    let projects = localStorage.getItem('projects')
     
    if (projects === null) {

        const defaultProject = new Project("Default Project", "Welcome! Add a new task:")
        defaultProject.addTask(new Task('do this', convertToDateObj('2024-11-11', 'yyyy-MM-dd'), defaultProject.title, "", "High"))
        defaultProject.addTask(new Task('do that', convertToDateObj('2024-11-11', 'yyyy-MM-dd'), defaultProject.title, "Note", "Low"))

        projects = [defaultProject]
        localStorage.setItem('projects', JSON.stringify(projects))
    } else {
        getProjects()
    }
}
  
// save projects array to local storage //

export function saveProjects(projects) {
    const plainProjects = projects.map(project => ({
        title: project.title,
        description: project.description,
        tasks: project.tasks.map(task => ({
            title: task.title,
            dueDate: task.dueDate,
            project: task.project,
            note: task.note,
            priority: task.priority,
            isCompleted: task.isCompleted,
            id: task.id
        }))
    }));

    localStorage.setItem('projects', JSON.stringify(plainProjects));
}
  
// retrieve projects array from local storage and convert in class instances //

export function getProjects() {
    let projects = localStorage.getItem('projects')
    if (projects) {
        const parsedProjects = JSON.parse(projects)
        return parsedProjects.map(projectData => {
            const project = new Project(projectData.title, projectData.description)
            projectData.tasks.forEach(taskData => {
                const task = new Task(taskData.title, convertToDateObj(taskData.dueDate), taskData.project, taskData.note, taskData.priority, taskData.isCompleted, taskData.id)
                project.addTask(task)
            })
            return project
        })
    } else {
        return []
    } 
}


