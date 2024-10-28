class Project {
    constructor(title, dueDate, description, note = "", tasks = [], isCompleted = false) {
        this.title = title
        this.dueDate = dueDate
        this.description = description
        this.note = note
        this.tasks = tasks
        this.isCompleted = isCompleted
    }

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) { 
        this.tasks = this.tasks.filter(item => item !== task); 
    }

    updateProjInfo(attribute, value) {
        this[attribute] = value
    }
}

export default Project