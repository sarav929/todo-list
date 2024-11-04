import Project from './project'
import Task from './task'
import createHome from './home-page'
import '../src/styles/base.css'
import { initializeProjects, saveProjects, getProjects } from './storage.js'

localStorage.clear

let projects = initializeProjects()


createHome()
