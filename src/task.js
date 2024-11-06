import { getProjects, saveProjects } from "./storage"

class Task {
    constructor(title, dueDate, project, note = "", isCompleted = false, id = Date.now().toString() + "-" + Math.floor(Math.random() * 1000)) {
        this.title = title
        this.dueDate = dueDate
        this.project = project
        this.note = note
        this.isCompleted = isCompleted
        this.id = id
    }

    updateTaskInfo(attribute, value) {
        this[attribute] = value
        saveProjects(getProjects())
    }
}

export default Task