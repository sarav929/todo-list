class Project {
    constructor(title, description, tasks = []) {
        this.title = title
        this.description = description
        this.tasks = tasks
    }

    addTask(task) {
        this.tasks.push(task)
    }

    removeTask(task) { 
        this.tasks = this.tasks.filter(item => item !== task)
    }

    updateProjInfo(attribute, value) {
        this[attribute] = value
    }
}

export default Project