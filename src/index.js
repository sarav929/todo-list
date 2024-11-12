import createHome from './home-page'
import '../src/styles/base.css'

import '../src/styles/form.css'
import '../src/styles/task.css'

import { initializeProjects } from './storage.js'

initializeProjects()
createHome()
