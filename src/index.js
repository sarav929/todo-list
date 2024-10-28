import Project from './project'
import Task from './task'

let newTask1 = new Task("Do this", "28/10/24", "", ["checklist1", "checklist2"])
let newTask2 = new Task("Do that", "31/10/24", "do that by the due date", [])

let newProj = new Project("New Project", "28/10/24", "This is a new project", "", [newTask1, newTask2])

console.log(newProj)