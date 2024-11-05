import createHome from './home-page'
import '../src/styles/base.css'
import { initializeProjects } from './storage.js'

initializeProjects()
createHome()
