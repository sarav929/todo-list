import Project from "./project"
import Task from "./task"

import { convertToDateObj } from "./helper"
import { subDays } from "date-fns"

// initialize //

export function initializeProjects() {
    let projects = localStorage.getItem('projects')
     
    if (projects === null) {

        const today = new Date()
        const yesterday = subDays(new Date(), 1)

        const defaultProject = new Project("Default Project", "Welcome! This is a sample project :)")
        defaultProject.addTask(new Task('Unimportant task', today.toLocaleDateString('en-CA'), defaultProject.title, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Low"))
        defaultProject.addTask(new Task('More important task', today.toLocaleDateString('en-CA'), defaultProject.title, "", "Medium"))
        defaultProject.addTask(new Task('Very important task', today.toLocaleDateString('en-CA'), defaultProject.title, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "High"))
        defaultProject.addTask(new Task('Overdue task', yesterday.toLocaleDateString('en-CA'), defaultProject.title, "", "High"))

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


