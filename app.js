import express from 'express'
import appConfig from './config/index.config.js'
import connectDB from './database/index.db.js'

// Start express framework
const app = express()
// Set configurations from config folder
appConfig(app)

connectDB()

export default app
