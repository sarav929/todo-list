class Task {
    constructor(title, dueDate, project, note = "", isCompleted = false) {
        this.title = title
        this.dueDate = dueDate
        this.project = project
        this.note = note
        this.isCompleted = isCompleted
    }

    updateTaskInfo(attribute, value) {
        this[attribute] = value
    }
}

export default Task