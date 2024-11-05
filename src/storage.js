import Project from "./project"
import Task from "./task"

// initialize // 

export function initializeProjects() {
    let projects = localStorage.getItem('projects')
     
    if (projects === null) {

        const defaultProject = new Project("Default Project", "Welcome! Add a new task:", [new Task('do this', '11/11/24'), new Task('do that', '14/11/24')])

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
            isCompleted: task.isCompleted
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
                const task = new Task(taskData.title, taskData.dueDate, taskData.project, taskData.note, taskData.isCompleted)
                project.addTask(task)
            })
            return project
        })
    } else {
        return []
    }
    
}




