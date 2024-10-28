class Task {
    constructor(title, dueDate, note = "", checklist = []) {
        this.title = title
        this.dueDate = dueDate
        this.note = note
        this.checklist = checklist
    }

    addChecklist(check) {
        this.checklist.push(check)
    }

    removeChecklist(check) {
        this.checklist.filter(item => item !== check)
    }

    updateTaskInfo(attribute, value) {
        this[attribute] = value
    }
}

export default Task