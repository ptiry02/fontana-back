import express from 'express'
import appConfig from './config/index.config.js'

// Start express framework
const app = express()
// Set configurations from config folder
appConfig(app)

export default app
